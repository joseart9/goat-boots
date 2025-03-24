"use server";

import db from "@/app/db";
import CustomImage from "@/app/types/CustomImage";

export async function getImages(productId: string) {
  const images = await db`SELECT * FROM images WHERE product_id = ${productId}`;
  return images as CustomImage[];
}
