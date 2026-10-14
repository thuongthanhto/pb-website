import { r2Client } from "./r2";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { FOLDER_LOCATIONS, getLocation } from "@/data/locations";

export interface ImageMetadata {
  key: string;
  title?: string;
  description?: string;
  photographer?: string;
  tags?: string[];
  location?: string;
  locationSlug?: string; // key trong src/data/locations.js
  date?: string;
  camera?: string;
  lens?: string;
  settings?: {
    iso?: string;
    aperture?: string;
    shutterSpeed?: string;
    focalLength?: string;
  };
  featured?: boolean;
  order?: number;
}

/**
 * Load metadata from R2 bucket
 * Expects a metadata.json file in the photos/ folder
 */
export async function loadMetadata(): Promise<Record<string, ImageMetadata>> {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: "photos/metadata.json",
    });

    const response = await r2Client.send(command);
    const body = await response.Body?.transformToString();

    if (body) {
      return JSON.parse(body);
    }
  } catch (error: any) {
    // Silently handle missing metadata file - it's optional
    if (error?.Code !== 'NoSuchKey' && error?.name !== 'NoSuchKey') {
      console.warn("Error reading metadata:", error?.message || error);
    }
  }

  return {};
}

/**
 * Merge image data with metadata
 */
export function enrichImageWithMetadata(
  image: any,
  metadata: Record<string, ImageMetadata>
) {
  const meta = metadata[image.key];

  // Ưu tiên: metadata.json theo ảnh -> thư mục con mang tên slug địa điểm
  // (photos/<album>/<slug>/<file>, cho album chụp ở nhiều nơi) -> địa điểm
  // gắn cho cả thư mục album.
  const subfolder = image.key.split("/").slice(2, -1)[0];
  const locationSlug =
    meta?.locationSlug ||
    (getLocation(subfolder) ? subfolder : "") ||
    FOLDER_LOCATIONS[image.folder] ||
    "";
  const place = getLocation(locationSlug);

  // Convert lastModified Date to ISO string if it exists
  const formattedDate = image.lastModified
    ? image.lastModified instanceof Date
      ? image.lastModified.toISOString().split('T')[0]
      : new Date(image.lastModified).toISOString().split('T')[0]
    : "";

  return {
    ...image,
    title: meta?.title || image.fileName,
    description: meta?.description || "",
    photographer: meta?.photographer || "",
    tags: meta?.tags || [],
    location: meta?.location || place?.name.vi || "",
    locationSlug: place ? locationSlug : "",
    date: meta?.date || formattedDate,
    camera: meta?.camera || "",
    lens: meta?.lens || "",
    settings: meta?.settings || {},
    featured: meta?.featured || false,
    order: meta?.order || 0,
  };
}

