import clsx from 'clsx';

/**
 * This component is meant to be used in the landing page, in the features list.
 *
 * Describes a single feature, with a title, description and icon.
 * Use this to highlight a feature or key aspect of your product.
 */
export const LandingFeature = ({
  className,
  title,
  description,
  img,
  imgAlt,
  variant = 'primary',
  icon,
}: {
  className?: string;
  title: string;
  description: string;
  img?: string;
  imgAlt?: string
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}) => {
  return (
    <div className={clsx('flex flex-col gap-4 py-4', className)}>
      <div
        className={clsx(
          'flex items-center justify-center aspect-square rounded-md ',
          variant === 'primary'
            ? 'bg-primary-500/25 dark:border-primary-500 dark:bg-primary-500/70 text-primary-500'
            : 'bg-secondary-100/30 border border-secondary-100/70 dark:border-secondary-900 dark:bg-secondary-900/70 text-secondary-500',
        )}
        aria-describedby="icon"
      >
        {icon}

        <img src={img} alt={imgAlt} />
      </div>

      <h3 className="text-3xl font-semibold text-center">{title}</h3>
      <p className="text-lg text-gray-800 text-secondary-300 leading-relaxed text-center">{description}</p>
    </div>
  );
};
