"use server";

import { apiGet } from "./apiClient";
import type { ImageGalleryResponse } from "../models/image-gallery";

export async function getResponse(): Promise<ImageGalleryResponse> {
  const users = await apiGet<ImageGalleryResponse>("/image-gallery");
  if ( !users || !Array.isArray(users.records) || users.records.length < 0) {
    throw new Error("The image-gallery API must return records and a non-negative totalRecords count.");
  }

  users.totalRecords = users.records.length;
  return users;
}
