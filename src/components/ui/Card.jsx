import { motion } from 'framer-motion';

const variantClasses = {
  default:  'bg-[var(--color-surface)] shadow-[var(--shadow-card)]',
  elevated: 'bg-[var(--color-surface)] shadow-[var(--shadow-md)]',
  bordered: 'bg-[var(--color-surface)] border border-[var(--color-border)]',
  glass:    'glass',
  flat:     'bg-[var(--color-bg-alt)]',
  primary:  'bg-[var(--color-primary)] text-white',
  gradient: 'bg-gradient-to-br from-white to-[var(--color-bg-alt)] border border-[var(--color-border)]',
};

function Card({ children, className = '', variant = 'default', hover = false, as: Tag = 'article', ...props }) {
  const base = [
    'rounded-[var(--radius-xl)] p-5 sm:p-6',
    variantClasses[variant] ?? variantClasses.default,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (hover) {
    return (
      <motion.article
        whileHover={{ y: -3, boxShadow: 'var(--shadow-card-hover)' }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className={base}
        {...props}
      >
        {children}
      </motion.article>
    );
  }

  return (
    <Tag className={base} {...props}>
      {children}
    </Tag>
  );
}

export default Card;
