"use client";

import { useState, useEffect } from "react";
import { CustomInput } from "@/app/admin/components/input";
import { CustomButton } from "@/app/admin/components/button";
import { ImageUpload } from "@/app/admin/components/image-upload";
import { Loader2 } from "lucide-react";
import Category from "@/app/types/Category";
import useCategoria from "@/app/hooks/use-categoria";
import { X } from "lucide-react";

interface CategoryFormProps {
  categoryId?: string;
  onSubmit: (category: Omit<Category, "id">) => void;
  isLoading?: boolean;
}

export function CategoryForm({
  categoryId,
  onSubmit,
  isLoading,
}: CategoryFormProps) {
  const { data: existingCategory, isLoading: isLoadingCategory } = useCategoria(
    categoryId || ""
  );
  const [image, setImage] = useState<File | null>(null);
  const [hrefSuffix, setHrefSuffix] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    alt: "",
  });

  useEffect(() => {
    if (existingCategory) {
      setHrefSuffix(existingCategory.href?.replace("/catalogo/", "") || "");
      setExistingImageUrl(existingCategory.img || "");
      setFormData({
        name: existingCategory.name || "",
        description: existingCategory.description || "",
        alt: existingCategory.alt || "",
      });
    }
  }, [existingCategory]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      href: `/catalogo/${hrefSuffix}`,
      img: (image || existingImageUrl) as string,
    });
  };

  if (isLoadingCategory) {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-foreground">
      <CustomInput
        name="name"
        label="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <CustomInput
        name="description"
        label="Descripción"
        value={formData.description}
        onChange={handleChange}
        asTextarea
        rows={3}
        required
      />
      <div className="space-y-2">
        <label className="text-sm font-medium text-black dark:text-white">
          Enlace
        </label>
        <div className="flex items-center gap-2">
          <span className="text-base text-muted-foreground w-[100px]">
            /catalogo/
          </span>
          <CustomInput
            name="href"
            value={hrefSuffix}
            onChange={(e) => setHrefSuffix(e.target.value)}
            required
            className="w-full"
          />
        </div>
      </div>
      <CustomInput
        name="alt"
        label="Texto Alternativo"
        value={formData.alt}
        onChange={handleChange}
        required
      />
      <div className="space-y-2">
        <label className="text-sm font-medium text-black dark:text-white">
          Imagen
        </label>
        {existingImageUrl && !image && (
          <div className="relative aspect-square w-32 rounded-lg overflow-hidden mb-4">
            <img
              src={existingImageUrl}
              alt={formData.alt || "Category image"}
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => setExistingImageUrl("")}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <ImageUpload
          images={image ? [image] : []}
          onImagesChange={(files) => setImage(files[0] || null)}
          maxFiles={1}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <CustomButton
          className="bg-primary-500 text-white dark:text-white font-semibold"
          variant="default"
          type="submit"
          isLoading={isLoading}
        >
          {existingCategory ? "Actualizar" : "Crear"}
        </CustomButton>
      </div>
    </form>
  );
}
