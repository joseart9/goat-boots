"use client";

import { Button } from "@/components/shared/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaShieldAlt, FaTools, FaStar } from "react-icons/fa";
import Image from "next/image";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 1, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
  >
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="mb-4"
    >
      <Icon className="size-12 text-primary-500" />
    </motion.div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-secondary-400">{description}</p>
  </motion.div>
);

// Add this new component for the glowing effect
const GlowingRing = ({ delay = 0 }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.3, 0.1],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    className="absolute inset-0 rounded-full bg-primary-500/20 blur-2xl"
  />
);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20 lg:py-32">
      {/* SEO Optimizations */}
      <h1 className="sr-only">
        Goat Boots - Botas Industriales y Calzado de Seguridad Premium en México
      </h1>
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-4xl lg:text-6xl font-bold pb-6 bg-clip-text text-transparent bg-gradient-to-r dark:from-primary-500 dark:to-primary-300 from-secondary-500 to-secondary-300">
                Protección y Estilo en Cada Paso
              </h2>
              <p className="text-lg lg:text-xl text-secondary-400 max-w-2xl mx-auto lg:mx-0">
                Calzado industrial de alta calidad, diseñado para ofrecer máxima
                protección y confort en trabajos pesados, ideales para entornos
                laborales exigentes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                asChild
              >
                <Link href="/catalogo">Ver Catálogo</Link>
              </Button>
              <Button
                className="bg-secondary-500/10 backdrop-blur-sm hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 text-secondary-500 dark:text-white px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/contacto">Contactar</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glowing rings behind the boot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[400px] h-[400px]">
                <GlowingRing delay={0} />
                <GlowingRing delay={1} />
                <GlowingRing delay={2} />
              </div>
            </div>

            <div className="relative h-[500px] w-full">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-0"
              >
                <img
                  src="/hero-boot.webp"
                  alt="Bota industrial premium Goat Boots"
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Enhanced floating elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 right-10 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 shadow-lg"
              >
                <span className="text-sm font-medium bg-gradient-to-r dark:from-primary-400 dark:to-primary-200 from-secondary-500 to-secondary-400 bg-clip-text text-transparent">
                  Certificación NOM
                </span>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-4 left-10 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 shadow-lg"
              >
                <span className="text-sm font-medium bg-gradient-to-r dark:from-primary-400 dark:to-primary-200 from-secondary-500 to-secondary-400 bg-clip-text text-transparent">
                  Máxima Protección
                </span>
              </motion.div>

              {/* Particle effects */}
              <motion.div
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                  y: [-20, 20],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary-500 rounded-full blur-[1px]"
              />
              {/* Add more particles with different animations */}
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={FaShieldAlt}
              title="Seguridad Garantizada"
              description="Cumplimos con los más altos estándares de seguridad industrial"
              delay={0.0}
            />
            <FeatureCard
              icon={FaTools}
              title="Durabilidad Superior"
              description="Materiales de primera calidad para una larga vida útil"
              delay={0.0}
            />
            <FeatureCard
              icon={FaStar}
              title="Máximo Confort"
              description="Diseño ergonómico para jornadas laborales extensas"
              delay={0.0}
            />
          </div>
        </motion.div>

        {/* Slogan Section - Replacing Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center relative"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-primary-500/5 blur-3xl rounded-full transform -translate-y-1/2" />

          {/* Slogan */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="relative"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-secondary-500 to-secondary-500 dark:from-primary-500 dark:via-primary-300 via-secondary-300 dark:to-primary-500 bg-clip-text text-transparent">
                Creados para resistir,
              </span>
              <br />
              <span className="bg-gradient-to-r darK:from-primary-400 from-secondary-400 to-secondary-400 dark:via-white dark:to-primary-400 bg-clip-text text-transparent">
                Diseñados para destacar
              </span>
            </h2>

            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent mt-6 mx-auto max-w-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
