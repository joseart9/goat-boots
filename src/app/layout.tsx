import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/ui/provider"
import NavbarSection from "@/app/components/navbar";

export const metadata: Metadata = {
  title: "GOAT Boots - Botas y Calzado Industrial de Alta Calidad en México",
  description:
    "GOAT Boots es líder en botas y calzado industrial en México, ofreciendo productos de alta calidad para menudeo y mayoreo. Descubre seguridad, durabilidad y comodidad en cada par.",
  keywords: [
    "botas industriales",
    "calzado industrial",
    "botas de seguridad",
    "menudeo",
    "mayoreo",
    "México",
    "alta calidad",
    "seguridad laboral",
    "GOAT Boots",
    "durabilidad",
  ],
  openGraph: {
    title: "GOAT Boots - Botas y Calzado Industrial de Alta Calidad en México",
    description:
      "Visita GOAT Boots y descubre la mejor selección de botas y calzado industrial para menudeo y mayoreo en México. Calidad y seguridad en cada producto.",
    url: "https://www.goatboots.mx/", // Reemplaza con la URL real de tu sitio
    siteName: "GOAT Boots",
    images: [
      {
        url: "https://www.goatboots.mx/logoComplete.jpg", // Reemplaza con la URL de tu imagen
        width: 1200,
        height: 630,
        alt: "GOAT Boots - Botas Industriales en México",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GOAT Boots - Botas y Calzado Industrial de Alta Calidad en México",
    description:
      "Descubre en GOAT Boots una amplia gama de botas y calzado industrial para menudeo y mayoreo en México. Calidad, seguridad y durabilidad en cada par.",
    site: "@tuUsuario", // Reemplaza con tu usuario de Twitter
    images: ["https://www.goatboots.mx/logoComplete.jpg"], // Reemplaza con la URL de tu imagen
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="es_ES">
      <body className="scroll-smooth">
        <Provider>
          <NavbarSection />
          {children}
        </Provider>
      </body>
    </html >
  );
}
