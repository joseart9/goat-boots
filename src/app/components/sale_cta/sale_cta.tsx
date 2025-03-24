"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaShoppingBag,
  FaArrowRight,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

const features = [
  {
    icon: FaShieldAlt,
    text: "Máxima protección garantizada",
  },
  {
    icon: FaTruck,
    text: "Envíos a todo México y EE.UU.",
  },
  {
    icon: FaShoppingBag,
    text: "Ventas al mayoreo y menudeo",
  },
];

export default function SaleCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute bottom-14 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-2xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Glass card effect */}
            <div className="relative backdrop-blur-sm rounded-2xl p-8 md:p-12">
              {/* Content */}
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-secondary-500 to-secondary-500 dark:from-primary-500 dark:to-primary-300 bg-clip-text text-transparent">
                    ¿Listo para mejorar tu seguridad en el trabajo?
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-secondary-400 mb-8"
                >
                  Consulta nuestro catálogo de botas y calzado industrial y haz
                  tu pedido al mayoreo o menudeo.
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      className="flex items-center justify-center gap-3 text-secondary-300"
                    >
                      <feature.icon className="text-primary-500 size-8" />
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link
                    href="/catalogo"
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:scale-105"
                  >
                    Ver Catálogo
                    <motion.span
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <FaArrowRight className="size-5" />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
