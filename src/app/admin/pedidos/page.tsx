"use client";
import usePedidos from "@/app/hooks/use-pedidos";
import { PedidoTable } from "./PedidosTable";

export default function Pedidos() {
  const { data, isLoading, error } = usePedidos();

  console.log("Pedidos data:", data);
  return (
    <div className="min-h-screen flex flex-col">
      Pedidos
      <div className="flex-1 p-4">
        {isLoading ? (
          <p>Cargando pedidos...</p>
        ) : error ? (
          <p>Error al cargar los pedidos: {error.message}</p>
        ) : (
          <PedidoTable data={data} />
        )}
      </div>
    </div>
  );
}
