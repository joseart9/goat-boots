"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { routes } from "@/app/components/navbar/routes";
import useDarkMode from "@/app/hooks/useDarkMode";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

const socials = [
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/goatbootsmx",
    icon: FaInstagram,
  },
  {
    name: "Email",
    url: "mailto:ventas@goatboots.mx",
    icon: FaEnvelope,
  },
];

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    text: "Monterrey, Nuevo León, México",
  },
  {
    icon: FaPhone,
    text: "+52 (477) 123-4567",
  },
  {
    icon: FaEnvelope,
    text: "ventas@goatboots.mx",
  },
];

const footerAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function FooterSection() {
  const router = useRouter();
  const isDarkMode = useDarkMode();
  const date = new Date();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  // if pathname starts with /admin ignore footer

  if (pathname.includes("/admin")) {
    return null;
  }

  return (
    <footer
      className="relative pt-16 pb-8 px-4 overflow-hidden"
      style={{
        backgroundImage: `${
          isDarkMode ? "url('/textura1.png')" : "url('/textura2.png')"
        }`,
      }}
    >
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo Section */}
          <motion.div
            {...footerAnimation}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center lg:items-start"
          >
            <img
              src="/logo2.png"
              alt="logo"
              className="h-24 w-auto cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => router.push("/")}
            />
            <p className="mt-4 text-secondary-400 text-sm max-w-xs text-center lg:text-left">
              Líderes en calzado industrial de alta calidad y seguridad.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            {...footerAnimation}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent">
              Navegación
            </h3>
            <ul className="space-y-3">
              {routes.map((route, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={route.href}
                    className="text-secondary-300 hover:text-primary-500 transition-colors duration-300 flex items-center gap-2"
                  >
                    {route.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: routes.length * 0.1 }}
              >
                <Link
                  href="/catalogo"
                  className="text-secondary-300 hover:text-primary-500 transition-colors duration-300"
                >
                  Catálogo
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            {...footerAnimation}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent">
              Redes Sociales
            </h3>
            <ul className="space-y-3">
              {socials.map((social, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={social.url}
                    className="text-secondary-300 hover:text-primary-500 transition-colors duration-300 flex items-center gap-2"
                  >
                    <social.icon className="size-4" />
                    <span>{social.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            {...footerAnimation}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent">
              Contacto
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-2 text-secondary-300"
                >
                  <info.icon className="text-primary-500 size-4" />
                  <span>{info.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-white/10 pt-8 mt-12 text-center"
        >
          <Link
            href="https://www.arafinnovations.com"
            className="text-secondary-400 hover:text-primary-500 transition-colors duration-300 text-sm"
          >
            Powered by Araf Innovations &copy; {date.getFullYear() - 1}
          </Link>
        </motion.div>
      </div>
    </footer>
  );
}
