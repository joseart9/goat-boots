"use client";

import { motion } from "framer-motion";
import Input from "@/app/components/ui/Input";
import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    formData;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white to-gray-200 dark:from-secondary-500 dark:to-secondary-700 mt-24 lg:mt-0">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.h1
              className="text-3xl md:text-6xl font-bold dark:text-white mb-6 text-secondary-500 relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Contáctanos
            </motion.h1>
            <motion.p
              className="text-base lg:text-xl text-secondary-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Envíanos un
              mensaje y te responderemos lo antes posible.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10">
                <h2 className="text-2xl font-semibold text-secondary-500 dark:text-white mb-6">
                  Información de Contacto
                </h2>
                <div className="space-y-6">
                  <motion.div
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="p-3 bg-primary-500/10 rounded-lg">
                      <FaEnvelope className="text-primary-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary-500 dark:text-white lg:text-base">
                        Email
                      </h3>
                      <p className="text-secondary-400 text-xs lg:text-base">
                        contacto@goatboots.com
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="p-3 bg-primary-500/10 rounded-lg">
                      <FaPhone className="text-primary-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary-500 dark:text-white lg:text-base">
                        Teléfono
                      </h3>
                      <p className="text-secondary-400 text-xs lg:text-base">
                        +52 (55) 1234-5678
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="p-3 bg-primary-500/10 rounded-lg">
                      <FaMapMarkerAlt className="text-primary-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary-500 dark:text-white lg:text-base">
                        Ubicación
                      </h3>
                      <p className="text-secondary-400 text-xs lg:text-base">
                        Monterrey, Nuevo León, México
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Map or Additional Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10 h-64"
              >
                {/* Add map or additional content here */}
                <div className="w-full h-full bg-secondary-500/20 rounded-lg flex items-center justify-center">
                  <p className="text-secondary-400">Mapa de ubicación</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-secondary-500 dark:text-white mb-2">
                      Nombre
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nombre completo"
                      className="w-full bg-white/5 border-white/10 focus:border-primary-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-secondary-500 dark:text-white mb-2">
                      Correo
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@dominio.com"
                      className="w-full bg-white/5 border-white/10 focus:border-primary-500"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-secondary-500 dark:text-white mb-2">
                    Teléfono
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Número de teléfono"
                    className="w-full bg-white/5 border-white/10 focus:border-primary-500"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-secondary-500 dark:text-white mb-2">
                    Mensaje
                  </label>
                  <Input
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mensaje..."
                    asTextarea
                    className="w-full bg-white/5 border-white/10 focus:border-primary-500 min-h-[150px]"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex justify-center"
                >
                  <button
                    type="submit"
                    className="group relative px-8 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-primary-500/25 overflow-hidden"
                  >
                    <span className="relative z-10">Enviar Mensaje</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
