import { useQuery } from "@tanstack/react-query";
import { getCategoriaByHref } from "@/server/services/categoria";

export default function useCategoriaByHref(href: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categoria", href],
    queryFn: () => getCategoriaByHref(href),
  });

  return {
    data,
    isLoading,
    error,
  };
}
