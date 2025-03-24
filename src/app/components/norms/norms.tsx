"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";

const certifications = [
  {
    title: "NOM-013-STPS-2009",
    description:
      "Certificación mexicana que garantiza que nuestro calzado industrial cumple con las normas de seguridad y salud en el trabajo, ofreciendo máxima protección en entornos laborales exigentes.",
    img: "/nom.png",
    imgAlt: "Certificación NOM-013-STPS-2009 en calzado industrial",
    benefits: [
      "Estándares de seguridad mexicanos",
      "Protección laboral garantizada",
      "Calidad certificada",
    ],
  },
  {
    title: "OSHA",
    description:
      "Cumplimos con la normativa OSHA para brindar calzado de seguridad confiable, ideal para proteger a los trabajadores en ambientes con altos riesgos, tanto en México como a nivel internacional.",
    img: "/osha.png",
    imgAlt: "Cumplimiento de normativa OSHA en calzado de seguridad",
    benefits: [
      "Reconocimiento internacional",
      "Seguridad ocupacional",
      "Estándares globales",
    ],
  },
  {
    title: "ASTM",
    description:
      "Nuestro calzado cuenta con certificación ASTM, que respalda su durabilidad y resistencia, garantizando un producto de alta calidad para trabajos pesados y condiciones extremas.",
    img: "/astm.png",
    imgAlt: "Certificación ASTM que avala la resistencia del calzado",
    benefits: [
      "Pruebas de resistencia",
      "Durabilidad comprobada",
      "Calidad superior",
    ],
  },
];

const CertificationCard = ({
  certification,
  index,
}: {
  certification: (typeof certifications)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative group"
    >
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Image container with reduced glow effect */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-lg" />
            <div className="relative w-32 h-32 bg-white/5 rounded-full p-4 backdrop-blur-sm border border-white/10">
              <Image
                src={certification.img}
                alt={certification.imgAlt}
                fill
                className="object-contain p-4"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-3 bg-gradient-to-r from-secondary-500 to-secondary-300 dark:from-primary-500 dark:to-primary-300 bg-clip-text text-transparent"
            >
              {certification.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.4 }}
              viewport={{ once: true }}
              className="text-secondary-400 mb-4"
            >
              {certification.description}
            </motion.p>

            {/* Benefits list */}
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.5 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              {certification.benefits.map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-secondary-300"
                >
                  <FaCheckCircle className="text-primary-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function NormsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements with reduced glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-2xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 30, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaShieldAlt className="text-primary-500 size-16" />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-secondary-500 to-secondary-500 dark:from-primary-500 dark:to-primary-300 bg-clip-text text-transparent">
              Calzado que cumple con las normas mas estrictas.
            </span>
          </h2>
          <p className="text-xl text-secondary-400 max-w-3xl mx-auto">
            Confía en nuestro calzado que cumple con normativas Mexicanas e
            internacionales. Diseñado para ofrecer máxima protección y
            durabilidad en el trabajo.
          </p>
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent mt-8 max-w-xl mx-auto"
          />
        </motion.div>

        {/* Certifications Grid */}
        <div className="space-y-8">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={cert.title}
              certification={cert}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
