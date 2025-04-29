"use client";

import Product from "@/app/types/Product";
import { CustomInput } from "@/app/admin/components/input";
import { CustomButton } from "@/app/admin/components/button";
import { CustomSelect } from "@/app/admin/components/select";
import { MultiSelect } from "@/app/admin/components/multi-select";
import { ImageUpload } from "@/app/admin/components/image-upload";
import { useState } from "react";
import useCategorias from "@/app/hooks/useCategorias";
import { useColors } from "@/app/hooks/use-colors";
import { Loader2 } from "lucide-react";

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, "id">) => void;
  isLoading?: boolean;
}

export function ProductForm({
  product,
  onSubmit,
  isLoading,
}: ProductFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    product?.category || ""
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    product?.colors || []
  );
  const [images, setImages] = useState<File[]>([]);

  const { colors, loading: colorsLoading, error: colorsError } = useColors();
  const {
    data: categorias,
    loading: categoriasLoading,
    error: categoriasError,
  } = useCategorias();

  if (colorsLoading || categoriasLoading) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: selectedCategory,
      colors: selectedColors,
      images: images,
      corte: formData.get("corte") as string,
      suela: formData.get("suela") as string,
      plantilla: formData.get("plantilla") as string,
      forro: formData.get("forro") as string,
      corrida: formData.get("corrida") as string,
      construccion: formData.get("construccion") as string,
      casco: formData.get("casco") as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-foreground">
      <CustomInput name="name" label="Nombre" value={product?.name} required />
      <CustomInput
        name="description"
        label="Descripción"
        value={product?.description}
        asTextarea
        rows={3}
        required
      />
      <CustomSelect
        name="category"
        label="Categoría"
        options={categoryOptions}
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        required
      />
      <MultiSelect
        name="colors"
        placeholder="Selecciona colores"
        options={colorOptions}
        value={selectedColors}
        onValueChange={setSelectedColors}
        defaultValue={[]}
        label="Colores"
      />
      <div className="space-y-2">
        <label className="text-sm font-medium text-black dark:text-white">
          Imágenes
        </label>
        <ImageUpload images={images} onImagesChange={setImages} />
      </div>
      <CustomInput
        name="corte"
        label="Corte"
        value={product?.corte}
        asTextarea
        rows={3}
        required
      />
      <CustomInput
        name="suela"
        label="Suela"
        value={product?.suela}
        asTextarea
        rows={3}
        required
      />
      <CustomInput
        name="plantilla"
        label="Plantilla"
        value={product?.plantilla}
        asTextarea
        rows={3}
        required
      />
      <CustomInput
        name="forro"
        label="Forro"
        value={product?.forro}
        asTextarea
        rows={3}
        required
      />
      <CustomInput
        name="corrida"
        label="Corrida"
        value={product?.corrida}
        asTextarea
        rows={3}
        required
      />
      <CustomInput
        name="construccion"
        label="Construcción"
        value={product?.construccion}
        asTextarea
        rows={3}
        required
      />
      <CustomInput
        name="casco"
        label="Casco"
        value={product?.casco}
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
          {product ? "Actualizar" : "Crear"}
        </CustomButton>
      </div>
    </form>
  );
}
