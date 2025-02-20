"use client";
import { routes } from "./routes";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    const router = useRouter();
    const handleClick = () => {
        router.push("/");
    };

    const pathname = usePathname();

    // Variantes para la animación del underline
    const underlineVariants = {
        rest: { scaleX: 0 },
        hover: { scaleX: 1 },
        active: { scaleX: 1 },
    };

    return (
        <header className="hidden md:flex flex-row w-full space-x-8 px-8 py-6 bg-[#FFBE29] items-center sticky top-0 z-50">
            <img
                src="/logo.webp"
                alt="Logo GOAT Boots"
                className="h-20 w-auto cursor-pointer"
                onClick={handleClick}
            />

            <nav className="flex flex-row justify-between w-full">
                <div className="flex flex-row items-center w-full space-x-6">
                    {routes.map((route, index) => {
                        const isActive = pathname === route.href;
                        return (
                            <Link
                                key={index}
                                className={`hover:scale-110 transition-all duration-300 text-white hover:text-[#1A1A1A] text-lg ${isActive ? "text-[#1A1A1A] scale-110" : ""
                                    }`}
                                href={route.href}
                            >
                                <motion.span
                                    className="relative inline-block"
                                    initial="rest"
                                    animate={isActive ? "active" : "rest"}
                                    whileHover="hover"
                                >
                                    <span className={`${isActive ? "text-[#1A1A1A] scale-110" : ""}`}>{route.name}</span>
                                    <motion.div
                                        variants={underlineVariants}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className={`absolute left-0 right-0 -bottom-1 h-0.5 ${isActive ? "bg-black scale-110" : "bg-current"}`}
                                        style={{ transformOrigin: "center" }}
                                    />
                                </motion.span>
                            </Link>
                        );
                    })}
                </div>

                <div className="justify-end">
                    <button
                        className="bg-[#1A1A1A] px-6 py-3 text-white hover:bg-[#1A1A1A]/85 text-lg hover:scale-110 transition-all duration-300 rounded-md">
                        <Link href="/catalogo">
                            Catálogo
                        </Link>

                    </button>
                </div>
            </nav>
        </header>
    );
}
