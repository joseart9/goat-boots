import { useQuery } from "@tanstack/react-query";
import { getCategoria } from "@/server/services/categoria";

export default function useCategoria(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categoria", id],
    queryFn: () => getCategoria(id),
  });

  return {
    data,
    isLoading,
    error,
  };
}
