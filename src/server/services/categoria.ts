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

export async function getCategoria(id: string): Promise<Categoria | null> {
  try {
    const categoria = await db`SELECT * FROM categorias WHERE id = ${id}`;
    return {
      id: categoria[0].id,
      name: categoria[0].name,
      description: categoria[0].description,
      img: categoria[0].img,
      href: categoria[0].href,
      alt: categoria[0].alt,
      created_at: categoria[0].created_at,
    };
  } catch (error) {
    console.error("Error al obtener la categoria", error);
    return null;
  }
}

export async function getCategoriaByHref(
  href: string
): Promise<Categoria | null> {
  try {
    const categoria = await db`SELECT * FROM categorias WHERE href = ${href}`;
    return {
      id: categoria[0].id,
      name: categoria[0].name,
      description: categoria[0].description,
      img: categoria[0].img,
      href: categoria[0].href,
      alt: categoria[0].alt,
      created_at: categoria[0].created_at,
    };
  } catch (error) {
    console.error("Error al obtener la categoria", error);
    return null;
  }
}

export async function getCategoryByName(name: string) {
  try {
    const categoria = await db`SELECT * FROM categorias WHERE name = ${name}`;
    return categoria[0];
  } catch (error) {
    console.error("Error al obtener la categoria", error);
    return null;
  }
}
