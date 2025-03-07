"use client";
import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LandingProductHuntAward } from '@/components/landing/social-proof/LandingProductHuntAward';

/**
 * A component meant to be used in the landing page.
 * It displays a title, description and optionally, an image of a product's feature.
 *
 * The image could either be left, right or center (larger).
 * The image can either be shown in perspective or flat.
 * The section can have a background or not.
 */
export const LandingProductFeature = ({
  children,
  className,
  innerClassName,
  title,
  titleComponent,
  description,
  descriptionComponent,
  textPosition = 'left',
  imageSrc,
  imageAlt = '',
  imagePosition = 'right',
  imagePerspective = 'paper',
  imageShadow = 'hard',
  zoomOnHover = true,
  minHeight = 350,
  withBackground = false,
  withBackgroundGlow = false,
  variant = 'primary',
  backgroundGlowVariant = 'primary',
}: {
  children?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  title?: string | React.ReactNode;
  titleComponent?: React.ReactNode;
  description?: string | React.ReactNode;
  descriptionComponent?: React.ReactNode;
  textPosition?: 'center' | 'left';
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right' | 'center';
  imagePerspective?:
  | 'none'
  | 'left'
  | 'right'
  | 'bottom'
  | 'bottom-lg'
  | 'paper';
  imageShadow?: 'none' | 'soft' | 'hard';
  zoomOnHover?: boolean;
  minHeight?: number;
  withBackground?: boolean;
  withBackgroundGlow?: boolean;
  variant?: 'primary' | 'secondary';
  backgroundGlowVariant?: 'primary' | 'secondary';
}) => {
  // Hook de framer-motion para el scroll y transformación
  const { scrollY } = useScroll();
  // Mapea el scroll (0 a 300px) a un desplazamiento en Y (0 a -100px), ajusta según lo que necesites.
  const y = useTransform(scrollY, [0, 350], [-140, -220]);
  const yMobile = useTransform(scrollY, [0, 500], [150, 90]);

  return (
    <section
      className={clsx(
        'w-full h-[80vh] lg:h-[100vh] lg:grid grid-cols-12 p-6',
        withBackground && variant === 'primary'
          ? 'bg-primary-100/20 dark:bg-primary-900/10'
          : '',
        withBackground && variant === 'secondary'
          ? 'bg-secondary-100/20 dark:bg-secondary-900/10'
          : '',
        withBackgroundGlow || imagePerspective !== 'none'
          ? 'relative overflow-hidden'
          : '',
        imagePerspective === 'paper' ? 'md:pb-24' : '',
        className,
      )}
    >

      {/* Fondo con efecto parallax */}
      <motion.div
        className="absolute inset-0 hidden md:block drop-shadow-xl h-[130vh]"
        style={{
          backgroundImage: `url('/GIO15.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          scale: 0.8,
          y: y,
          zIndex: -1,
        }}
      />
      <motion.div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: `url('/GIO15.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'left 50%',
          opacity: 0.4,
          scale: 1.1,
          y: yMobile,
          zIndex: -1,
        }}
      />
      <div className='col-span-6 text-white text-2xl w-full flex pl-6 justify-start lg:justify-end pt-10'>
        <LandingProductHuntAward title='Calzado de Excelencia' />
      </div>

      <div
        className={clsx(
          'w-full p-6 col-span-6',
          imagePosition === 'center'
            ? 'container-narrow'
            : 'max-w-full container-wide',
          innerClassName,
        )}
        style={{
          minHeight,
        }}
      >
        <div>
          {title ? (
            <>
              <h1 className="hidden lg:block text-3xl lg:text-5xl leading-tight font-semibold md:max-w-xl">
                Botas Industriales y{' '}
                <motion.span
                  className="relative inline-block"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                >
                  Calzado de Seguridad
                  <motion.svg
                    className="absolute left-0 right-0 bottom-0"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M 1 1 Q 6 2 18 1 T 50 2"
                      fill="transparent"
                      stroke="#FFBE29"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                    />
                  </motion.svg>
                </motion.span>
              </h1>

              <h1 className="lg:hidden text-3xl lg:text-5xl leading-tight font-semibold md:max-w-xl">
                Botas Industriales y{' '}
                <motion.span
                  className="relative inline-block"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                >
                  Calzado de Seguridad
                  <motion.svg
                    className="absolute left-0 right-0 bottom-1"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M 1 1 Q 1 3 2 2 T 20 1 Q 50 2 50 1"
                      fill="transparent"
                      stroke="#FFBE29"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                    />
                  </motion.svg>
                </motion.span>
              </h1>
            </>
          ) : (
            titleComponent
          )}

          {description ? (
            <p className="mt-4 md:text-xl absolute top-0">{description}</p>
          ) : (
            descriptionComponent
          )}
          {children}
        </div>
      </div>
    </section>
  );
};
