"use client";
import { LandingFeature } from "@/components/landing/feature/LandingFeature";
import { SlBadge } from "react-icons/sl";
import { MdOutlineLocalPolice } from "react-icons/md";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { motion } from "framer-motion";
import SaleCTA from "../components/sale_cta";
import { FaHandshake, FaHeart, FaStar } from "react-icons/fa";

export default function Nosotros() {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full flex flex-col justify-center items-center gap-8 py-12 lg:py-16 overflow-hidden overflow-x-hidden"
    >
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
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
      </div>

      <div className="relative flex items-start justify-start w-full px-4 container-wide lg:pl-2 text-5xl lg:text-8xl pb-10 lg:pb-24">
        <div className="absolute">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-0 font-bold text-primary-500/25"
          >
            Nosotros
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative -top-11 lg:-top-[90px] left-1 z-10 font-bold text-primary-500"
          >
            Nosotros
          </motion.h2>
        </div>
      </div>

      <section className="relative w-full p-6 container-wide flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading">
            Marca <span className="text-primary-500">100%</span> Mexicana
          </h2>
          <div className="max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 text-secondary-400 text-lg leading-loose"
            >
              Nos enorgullece ser una{" "}
              <span className="text-primary-500">empresa 100% mexicana</span>,
              desde nuestra fundación hasta cada paso que damos hoy.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 text-secondary-400 text-lg leading-loose"
            >
              Todo nuestro proceso, desde la ideación de producto hasta la
              producción de cada par de calzado ayuda a sustentar una familia
              mexicana.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="-mt-9"
        >
          <div className="w-screen relative left-1/2 -translate-x-1/2 flex flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="flex fill-primary-100/25 dark:fill-primary-500/70"
              viewBox="0 0 1440 320"
            >
              <path fillOpacity="1" d="M0,192L1440,256L1440,320L0,320Z"></path>
            </svg>
          </div>
          <div className="w-screen relative left-1/2 -translate-x-1/2 flex flex-col bg-primary-100/25 dark:bg-primary-500/70">
            <div className="flex flex-col lg:grid grid-cols-2 lg:gap-8 relative container-wide w-full mx-auto p-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="col-span-1"
              >
                <h2 className="text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading">
                  Nuestra{" "}
                  <span className="text-primary-500 dark:text-secondary-500">
                    misión
                  </span>
                </h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-8 text-secondary-400 text-lg leading-loose dark:text-white"
                >
                  Proporcionar calzado industrial de la más alta calidad,
                  diseñado para resistir los desafíos más exigentes en entornos
                  laborales, asegurando la seguridad y comodidad de los
                  trabajadores.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="mt-4 text-secondary-400 text-lg leading-loose dark:text-white"
                >
                  Nos comprometemos a innovar constantemente, a mantener
                  estándares rigurosos de fabricación y a contribuir al
                  bienestar de la comunidad laboral mediante productos
                  confiables y duraderos.
                </motion.p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="col-span-1 lg:px-0 pt-12 lg:pt-0 lg:mt-48"
              >
                <h2 className="text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading">
                  Nuestra{" "}
                  <span className="text-primary-500 dark:text-secondary-500">
                    visión
                  </span>
                </h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-8 text-secondary-400 text-lg leading-loose dark:text-white"
                >
                  Ser reconocidos como líderes en la fabricación de calzado
                  industrial a nivel nacional e internacional, siendo la opción
                  preferida por la excelencia en calidad, diseño ergonómico y
                  compromiso con la seguridad.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="mt-4 text-secondary-400 text-lg leading-loose dark:text-white"
                >
                  Buscamos transformar la experiencia de quienes trabajan en
                  entornos desafiantes al proporcionar calzado que no solo
                  protege, sino que también inspira confianza y productividad.
                </motion.p>
              </motion.div>
            </div>
          </div>
          <div className="w-screen relative left-1/2 -translate-x-1/2 flex flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="flex fill-primary-100/25 dark:fill-primary-500/70"
              viewBox="0 0 1440 320"
            >
              <path fillOpacity="1" d="M0,192L1440,256L1440,0L0,0Z"></path>
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col gap-8"
        >
          <h2 className="text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading break-words">
            Calzado resistente,{" "}
            <span className="text-primary-500">valores</span> incuestionables.
          </h2>
          <div className="flex flex-col lg:grid grid-cols-3 gap-6 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-1"
            >
              <LandingFeature
                title="Calidad"
                description="Compromiso con la excelencia en la fabricación de calzado que cumple con los estándares mas altos de durabilidad y rendimiento."
                icon={<SlBadge className="size-48" />}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="col-span-1"
            >
              <LandingFeature
                title="Seguridad"
                description="Sobrepasamos los estándares de la Norma Oficial Mexicana, garantizando la seguridad de los trabajadores en diversos entornos laborales."
                icon={<MdOutlineLocalPolice className="size-48" />}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="col-span-1"
            >
              <LandingFeature
                title="Responsabilidad"
                description="Compromiso con prácticas comerciales sostenibles y éticas."
                icon={<LiaPeopleCarrySolid className="size-48" />}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col lg:grid grid-cols-3 gap-6 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="col-span-1"
            >
              <LandingFeature
                title="Compromiso"
                description="Dedicación total a la satisfacción de nuestros clientes y al bienestar de nuestros empleados."
                icon={<FaHandshake className="size-48" />}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="col-span-1"
            >
              <LandingFeature
                title="Pasión"
                description="Amor por lo que hacemos y compromiso con la excelencia en cada detalle."
                icon={<FaHeart className="size-48" />}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="col-span-1"
            >
              <LandingFeature
                title="Excelencia"
                description="Búsqueda constante de la perfección en cada aspecto de nuestro trabajo."
                icon={<FaStar className="size-48" />}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
      <SaleCTA />
    </motion.article>
  );
}
