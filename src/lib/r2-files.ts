import { r2Client } from "./r2";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { unstable_cache } from "next/cache";

async function getFileList(prefix = "") {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: prefix,
      MaxKeys: 1000,
    });

    const response = await r2Client.send(command);

    return response.Contents || [];
  } catch (error) {
    console.error("Lỗi lấy danh sách file:", error);
    return [];
  }
}

// Wrap with caching to avoid hitting R2 API too frequently
export const getCachedFileList = unstable_cache(
  async (prefix = "") => getFileList(prefix),
  ["r2-files-list"],
  { revalidate: 60 } // Cache within 60 seconds
);
