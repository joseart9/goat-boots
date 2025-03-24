"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaQuestionCircle, FaChevronDown } from "react-icons/fa";

const faqItems = [
  {
    question: "¿Qué normativas de seguridad cumplen las botas industriales?",
    answer:
      "Nuestras botas industriales están certificadas y cumplen con normativas internacionales como NOM, OSHA y ASTM, garantizando la máxima protección en entornos de trabajo exigentes.",
  },
  {
    question: "¿Qué materiales se utilizan en la fabricación de sus botas?",
    answer:
      "Utilizamos materiales de alta calidad, incluyendo cuero resistente, suelas antideslizantes y compuestos técnicos, para asegurar durabilidad, confort y seguridad en cada par de botas.",
  },
  {
    question: "¿Ofrecen garantía en sus productos?",
    answer:
      "Sí, todas nuestras botas industriales cuentan con una garantía de 12 meses contra defectos de fabricación, respaldando nuestro compromiso con la calidad y la satisfacción del cliente.",
  },
  {
    question: "¿Es posible personalizar las botas para pedidos empresariales?",
    answer:
      "Por supuesto. Ofrecemos opciones de personalización y pedidos al por mayor para adaptarnos a las necesidades específicas de empresas y sectores industriales, garantizando un ajuste perfecto y cumplimiento de requerimientos técnicos.",
  },
  {
    question:
      "¿Cómo debo realizar el mantenimiento y limpieza de mis botas industriales?",
    answer:
      "Recomendamos limpiar las botas con un paño húmedo y utilizar productos específicos para cuero o el material de cada modelo. Así conservarás su aspecto y funcionalidad durante más tiempo.",
  },
];

const FaqItem = ({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: (typeof faqItems)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-primary-500/30">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-6 text-left"
        >
          <span className="text-lg font-semibold text-secondary-500 dark:text-secondary-200">
            {item.question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-primary-500 flex-shrink-0 ml-4"
          >
            <FaChevronDown className="size-5" />
          </motion.span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-6"
            >
              <p className="text-secondary-400">{item.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function FaqComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-2xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-4">
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
                <FaQuestionCircle className="text-primary-500 size-16" />
              </motion.div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent">
                Preguntas Frecuentes
              </span>
            </h2>
            <p className="text-xl text-secondary-400 max-w-3xl mx-auto">
              Resolvemos las dudas más comunes sobre nuestros productos y el
              servicio que ofrecemos en GOAT Boots.
            </p>
            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent mt-8 max-w-xl mx-auto"
            />
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <FaqItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
