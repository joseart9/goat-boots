"use client";
import usePedidos from "@/app/hooks/use-pedidos";
import { PedidoTable } from "./PedidosTable";
import { CustomDrawer } from "@/app/admin/components/drawer";
import { Pedido } from "@/app/types/Pedido";
import Product from "@/app/types/Product";
import { disablePedido, getPedido } from "@/server/services/pedidos";
import { useState } from "react";
import { toast } from "sonner";

export default function Pedidos() {
  const { data, isLoading, error, mutate } = usePedidos();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<
    (Pedido & { products: Product[] }) | null
  >(null);
  const [isFinishing, setIsFinishing] = useState(false);

  const handleView = async (pedido: Pedido) => {
    if (!pedido.id) return;
    const detailedPedido = await getPedido(pedido.id);
    if (detailedPedido) {
      setSelectedPedido(detailedPedido);
      setIsDrawerOpen(true);
    }
  };

  const handleFinish = async (pedido: Pedido) => {
    if (!pedido.id) return;

    try {
      setIsFinishing(true);
      await disablePedido(pedido.id);
      toast.success("Pedido finalizado exitosamente");
      // Refresh the pedidos list
      mutate();
    } catch (error) {
      console.error("Error al finalizar el pedido:", error);
      toast.error("Error al finalizar el pedido");
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-secondary-100/25 dark:bg-secondary-500/25">
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pedidos</h1>
        </div>
        <div className="flex-1 p-4">
          {isLoading ? (
            <p>Cargando pedidos...</p>
          ) : error ? (
            <p>Error al cargar los pedidos: {error.message}</p>
          ) : (
            <PedidoTable
              data={data}
              onView={handleView}
              onFinish={handleFinish}
              isFinishing={isFinishing}
            />
          )}
        </div>
        <CustomDrawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          title="Detalles del Pedido"
        >
          {selectedPedido && (
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Información del Cliente
                </h3>
                <p className="text-black dark:text-white">
                  <span className="font-medium text-black dark:text-gray-400">
                    Nombre:
                  </span>{" "}
                  {selectedPedido.customer_name}{" "}
                  {selectedPedido.customer_lastname}
                </p>
                <p className="text-black dark:text-white">
                  <span className="font-medium text-black dark:text-gray-400">
                    Email:
                  </span>{" "}
                  {selectedPedido.customer_email}
                </p>
                <p className="text-black dark:text-white">
                  <span className="font-medium text-black dark:text-gray-400">
                    Teléfono:
                  </span>{" "}
                  {selectedPedido.customer_phone}
                </p>
                <p className="text-black dark:text-white">
                  <span className="font-medium text-black dark:text-gray-400">
                    Fecha de creación:
                  </span>{" "}
                  {selectedPedido.created_at
                    ? new Date(selectedPedido.created_at).toDateString()
                    : "N/A"}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Productos
                </h3>
                {selectedPedido.products.map((product) => (
                  <div key={product.id} className="border p-3 rounded-lg">
                    <p className="font-medium text-black dark:text-white">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-600  dark:text-white">
                      {product.description}
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <p className="text-black dark:text-white">
                        <span className="font-medium text-black dark:text-white">
                          Corte:
                        </span>{" "}
                        {product.corte}
                      </p>
                      <p className="text-black dark:text-white">
                        <span className="font-medium text-black dark:text-white">
                          Suela:
                        </span>{" "}
                        {product.suela}
                      </p>
                      <p className="text-black dark:text-white">
                        <span className="font-medium text-black dark:text-white">
                          Plantilla:
                        </span>{" "}
                        {product.plantilla}
                      </p>
                      <p className="text-black dark:text-white">
                        <span className="font-medium text-black dark:text-white">
                          Forro:
                        </span>{" "}
                        {product.forro}
                      </p>
                      <p className="text-black dark:text-white">
                        <span className="font-medium text-black dark:text-white">
                          Corrida:
                        </span>{" "}
                        {product.corrida}
                      </p>
                      <p className="text-black dark:text-white">
                        <span className="font-medium text-black dark:text-white">
                          Construcción:
                        </span>{" "}
                        {product.construccion}
                      </p>
                      <p className="text-black dark:text-white">
                        <span className="font-medium text-black dark:text-white">
                          Casco:
                        </span>{" "}
                        {product.casco}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CustomDrawer>
      </main>
    </div>
  );
}
