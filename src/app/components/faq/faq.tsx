import { LandingFaqCollapsibleSection } from '@/components/landing/LandingFaqCollapsible';
import { motion } from 'framer-motion';

const faqItems = [
    {
        question: '¿Qué normativas de seguridad cumplen las botas industriales?',
        answer:
            'Nuestras botas industriales están certificadas y cumplen con normativas internacionales como NOM, OSHA y ASTM, garantizando la máxima protección en entornos de trabajo exigentes.',
    },
    {
        question: '¿Qué materiales se utilizan en la fabricación de sus botas?',
        answer:
            'Utilizamos materiales de alta calidad, incluyendo cuero resistente, suelas antideslizantes y compuestos técnicos, para asegurar durabilidad, confort y seguridad en cada par de botas.',
    },
    {
        question: '¿Ofrecen garantía en sus productos?',
        answer:
            'Sí, todas nuestras botas industriales cuentan con una garantía de 12 meses contra defectos de fabricación, respaldando nuestro compromiso con la calidad y la satisfacción del cliente.',
    },
    {
        question: '¿Es posible personalizar las botas para pedidos empresariales?',
        answer:
            'Por supuesto. Ofrecemos opciones de personalización y pedidos al por mayor para adaptarnos a las necesidades específicas de empresas y sectores industriales, garantizando un ajuste perfecto y cumplimiento de requerimientos técnicos.',
    },
    {
        question: '¿Cómo debo realizar el mantenimiento y limpieza de mis botas industriales?',
        answer:
            'Recomendamos limpiar las botas con un paño húmedo y utilizar productos específicos para cuero o el material de cada modelo. Así conservarás su aspecto y funcionalidad durante más tiempo.',
    },
];
export default function FaqComponent() {
    return (
        <motion.section id='faq'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}>
            <LandingFaqCollapsibleSection
                title='Preguntas Frecuentes sobre Botas Industriales'
                description="Resolvemos las dudas más comunes sobre nuestros productos y el servicio que ofrecemos en GOAT Boots."
                faqItems={faqItems}
                variant='secondary'
                withBackgroundGlow
            />
        </motion.section>
    )
}
