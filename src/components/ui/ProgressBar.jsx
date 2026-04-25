import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

function ProgressBar({ currentStep, totalSteps, labels = [] }) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      <div className="relative mb-3 h-2 w-full rounded-full bg-[var(--color-border)]">
        <motion.div
          layoutId="progress-fill"
          className="h-2 rounded-full bg-[var(--color-primary)]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const step = idx + 1;
          const state = step < currentStep ? 'done' : step === currentStep ? 'active' : 'upcoming';

          return (
            <div key={step} className="flex flex-col items-center gap-2 text-center">
              <div
                className={`relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                  state === 'done'
                    ? 'bg-[var(--color-primary)] text-white'
                    : state === 'active'
                      ? 'bg-white text-[var(--color-primary)] ring-2 ring-[var(--color-primary)]'
                      : 'bg-slate-100 text-slate-500'
                }`}
              >
                {state === 'active' ? <span className="absolute inset-0 rounded-full animate-pulse-ring" /> : null}
                {state === 'done' ? <Check className="h-4 w-4" /> : step}
              </div>
              <span className="text-xs font-medium text-[var(--color-text-muted)]">{labels[idx]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;
