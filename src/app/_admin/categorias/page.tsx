"use client";
import useCategorias from "@/app/hooks/useCategorias";
import { CategoryTable } from "./CategoriesTable/category-table";
import { Button } from "@heroui/react";
import { CreateCategoryDrawer } from "./CreateCategoryDrawer/category-drawer";
import { useState } from "react";
import Categoria from "@/app/types/Categoria";
import { createCategory } from "@/server/actions/category";

export default function CategoriasPage() {
  const { data, loading, error } = useCategorias();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rowId, setRowId] = useState("");

  if (error) {
    return <div>Error loading categories: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleCreateCategory = async (
    categoryData: Omit<Categoria, "id" | "created_at">
  ) => {
    try {
      // TODO: Implement category creation
      const category: Categoria = {
        name: categoryData.name,
        img: categoryData.img,
        href: "/catalogo/" + categoryData.href,
        alt: categoryData.alt,
        description: categoryData.description,
      };
      await createCategory(category);
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <Button
          color="success"
          onPress={() => setIsDrawerOpen(true)}
          className="text-white"
          disableRipple
        >
          Nueva Categoría
        </Button>
      </div>
      <CategoryTable data={data} handleEditRow={setRowId} />
      <CreateCategoryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleCreateCategory}
      />
    </div>
  );
}
