"use client";
import HeroSection from "@/app/components/hero"
import NormsSection from "@/app/components/norms";
import FaqComponent from "@/app/components/faq";
import DeliverySection from "./components/delivery";

import { motion } from "framer-motion";
import SaleCTA from "./components/sale_cta";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}>
      <HeroSection />
      <NormsSection />
      <DeliverySection />
      <SaleCTA />
      <FaqComponent />
    </motion.main>
  );
}
