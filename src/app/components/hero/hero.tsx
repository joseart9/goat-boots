import { Button } from '@/components/shared/ui/button';
import { LandingProductFeature } from '@/components/landing/LandingProductFeature';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="inicio">
            <LandingProductFeature
                title="Botas Industriales y Calzado de Seguridad"
                imagePerspective='right'
                imageShadow='soft'
                imagePosition='left'
                descriptionComponent={
                    <div className="mt-4 max-w-xl text-secondary-600 dark:text-secondary-100">
                        <p>
                            Calzado industrial de alta calidad, diseñado para ofrecer máxima protección y confort en trabajos pesados, ideales para entornos laborales exigentes.
                        </p>
                        <Button className="mt-2 bg-primary-500 hover:scale-110 transition-all duration-300 text-white" asChild>
                            <Link href="/catalogo">Catálogo</Link>
                        </Button>
                    </div>
                }
            />
        </section>
    )
}