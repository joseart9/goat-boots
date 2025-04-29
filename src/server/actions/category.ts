"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Category from "@/app/types/Category";

export async function createCategory(category: Omit<Category, "id">) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("categorias")
    .insert({
      name: category.name,
      description: category.description,
      img: category.img,
      href: category.href,
      alt: category.alt,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteCategory(id: number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("categorias").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCategory(
  id: number,
  category: Omit<Category, "id">
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("categorias")
    .update(category)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
