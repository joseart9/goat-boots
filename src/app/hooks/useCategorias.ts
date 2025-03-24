import { useQuery } from "@tanstack/react-query";
import { getCategorias } from "@/server/services/categoria";

export default function useCategorias() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categorias"],
    queryFn: getCategorias,
  });

  return { data, loading: isLoading, error };
}
