const toneClasses = {
  primary: 'bg-[var(--color-primary-pale)] text-[var(--color-primary)] border border-[var(--color-primary-pale)]',
  success: 'bg-[var(--color-success-bg)] text-[var(--color-success)] border border-green-200',
  warning: 'bg-[var(--color-warning-bg)] text-[var(--color-warning)] border border-amber-200',
  error:   'bg-[var(--color-error-bg)] text-[var(--color-error)] border border-red-200',
  neutral: 'bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border border-[var(--color-border)]',
  accent:  'bg-[var(--color-accent-pale)] text-[var(--color-accent)] border border-amber-200',
  dark:    'bg-[var(--color-primary)] text-white border border-transparent',
};

function Badge({ children, tone = 'primary', className = '', dot = false }) {
  return (
    <span
      className={[
        'badge-pill',
        toneClasses[tone] ?? toneClasses.neutral,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

export default Badge;
