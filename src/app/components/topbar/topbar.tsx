import { LandingSocialProofBand } from '@/components/landing/social-proof/LandingSocialProofBand';
import { LandingSocialProofBandItem } from '@/components/landing/social-proof/LandingSocialProofBandItem';

export default function TopBarSection() {
    return (
        <section className='hidden lg:block'>
            <LandingSocialProofBand>
                <LandingSocialProofBandItem graphic='checkmark'>
                    Envios internacionales y nacionales
                </LandingSocialProofBandItem>

                <LandingSocialProofBandItem graphic='checkmark'>
                    Atencion 24/7
                </LandingSocialProofBandItem>

                <LandingSocialProofBandItem graphic='rating'>
                    Satisfacción garantizada
                </LandingSocialProofBandItem>
            </LandingSocialProofBand>
        </section>

    )
}