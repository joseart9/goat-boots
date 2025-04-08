"use server";

import db from "@/app/db";
import Product from "@/app/types/Product";

export async function getProducts(categoryHref?: string): Promise<Product[]> {
  try {
    const products = categoryHref
      ? await db`
          SELECT 
            p.id,
            p.name, 
            p.description, 
            p.corte, 
            p.suela, 
            p.plantilla, 
            p.forro, 
            p.corrida, 
            p.construccion, 
            p.casco,
            c.name AS categoria_name
          FROM products p
          JOIN categorias c ON p.category_id = c.id
          WHERE c.href = ${categoryHref};
        `
      : await db`
          SELECT 
            p.id,
            p.name, 
            p.description, 
            p.corte, 
            p.suela, 
            p.plantilla, 
            p.forro, 
            p.corrida, 
            p.construccion, 
            p.casco,
            c.name AS categoria_name
          FROM products p
          JOIN categorias c ON p.category_id = c.id;
        `;
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.categoria_name,
      corte: product.corte,
      suela: product.suela,
      plantilla: product.plantilla,
      forro: product.forro,
      corrida: product.corrida,
      construccion: product.construccion,
      casco: product.casco,
    }));
  } catch (error) {
    console.error("Error al obtener los productos", error);
    return [];
  }
}

export async function getProduct(productId: string): Promise<Product | null> {
  try {
    const product = await db`
    SELECT * FROM products WHERE id = ${productId} LIMIT 1;
    `;

    const colors = await getProductColors(productId);

    return {
      id: product[0].id,
      name: product[0].name,
      description: product[0].description,
      category_id: product[0].category_id,
      corte: product[0].corte,
      suela: product[0].suela,
      plantilla: product[0].plantilla,
      forro: product[0].forro,
      corrida: product[0].corrida,
      construccion: product[0].construccion,
      casco: product[0].casco,
      colors: colors,
    };
  } catch (error) {
    console.error("Error al obtener el producto", error);
    return null;
  }
}

export async function getProductColors(productId: string): Promise<string[]> {
  try {
    const colors = await db`
      SELECT color_id FROM "product-colors" WHERE product_id = ${productId}
    `;

    return colors.map((color) => color.color_id);
  } catch (error) {
    console.error("Error al obtener los colores del producto", error);
    return [];
  }
}

export async function updateProductColors(productId: string, colors: string[]) {
  try {
    // First delete existing colors for this product
    await db`DELETE FROM "product-colors" WHERE product_id = ${Number(
      productId
    )}`;

    // Then insert new colors if there are any
    if (colors.length > 0) {
      // Convert color IDs to numbers
      const colorIds = colors.map((color) => Number(color));

      await db`
        INSERT INTO "product-colors" (product_id, color_id)
        SELECT ${Number(productId)}, unnest(${colorIds}::bigint[])
      `;
    }
  } catch (error) {
    console.error("Error al actualizar los colores del producto", error);
    throw error;
  }
}
