"use client";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard/productCard";
import { motion } from "framer-motion";

//Mock Data
import { products } from "@/app/MockData/products";

export default function CatalogoCategoria() {
    return (
        <section className="pt-12 flex flex-row min-h-screen flex-grow p-2 gap-4">
            <Sidebar />
            <motion.div className="container mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 gap-y-12 lg:gap-y-0 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </motion.div>

        </section>
    )
}