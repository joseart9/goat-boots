"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function deleteImage(id: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase.from("images").delete().eq("id", id);

    if (error) {
      console.log("error", error);
    }

    return data;
  } catch (error) {
    console.error("Error al eliminar la imagen", error);
  }
}
