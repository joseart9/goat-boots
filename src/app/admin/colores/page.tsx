"use client";

import { useState } from "react";
import { useColors } from "@/app/hooks/use-colors";
import { ColorTable } from "./ColorTable";
import { CustomButton } from "@/app/admin/components/button";
import { Plus } from "lucide-react";
import { CustomDrawer } from "@/app/admin/components/drawer";
import { ColorForm } from "./color-form";
import { ConfirmDialog } from "@/app/admin/components/confirm-dialog";
import { toast } from "sonner";
import Colors from "@/app/types/Colors";
import { createColor, deleteColor, updateColor } from "@/server/actions/color";

export default function ColoresPage() {
  const { colors, loading, error, mutate } = useColors();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [colorToDelete, setColorToDelete] = useState<Colors | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [colorToEdit, setColorToEdit] = useState<Colors | null>(null);

  console.log(colors);

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

  const handleSubmit = async (colorData: Omit<Colors, "id">) => {
    setIsSubmitting(true);
    try {
      if (colorToEdit) {
        // Update existing color
        await updateColor(colorToEdit.id as string, colorData);
        toast.success("Color actualizado exitosamente");
      } else {
        // Create new color
        await createColor(colorData);
        toast.success("Color creado exitosamente");
      }

      setIsDrawerOpen(false);
      setColorToEdit(null);
      mutate();
    } catch (error) {
      console.error("Error saving color:", error);
      toast.error(
        colorToEdit ? "Error al actualizar el color" : "Error al crear el color"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (color: Colors) => {
    setColorToEdit(color);
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = (color: Colors) => {
    setColorToDelete(color);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!colorToDelete) return;

    setIsDeleting(true);
    try {
      await deleteColor(colorToDelete.id as string);
      toast.success("Color eliminado exitosamente");
      mutate();
    } catch (error) {
      console.error("Error deleting color:", error);
      toast.error("Error al eliminar el color");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setColorToDelete(null);
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setColorToEdit(null);
  };

  return (
    <div className="flex min-h-screen bg-secondary-100/25 dark:bg-secondary-500/25">
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Colores</h1>
          <CustomButton
            leftIcon={<Plus />}
            onClick={() => setIsDrawerOpen(true)}
            variant="secondary"
          >
            Agregar Color
          </CustomButton>
        </div>
        <ColorTable
          data={colors || []}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        <CustomDrawer
          open={isDrawerOpen}
          onOpenChange={handleDrawerClose}
          title={colorToEdit ? "Editar Color" : "Agregar Color"}
          description={
            colorToEdit
              ? "Editar color existente"
              : "Agregar nuevo color al catálogo"
          }
          size="2xl"
        >
          <ColorForm
            colorId={colorToEdit?.id}
            colorToEdit={colorToEdit || undefined}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        </CustomDrawer>

        <ConfirmDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Eliminar Color"
          description={`¿Está seguro que desea eliminar el color "${colorToDelete?.name}"?`}
          confirmText="Eliminar"
          isLoading={isDeleting}
        />
      </main>
    </div>
  );
}
