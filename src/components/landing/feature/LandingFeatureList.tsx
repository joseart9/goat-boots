"use client";
import { clsx } from 'clsx';
import { LandingFeature } from '@/components/landing/feature/LandingFeature';
import { GlowBg } from '@/components/shared/ui/glow-bg';
import useDarkMode from '@/app/hooks/useDarkMode';
import { useEffect, useState } from 'react';

export interface FeatureListItem {
  title: string;
  description: string;
  img?: string;
  imgAlt?: string;
  icon?: React.ReactNode;
}

/**
 * A component meant to be used on the landing page.
 * It displays a grid list of features.
 *
 * Each feature has a title, description and icon.
 */
export const LandingFeatureList = ({
  className,
  title,
  titleComponent,
  description,
  descriptionComponent,
  featureItems,
  withBackground = false,
  withBackgroundGlow = false,
  variant = 'primary',
  backgroundGlowVariant = 'primary',
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  titleComponent?: React.ReactNode;
  description?: string | React.ReactNode;
  descriptionComponent?: React.ReactNode;
  featureItems: FeatureListItem[];
  withBackground?: boolean;
  withBackgroundGlow?: boolean;
  variant?: 'primary' | 'secondary';
  backgroundGlowVariant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}) => {
  const isDarkMode = useDarkMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <section
      className={clsx(
        'relative w-full flex justify-center items-center gap-8 py-12 lg:py-16 flex-col',
        withBackground && variant === 'primary'
          ? 'bg-primary-100/20 dark:bg-primary-900/10'
          : '',
        withBackground && variant === 'secondary'
          ? 'bg-secondary-100/20 dark:bg-secondary-900/10'
          : '',
        withBackgroundGlow ? 'overflow-hidden' : '',
        className,
      )}
      style={{
        backgroundImage: `${isDarkMode ? "url('/textura1.png')" : "url('/textura2.png')"}`,
        backgroundBlendMode: "overlay",
        backgroundPosition: "center",
        WebkitClipPath:
          "polygon(0% 0%, 100% 0%, 100% 91.07%, 75% 91.07%, 75% 94.04%, 50% 94.04%, 50% 97.02%, 25% 97.02%, 25% 100%, 0% 100%)"
      }}
    >
      {withBackgroundGlow ? (
        <div className="hidden lg:flex justify-center w-full h-full absolute -bottom-1/2">
          <GlowBg
            className={clsx('w-full lg:w-2/3 h-auto z-0')}
            variant={backgroundGlowVariant}
          />
        </div>
      ) : null}

      <div
        className={clsx('w-full p-6 max-w-full container-wide relative z-10')}
      >
        {title ? (
          <h2 className="text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading">
            {title}
          </h2>
        ) : (
          titleComponent
        )}

        {description ? (
          <p className="mt-6 md:text-xl leading-loose text-secondary-300">{description}</p>
        ) : (
          descriptionComponent
        )}

        <div className="mt-12 flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 mb-12">
          {featureItems.map((featureItem, index) => (
            <LandingFeature
              key={index}
              title={featureItem.title}
              description={featureItem.description}
              img={featureItem.img}
              imgAlt={featureItem.imgAlt}
              variant={variant}
              icon={icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
