"use client";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard/productCard";
import { motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import useProducts from "@/app/hooks/useProducts";
import { usePathname } from "next/navigation";

export default function CatalogoCategoria() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: products } = useProducts(pathname);
  console.log(products);
  return (
    <section className="lg:pt-12 flex flex-col lg:flex-row min-h-screen flex-grow p-4 gap-4">
      <Sidebar />
      <button
        className="lg:hidden relative top-0 flex items-center gap-2 text-secondary-500/50 dark:text-white/50 py-4 text-base"
        onClick={() => router.back()}
      >
        <IoMdArrowRoundBack className="size-7" />
        Categorías
      </button>
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
      >
        <div className="grid grid-cols-1 gap-y-12 lg:gap-y-0 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
