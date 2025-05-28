"use client";

import { useCart } from "@/app/providers/CartProvider";
import { CustomButton } from "@/app/admin/components/button";
import { CustomInput } from "@/app/admin/components/input";
import Product from "../types/Product";
import useImages from "@/app/hooks/use-images";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { Pedido } from "@/app/types/Pedido";
import { createPedido } from "@/server/services/pedidos";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: Product }) => {
  const { images } = useImages(product.id);
  const { removeFromCart } = useCart();
  return (
    <div className="flex flex-row gap-4 p-0 lg:p-4 items-center">
      <img
        src={images[0]?.url}
        alt={product.name}
        className="w-fit h-12 object-cover lg:h-24 lg:object-contain aspect-square"
      />
      <div className="flex flex-row w-full justify-between items-center gap-2 lg:gap-0">
        <div className="flex flex-col w-full gap-2">
          <h2 className="text-base lg:text-2xl font-bold text-gray-900 dark:text-white">
            {product.name}
          </h2>
          <h3 className="text-xs lg:text-base font-bold text-gray-900 dark:text-secondary-400">
            {product.description}
          </h3>
        </div>
        <Trash
          className="size-5 lg:size-6 text-red-500 cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-300"
          onClick={() => removeFromCart(product.id)}
        />
      </div>
    </div>
  );
};

export default function Carrito() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  // Form state
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create pedido object
      const pedido: Pedido = {
        active: true,
        customer_name: form.name,
        customer_lastname: form.lastName,
        customer_phone: form.phone,
        customer_email: form.email,
        created_at: new Date().toISOString(),
      };

      // Create the pedido with its products
      await createPedido(pedido, cart);

      // Clear the cart after successful submission
      clearCart();

      // Show success message
      toast.success(
        "¡Pedido creado con éxito! Nos pondremos en contacto contigo pronto."
      );

      router.push("/");

      // Reset form
      setForm({
        name: "",
        lastName: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error creating pedido:", error);
      toast.error(
        "Hubo un error al procesar tu pedido. Por favor, intenta nuevamente."
      );
    }
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-8">
        <div className="bg-white dark:bg-secondary-500 rounded-xl shadow-lg p-10 flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Agrega productos para realizar un pedido al por mayor.
          </p>
          <CustomButton
            onClick={() => router.push("/catalogo")}
            className="bg-primary-500 text-white px-8 hover:scale-105 transition-transform"
          >
            Ver productos
          </CustomButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-transparent flex flex-col lg:flex-row items-stretch">
      {/* Left: Contact Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center p-4 pt-24 lg:pt-12">
        <div className="bg-white dark:bg-secondary-400/5 rounded-xl shadow-lg p-8 w-full">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Información de Contacto
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                label="Nombre"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Nombre"
              />
              <CustomInput
                label="Apellido"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                placeholder="Apellido"
              />
            </div>
            <CustomInput
              label="Correo Electrónico"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Correo Electrónico"
            />
            <CustomInput
              label="Teléfono"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Teléfono"
            />
            <div className="flex justify-end">
              <CustomButton
                type="submit"
                className="bg-primary-500 text-white px-8 hover:scale-105 transition-transform"
              >
                Realizar Pedido
              </CustomButton>
            </div>
          </form>
        </div>
      </div>

      {/* Right: Cart Summary */}
      <div className="w-full lg:w-1/2 bg-gray-100 dark:bg-secondary-400/5 flex flex-col p-4 pt-12">
        <div className="bg-white dark:bg-secondary-500 rounded-xl shadow-lg p-8 w-full h-fit">
          <div className="flex flex-col gap-4">
            {cart.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
