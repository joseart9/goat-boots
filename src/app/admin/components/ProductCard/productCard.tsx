import Product from "@/app/types/Product";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div>
            ProductCard
        </div>
    )
}