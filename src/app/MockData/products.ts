import Product from "@/app/types/Product";

export const products: Product[] = [
  {
    id: "1",
    name: "GIE-01",
    description: "Excelente bota de construccion y alta resistencia",
    price: 100,
    images: [
      {
        url: "/GIO15.webp",
        alt: "Product 1",
        id: "1",
      },
      {
        url: "/acido1.png",
        alt: "Product 2",
        id: "2",
      },
    ],
    stock: 10,
    category: "Category 1",
    corte:
      "Cuero de ganado vacuno, en flor entera, acabado graso espesor 2-2.2 mm",
    colores: [
      {
        id: "1",
        name: "Negro",
        hex: "#000",
      },
      {
        id: "2",
        name: "Cafe",
        hex: "#964B00",
      },
    ],
    suela:
      "Piso de poliuretano compacto, resistente a solventes, cuña de poliuretano expanso para brindar mayor confort.",
    plantilla: "Poliuretano COMFORT con tela antibacterial",
    forro: "Textil con propiedades antimicoticas y de transpiración",
    corrida: "22 al 30",
    construccion: "Lock Stitcher",
    casco: "Policarbonato",
  },
  {
    id: "2",
    name: "Product 2",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    price: 4500,
    images: [
      {
        url: "/image-375x250.png",
        alt: "Product 1",
        id: "1",
      },
      {
        url: "/acido1.png",
        alt: "Product 2",
        id: "2",
      },
    ],
    stock: 10,
    category: "Category 1",
  },
  {
    id: "3",
    name: "Product 2",
    description: "Product 1 description",
    price: 4500,
    images: [
      {
        url: "/GIO15.webp",
        alt: "Product 1",
        id: "1",
      },
      {
        url: "/acido1.png",
        alt: "Product 2",
        id: "2",
      },
    ],
    stock: 10,
    category: "Category 1",
  },
  {
    id: "4",
    name: "Product 2",
    description: "Product 1 description",
    price: 4500,
    images: [
      {
        url: "/GIO15.webp",
        alt: "Product 1",
        id: "1",
      },
      {
        url: "/acido1.png",
        alt: "Product 2",
        id: "2",
      },
    ],
    stock: 10,
    category: "Category 1",
  },
  {
    id: "5",
    name: "Product 2",
    description: "Product 1 description",
    price: 4500,
    images: [
      {
        url: "/GIO15.webp",
        alt: "Product 1",
        id: "1",
      },
      {
        url: "/acido1.png",
        alt: "Product 2",
        id: "2",
      },
    ],
    stock: 10,
    category: "Category 1",
  },
];
