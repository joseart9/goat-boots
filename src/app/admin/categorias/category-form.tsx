"use client";

import { useState } from "react";
import { CustomInput } from "@/app/admin/components/input";
import { CustomButton } from "@/app/admin/components/button";
import { ImageUpload } from "@/app/admin/components/image-upload";
import { Loader2 } from "lucide-react";
import Category from "@/app/types/Category";

interface CategoryFormProps {
  category?: Category;
  onSubmit: (category: Omit<Category, "id">) => void;
  isLoading?: boolean;
}

export function CategoryForm({
  category,
  onSubmit,
  isLoading,
}: CategoryFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [hrefSuffix, setHrefSuffix] = useState(
    category?.href?.replace("/catalogo/", "") || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      href: `/catalogo/${hrefSuffix}`,
      alt: formData.get("alt") as string,
      img: image ? URL.createObjectURL(image) : category?.img || "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-foreground">
      <CustomInput name="name" label="Nombre" value={category?.name} required />
      <CustomInput
        name="description"
        label="Descripción"
        value={category?.description}
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
        value={category?.alt}
        required
      />
      <div className="space-y-2">
        <label className="text-sm font-medium text-black dark:text-white">
          Imagen
        </label>
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
          {category ? "Actualizar" : "Crear"}
        </CustomButton>
      </div>
    </form>
  );
}
