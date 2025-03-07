"use client";

import { categorias } from "@/app/MockData/categorias";
import CategoriaCard from "./components/CategoriaCard";
import { motion } from "framer-motion";

export default function Catalogo() {
    return (
        <motion.section className="lg:pt-14 min-h-screen flex-grow p-4 gap-4 w-full container mx-auto flex flex-col "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}>
            <h2 className="text-2xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading text-center">
                ¡Conoce nuestros productos!
            </h2>


            <h3 className="text-sm lg:text-2xl text-center w-full max-w-6xl text-secondary-400 mt-2">
                Selecciona alguna categoría para ver más sobre nuestras increíbles opciones que tenemos para ti.
            </h3>

            <div className="container mx-auto pt-4 lg:pt-8">
                <div className="grid grid-cols-1 gap-y-24 lg:gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
                    {categorias.map((categoria, index) => (
                        <motion.div
                            key={categoria.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                        >
                            <CategoriaCard categoria={categoria} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}