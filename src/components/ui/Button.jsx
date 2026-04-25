import { Loader2 } from 'lucide-react';

const variantClasses = {
  primary:
    'bg-[var(--color-primary)] text-white shadow-sm hover:bg-[var(--color-primary-mid)] hover:shadow-md active:brightness-90',
  secondary:
    'border-2 border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-primary-soft)] hover:bg-[var(--color-bg-alt)]',
  ghost:
    'bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary-pale)]',
  outline:
    'border-2 border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary-pale)]',
  danger:
    'bg-[var(--color-error)] text-white shadow-sm hover:brightness-90 active:brightness-80',
  'primary-light':
    'bg-[var(--color-primary-pale)] text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] hover:text-white',
  white:
    'bg-white text-[var(--color-primary)] shadow-sm hover:bg-[var(--color-primary-pale)] active:brightness-95',
};

const sizeClasses = {
  xs: 'px-3 py-1.5 text-xs gap-1.5',
  sm: 'px-3.5 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm sm:text-[0.9375rem] gap-2',
  lg: 'px-7 py-3.5 text-base gap-2',
  xl: 'px-8 py-4 text-lg gap-2.5',
};

function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      type="button"
      className={[
        'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius-md)] font-semibold',
        'transition-all duration-200 active:scale-[0.97] select-none',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant] ?? variantClasses.primary,
        sizeClasses[size] ?? sizeClasses.md,
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
      ) : null}
      {children}
    </button>
  );
}

export default Button;
