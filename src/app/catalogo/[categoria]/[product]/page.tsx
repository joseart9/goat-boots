import { products } from "@/app/MockData/products";
import ProductShowcase from "./components/productShowcase";
import { Spinner } from "@heroui/spinner";

export default async function Product({
    params,
}: {
    params: Promise<{
        categoria: string;
        product: string;
    }>
}) {
    const { categoria, product } = await params;
    const productData = products.find((item) => item.id === product);

    if (!productData) {
        return <Spinner />;
    }

    return (
        <section className="lg:pt-12">
            <ProductShowcase product={productData} category={categoria} />
        </section>
    )
}