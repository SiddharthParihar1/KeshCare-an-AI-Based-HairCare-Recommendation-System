import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SCALP_CONDITIONS } from '../../constants/hairData';

const scalpDescriptions = {
  normal: 'Balanced moisture, no major issues',
  oily: 'Excess sebum, feels greasy quickly',
  dry: 'Tight, flaky, lacks moisture',
  sensitive: 'Easily irritated, prone to redness',
  dandruff: 'White/yellow flakes, may itch',
  combination: 'Oily roots, dry or normal ends',
};

function StepTwo({ watch, setValue, errors }) {
  const scalpCondition = watch('scalpCondition');

  return (
    <fieldset>
      <legend className="mb-4 text-sm font-semibold text-[var(--color-text)]">
        How does your scalp feel most days?
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {SCALP_CONDITIONS.map((condition) => {
          const selected = scalpCondition === condition.id;
          return (
            <motion.button
              key={condition.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              className={`selection-card text-left ${selected ? 'selected' : ''}`}
              onClick={() => setValue('scalpCondition', condition.id, { shouldValidate: true })}
              aria-pressed={selected}
            >
              {selected && (
                <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-[var(--color-primary)]" />
              )}
              <span className="text-2xl" role="img" aria-label={condition.label}>{condition.icon}</span>
              <p className="mt-2 font-semibold text-[var(--color-text)]">{condition.label}</p>
              <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                {scalpDescriptions[condition.id] ?? ''}
              </p>
            </motion.button>
          );
        })}
      </div>
      {errors.scalpCondition && (
        <p className="mt-2 text-sm text-[var(--color-error)]" role="alert">{errors.scalpCondition.message}</p>
      )}
    </fieldset>
  );
}

export default StepTwo;
