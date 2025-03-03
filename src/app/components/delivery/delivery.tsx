import { LandingProductTourSection, LandingProductTourList, LandingProductTourTrigger, LandingProductTourContent } from '@/components/landing/LandingProductTour';
import ItemShowcase from './item_showcase';
import { motion } from 'framer-motion';

export default function DeliverySection() {
    return (
        <motion.section id='certificaciones'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}>
            <LandingProductTourSection
                title="Envíos Internacionales"
                description="GOAT Boots ofrece un servicio de envíos internacionales seguro y eficiente, garantizando entregas confiables a destinos estratégicos en Estados Unidos y México. Descubre nuestro proceso logístico optimizado para entregas rápidas y seguras."
                defaultValue="feature-1"
            >
                <LandingProductTourList>
                    <LandingProductTourTrigger value="feature-1">
                        <p className="text-xl font-bold">
                            Envíos Internacionales a Estados Unidos
                        </p>
                        <p>
                            Descubre cómo nuestro servicio logístico garantiza entregas rápidas y seguras en ciudades clave de EE. UU.
                        </p>
                    </LandingProductTourTrigger>

                    <LandingProductTourTrigger value="feature-2">
                        <p className="text-xl font-bold">
                            Envíos Nacionales a México
                        </p>
                        <p>
                            Experimenta nuestro servicio de envíos confiable y eficiente, diseñado para alcanzar los principales destinos en México.
                        </p>
                    </LandingProductTourTrigger>

                </LandingProductTourList>
                <LandingProductTourContent value="feature-1">
                    <ItemShowcase img="/delivery1.png" imgAlt="USA Delivery" description={["Los Angeles, California", "Chicago, Illinois", "New York, New York", "Austin, Texas", "Dallas, Texas"]} />
                </LandingProductTourContent>
                <LandingProductTourContent value="feature-2">
                    <ItemShowcase img="/delivery2.png" imgAlt="Mexico Delivery" description={["Tijuana, Baja California", "Cd. Juarez, Chihuahua", "León, Guanajuato", "Guadalajara, Jalisco", "Monterrey, Nuevo León", "Reynosa, Tamaulipas"]} />
                </LandingProductTourContent>
            </LandingProductTourSection>
        </motion.section>
    )
}