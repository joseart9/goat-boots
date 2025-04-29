import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategorias } from "@/server/services/categoria";

export default function useCategorias() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["categorias"],
    queryFn: getCategorias,
  });

  const mutate = () => {
    queryClient.invalidateQueries({ queryKey: ["categorias"] });
  };

  return { data, loading: isLoading, error, mutate };
}
