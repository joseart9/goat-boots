import { Button } from '@/components/shared/ui/button';
import { LandingPrimaryImageCtaSection } from '@/components/landing/cta/LandingPrimaryCta';

export default function Hero() {
    return (
        <section className="hero">
            <LandingPrimaryImageCtaSection
                title="Calzado industrial de alta calidad"
                description="La mas alta calidad en botas para trabajo pesado"
                imageSrc="/heroImg.webp"
                imageAlt="Sample image"
            >
                <Button size="xl" asChild>
                    <a href="#">Comprar</a>
                </Button>
            </LandingPrimaryImageCtaSection>;
        </section>
    )
}