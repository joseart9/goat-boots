"use client";

import { useQuery } from "@tanstack/react-query";
import { getPedidos } from "@/server/services/pedidos";
import { Pedido } from "@/app/types/Pedido";

export default function usePedidos() {
  const { data, isLoading, error, refetch } = useQuery<Pedido[]>({
    queryKey: ["pedidos"],
    queryFn: async () => {
      return getPedidos();
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
    mutate: refetch,
  };
}
