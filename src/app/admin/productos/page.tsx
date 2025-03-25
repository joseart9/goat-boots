"use client";

import { useDisclosure } from "@heroui/react";
import { ProductDrawer } from "./components/ProductDrawer";
import useProducts from "@/app/hooks/useProducts";
import ProductsTable from "./components/ProductsTable";
import { useState } from "react";
import Product from "@/app/types/Product";
import { createProduct } from "@/server/actions/create-product";
import { createImage } from "@/server/actions/create-image";
import useProduct from "@/app/hooks/use-product";
import useImages from "@/app/hooks/use-images";
import { updateProduct } from "@/server/actions/update-product";

export default function AdminProducts() {
  // All hooks must be at the top level, before any conditional returns
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, loading } = useProducts();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const { data: selectedProduct } = useProduct(selectedProductId || "empty");
  const { images, isLoading: imagesLoading } = useImages(
    selectedProductId || "empty"
  );

  const rows = data || [];

  const handleCreateProduct = async (data: any) => {
    setIsLoading(true);
    const producto = {
      name: data.name,
      description: data.description,
      category_id: data.categoryId,
      corte: data.corte,
      suela: data.suela,
      plantilla: data.plantilla,
      forro: data.forro,
      corrida: data.corrida,
      construccion: data.construccion,
      casco: data.casco,
      color_id: data.colores,
    };

    const response = await createProduct(producto);

    if (!response) {
      return;
    }

    const productId = response[0].id;

    const images = data.images;

    const imagesToUpload = images.map((image: string) => {
      return {
        url: image,
        product_id: productId,
      };
    });

    imagesToUpload.forEach(async (image: any) => {
      await createImage(image);
    });

    // Close the drawer
    onClose();
    setIsLoading(false);
  };

  const handleUpdateProduct = async (data: any) => {
    setIsLoading(true);
    const flatColores = data.colores.join(",");
    const productToUpdate = {
      id: selectedProductId,
      name: data.name,
      description: data.description,
      category_id: data.categoryId,
      corte: data.corte,
      suela: data.suela,
      plantilla: data.plantilla,
      forro: data.forro,
      corrida: data.corrida,
      construccion: data.construccion,
      casco: data.casco,
      color_id: data.colores,
    };
    const response = await updateProduct(productToUpdate);
    if (!response) {
      ("Error al actualizar el producto");
      return;
    }

    // Update images
    const images = data.images;
    const imagesToUpload = images.map((image: string) => {
      return {
        url: image,
        product_id: selectedProductId,
      };
    });

    imagesToUpload.forEach(async (image: any) => {
      await createImage(image);
    });

    onClose();
    setIsLoading(false);
  };

  const handleEditProduct = (productId: string) => {
    setSelectedProductId(productId);
    onOpen();
  };

  const handleCloseDrawer = () => {
    setSelectedProductId("");
    onClose();
  };

  // Conditional return after all hooks
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 w-full">
      <div className="flex w-full items-center justify-between bg-transparent dark:bg-secondary-500 py-3 rounded-lg shadow-sm text-white gap-6">
        <div className="flex flex-row flex-auto overflow-x-scroll w-full gap-2"></div>
        <div className="flex flex-row w-fit gap-2">
          <button
            className="bg-green-500 py-2 px-4 rounded-lg hover:bg-green-400"
            onClick={() => {
              setSelectedProductId("");
              onOpen();
            }}
          >
            Agregar
          </button>
          <input
            placeholder="Buscar por nombre"
            className="text-secondary-500 rounded-md focus:border focus:border-secondary-500"
          />
        </div>
      </div>
      <div>
        <ProductsTable rows={rows} handleEditRow={handleEditProduct} />
      </div>
      <ProductDrawer
        isOpen={isOpen}
        onClose={handleCloseDrawer}
        onSubmit={selectedProductId ? handleUpdateProduct : handleCreateProduct}
        isLoading={isLoading || imagesLoading}
        initialData={selectedProduct || undefined}
        imagesFromDb={images || []}
      />
    </div>
  );
}
