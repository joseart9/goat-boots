"use client";
import Categoria from "@/app/types/Categoria";
import { useRouter } from "next/navigation";

interface CategoriaCardProps {
    categoria: Categoria;
}

const CategoriaCard = ({
    categoria
}: CategoriaCardProps) => {
    const router = useRouter();

    const handleCategoriaClick = () => {
        router.push(categoria.href);
    }
    return (
        <div
            className="relative aspect-square rounded-md cursor-pointer lg:hover:scale-110 transition-all duration-300"
            onClick={handleCategoriaClick}>
            <img
                src={categoria.img}
                alt={categoria.alt}
                className="object-scale-down w-full h-full rounded-md opacity-85 dark:opacity-100"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 dark:bg-secondary-500 dark:bg-opacity-65">
                <h3 className="text-2xl lg:text-3xl font-bold">{categoria.name}</h3>
            </div>
        </div>
    )
}

export default CategoriaCard;