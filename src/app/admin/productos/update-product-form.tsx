"use client";

import { useEffect, useState, useRef } from "react";
import Product from "@/app/types/Product";
import CustomImage from "@/app/types/CustomImage";
import { CustomInput } from "@/app/admin/components/input";
import { CustomButton } from "@/app/admin/components/button";
import { CustomSelect } from "@/app/admin/components/select";
import { MultiSelect } from "@/app/admin/components/multi-select";
import { UpdateImageUpload } from "@/app/admin/components/update-image-upload/update-image-upload";
import useCategorias from "@/app/hooks/useCategorias";
import { useColors } from "@/app/hooks/use-colors";
import useImages from "@/app/hooks/use-images";
import { Loader2 } from "lucide-react";
import { updateProduct } from "@/server/actions/product";
import { getCategoryByName } from "@/server/services/categoria";
import { getProductColors } from "@/server/services/products";

interface UpdateProductFormProps {
  product: Product;
  onSuccess?: (updatedProduct: Product) => void;
}

interface ImageData {
  id: string;
  url: string;
}

export function UpdateProductForm({
  product,
  onSuccess,
}: UpdateProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    category: "", // We'll set this after fetching the category
    colors: [] as string[], // We'll set this after fetching the colors
    corte: product?.corte || "",
    suela: product?.suela || "",
    plantilla: product?.plantilla || "",
    forro: product?.forro || "",
    corrida: product?.corrida || "",
    construccion: product?.construccion || "",
    casco: product?.casco || "",
  });
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);
  const [isLoadingColors, setIsLoadingColors] = useState(true);

  const categoryFetchedRef = useRef(false);
  const colorsFetchedRef = useRef(false);

  const { colors, loading: colorsLoading, error: colorsError } = useColors();
  const {
    data: categorias,
    loading: categoriasLoading,
    error: categoriasError,
  } = useCategorias();
  const { images, isLoading: imagesLoading } = useImages(product.id);

  // Fetch category data when component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      if (product?.category && !categoryFetchedRef.current) {
        setIsLoadingCategory(true);
        try {
          const category = await getCategoryByName(product.category);
          if (category?.id) {
            setFormData((prev) => ({
              ...prev,
              category: category.id.toString(),
            }));
          }
        } catch (error) {
          console.error("Error fetching category:", error);
        } finally {
          setIsLoadingCategory(false);
          categoryFetchedRef.current = true;
        }
      }
    };

    fetchCategory();
  }, [product?.category]);

  // Fetch product colors when component mounts
  useEffect(() => {
    const fetchProductColors = async () => {
      if (product?.id && !colorsFetchedRef.current) {
        setIsLoadingColors(true);
        try {
          const productColorIds = await getProductColors(product.id);
          setFormData((prev) => ({
            ...prev,
            colors: productColorIds,
          }));
        } catch (error) {
          console.error("Error fetching product colors:", error);
        } finally {
          setIsLoadingColors(false);
          colorsFetchedRef.current = true;
        }
      }
    };

    fetchProductColors();
  }, [product?.id]);

  useEffect(() => {
    if (images) {
      const validImages = images
        .filter(
          (
            img: CustomImage
          ): img is CustomImage & { id: string; url: string } =>
            !!img.id && !!img.url
        )
        .map((img) => ({ id: img.id, url: img.url }));
      setExistingImages(validImages);
    }
  }, [images]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (
    colorsLoading ||
    categoriasLoading ||
    imagesLoading ||
    isLoadingCategory ||
    isLoadingColors
  ) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          <p className="text-lg font-medium text-muted-foreground">
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  if (colorsError || categoriasError) {
    return <div>Error al cargar los datos</div>;
  }

  const categoryOptions =
    categorias?.map((categoria) => ({
      label: categoria.name || "",
      value: categoria.id?.toString() || "",
    })) || [];

  const colorOptions =
    colors?.map((color) => ({
      label: color.name || "",
      value: color.id?.toString() || "",
    })) || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedProduct = {
        ...product,
        ...formData,
        existingImages: existingImages.map((img) => img.id),
        newImages: newImages,
      };

      await updateProduct(updatedProduct);
      onSuccess?.(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-foreground">
      <CustomInput
        name="name"
        label="Nombre"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <CustomInput
        name="description"
        label="Descripción"
        value={formData.description}
        onChange={handleInputChange}
        asTextarea
        rows={3}
        required
      />
      <CustomSelect
        name="category"
        label="Categoría"
        options={categoryOptions}
        value={formData.category}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, category: value }))
        }
        required
      />
      <MultiSelect
        name="colors"
        placeholder="Selecciona colores"
        options={colorOptions}
        value={formData.colors}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, colors: value }))
        }
        defaultValue={formData.colors}
        label="Colores"
      />
      <div className="space-y-2">
        <label className="text-sm font-medium text-black dark:text-white">
          Imágenes
        </label>
        <UpdateImageUpload
          existingImages={existingImages}
          onExistingImagesChange={setExistingImages}
          newImages={newImages}
          onNewImagesChange={setNewImages}
        />
      </div>
      <CustomInput
        name="corte"
        label="Corte"
        value={formData.corte}
        onChange={handleInputChange}
        asTextarea
        rows={3}
        required
      />
      <CustomInput
        name="suela"
        label="Suela"
        value={formData.suela}
        onChange={handleInputChange}
        asTextarea
        rows={3}
        required
      />
      <CustomInput
        name="plantilla"
        label="Plantilla"
        value={formData.plantilla}
        onChange={handleInputChange}
        asTextarea
        rows={3}
        required
      />
      <CustomInput
        name="forro"
        label="Forro"
        value={formData.forro}
        onChange={handleInputChange}
        asTextarea
        rows={3}
        required
      />
      <CustomInput
        name="corrida"
        label="Corrida"
        value={formData.corrida}
        onChange={handleInputChange}
        asTextarea
        rows={3}
        required
      />
      <CustomInput
        name="construccion"
        label="Construcción"
        value={formData.construccion}
        onChange={handleInputChange}
        asTextarea
        rows={3}
        required
      />
      <CustomInput
        name="casco"
        label="Casco"
        value={formData.casco}
        onChange={handleInputChange}
        asTextarea
        rows={3}
        required
      />
      <div className="flex justify-end gap-2 pt-4">
        <CustomButton
          className="bg-primary-500 text-white dark:text-white font-semibold"
          variant="default"
          type="submit"
          isLoading={isLoading}
        >
          Actualizar
        </CustomButton>
      </div>
    </form>
  );
}
