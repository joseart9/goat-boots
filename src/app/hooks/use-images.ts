import { useQuery } from "@tanstack/react-query";
import { getImages } from "@/server/services/images";

export default function useImages(productId: string | undefined) {
  if (!productId) {
    return {
      images: null,
      isLoading: false,
      error: null,
    };
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["images", productId],
    queryFn: () => getImages(productId),
  });

  return {
    images: data,
    isLoading: isLoading,
    error: error,
  };
}
