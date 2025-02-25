import { LandingSaleCtaSection } from '@/components/landing/cta/LandingSaleCta';
import { motion } from 'framer-motion';

export default function SaleCTA() {
    return (
        <motion.section id='sale_cta'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}>
            <LandingSaleCtaSection
                title="¿Listo para mejorar tu seguridad en el trabajo?"
                description="Consulta nuestro catálogo de botas y calzado industrial y haz tu pedido al mayoreo o menudeo."
                ctaHref="/catalogo"
                ctaLabel="Catálogo"
            />
        </motion.section>
    );
}
