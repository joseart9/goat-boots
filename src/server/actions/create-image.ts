"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import CustomImage from "@/app/types/CustomImage";

export async function createImage(image: CustomImage) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("images")
      .insert(image)
      .select();

    if (error) {
      console.log("error", error);
    }

    return data;
  } catch (error) {
    console.error("Error al crear el producto", error);
  }
}
