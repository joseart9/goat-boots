import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getColors } from "@/server/services/colors";

export const useColors = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });

  const mutate = () => {
    queryClient.invalidateQueries({ queryKey: ["colors"] });
  };

  return {
    colors: data,
    loading: isLoading,
    error: error as Error | null,
    mutate,
  };
};
