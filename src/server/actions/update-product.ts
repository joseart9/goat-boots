"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Product from "@/app/types/Product";

export async function updateProduct(product: Product) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("products")
      .update(product)
      .eq("id", product.id)
      .select();

    if (error) {
      console.log("error", error);
    }

    return data;
  } catch (error) {
    console.error("Error al crear el producto", error);
  }
}
