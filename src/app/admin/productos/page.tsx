"use client";

import { useState } from "react";
import useProducts from "@/app/hooks/useProducts";
import { ProductsTable } from "./ProductsTable/products-table";
import Product from "@/app/types/Product";
import { CustomButton } from "@/app/admin/components/button";
import { CustomDrawer } from "@/app/admin/components/drawer";
import { ProductForm } from "./product-form";
import { Plus } from "lucide-react";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/server/actions/product";
import { uploadImage } from "@/app/actions/upload-image";
import { createImage } from "@/server/actions/create-image";
import { updateProductColors } from "@/server/services/products";
import { toast } from "sonner";
import CustomImage from "@/app/types/CustomImage";
import { ProgressModal } from "@/app/admin/components/progress-modal";
import { ConfirmDialog } from "@/app/admin/components/confirm-dialog";

export default function AdminProductos() {
  const { data, loading, error, mutate } = useProducts();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
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

  // Transform the data to match our Product interface
  const transformedData: Product[] = (data || []).map((item) => ({
    id: item.id || "",
    category: item.category || "",
    name: item.name || "",
    description: item.description || "",
  }));

  const handleSubmit = async (productData: Omit<Product, "id">) => {
    setIsSubmitting(true);
    setUploadProgress(0);
    try {
      // First create the product
      const product = await createProduct({
        name: productData.name,
        description: productData.description,
        corte: productData.corte || "",
        suela: productData.suela || "",
        plantilla: productData.plantilla || "",
        forro: productData.forro || "",
        corrida: productData.corrida || "",
        construccion: productData.construccion || "",
        casco: productData.casco || "",
        category_id: productData.category,
      });

      setUploadProgress(20); // 20% after product creation
      const productId = product?.id;

      // Then upload images if there are any
      if (productData.images && productData.images.length > 0) {
        const totalImages = productData.images.length;
        let completedImages = 0;

        const uploadPromises = productData.images.map(async (file) => {
          // Upload image to storage
          const uploadResult = await uploadImage(file);

          // Create image record in database
          const imageData: CustomImage = {
            url: uploadResult.data.url,
            alt: productData.name,
            product_id: productId,
          };

          await createImage(imageData);

          // Update progress
          completedImages++;
          const imageProgress = (completedImages / totalImages) * 60; // 60% of total progress
          setUploadProgress(20 + imageProgress); // 20% + image progress
        });

        await Promise.all(uploadPromises);
      }

      setUploadProgress(80); // 80% after images

      // Finally, register product colors
      if (productData.colors && productData.colors.length > 0) {
        await updateProductColors(productId, productData.colors);
      }

      setUploadProgress(100); // 100% after colors
      toast.success("Producto creado exitosamente");
      setIsDrawerOpen(false);
      mutate(); // Refresh the products list
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Error al crear el producto");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id);
      toast.success("Producto eliminado exitosamente");
      mutate(); // Refresh the products list
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error al eliminar el producto");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-secondary-100/25 dark:bg-secondary-500/25">
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Productos</h1>
          <CustomButton
            leftIcon={<Plus />}
            onClick={() => setIsDrawerOpen(true)}
            variant="secondary"
          >
            Agregar Producto
          </CustomButton>
        </div>
        <ProductsTable
          data={transformedData}
          onEdit={(product) => {
            console.log("Edit product:", product);
          }}
          onDelete={handleDeleteClick}
        />

        <CustomDrawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          title="Agregar Producto"
          description="Agregar nuevo producto al catalogo"
          size="2xl"
        >
          <ProductForm onSubmit={handleSubmit} isLoading={isSubmitting} />
        </CustomDrawer>

        <ProgressModal
          isOpen={isSubmitting}
          progress={uploadProgress}
          title="Creando Producto"
          description="Por favor espere mientras se crea el producto..."
        />

        <ConfirmDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Eliminar Producto"
          description={`¿Está seguro que desea eliminar el producto "${productToDelete?.name}"? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          isLoading={isDeleting}
        />
      </main>
    </div>
  );
}
