"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionItem } from "@heroui/react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import useProduct from "@/app/hooks/use-product";
import useImages from "@/app/hooks/use-images";
import { useColors } from "@/app/hooks/use-colors";
import { CustomButton } from "@/app/admin/components/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/providers/CartProvider";

interface ProductShowcaseProps {
  productId: string;
  category: string;
}

const ProductShowcase = ({ productId, category }: ProductShowcaseProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const { data: product, isLoading, error } = useProduct(productId);
  const {
    images,
    isLoading: isLoadingImages,
    error: errorImages,
  } = useImages(productId);
  const { colors, loading: isLoadingColors, error: errorColors } = useColors();

  const productColors =
    colors?.filter((color) =>
      product?.colors?.includes(color.id?.toString() || "")
    ) || [];

  if (isLoading || isLoadingImages || isLoadingColors) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || errorImages || errorColors) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">
          Error:{" "}
          {error?.message || errorImages?.message || errorColors?.message}
        </div>
      </div>
    );
  }

  if (!product || !images) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const imageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const itemClasses = {
    base: "w-full bg-white/10 dark:bg-secondary-500/10 backdrop-blur-sm rounded-lg",
    title: "font-medium text-lg text-secondary-500 dark:text-white",
    trigger:
      "px-4 py-3 rounded-lg h-14 flex items-center hover:bg-white/5 transition-colors",
    indicator: "text-medium text-secondary-500 dark:text-white",
    content: "text-small text-secondary-400 leading-loose px-4 pb-4",
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="lg:container lg:mx-auto flex flex-col min-h-dvh gap-y-8 p-4 lg:p-8 overflow-hidden"
    >
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="lg:hidden relative top-0 flex items-center gap-2 text-secondary-500/50 dark:text-white/50 py-4 text-base capitalize hover:text-secondary-500 dark:hover:text-white transition-colors"
        onClick={() => router.back()}
      >
        <IoMdArrowRoundBack className="size-7" />
        {category}
      </motion.button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-row justify-between items-center"
      >
        <h2 className="text-4xl lg:text-6xl font-bold  text-secondary-500 dark:text-primary-500">
          {product.name}
        </h2>
        <Link
          href="https://wa.me/1234567890"
          target="_blank"
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 10 : 0,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaWhatsapp className="size-12 text-primary-500" />
          </motion.div>
        </Link>
      </motion.div>

      <div className="flex flex-col lg:grid grid-cols-12 gap-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col lg:flex-row lg:h-[800px] col-span-7 gap-4"
        >
          <div className="hidden lg:flex flex-col overflow-y-auto gap-2 h-full custom-scrollbar p-1">
            {images.map((image, index) => (
              <motion.img
                key={index}
                src={image.url}
                alt={product.name}
                className={`object-cover w-24 h-24 cursor-pointer rounded-lg transition-all duration-300 p-1 ${
                  selectedImage === index
                    ? "ring-2 ring-primary-500 scale-105"
                    : "hover:opacity-80 hover:scale-105"
                }`}
                onClick={() => handleThumbnailClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>

          <div className="relative flex overflow-hidden aspect-square rounded-2xl dark:bg-white/5 backdrop-blur-sm bg-secondary-500/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={images[selectedImage].url}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <img
                  src={images[selectedImage].url}
                  alt={product.name}
                  className="object-contain w-full h-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex lg:hidden overflow-x-auto gap-2 custom-scrollbar">
            {images.map((image, index) => (
              <motion.img
                key={index}
                src={image.url}
                alt={product.name}
                className={`object-cover w-24 h-24 cursor-pointer rounded-lg transition-all duration-300 ${
                  selectedImage === index
                    ? "ring-2 ring-primary-500 scale-105"
                    : "hover:opacity-80 hover:scale-105"
                }`}
                onClick={() => handleThumbnailClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-6 p-6 col-span-5 dark:bg-white/5 backdrop-blur-sm rounded-2xl bg-secondary-500/5"
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-secondary-500 dark:text-primary-500">
              Colores Disponibles
            </h3>
            <div className="flex flex-wrap gap-4">
              {productColors.map((color) => (
                <motion.div
                  key={color.id}
                  className="flex flex-col items-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {color.multicolor ? (
                    <div
                      className="w-12 h-12 rounded-full ring-2 ring-white/20 group-hover:ring-primary-500 transition-all duration-300"
                      style={{
                        background: `linear-gradient(45deg, ${
                          JSON.parse(color.hex as string)[0]
                        } 50%, ${JSON.parse(color.hex as string)[1]} 50%)`,
                      }}
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full ring-2 ring-white/20 group-hover:ring-primary-500 transition-all duration-300"
                      style={{ backgroundColor: color.hex as string }}
                    />
                  )}
                  <span className="text-sm text-secondary-400 group-hover:text-white transition-colors">
                    {color.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base lg:text-lg text-secondary-400 leading-relaxed"
          >
            {product.description}
          </motion.p>

          <CustomButton
            className="bg-primary-500 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="size-4 mr-2" />
            Agregar al carrito
          </CustomButton>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-2"
          >
            <Accordion variant="splitted" itemClasses={itemClasses}>
              <AccordionItem key="Corte" aria-label="Corte" title="Corte">
                {product.corte}
              </AccordionItem>
              <AccordionItem key="Suela" aria-label="Suela" title="Suela">
                {product.suela}
              </AccordionItem>
              <AccordionItem
                key="Plantilla"
                aria-label="Plantilla"
                title="Plantilla"
              >
                {product.plantilla}
              </AccordionItem>
              <AccordionItem key="Forro" aria-label="Forro" title="Forro">
                {product.forro}
              </AccordionItem>
              <AccordionItem key="Corrida" aria-label="Corrida" title="Corrida">
                {product.corrida}
              </AccordionItem>
              <AccordionItem
                key="Construcción"
                aria-label="Construcción"
                title="Construcción"
              >
                {product.construccion}
              </AccordionItem>
              <AccordionItem key="Casco" aria-label="Casco" title="Casco">
                {product.casco}
              </AccordionItem>
            </Accordion>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col lg:flex-row gap-8 items-center justify-center py-8"
      >
        <motion.img
          whileHover={{ scale: 1.02 }}
          src="/qualityImg.png"
          alt="Calidad"
          className="lg:w-2/3 w-full object-contain"
        />
        <div className="flex flex-row lg:flex-col gap-6 w-full lg:w-fit overflow-x-auto lg:overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/nom.png"
            alt="NOM"
            className="h-28 w-auto object-contain"
          />
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/osha.png"
            alt="OSHA"
            className="h-28 w-auto object-contain"
          />
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/astm.png"
            alt="ASTM"
            className="h-28 w-auto object-contain"
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ProductShowcase;
