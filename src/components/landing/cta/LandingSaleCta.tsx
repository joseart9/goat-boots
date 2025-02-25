import clsx from 'clsx';
import { Button } from '@/components/shared/ui/button';
import { GlowBg } from '@/components/shared/ui/glow-bg';
import Link from 'next/link';

/**
 * A component meant to be used in the landing page.
 *
 * A simple section that shows a selling point and call to action button.
 */
export const LandingSaleCtaSection = ({
  children,
  className,
  title,
  titleComponent,
  description,
  descriptionComponent,
  footerComponent,
  ctaHref = '#',
  ctaLabel,
  secondaryCtaHref = '#',
  secondaryCtaLabel,
  withBackground = false,
  withBackgroundGlow = false,
  variant = 'primary',
  backgroundGlowVariant = 'primary',
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  titleComponent?: React.ReactNode;
  description?: string | React.ReactNode;
  descriptionComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
  withBackground?: boolean;
  withBackgroundGlow?: boolean;
  variant?: 'primary' | 'secondary';
  backgroundGlowVariant?: 'primary' | 'secondary';
}) => {
  return (
    <section
      className={clsx(
        'relative w-full flex flex-col justify-center items-center gap-8 py-12 lg:py-16',
        withBackground && variant === 'primary'
          ? 'bg-primary-100/20 dark:bg-primary-900/10'
          : '',
        withBackground && variant === 'secondary'
          ? 'bg-secondary-100/20 dark:bg-secondary-900/10'
          : '',
        withBackgroundGlow ? 'overflow-hidden' : '',
        className,
      )}
    >
      {withBackgroundGlow ? (
        <div className="hidden lg:flex justify-center w-full h-full absolute -bottom-1/2 pointer-events-none">
          <GlowBg
            className={clsx('w-full lg:w-2/3 h-auto z-0')}
            variant={backgroundGlowVariant}
          />
        </div>
      ) : null}

      <div className={clsx(className, 'w-full p-6 container-wide')}>
        {title ? (
          <h2 className="text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading">
            {title}
          </h2>
        ) : (
          titleComponent
        )}

        {description ? (
          <p className="mt-6 md:text-xl text-secondary-300">{description}</p>
        ) : (
          descriptionComponent
        )}

        <div className="mt-6 flex flex-wrap gap-4 w-full items-center">
          {ctaLabel ? (
            <Button size="xl" className="bg-primary-500 hover:scale-110 transition-all duration-300 shrink-0" asChild variant={variant} >
              <Link href="/catalogo">Catálogo</Link>
            </Button>
          ) : null}

          {secondaryCtaLabel ? (
            <Button className="mt-2 bg-primary-500 hover:scale-110 transition-all duration-300" asChild>
              <Link href="/catalogo">Catálogo</Link>
            </Button>
          ) : null}

          {children}
        </div>

        {footerComponent}
      </div>
    </section>
  );
};
