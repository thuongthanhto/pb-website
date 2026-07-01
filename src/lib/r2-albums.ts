import { r2Client } from "./r2";
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { imageSize } from "image-size";
import { loadMetadata, enrichImageWithMetadata } from "./metadata";

// Cache measured dimensions per (key + size) so warm server instances don't
// re-download image headers on every ISR revalidation.
const dimensionCache = new Map<string, { width: number; height: number }>();

// Header bytes are enough to read dimensions. 256KB comfortably covers JPEGs
// with large EXIF/embedded thumbnails; if it's still not enough we fall back
// to a default ratio rather than downloading the whole file.
const HEADER_BYTES = 262144;

async function getImageDimensions(
  key: string,
  size?: number
): Promise<{ width: number; height: number } | null> {
  const cacheKey = `${key}:${size ?? 0}`;
  const cached = dimensionCache.get(cacheKey);
  if (cached) return cached;

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Range: `bytes=0-${HEADER_BYTES - 1}`,
    });
    const response = await r2Client.send(command);
    const bytes = await response.Body?.transformToByteArray();
    if (!bytes) return null;

    const { width, height } = imageSize(bytes);
    if (width && height) {
      const dims = { width, height };
      dimensionCache.set(cacheKey, dims);
      return dims;
    }
  } catch (error) {
    // Header slice too small / unsupported format / fetch error -> fall back.
  }
  return null;
}

// Run async tasks with a concurrency cap so we don't open hundreds of R2
// connections at once when the gallery has many photos.
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await fn(items[i]);
    }
  });
  await Promise.all(workers);
  return results;
}

async function getAllImagesFromPhotos() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: "photos/",
    });

    const response = await r2Client.send(command);
    return response.Contents || [];
  } catch (error) {
    console.error("Lỗi lấy danh sách ảnh:", error);
    return [];
  }
}

function isImageFile(key) {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(key);
}

function getFolderFromKey(key) {
  // Extract folder name from path like "photos/studio/image.jpg" or "photos/T&K/image.jpg"
  const parts = key.split("/");
  if (parts.length >= 3) {
    return parts[1]; // Return "studio", "outdoor", "T&K", "V&K"
  }
  return null;
}

export async function getAllImages() {
  const [files, metadata] = await Promise.all([
    getAllImagesFromPhotos(),
    loadMetadata(),
  ]);

  // Filter only image files and map to structured data
  const images = files
    .filter((file) => isImageFile(file.Key))
    .map((file) => {
      const folderName = getFolderFromKey(file.Key);

      const baseImage = {
        id: file.Key,
        key: file.Key,
        fileName: file.Key.split("/").pop(),
        folder: folderName,
        size: file.Size,
        lastModified: file.LastModified,
      };

      // Enrich with custom metadata
      return enrichImageWithMetadata(baseImage, metadata);
    })
    .filter((img) => img.folder !== null); // Remove files not in subfolders

  // Measure real dimensions so the grid can reserve exact space (no layout jank)
  await mapWithConcurrency(images, 12, async (img) => {
    const dims = await getImageDimensions(img.key, img.size);
    if (dims) {
      img.width = dims.width;
      img.height = dims.height;
      img.aspectRatio = dims.width / dims.height;
    }
  });

  return images.sort((a, b) => {
      // Sort by last modified date, newest first
      const dateA = a.lastModified ? new Date(a.lastModified).getTime() : 0;
      const dateB = b.lastModified ? new Date(b.lastModified).getTime() : 0;
      if (dateA !== dateB) {
        return dateB - dateA;
      }
      return a.fileName.localeCompare(b.fileName);
    });

  return images;
}
