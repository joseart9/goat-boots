import ProductShowcase from "./components/productShowcase";

export default async function Product({
  params,
}: {
  params: Promise<{
    categoria: string;
    product: string;
  }>;
}) {
  const { categoria, product } = await params;

  return (
    <section className="lg:pt-12">
      <ProductShowcase productId={product} category={categoria} />
    </section>
  );
}
