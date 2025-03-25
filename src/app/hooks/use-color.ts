import { useQuery } from "@tanstack/react-query";
import { getColor } from "@/server/services/colors";

export const useColor = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["color", id],
    queryFn: () => getColor(id),
  });

  return { color: data, loading: isLoading, error };
};
