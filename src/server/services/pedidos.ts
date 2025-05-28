"use server";

import db from "@/app/db";
import { Pedido } from "@/app/types/Pedido";
import Product from "@/app/types/Product";

export async function getPedidos(): Promise<
  (Pedido & { products: Product[] })[]
> {
  try {
    const pedidos = await db`
      WITH pedido_products_info AS (
        SELECT 
          pp.pedido_id,
          json_agg(
            json_build_object(
              'id', p.id,
              'name', p.name,
              'description', p.description,
              'category', p.category,
              'colors', p.colors,
              'corte', p.corte,
              'suela', p.suela,
              'plantilla', p.plantilla,
              'forro', p.forro,
              'corrida', p.corrida,
              'construccion', p.construccion,
              'casco', p.casco,
              'category_id', p.category_id
            )
          ) as products
        FROM pedido_products pp
        JOIN products p ON p.id = pp.product_id
        GROUP BY pp.pedido_id
      )
      SELECT 
        p.id, 
        p.active, 
        p.customer_name, 
        p.customer_lastname, 
        p.customer_phone, 
        p.customer_email,
        p.created_at,
        p.updated_at,
        COALESCE(ppi.products, '[]'::json) as products
      FROM pedidos p
      LEFT JOIN pedido_products_info ppi ON p.id = ppi.pedido_id
      WHERE p.active = true 
      ORDER BY p.created_at DESC
    `;
    return pedidos as unknown as (Pedido & { products: Product[] })[];
  } catch (error) {
    console.error("Error getting pedidos:", error);
    throw error;
  }
}

export async function getPedido(id: string): Promise<Pedido | null> {
  try {
    const pedido = await db`SELECT * FROM pedidos WHERE id = ${id}`;
    return {
      id: pedido[0].id,
      active: pedido[0].active,
      customer_name: pedido[0].customer_name,
      customer_lastname: pedido[0].customer_lastname,
      customer_phone: pedido[0].customer_phone,
      customer_email: pedido[0].customer_email,
      created_at: pedido[0].created_at,
    };
  } catch (error) {
    console.error("Error al obtener el pedido", error);
    return null;
  }
}

export async function createPedido(
  pedido: Pedido,
  products: Product[]
): Promise<Pedido> {
  try {
    // Use the proper transaction API
    return await db.begin(async (sql) => {
      // Create the pedido
      const [newPedido] = await sql`
        INSERT INTO pedidos (
          active, 
          customer_name, 
          customer_lastname, 
          customer_phone, 
          customer_email,
          created_at
        ) VALUES (
          ${pedido.active}, 
          ${pedido.customer_name}, 
          ${pedido.customer_lastname}, 
          ${pedido.customer_phone}, 
          ${pedido.customer_email},
          ${pedido.created_at || new Date().toISOString()}
        )
        RETURNING *
      `;

      // Create relationships between pedido and products
      for (const product of products) {
        await sql`
          INSERT INTO "products-pedidos" (
            pedido_id,
            product_id
          ) VALUES (
            ${newPedido.id},
            ${product.id}
          )
        `;
      }

      return newPedido as unknown as Pedido;
    });
  } catch (error) {
    console.error("Error creating pedido:", error);
    throw error;
  }
}

export async function disablePedido(id: string): Promise<Pedido> {
  try {
    const pedido = await db`UPDATE pedidos SET active = false WHERE id = ${id}`;
    return pedido[0] as unknown as Pedido;
  } catch (error) {
    console.error("Error disabling pedido:", error);
    throw error;
  }
}
