"use client";

import { useDisclosure } from "@heroui/react";
import { ProductDrawer } from "./components/ProductDrawer";
import useProducts from "@/app/hooks/useProducts";
import ProductsTable from "./components/ProductsTable";
import { useState } from "react";
import Product from "@/app/types/Product";
import { createProduct } from "@/server/actions/create-product";
import { createImage } from "@/server/actions/create-image";

export default function AdminProducts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, loading } = useProducts();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prodcutId, setProdcutId] = useState<string | undefined>(undefined);

  console.log(data, error, loading);

  const rows = data || [];

  const handleCreateProduct = async (data: any) => {
    setIsLoading(true);
    console.log(data);
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
    };

    const response = await createProduct(producto);

    if (!response) {
      console.log("Error al crear el producto");
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

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  console.log(prodcutId);
  return (
    <div className="min-h-screen px-4 w-full">
      <div className="flex w-full items-center justify-between bg-secondary-500 py-3 rounded-lg shadow-sm text-white gap-6">
        <div className="flex flex-row flex-auto overflow-x-scroll w-full gap-2">
          <button className="py-2 px-4 rounded-lg bg-primary-500 hover:bg-primary-400 flex flex-shrink-0">
            Todas las categorias
          </button>
        </div>
        <div className="flex flex-row w-fit gap-2">
          <button
            className="bg-green-500 py-2 px-4 rounded-lg hover:bg-green-400"
            onClick={onOpen}
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
        <ProductsTable rows={rows} setRowId={setProdcutId} />
      </div>
      <ProductDrawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCreateProduct}
        isLoading={isLoading}
        productId={prodcutId}
      />
    </div>
  );
}
