import { useQuery } from "@tanstack/react-query";
import { getImages } from "@/server/services/images";

export default function useImages(productId: string | undefined) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["images", productId],
    queryFn: async () => {
      if (!productId) return [];
      return getImages(productId);
    },
    enabled: !!productId,
  });

  return {
    images: data || [],
    isLoading,
    error,
  };
}
