"use client";
import { routes, adminRoutes } from "./routes";
import { useRouter, usePathname } from "next/navigation";
import { motion, useAnimate, stagger } from "framer-motion";
import Link from "next/link";
import { MenuToggle } from "./menu/menu_toggle";
import { useState, useEffect } from "react";
import Menu from "./menu";
import TopBarSection from "@/app/components/topbar";
import { ShoppingCart } from "lucide-react";

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations: [any, any, any][] = isOpen
      ? [
          [
            "nav",
            { transform: "translateX(0%)" },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 },
          ],
          [
            "li",
            { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
            { delay: stagger(0.05), at: "-0.1" },
          ],
        ]
      : [
          [
            "li",
            { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
            { delay: stagger(0.05, { from: "last" }), at: "<" },
          ],
          ["nav", { transform: "translateX(-100%)" }, { at: "-0.1" }],
        ];

    animate([
      [
        "path.top",
        { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { at: "<" },
      ],
      ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
      [
        "path.bottom",
        { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { at: "<" },
      ],
      ...menuAnimations,
    ]);
  }, [isOpen]);

  return scope;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  // Evitar scroll
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  const pathname = usePathname();

  // Variantes para la animación del underline
  const underlineVariants = {
    rest: { scaleX: 0 },
    hover: { scaleX: 1 },
    active: { scaleX: 1 },
  };

  let scope;
  if (!adminRoutes.some((route) => pathname === route.href)) {
    scope = useMenuAnimation(isOpen);
    // #1A1A1A
  }

  return (
    <div className="mb-12 lg:mb-0">
      {adminRoutes.some((route) => pathname === route.href) ? (
        <></>
      ) : (
        <>
          <TopBarSection />
          <header className="hidden lg:flex flex-row w-screen space-x-8 bg-[#FFBE29] items-center sticky top-0 z-50 py-4">
            <div className="flex flex-row h-16 -mt-6">
              <div className="bg-[#1A1A1A] flex min-w-80">
                <div className="relative top-16 px-4 bg-[#1A1A1A] w-full flex ">
                  <img
                    src="/logo3.png"
                    alt="Logo GOAT Boots"
                    className="h-20 w-auto cursor-pointer bg-[#1A1A1A] -mt-8 pb-3 "
                    onClick={handleClick}
                  />
                </div>
              </div>
              <div
                className="bg-[#1A1A1A] h-32 w-8 relative rounded-br-lg diagonal-clip"
                style={{
                  transform: "translateZ(0)",
                  willChange: "transform",
                }}
                key={pathname}
              />
            </div>

            <nav className="flex flex-row justify-between w-full px-8">
              <div className="flex flex-row items-center w-full space-x-6">
                {routes.map((route, index) => {
                  const isActive = pathname === route.href;
                  return (
                    <Link
                      key={index}
                      className={`hover:scale-110 transition-all duration-300 text-white hover:text-[#1A1A1A] text-lg ${
                        isActive ? "text-[#1A1A1A] scale-110" : ""
                      }`}
                      href={route.href}
                    >
                      <motion.span
                        className="relative inline-block"
                        initial="rest"
                        animate={isActive ? "active" : "rest"}
                        whileHover="hover"
                      >
                        <span
                          className={`${
                            isActive ? "text-[#1A1A1A] scale-110" : ""
                          }`}
                        >
                          {route.name}
                        </span>
                        <motion.div
                          variants={underlineVariants}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className={`absolute left-0 right-0 -bottom-1 h-0.5 ${
                            isActive ? "bg-black scale-110" : "bg-current"
                          }`}
                          style={{ transformOrigin: "center" }}
                        />
                      </motion.span>
                    </Link>
                  );
                })}
              </div>

              <div className="justify-end flex flex-row space-x-1">
                <Link href="/catalogo">
                  <button className="bg-[#1A1A1A] px-6 py-3 text-white hover:bg-[#1A1A1A]/85 text-lg hover:scale-110 transition-all duration-300 rounded-md">
                    Catálogo
                  </button>
                </Link>

                <Link href="/carrito">
                  <button className="px-6 py-3 text-white text-lg hover:scale-110 transition-all duration-300 rounded-md">
                    <ShoppingCart className="size-7 mr-2" />
                  </button>
                </Link>
              </div>
            </nav>
          </header>

          <header
            ref={scope}
            className="flex lg:hidden flex-row w-screen justify-between bg-[#FFBE29] items-center fixed top-0 z-50 h-fit"
          >
            <div className="flex items-center h-full py-4 pl-4">
              <Menu toggle={() => setIsOpen(!isOpen)} />
              <MenuToggle toggle={() => setIsOpen(!isOpen)} />
            </div>
            <div className="flex flex-row">
              <div
                className="bg-[#1A1A1A] w-4"
                style={{
                  clipPath: "polygon(0 0, 100% 0%, 100% 100%, 59% 100%)",
                }}
              />
              <div className="bg-[#1A1A1A] py-6 w-auto h-full flex flex-row">
                <img
                  src="/logo3.png"
                  alt="Logo GOAT Boots"
                  className="h-14 w-auto px-2"
                  onClick={handleClick}
                />
              </div>
            </div>
          </header>
        </>
      )}
    </div>
  );
}
