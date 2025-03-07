"use client";

import Product from "@/app/types/Product";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionItem } from "@heroui/react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

interface ProductShowcaseProps {
    product: Product;
}

const ProductShowcase = ({ product }: ProductShowcaseProps) => {
    const [selectedImage, setSelectedImage] = useState(0);

    const imageVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const itemClasses = {
        base: "w-full bg-white dark:bg-secondary-500",
        title: "font-normal text-medium text-secondary-500 dark:text-white",
        trigger: "px-2 py-0 rounded-lg h-14 flex items-center",
        indicator: "text-medium text-secondary-500 dark:text-white",
        content: "text-small text-secondary-400 leading-loose",
    };

    const handleThumbnailClick = (index: number) => {
        setSelectedImage(index);
    };

    return (
        <section className="lg:container lg:mx-auto flex flex-col min-h-dvh gap-y-4 p-4 lg:p-2">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-3xl lg:text-5xl font-bold">{product.name}</h2>
                <Link href="google.com">
                    <FaWhatsapp className="size-10 text-primary-500 lg:hover:scale-110 transition-transform duration-300" />
                </Link>
            </div>

            <div className="flex flex-col lg:grid grid-cols-12">
                <div className="flex flex-col lg:flex-row lg:h-[800px] col-span-7 gap-1">
                    {/* Menú de selección de imágenes (thumbnails) */}
                    <div className="hidden lg:flex flex-col overflow-y-auto gap-1 h-full">
                        {product.images &&
                            product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={product.name}
                                    className="object-contain w-24 h-24 cursor-pointer lg:hover:opacity-50 lg:hover:scale-110 transition-transform duration-300 aspect-square p-1"
                                    onClick={() => handleThumbnailClick(index)}
                                />
                            ))}
                    </div>
                    {/* Contenedor de la imagen grande */}
                    <div className=" flex overflow-hidden aspect-square ">
                        {product.images && (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={product.images[selectedImage].url}
                                    variants={imageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.15 }}
                                    className="w-full h-full aspect-square"
                                >
                                    <img
                                        src={product.images[selectedImage].url}
                                        alt={product.name}
                                        className="object-contain w-full h-full aspect-square"
                                        onLoadStart={() => console.log("loading")}
                                        onLoad={() => console.log("loaded")}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                    {/* Menú de selección de imágenes (thumbnails) */}
                    <div className="flex flex-row lg:hidden overflow-y-auto gap-1 h-full">
                        {product.images &&
                            product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={product.name}
                                    className="object-cover w-24 h-24 cursor-pointer lg:hover:opacity-50 lg:hover:scale-110 transition-transform duration-300 p-2"
                                    onClick={() => handleThumbnailClick(index)}
                                />
                            ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-4 col-span-5">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl lg:text-2xl font-bold">Colores</h3>
                        <div className="flex gap-2">
                            {product.colores &&
                                product.colores.map((color, index) => (
                                    <div
                                        key={index}
                                        className="w-8 h-8 rounded-full bg-primary-500"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                ))}
                        </div>
                    </div>

                    <p className="text-sm lg:text-base text-secondary-400">
                        {product.description}
                    </p>
                    <div className="-p-2 -mx-2">
                        <Accordion variant="splitted" itemClasses={itemClasses}>
                            <AccordionItem key="Corte" aria-label="Corte" title="Corte">
                                {product.corte}
                            </AccordionItem>
                            <AccordionItem key="Suela" aria-label="Suela" title="Suela">
                                {product.suela}
                            </AccordionItem>
                            <AccordionItem key="Plantilla" aria-label="Plantilla" title="Plantilla">
                                {product.plantilla}
                            </AccordionItem>
                            <AccordionItem key="Forro" aria-label="Forro" title="Forro">
                                {product.forro}
                            </AccordionItem>
                            <AccordionItem key="Corrida" aria-label="Corrida" title="Corrida">
                                {product.corrida}
                            </AccordionItem>
                            <AccordionItem key="Construcción" aria-label="Construcción" title="Construcción">
                                {product.construccion}
                            </AccordionItem>
                            <AccordionItem key="Casco" aria-label="Casco" title="Casco">
                                {product.casco}
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 h-full">
                <img src="/qualityImg.png" alt="Calidad" className="lg:w-2/3 w-full object-contain" />
                <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto h-full space-between">
                    <img src="/nom.png" alt="NOM" className="h-28 w-auto object-contain" />
                    <img src="/osha.png" alt="OSHA" className="h-28 w-auto object-contain" />
                    <img src="/astm.png" alt="ASTM" className="h-28 w-auto object-contain" />
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
