import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

function FormStepper({ currentStep, totalSteps, onStepClick }) {
  return (
    <div className="flex items-center gap-1.5" aria-label="Assessment progress">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const step = i + 1;
        const done = step < currentStep;
        const active = step === currentStep;

        return (
          <button
            key={step}
            type="button"
            onClick={() => onStepClick?.(step)}
            disabled={step > currentStep}
            aria-label={`Step ${step}`}
            aria-current={active ? 'step' : undefined}
            className={[
              'relative flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer disabled:cursor-default',
              done
                ? 'h-7 w-7 bg-[var(--color-primary)] text-white'
                : active
                ? 'h-7 w-7 border-2 border-[var(--color-primary)] bg-white'
                : 'h-6 w-6 border-2 border-[var(--color-border)] bg-white opacity-60',
            ].join(' ')}
          >
            {done ? (
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            ) : (
              <span className={`text-xs font-bold ${active ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-faint)]'}`}>
                {step}
              </span>
            )}
            {active && (
              <motion.span
                layoutId="step-ring"
                className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default FormStepper;
