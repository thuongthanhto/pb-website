import { r2Client } from "./r2";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export interface ImageMetadata {
  key: string;
  title?: string;
  description?: string;
  photographer?: string;
  tags?: string[];
  location?: string;
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
  } catch (error) {
    console.log("No metadata file found or error reading metadata:", error);
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
    location: meta?.location || "",
    date: meta?.date || formattedDate,
    camera: meta?.camera || "",
    lens: meta?.lens || "",
    settings: meta?.settings || {},
    featured: meta?.featured || false,
    order: meta?.order || 0,
  };
}

