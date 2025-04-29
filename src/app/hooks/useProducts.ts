import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/server/services/products";
import Product from "@/app/types/Product";

export default function useProducts(categoryHref?: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", categoryHref],
    queryFn: () => getProducts(categoryHref),
  });

  const mutate = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  return {
    data,
    loading: isLoading,
    error: error as Error | null,
    mutate,
  };
}
