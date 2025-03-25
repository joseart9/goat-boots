"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Colors from "@/app/types/Colors";

export async function createColor(color: Colors) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("colors")
      .insert(color)
      .select();

    if (error) {
      console.error("Error al crear el color", error);
    }

    return data;
  } catch (error) {
    console.error("Error al crear el color", error);
  }
}
