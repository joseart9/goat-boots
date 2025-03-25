"use server";

import db from "@/app/db";
import Colors from "@/app/types/Colors";

export async function getColors(): Promise<Colors[]> {
  try {
    const colors = await db`SELECT * FROM colors`;
    return colors.map((color) => ({
      id: color.id,
      name: color.name,
      hex: color.hex,
      multicolor: color.multicolor,
    }));
  } catch (error) {
    console.error("Error al obtener los colores", error);
    return [];
  }
}

export async function getColor(id: string): Promise<Colors[] | null> {
  try {
    const color = await db`SELECT * FROM colors WHERE id = ${id}`;
    return color.map((color) => ({
      id: color.id,
      name: color.name,
      hex: color.hex,
      multicolor: color.multicolor,
    }));
  } catch (error) {
    console.error("Error al obtener el color", error);
    return null;
  }
}
