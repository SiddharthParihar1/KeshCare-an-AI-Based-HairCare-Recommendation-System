import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { HAIR_PROBLEMS } from '../../constants/hairData';

function StepThree({ watch, setValue, errors }) {
  const selectedProblems = watch('problems') ?? [];

  const toggleProblem = (id) => {
    const next = selectedProblems.includes(id)
      ? selectedProblems.filter((item) => item !== id)
      : [...selectedProblems, id];
    setValue('problems', next, { shouldValidate: true });
  };

  return (
    <fieldset>
      <div className="mb-4 flex items-center justify-between">
        <legend className="text-sm font-semibold text-[var(--color-text)]">
          Select all that apply to your hair
        </legend>
        {selectedProblems.length > 0 && (
          <span className="rounded-full bg-[var(--color-primary-pale)] px-2.5 py-1 text-xs font-semibold text-[var(--color-primary)]">
            {selectedProblems.length} selected
          </span>
        )}
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {HAIR_PROBLEMS.map((problem) => {
          const selected = selectedProblems.includes(problem.id);
          return (
            <motion.button
              key={problem.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleProblem(problem.id)}
              aria-pressed={selected}
              className={[
                'relative flex cursor-pointer items-center gap-3 rounded-[var(--radius-lg)] border-2 px-4 py-3 text-left text-sm font-medium transition-all duration-200',
                selected
                  ? 'border-[var(--color-primary)] bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-primary-soft)]/5 text-[var(--color-text)]'
                  : 'border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-primary-soft)]',
              ].join(' ')}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-base transition-colors ${
                  selected ? 'bg-[var(--color-primary-pale)]' : 'bg-[var(--color-surface-2)]'
                }`}
                role="img"
                aria-label={problem.label}
              >
                {problem.icon}
              </span>
              <span>{problem.label}</span>
              {selected && (
                <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-[var(--color-primary)]" />
              )}
            </motion.button>
          );
        })}
      </div>

      {errors.problems && (
        <p className="mt-3 text-sm text-[var(--color-error)]" role="alert">{errors.problems.message}</p>
      )}
      {!errors.problems && selectedProblems.length === 0 && (
        <p className="mt-3 text-xs text-[var(--color-text-faint)]">Select at least one concern to continue</p>
      )}
    </fieldset>
  );
}

export default StepThree;
