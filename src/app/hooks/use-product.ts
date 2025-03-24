import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/server/services/products";

export default function useProduct(productId: string | undefined) {
  if (!productId) {
    return {
      data: null,
      isLoading: false,
      error: null,
    };
  }

  const { data, isLoading, error } = useQuery({
    queryKey: [`product-${productId}`, productId],
    queryFn: () => getProduct(productId),
  });

  return {
    data,
    isLoading,
    error,
  };
}
