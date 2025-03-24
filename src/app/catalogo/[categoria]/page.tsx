"use client";

import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard/productCard";
import { motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";
import useProducts from "@/app/hooks/useProducts";

const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-square bg-white/5 rounded-xl mb-4" />
    <div className="h-6 bg-white/5 rounded-lg w-3/4 mb-2" />
    <div className="h-4 bg-white/5 rounded-lg w-1/2" />
  </div>
);

export default function CatalogoCategoria() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: products, loading } = useProducts(pathname);
  const categoryName = pathname.split("/").pop()?.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent to-black/5">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Mobile Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:hidden flex items-center gap-2 text-secondary-400 hover:text-primary-500 transition-colors duration-300 mb-6"
          onClick={() => router.back()}
        >
          <IoMdArrowRoundBack className="size-6" />
          <span>Volver a Categorías</span>
        </motion.button>

        {/* Category Title - Mobile Only */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:hidden text-2xl font-bold mb-8 capitalize"
        >
          <span className="bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent">
            {categoryName}
          </span>
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar />

          {/* Products Section */}
          <div className="flex-grow">
            {/* Category Title - Desktop */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block text-3xl font-bold mb-8 capitalize"
            >
              <span className="dark:text-primary-500 text-secondary-500 bg-clip-text">
                {categoryName}
              </span>
            </motion.h1>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {loading ? (
                // Skeleton loading state
                [...Array(6)].map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ProductSkeleton />
                  </motion.div>
                ))
              ) : products && products.length > 0 ? (
                // Products list
                products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    layoutId={`product-${product.id}`}
                    className="transform transition-all duration-300 hover:scale-[1.02]"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                // Empty state
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="col-span-full text-center py-12"
                >
                  <p className="text-secondary-400 text-lg">
                    No hay productos disponibles en esta categoría.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
