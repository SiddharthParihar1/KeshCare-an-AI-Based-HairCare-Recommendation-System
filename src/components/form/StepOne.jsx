import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { HAIR_TEXTURES, HAIR_TYPES } from '../../constants/hairData';

function StepOne({ watch, setValue, errors }) {
  const hairType = watch('hairType');
  const hairTexture = watch('hairTexture');

  return (
    <div className="space-y-8">
      {/* Hair Type */}
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-[var(--color-text)]">
          What is your natural hair type?
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {HAIR_TYPES.map((type) => {
            const selected = hairType === type.id;
            return (
              <motion.button
                key={type.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                className={`selection-card text-left ${selected ? 'selected' : ''}`}
                onClick={() => setValue('hairType', type.id, { shouldValidate: true })}
                aria-pressed={selected}
              >
                {selected && (
                  <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-[var(--color-primary)]" />
                )}
                <span className="text-2xl" role="img" aria-label={type.label}>{type.icon}</span>
                <p className="mt-2 font-semibold text-[var(--color-text)]">{type.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-text-muted)]">{type.description}</p>
              </motion.button>
            );
          })}
        </div>
        {errors.hairType && (
          <p className="mt-2 text-sm text-[var(--color-error)]" role="alert">{errors.hairType.message}</p>
        )}
      </fieldset>

      {/* Hair Texture */}
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-[var(--color-text)]">
          What is your hair texture / thickness?
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {HAIR_TEXTURES.map((texture) => {
            const selected = hairTexture === texture.id;
            return (
              <button
                key={texture.id}
                type="button"
                className={`cursor-pointer rounded-[var(--radius-full)] border-2 px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  selected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-sm'
                    : 'border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-primary-soft)]'
                }`}
                onClick={() => setValue('hairTexture', texture.id, { shouldValidate: true })}
                aria-pressed={selected}
              >
                {texture.label}
              </button>
            );
          })}
        </div>
        {errors.hairTexture && (
          <p className="mt-2 text-sm text-[var(--color-error)]" role="alert">{errors.hairTexture.message}</p>
        )}
      </fieldset>
    </div>
  );
}

export default StepOne;
