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

    console.log(products);
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

    console.log(product);

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
    };
  } catch (error) {
    console.error("Error al obtener el producto", error);
    return null;
  }
}
