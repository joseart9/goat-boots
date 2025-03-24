"use client";

import React, { useState } from "react";
import Product from "@/app/types/Product";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import useImages from "@/app/hooks/use-images";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isHovering, setIsHovering] = useState(false);
  const { images } = useImages(product.id!);

  const handleCardPress = () => {
    if (pathname) {
      router.push(`${pathname}/${product.id}`);
    }
  };

  console.log(images);

  return (
    <motion.div
      className="p-4 flex flex-col max-w-sm aspect-[1/1.2] lg:aspect-[1/1.4] rounded-md cursor-pointer lg:hover:bg-primary-200/50 dark:lg:hover:bg-secondary-700/50 transition-all duration-300"
      onClick={handleCardPress}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <div className="aspect-square w-full rounded-md xl:aspect-7/8">
        <AnimatePresence mode="wait">
          {images && !isHovering && (
            <motion.div
              key="image0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <img
                src={images?.[0]?.url}
                alt={images?.[0]?.alt}
                className="object-contain h-full w-full aspect-square"
              />
            </motion.div>
          )}

          {images && isHovering && (
            <motion.div
              key="image1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <img
                src={images?.[1]?.url || images?.[0]?.url}
                alt={images?.[1]?.alt || images?.[0]?.alt}
                className="object-contain h-full w-full aspect-square"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">{product.name}</h3>
        <p className={`text-sm leading-loose text-secondary-400 line-clamp-4 `}>
          {product.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
