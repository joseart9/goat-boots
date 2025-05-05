"use client";

import useCategorias from "@/app/hooks/useCategorias";
import CategoriaCard from "./components/CategoriaCard";
import { motion } from "framer-motion";
import { FaShoppingBag } from "react-icons/fa";

export default function Catalogo() {
  const { data: categorias } = useCategorias();

  console.log(categorias);

  return (
    <motion.section
      className="min-h-screen flex-grow py-16 px-4 w-full container mx-auto relative mt-20 md:mt-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-2xl" />
      </motion.div>

      {/* Header */}
      <div className="text-center relative mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaShoppingBag className="text-primary-500 size-16" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent">
            ¡Conoce nuestros productos!
          </span>
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-secondary-400 max-w-3xl mx-auto"
        >
          Selecciona alguna categoría para ver más sobre nuestras increíbles
          opciones que tenemos para ti.
        </motion.h3>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent mt-8 max-w-xl mx-auto"
        />
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 gap-y-24 lg:gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {categorias?.map((categoria, index) => (
            <motion.div
              key={categoria.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-700/5 rounded-2xl" />
              <CategoriaCard categoria={categoria} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
