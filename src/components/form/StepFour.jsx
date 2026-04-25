import { motion } from 'framer-motion';
import { LIFESTYLE_FACTORS, WASH_FREQUENCIES, WATER_TYPES } from '../../constants/hairData';

function StepFour({ watch, setValue, register, errors }) {
  const selectedLifestyle = watch('lifestyle') ?? [];

  const toggleLifestyle = (id) => {
    const next = selectedLifestyle.includes(id)
      ? selectedLifestyle.filter((item) => item !== id)
      : [...selectedLifestyle, id];
    setValue('lifestyle', next, { shouldValidate: true });
  };

  return (
    <div className="space-y-7">
      {/* Lifestyle */}
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-[var(--color-text)]">
          Which lifestyle factors apply to you?{' '}
          <span className="font-normal text-[var(--color-text-faint)]">(optional)</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {LIFESTYLE_FACTORS.map((factor) => {
            const selected = selectedLifestyle.includes(factor.id);
            return (
              <motion.button
                key={factor.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleLifestyle(factor.id)}
                aria-pressed={selected}
                className={[
                  'flex cursor-pointer items-center gap-3 rounded-[var(--radius-lg)] border-2 px-3.5 py-3 text-sm font-medium transition-all duration-200',
                  selected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-text)]'
                    : 'border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-primary-soft)]',
                ].join(' ')}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-base transition-colors ${
                    selected ? 'bg-[var(--color-primary-pale)]' : 'bg-[var(--color-surface-2)]'
                  }`}
                  role="img"
                  aria-label={factor.label}
                >
                  {factor.icon}
                </span>
                {factor.label}
              </motion.button>
            );
          })}
        </div>
      </fieldset>

      {/* Wash frequency + Water type */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="washFrequency" className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
            How often do you wash your hair?
          </label>
          <select
            id="washFrequency"
            className="form-input cursor-pointer"
            value={watch('washFrequency')}
            onChange={(e) => setValue('washFrequency', e.target.value, { shouldValidate: true })}
          >
            <option value="">Select frequency…</option>
            {WASH_FREQUENCIES.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
          {errors.washFrequency && (
            <p className="mt-1.5 text-xs text-[var(--color-error)]" role="alert">{errors.washFrequency.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="waterType" className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
            What type of water do you use?
          </label>
          <select
            id="waterType"
            className="form-input cursor-pointer"
            value={watch('waterType')}
            onChange={(e) => setValue('waterType', e.target.value, { shouldValidate: true })}
          >
            <option value="">Select water type…</option>
            {WATER_TYPES.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
          {errors.waterType && (
            <p className="mt-1.5 text-xs text-[var(--color-error)]" role="alert">{errors.waterType.message}</p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
          Anything else we should know?{' '}
          <span className="font-normal text-[var(--color-text-faint)]">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={3}
          maxLength={500}
          className="form-input resize-none"
          placeholder="E.g. I color my hair, I have a thyroid condition, I recently started a new shampoo…"
          {...register('notes')}
        />
        <div className="mt-1 flex justify-between">
          {errors.notes ? (
            <p className="text-xs text-[var(--color-error)]" role="alert">{errors.notes.message}</p>
          ) : (
            <span />
          )}
          <p className="text-xs text-[var(--color-text-faint)]">
            {(watch('notes') ?? '').length}/500
          </p>
        </div>
      </div>
    </div>
  );
}

export default StepFour;
