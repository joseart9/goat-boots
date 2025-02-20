import { LandingFeatureList } from '@/components/landing/feature/LandingFeatureList';

const featureItems = [
    {
        title: 'NOM-013-STPS-2009',
        description:
            'Certificación mexicana que garantiza que nuestro calzado industrial cumple con las normas de seguridad y salud en el trabajo, ofreciendo máxima protección en entornos laborales exigentes.',
        img: '/nom.png',
        imgAlt: 'Certificación NOM-013-STPS-2009 en calzado industrial',
    },
    {
        title: 'OSHA',
        description:
            'Cumplimos con la normativa OSHA para brindar calzado de seguridad confiable, ideal para proteger a los trabajadores en ambientes con altos riesgos, tanto en México como a nivel internacional.',
        img: '/osha.png',
        imgAlt: 'Cumplimiento de normativa OSHA en calzado de seguridad',
    },
    {
        title: 'ASTM',
        description:
            'Nuestro calzado cuenta con certificación ASTM, que respalda su durabilidad y resistencia, garantizando un producto de alta calidad para trabajos pesados y condiciones extremas.',
        img: '/astm.png',
        imgAlt: 'Certificación ASTM que avala la resistencia del calzado',
    },
];

export default function NormsSection() {
    return (
        <section id='certificaciones'>
            <LandingFeatureList
                withBackgroundGlow
                variant="primary"
                title="Calzado Industrial Certificado: Normas de Seguridad Internacional"
                description="Confía en nuestro calzado certificado que cumple con las normativas NOM, OSHA y ASTM, diseñado para ofrecer máxima protección y durabilidad en el trabajo."
                featureItems={featureItems}
            />
        </section>
    );
}
