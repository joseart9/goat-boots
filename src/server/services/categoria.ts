"use server";

import db from "@/app/db";
import Categoria from "@/app/types/Categoria";

export async function getCategorias(): Promise<Categoria[]> {
  try {
    const categorias = await db`SELECT * FROM categorias`;
    return categorias.map((categoria) => ({
      id: categoria.id,
      name: categoria.name,
      description: categoria.description,
      img: categoria.img,
      href: categoria.href,
      alt: categoria.alt,
      created_at: categoria.created_at,
    }));
  } catch (error) {
    console.error("Error al obtener las categorias", error);
    return [];
  }
}
