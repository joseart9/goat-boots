import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/server/services/products";

export default function useProducts(categoryHref?: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products", categoryHref],
    queryFn: () => getProducts(categoryHref),
  });
  return {
    data,
    error,
    loading: isLoading,
  };
}
