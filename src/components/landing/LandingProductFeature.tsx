"use client";
import clsx from 'clsx';
import Image from '@/components/shared/Image';
import { GlowBg } from '@/components/shared/ui/glow-bg';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const y = useTransform(scrollY, [0, 400], [0, -110]);

  return (
    <section
      className={clsx(
        'w-full flex flex-col justify-center items-center gap-8 py-12 lg:py-16',
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
      style={{
        // backgroundImage: `url('/GIO15.png')`,
        // backgroundSize: 'cover',
        height: `130vh`,
      }}
    >

      {/* Fondo con efecto parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/GIO15.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          y: y,
          zIndex: -1,
        }}
      />
      {imageSrc && withBackgroundGlow ? (
        <div className="hidden lg:flex justify-center w-full h-full absolute pointer-events-none">
          <GlowBg
            className={clsx(
              'w-full lg:w-1/2 h-auto z-0 dark:opacity-50',
              imagePosition === 'center' ? 'top-5' : ' -top-1/3',
              imagePerspective === 'paper' ? 'opacity-70' : 'opacity-100',
            )}
            variant={backgroundGlowVariant}
          />
        </div>
      ) : null}

      <div
        className={clsx(
          'w-full p-6 flex flex-col items-center relative',
          imagePosition === 'center'
            ? 'container-narrow'
            : 'max-w-full container-wide grid lg:grid-cols-2',
          innerClassName,
        )}
        style={{
          minHeight,
        }}
      >
        <div
          className={clsx(
            'flex flex-col gap-4',
            imagePosition === 'left' && 'lg:col-start-2 lg:row-start-1',
            textPosition === 'center'
              ? 'md:max-w-lg items-center text-center'
              : 'items-start',
          )}
        >
          {title ? (
            <h1 className="text-4xl lg:text-5xl leading-tight font-semibold md:max-w-xl md:-mt-60 xl:-mt-96">
              Botas Industriales y{' '}
              <motion.span
                className="relative inline-block"
                // Si prefieres que se anime al cargar, usa animate directamente.
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              // Si deseas que la animación se active con hover, comenta las props anteriores y usa:
              // whileHover={{ pathLength: 1 }}
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
          ) : (
            titleComponent
          )}

          {description ? (
            <p className="mt-4 md:text-xl">{description}</p>
          ) : (
            descriptionComponent
          )}

          {children}
        </div>

        {imageSrc ? (
          <>
            {imagePosition === 'center' ? (
              <section className="w-full mt-auto pt-4 md:pt-6">
                <Image
                  className={clsx(
                    'w-full rounded-md overflow-hidden',
                    imageShadow === 'soft' && 'shadow-md',
                    imageShadow === 'hard' && 'hard-shadow',
                  )}
                  src={imageSrc}
                  alt={imageAlt}
                  width={minHeight + 75}
                  height={minHeight + 75}
                />
              </section>
            ) : null}

            {imagePosition === 'left' || imagePosition === 'right' ? (
              <Image
                className={clsx(
                  'relative w-full hidden md:block rounded-2xl ',
                  zoomOnHover ? 'hover:scale-100 transition-all' : '',
                  imageShadow === 'soft' && 'drop-shadow-md',
                  imageShadow === 'hard' && 'drop-shadow-lg',
                  imagePosition === 'left' && 'lg:-left-6',
                  imagePosition === 'right' && 'lg:-right-6',
                  imagePerspective === 'left' && 'lg:perspective-left',
                  imagePerspective === 'right' && 'lg:perspective-right',
                  imagePerspective === 'bottom' && 'lg:perspective-bottom',
                  imagePerspective === 'bottom-lg' &&
                  'lg:perspective-bottom-lg',
                  imagePerspective === 'paper' &&
                  'lg:perspective-paper hover:scale-90',
                  imagePerspective === 'none' ? 'my-4' : 'my-8',
                )}
                alt={imageAlt}
                src={imageSrc}
                width={minHeight + 75}
                height={minHeight + 75}
              />
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
};
