"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useCategories from "@/app/hooks/useCategorias";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";

const SkeletonButton = () => (
  <div className="animate-pulse">
    <div className="h-12 bg-white/5 rounded-lg" />
  </div>
);

export default function Sidebar() {
  const pathname = usePathname();
  const { data: categorias } = useCategories();

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:block sticky top-32 h-fit bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden min-w-[370px] max-w-[370px]"
    >
      <div className="p-2">
        <ul className="flex flex-col gap-2">
          {!categorias ? (
            // Skeleton loading state
            <>
              {[...Array(6)].map((_, index) => (
                <motion.li
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <SkeletonButton />
                </motion.li>
              ))}
            </>
          ) : (
            // Actual categories
            categorias.map((category, index) => {
              const isActive = pathname === category.href;
              return (
                <motion.li
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  layout
                  layoutId={`category-${category.id}`}
                >
                  <Link href={category.href} className="block">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className={`group flex items-center justify-between gap-2 p-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-primary-500 text-white"
                          : "hover:bg-primary-500/10"
                      }`}
                    >
                      <span
                        className={`text-base font-medium ${
                          isActive ? "text-white" : "text-secondary-300"
                        }`}
                      >
                        {category.name}
                      </span>
                      <FaChevronRight
                        className={`size-4 transition-transform duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-primary-500 group-hover:translate-x-1"
                        }`}
                      />
                    </motion.div>
                  </Link>
                </motion.li>
              );
            })
          )}
        </ul>
      </div>
    </motion.aside>
  );
}
