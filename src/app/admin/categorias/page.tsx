"use client";

import { useState } from "react";
import useCategories from "@/app/hooks/useCategorias";
import { CategoryTable } from "./CategoryTable";
import { CustomButton } from "@/app/admin/components/button";
import { Plus } from "lucide-react";
import { CustomDrawer } from "@/app/admin/components/drawer";
import { CategoryForm } from "./category-form";
import { ConfirmDialog } from "@/app/admin/components/confirm-dialog";
import { toast } from "sonner";
import Category from "@/app/types/Category";
import { createCategory, deleteCategory } from "@/server/actions/category";
import { uploadImage } from "@/app/actions/upload-image";
import { ProgressModal } from "@/app/admin/components/progress-modal";

export default function CategoriasPage() {
  const { data, loading, error, mutate } = useCategories();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium text-muted-foreground">
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen">Error: {error.message}</div>;
  }

  const handleSubmit = async (categoryData: Omit<Category, "id">) => {
    setIsSubmitting(true);
    setUploadProgress(0);
    try {
      // First upload the image if it exists and is a File object
      let imgUrl = "";
      if (
        categoryData.img &&
        typeof categoryData.img === "object" &&
        "arrayBuffer" in categoryData.img
      ) {
        setUploadProgress(20);
        const uploadResult = await uploadImage(categoryData.img as File);
        imgUrl = uploadResult.data.url;
        setUploadProgress(50);
      }

      // Then create the category
      await createCategory({
        ...categoryData,
        img: imgUrl || categoryData.img,
      });

      setUploadProgress(100);
      toast.success("Categoría creada exitosamente");
      setIsDrawerOpen(false);
      mutate();
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Error al crear la categoría");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    setIsDeleting(true);
    try {
      await deleteCategory(categoryToDelete.id as number);
      toast.success("Categoría eliminada exitosamente");
      mutate();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error al eliminar la categoría");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Categorías</h1>
          <CustomButton
            leftIcon={<Plus />}
            onClick={() => setIsDrawerOpen(true)}
            variant="secondary"
          >
            Agregar Categoría
          </CustomButton>
        </div>
        <CategoryTable
          data={data || []}
          onEdit={() => {}}
          onDelete={handleDeleteClick}
        />

        <CustomDrawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          title="Agregar Categoría"
          description="Agregar nueva categoría al catálogo"
          size="2xl"
        >
          <CategoryForm onSubmit={handleSubmit} isLoading={isSubmitting} />
        </CustomDrawer>

        <ProgressModal
          isOpen={isSubmitting}
          progress={uploadProgress}
          title="Creando Categoría"
          description="Por favor espere mientras se crea la categoría..."
        />

        <ConfirmDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Eliminar Categoría"
          description={`¿Está seguro que desea eliminar la categoría "${categoryToDelete?.name}"?`}
          confirmText="Eliminar"
          isLoading={isDeleting}
          importantText="Esta acción eliminará la categoría y todos los productos asociados a esta categoría."
        />
      </main>
    </div>
  );
}
