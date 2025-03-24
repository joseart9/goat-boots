"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Categoria from "@/app/types/Categoria";

export async function createCategory(category: Categoria) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("categorias").insert(category);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
