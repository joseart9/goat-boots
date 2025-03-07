"use client";
import { motion } from 'framer-motion'
import { LandingProductFeatureKeyPoints } from '@/components/landing/LandingProductFeatureKeyPoints';
import { LandingProductTourSection, LandingProductTourList, LandingProductTourTrigger, LandingProductTourContent } from '@/components/landing/LandingProductTour';

export default function Seguridad() {
    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='relative w-full flex flex-col justify-center items-center gap-8 py-12 lg:py-16'>
            <div className='flex items-start justify-start w-full px-4 container-wide lg:pl-2 text-4xl lg:text-8xl pb-10 lg:pb-24'>
                <div className='absolute'>
                    <h2 className='relative z-0 font-bold text-primary-500/25'>
                        Tu Seguridad
                    </h2>
                    <h2 className='relative -top-11 lg:-top-[90px] left-2 z-10 font-bold text-primary-500'>
                        Tu Seguridad
                    </h2>
                </div>
            </div>
            <section className='w-full p-6 container-wide flex flex-col space-y-32'>
                <div>
                    <h2 className='text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading break-words'>
                        Casco de Poliamida
                    </h2>
                    <div className='grid grid-cols-2 w-full items-center justify-center gap-12 container-wide pl-9 pr-4 lg:pr-0'>
                        <div className='col-span-2 lg:col-span-1'>
                            <LandingProductFeatureKeyPoints
                                keyPoints={[
                                    {
                                        title: 'Resistente',
                                        description:
                                            'No se rompe ni se deforma después de un impacto, si no que al absorber un impacto, regresa a su forma original sin prensar el pie o dedos.',
                                    },
                                    {
                                        title: 'Temperatura',
                                        description:
                                            'Menor transferencia de calor o frio. ofreciendo una mayor sensación de comodidad.',
                                    },
                                    {
                                        title: 'Liviano',
                                        description:
                                            'Por su composición es más ligero que el acero.',
                                    },
                                    {
                                        title: 'Dieléctrico',
                                        description:
                                            'Hecho de polímero no conductor de electricidad.',
                                    },
                                ]}
                            />
                        </div>
                        <div className='col-span-1 hidden lg:block w-full'>
                            <img src='/seguridad1.jpg' alt='Seguridad' className='w-full' />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <LandingProductTourSection
                    title='Suelas'
                    description="Existen varios tipos de suela, cada una tiene diferentes características y aplicaciones para diferentes actividades clave del usuario. No significa que una sea mejor que otra, simplemente cada composición tiene un objetivo específico."
                    defaultValue="feature-1"
                >
                    <LandingProductTourContent value="feature-1">
                        <LandingProductTourContent value="feature-1">
                            <div className="w-auto h-64 overflow-hidden mb-10">
                                <img
                                    src="/hule1.png"
                                    alt="Hule"
                                    className="w-full h-full object-contain object-center"
                                />
                            </div>
                            <img
                                src="/hule2.png"
                                alt="Hule"
                                className="w-full h-80 object-contain"
                            />
                        </LandingProductTourContent>
                    </LandingProductTourContent>
                    <LandingProductTourContent value="feature-2">
                        <div className="w-auto h-64 overflow-hidden mb-10">
                            <img src="/acido1.png" alt="Acrilico Nitrilo" className="w-full h-full object-cover object-center" />
                        </div>
                        <img src="/acido2.png" alt="Acrilico Nitrilo" className="w-full h-80 object-contain" />
                    </LandingProductTourContent>
                    <LandingProductTourContent value="feature-3">
                        <div className="w-auto h-64 overflow-hidden mb-10">
                            <img src="/elastomero1.png" alt="Elastomero" className="w-full h-full object-cover object-center" />
                        </div>
                        <img src="/elastomero2.png" alt="Elastomero" className="w-full h-80 object-scale-down" />
                    </LandingProductTourContent>
                    <LandingProductTourContent value="feature-4">
                        <div className="w-auto h-64 overflow-hidden mb-10">
                            <img src="/poli1.png" alt="Poliuretano" className="w-full h-full object-cover object-center" />
                        </div>
                        <img src="/poli2.png" alt="Poliuretano" className="w-full h-80 object-scale-down" />
                    </LandingProductTourContent>
                    <LandingProductTourList>
                        <LandingProductTourTrigger value="feature-1">
                            <p className="text-xl font-bold">
                                Hule
                            </p>
                            <p>
                                Excelente agarre y resistencia en trabajos rudos.
                            </p>
                        </LandingProductTourTrigger>

                        <LandingProductTourTrigger value="feature-2">
                            <p className="text-xl font-bold">
                                Acrilo Nitrilo
                            </p>
                            <p>
                                Resiste altas temperaturas que pueden llegar hasta los 400°, son suelas para trabajos pesados donde pueden existir rebabas de acero y solventes a la vez.
                            </p>
                        </LandingProductTourTrigger>

                        <LandingProductTourTrigger value="feature-3">
                            <p className="text-xl font-bold">
                                Elastómero
                            </p>
                            <p>
                                Muy resistentes y con un alto grado de adherencia, se puede utilizar en lugares donde hay presencia de solventes, químicos, grasas, aceites y abrasivos.
                            </p>
                        </LandingProductTourTrigger>

                        <LandingProductTourTrigger value="feature-4">
                            <p className="text-xl font-bold">
                                Poliuretáno
                            </p>
                            <p>
                                Muy confortable, ligera, durable, antiderrapante. Puede llevar una burbuja de aire en el talón para reducir el impacto contra el suelo.
                            </p>
                        </LandingProductTourTrigger>
                    </LandingProductTourList>

                </LandingProductTourSection>
            </section>
        </motion.article >
    )
}