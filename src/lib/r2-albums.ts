import { r2Client } from "./r2";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

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
  // Extract folder name from path like "photos/makeup/image.jpg"
  const parts = key.split("/");
  if (parts.length >= 3) {
    return parts[1]; // Return "makeup", "studio", "reportage"
  }
  return null;
}

export async function getAllImages() {
  const files = await getAllImagesFromPhotos();

  // Filter only image files and map to structured data
  const images = files
    .filter((file) => isImageFile(file.Key))
    .map((file) => {
      const folderName = getFolderFromKey(file.Key);

      return {
        id: file.Key,
        key: file.Key,
        fileName: file.Key.split("/").pop(),
        folder: folderName,
        size: file.Size,
        lastModified: file.LastModified,
      };
    })
    .filter((img) => img.folder !== null); // Remove files not in subfolders

  return images;
}
