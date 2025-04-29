"use server";

import { cookies } from "next/headers";
import fetch from "node-fetch";
import FormData from "form-data";
import { Readable } from "stream";

export async function uploadImage(file: File) {
  const formData = new FormData();

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Create a readable stream from the buffer
  const stream = Readable.from(buffer);

  formData.append("file", stream, {
    filename: file.name,
    contentType: file.type,
  });
  formData.append("project_id", process.env.NEXT_PUBLIC_PROJECT_ID || "");

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("No admin token found");
  }

  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_IMG_UPLOAD_URL}`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data;
}
