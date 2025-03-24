"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import SaleCTA from "../components/sale_cta";
import { LandingProductFeatureKeyPoints } from "@/components/landing/LandingProductFeatureKeyPoints";
import {
  LandingProductTourSection,
  LandingProductTourList,
  LandingProductTourTrigger,
  LandingProductTourContent,
} from "@/components/landing/LandingProductTour";

// Data structure for soles characteristics
const solesData = {
  hule: {
    name: "Hule",
    stats: {
      "Aceites y grasas": 100,
      Solventes: 100,
      Acidos: 80,
      "Rebaba de acero": 80,
      Abrasivos: 100,
      "Altas temperaturas [400°]": 0,
      Adherencia: 100,
      Flexion: 80,
      Confort: 80,
    },
  },
  acriloNitrilo: {
    name: "Acrilo Nitrilo",
    stats: {
      "Aceites y grasas": 100,
      Solventes: 100,
      Acidos: 80,
      "Rebaba de acero": 80,
      Abrasivos: 100,
      "Altas temperaturas [400°]": 100,
      Adherencia: 70,
      Flexion: 70,
      Confort: 60,
    },
  },
  elastomero: {
    name: "Elastómero",
    stats: {
      "Aceites y grasas": 100,
      Solventes: 100,
      Acidos: 80,
      "Rebaba de acero": 70,
      Abrasivos: 100,
      "Altas temperaturas [400°]": 0,
      Adherencia: 100,
      Flexion: 80,
      Confort: 70,
    },
  },
  poliuretano: {
    name: "Poliuretáno",
    stats: {
      "Aceites y grasas": 90,
      Solventes: 90,
      Acidos: 60,
      "Rebaba de acero": 60,
      Abrasivos: 100,
      "Altas temperaturas [400°]": 0,
      Adherencia: 100,
      Flexion: 100,
      Confort: 100,
    },
  },
};

// Animated bar component
const AnimatedBar = ({
  value,
  label,
  delay,
}: {
  value: number;
  label: string;
  delay: number;
}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-32 text-sm text-secondary-400">{label}</div>
      <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full bg-primary-500 rounded-full"
        />
      </div>
      <div className="w-12 text-sm text-secondary-400">{value}%</div>
    </div>
  );
};

// Characteristics graph component
const CharacteristicsGraph = ({
  soleData,
  delay,
}: {
  soleData: typeof solesData.hule;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="w-full p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
    >
      <h3 className="text-xl font-semibold mb-6">{soleData.name}</h3>
      <div className="space-y-2">
        {Object.entries(soleData.stats).map(([key, value], index) => (
          <AnimatedBar
            key={key}
            label={key}
            value={value}
            delay={delay + index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function Seguridad() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const featuresY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <motion.article
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full flex flex-col justify-center items-center gap-8 py-12 lg:py-16 overflow-hidden"
    >
      {/* Enhanced decorative background elements with parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 overflow-hidden"
      >
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
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
        />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative flex items-start justify-start w-full px-4 container-wide lg:pl-2 text-5xl lg:text-8xl pb-10 lg:pb-24"
      >
        <div className="absolute">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-0 font-bold text-primary-500/25"
          >
            Seguridad
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative -top-11 lg:-top-[90px] left-1 z-10 font-bold text-primary-500"
          >
            Seguridad
          </motion.h2>
        </div>
      </motion.div>

      <section className="relative w-full p-6 container-wide flex flex-col space-y-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading">
            Seguridad <span className="text-primary-500">Garantizada</span>
          </h2>
          <div className="max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 text-secondary-400 text-lg leading-loose"
            >
              En Goat Boots, la seguridad es nuestra prioridad absoluta. Cada
              par de botas está diseñado y fabricado siguiendo los más estrictos
              estándares de la Norma Oficial Mexicana (NOM-113-STPS-2009),
              garantizando la máxima protección para nuestros trabajadores.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 text-secondary-400 text-lg leading-loose"
            >
              Nuestro compromiso con la seguridad va más allá de cumplir con las
              normas; nos esforzamos por superar las expectativas en cada
              aspecto de la protección laboral.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          style={{ y: featuresY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col lg:grid grid-cols-3 gap-6 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="col-span-1"
            >
              <div className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 h-full">
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
                >
                  <FaShieldAlt className="size-16 text-primary-500 mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">
                  Protección Superior
                </h3>
                <p className="text-secondary-400">
                  Materiales de alta resistencia que protegen contra impactos,
                  perforaciones y riesgos eléctricos.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="col-span-1"
            >
              <div className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 h-full">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaCheckCircle className="size-16 text-primary-500 mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">
                  Certificación NOM
                </h3>
                <p className="text-secondary-400">
                  Cumplimiento total con la Norma Oficial Mexicana para calzado
                  de protección.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="col-span-1"
            >
              <div className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 h-full">
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
                >
                  <FaExclamationTriangle className="size-16 text-primary-500 mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">
                  Prevención de Riesgos
                </h3>
                <p className="text-secondary-400">
                  Diseño ergonómico que reduce la fatiga y previene lesiones
                  laborales.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col gap-8"
        >
          <h2 className="text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading">
            Características de{" "}
            <span className="text-primary-500">Seguridad</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4">
                Protección contra Impactos
              </h3>
              <ul className="space-y-2 text-secondary-400">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary-500" />
                  Puntera de acero resistente a impactos
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary-500" />
                  Materiales de alta resistencia
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary-500" />
                  Diseño ergonómico para máxima protección
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4">
                Características Adicionales
              </h3>
              <ul className="space-y-2 text-secondary-400">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary-500" />
                  Resistencia a productos químicos
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary-500" />
                  Antiderrapante y resistente al aceite
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary-500" />
                  Aislamiento térmico y eléctrico
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Casco de Poliamida Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading">
            Casco de <span className="text-primary-500">Poliamida</span>
          </h2>
          <div className="grid grid-cols-2 w-full items-center justify-center gap-12 container-wide pl-9 pr-4 lg:pr-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="col-span-2 lg:col-span-1"
            >
              <LandingProductFeatureKeyPoints
                keyPoints={[
                  {
                    title: "Resistente",
                    description:
                      "No se rompe ni se deforma después de un impacto, si no que al absorber un impacto, regresa a su forma original sin prensar el pie o dedos.",
                  },
                  {
                    title: "Temperatura",
                    description:
                      "Menor transferencia de calor o frio. ofreciendo una mayor sensación de comodidad.",
                  },
                  {
                    title: "Liviano",
                    description:
                      "Por su composición es más ligero que el acero.",
                  },
                  {
                    title: "Dieléctrico",
                    description:
                      "Hecho de polímero no conductor de electricidad.",
                  },
                ]}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-1 hidden lg:block w-full"
            >
              <img src="/seguridad1.jpg" alt="Seguridad" className="w-full" />
            </motion.div>
          </div>
        </motion.div>

        {/* Suelas Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <LandingProductTourSection
            title="Suelas"
            description="Existen varios tipos de suela, cada una tiene diferentes características y aplicaciones para diferentes actividades clave del usuario. No significa que una sea mejor que otra, simplemente cada composición tiene un objetivo específico."
            defaultValue="feature-1"
          >
            <LandingProductTourContent value="feature-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-auto h-64 overflow-hidden mb-10"
              >
                <img
                  src="/suelas/SUELA HULE.webp"
                  alt="Hule"
                  className="w-full h-full object-contain object-center"
                />
              </motion.div>
              <CharacteristicsGraph soleData={solesData.hule} delay={0.5} />
            </LandingProductTourContent>
            <LandingProductTourContent value="feature-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-auto h-64 overflow-hidden mb-10"
              >
                <img
                  src="/acido1.png"
                  alt="Acrilico Nitrilo"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
              <CharacteristicsGraph
                soleData={solesData.acriloNitrilo}
                delay={0.5}
              />
            </LandingProductTourContent>
            <LandingProductTourContent value="feature-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-auto h-64 overflow-hidden mb-10"
              >
                <img
                  src="/elastomero1.png"
                  alt="Elastomero"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
              <CharacteristicsGraph
                soleData={solesData.elastomero}
                delay={0.5}
              />
            </LandingProductTourContent>
            <LandingProductTourContent value="feature-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-auto h-64 overflow-hidden mb-10"
              >
                <img
                  src="/poli1.png"
                  alt="Poliuretano"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
              <CharacteristicsGraph
                soleData={solesData.poliuretano}
                delay={0.5}
              />
            </LandingProductTourContent>
            <LandingProductTourList>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <LandingProductTourTrigger value="feature-1">
                  <p className="text-xl font-bold">Hule</p>
                  <p>Excelente agarre y resistencia en trabajos rudos.</p>
                </LandingProductTourTrigger>

                <LandingProductTourTrigger value="feature-2">
                  <p className="text-xl font-bold">Acrilo Nitrilo</p>
                  <p>
                    Resiste altas temperaturas que pueden llegar hasta los 400°,
                    son suelas para trabajos pesados donde pueden existir
                    rebabas de acero y solventes a la vez.
                  </p>
                </LandingProductTourTrigger>

                <LandingProductTourTrigger value="feature-3">
                  <p className="text-xl font-bold">Elastómero</p>
                  <p>
                    Muy resistentes y con un alto grado de adherencia, se puede
                    utilizar en lugares donde hay presencia de solventes,
                    químicos, grasas, aceites y abrasivos.
                  </p>
                </LandingProductTourTrigger>

                <LandingProductTourTrigger value="feature-4">
                  <p className="text-xl font-bold">Poliuretáno</p>
                  <p>
                    Muy confortable, ligera, durable, antiderrapante. Puede
                    llevar una burbuja de aire en el talón para reducir el
                    impacto contra el suelo.
                  </p>
                </LandingProductTourTrigger>
              </motion.div>
            </LandingProductTourList>
          </LandingProductTourSection>
        </motion.div>
      </section>
      <SaleCTA />
    </motion.article>
  );
}
