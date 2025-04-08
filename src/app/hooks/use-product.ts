import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/server/services/products";

export default function useProduct(productId: string | undefined) {
  const { data, isLoading, error } = useQuery({
    queryKey: [`product-${productId}`, productId],
    queryFn: async () => {
      if (!productId) return null;
      return getProduct(productId);
    },
    enabled: !!productId,
  });

  return {
    data: data || null,
    isLoading,
    error,
  };
}
