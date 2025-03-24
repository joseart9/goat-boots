"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaPlane, FaTruck, FaMapMarkerAlt } from "react-icons/fa";

const deliveryLocations = {
  usa: {
    title: "Envíos Internacionales a Estados Unidos",
    description:
      "Descubre cómo nuestro servicio logístico garantiza entregas rápidas y seguras en ciudades clave de EE. UU.",
    img: "/delivery1.png",
    imgAlt: "USA Delivery",
    locations: [
      "Los Angeles, California",
      "Chicago, Illinois",
      "New York, New York",
      "Austin, Texas",
      "Dallas, Texas",
    ],
    icon: FaPlane,
  },
  mexico: {
    title: "Envíos Nacionales a México",
    description:
      "Experimenta nuestro servicio de envíos confiable y eficiente, diseñado para alcanzar los principales destinos en México.",
    img: "/delivery2.png",
    imgAlt: "Mexico Delivery",
    locations: [
      "Tijuana, Baja California",
      "Cd. Juarez, Chihuahua",
      "León, Guanajuato",
      "Guadalajara, Jalisco",
      "Monterrey, Nuevo León",
      "Reynosa, Tamaulipas",
    ],
    icon: FaTruck,
  },
};

const LocationCard = ({
  data,
  index,
}: {
  data: (typeof deliveryLocations)["usa" | "mexico"];
  index: number;
}) => {
  const Icon = data.icon;

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
          {/* Image container */}
          <motion.div className="relative w-full md:w-1/2">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={data.img}
                alt={data.imgAlt}
                fill
                className="object-contain p-2"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 w-full md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Icon className="text-primary-500 size-8" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                viewport={{ once: true }}
                className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-300 bg-clip-text text-transparent"
              >
                {data.title}
              </motion.h3>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.4 }}
              viewport={{ once: true }}
              className="text-secondary-400 mb-6"
            >
              {data.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {data.locations.map((location, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.2 + idx * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-secondary-300"
                >
                  <FaMapMarkerAlt className="text-primary-500 flex-shrink-0" />
                  <span>{location}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function DeliverySection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      ></motion.div>

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
              <FaTruck className="text-primary-500 size-16" />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-secondary-500 to-secondary-500 dark:from-primary-500 dark:to-primary-300 bg-clip-text text-transparent">
              Envíos Internacionales
            </span>
          </h2>
          <p className="text-xl text-secondary-400 max-w-3xl mx-auto">
            GOAT Boots ofrece un servicio de envíos internacionales seguro y
            eficiente, garantizando entregas confiables a destinos estratégicos
            en Estados Unidos y México.
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

        {/* Delivery Locations Grid */}
        <div className="space-y-8">
          {(
            Object.entries(deliveryLocations) as [
              keyof typeof deliveryLocations,
              (typeof deliveryLocations)["usa" | "mexico"]
            ][]
          ).map(([key, data], index) => (
            <LocationCard key={key} data={data} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
