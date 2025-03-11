"use client";
import { LandingFeature } from '@/components/landing/feature/LandingFeature';
import { SlBadge } from "react-icons/sl";
import { MdOutlineLocalPolice } from "react-icons/md";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { motion } from 'framer-motion';
import SaleCTA from '../components/sale_cta';


export default function Nosotros() {
    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='relative w-full flex flex-col justify-center items-center gap-8 py-12 lg:py-16'>
            <div className='flex items-start justify-start w-full px-4 container-wide lg:pl-2 text-5xl lg:text-8xl pb-10 lg:pb-24'>
                <div className='absolute'>
                    <h2 className='relative z-0 font-bold text-primary-500/25'>
                        Nosotros
                    </h2>
                    <h2 className='relative -top-11 lg:-top-[90px] left-1 z-10 font-bold text-primary-500'>
                        Nosotros
                    </h2>
                </div>
            </div>

            <section className='w-full p-6 container-wide flex flex-col space-y-32'>
                <div>
                    <h2 className='text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading'>
                        Marca <span className='text-primary-500'>100%</span> Mexicana
                    </h2>
                    <div className='max-w-5xl'>
                        <p className='mt-8 text-secondary-400 text-lg leading-loose'>
                            Nos enorgullece ser una <span className='text-primary-500'>empresa 100% mexicana</span>, desde nuestra fundación hasta cada paso que damos hoy.
                        </p>
                        <p className='mt-4 text-secondary-400 text-lg leading-loose'>
                            Todo nuestro proceso, desde la ideación de producto hasta la producción de cada par de calzado ayuda a sustentar una familia mexicana.
                        </p>
                    </div>
                </div>
                <div>
                    <div className='w-screen relative left-1/2 -translate-x-1/2 flex flex-col'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='flex fill-primary-100/25 dark:fill-primary-500/70'>
                            <path fillOpacity="1" d="M0,96L48,122.7C96,149,192,203,288,208C384,213,480,171,576,133.3C672,96,768,64,864,80C960,96,1056,160,1152,197.3C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        </svg>
                    </div>
                    <div className="w-screen relative left-1/2 -translate-x-1/2 flex flex-col bg-primary-100/25 dark:bg-primary-500/70">
                        <div className="flex flex-col lg:grid grid-cols-2 lg:gap-8 relative container-wide w-full mx-auto p-6">
                            <div className='col-span-1'>
                                <h2 className='text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading'>
                                    Nuestra <span className='text-primary-500 dark:text-secondary-500'>misión</span>
                                </h2>
                                <p className='mt-8 text-secondary-400 text-lg leading-loose dark:text-white'>
                                    Proporcionar calzado industrial de la más alta calidad, diseñado para resistir los desafíos más exigentes en entornos laborales, asegurando la seguridad y comodidad de los trabajadores.
                                </p>
                                <p className='mt-4 text-secondary-400 text-lg leading-loose dark:text-white'>
                                    Nos comprometemos a innovar constantemente, a mantener estándares rigurosos de fabricación y a contribuir al bienestar de la comunidad laboral mediante productos confiables y duraderos.
                                </p>
                            </div>
                            <div className='col-span-1 lg:px-0 pt-12 lg:pt-0 lg:mt-48'>
                                <h2 className='text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading'>
                                    Nuestra <span className='text-primary-500 dark:text-secondary-500'>visión</span>
                                </h2>
                                <p className='mt-8 text-secondary-400 text-lg leading-loose dark:text-white'>
                                    Ser reconocidos como líderes en la fabricación de calzado industrial a nivel nacional e internacional, siendo la opción preferida por la excelencia en calidad, diseño ergonómico y compromiso con la seguridad.
                                </p>
                                <p className='mt-4 text-secondary-400 text-lg leading-loose dark:text-white'>
                                    Buscamos transformar la experiencia de quienes trabajan en entornos desafiantes al proporcionar calzado que no solo protege, sino que también inspira confianza y productividad.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='w-screen relative left-1/2 -translate-x-1/2 flex flex-col'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='flex fill-primary-100/25 dark:dark:fill-primary-500/70'>
                            <path fillOpacity="1" d="M0,256L48,266.7C96,277,192,299,288,282.7C384,267,480,213,576,181.3C672,149,768,139,864,149.3C960,160,1056,192,1152,208C1248,224,1344,224,1392,224L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                        </svg>
                    </div>
                </div>

                <div className='flex flex-col gap-8'>
                    <h2 className="text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading break-words">
                        Calzado resistente, <span className="text-primary-500">valores</span> incuestionables.
                    </h2>
                    <div className='flex flex-col lg:grid grid-cols-3 gap-6 px-4'>
                        <div className='col-span-1'>
                            <LandingFeature
                                title="Calidad"
                                description="Compromiso con la excelencia en la fabricación de calzado que cumple con los estándares mas altos de durabilidad y rendimiento."
                                icon={<SlBadge className='size-48' />}
                            />
                        </div>
                        <div className='col-span-1'>
                            <LandingFeature
                                title="Seguridad"
                                description="Sobrepasamos los estándares de la Norma Oficial Mexicana, garantizando la seguridad de los trabajadores en diversos entornos laborales."
                                icon={<MdOutlineLocalPolice className='size-48' />}
                            />
                        </div>
                        <div className='col-span-1'>
                            <LandingFeature
                                title="Responsabilidad"
                                description="Compromiso con prácticas comerciales sostenibles y éticas."
                                icon={<LiaPeopleCarrySolid className='size-48' />}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <SaleCTA />
        </motion.article >
    )
}