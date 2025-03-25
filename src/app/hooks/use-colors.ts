import { useQuery } from "@tanstack/react-query";
import { getColors } from "@/server/services/colors";

export const useColors = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });

  return {
    colors: data,
    loading: isLoading,
    error: error,
  };
};
