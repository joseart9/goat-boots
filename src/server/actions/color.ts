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

export async function deleteColor(colorId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("colors")
      .delete()
      .eq("id", colorId)
      .select();

    if (error) {
      console.error("Error al eliminar el color", error);
    }

    return data;
  } catch (error) {
    console.error("Error al eliminar el color", error);
  }
}

export async function updateColor(colorId: string, color: Partial<Colors>) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("colors")
      .update(color)
      .eq("id", colorId)
      .select();

    if (error) {
      console.error("Error al actualizar el color", error);
    }

    return data;
  } catch (error) {
    console.error("Error al actualizar el color", error);
  }
}
