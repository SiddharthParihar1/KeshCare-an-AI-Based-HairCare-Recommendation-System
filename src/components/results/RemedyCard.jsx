import { useState } from 'react';
import {
  AlertTriangle, CheckCircle2, Clock3, TrendingUp, ChevronDown,
  ChevronUp, Leaf, Beaker,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Badge from '../ui/Badge';

const difficultyConfig = {
  Easy:     { tone: 'success', label: 'Easy' },
  Medium:   { tone: 'warning', label: 'Medium' },
  Advanced: { tone: 'neutral', label: 'Advanced' },
};

const categoryColors = {
  'Hair Mask':     'bg-purple-50 text-purple-700 border-purple-200',
  'Oil Treatment': 'bg-amber-50 text-amber-700 border-amber-200',
  'Scalp Scrub':   'bg-orange-50 text-orange-700 border-orange-200',
  'Herbal Rinse':  'bg-teal-50 text-teal-700 border-teal-200',
  'Dietary':       'bg-green-50 text-green-700 border-green-200',
};

function RemedyCard({ remedy, index }) {
  const [expanded, setExpanded] = useState(false);
  const diff = difficultyConfig[remedy.difficulty] ?? { tone: 'neutral', label: remedy.difficulty };
  const catStyle = categoryColors[remedy.category] ?? 'bg-[var(--color-primary-pale)] text-[var(--color-primary)] border-[var(--color-border)]';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.45 }}
      className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]"
    >
      {/* Card header */}
      <div className="p-5 sm:p-6">
        {/* Top row */}
        <div className="flex flex-wrap items-start gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary-pale)]">
            <Leaf className="h-5 w-5 text-[var(--color-primary)]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-[var(--color-text)] leading-tight">{remedy.name}</h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${catStyle}`}>
                {remedy.category}
              </span>
              <Badge tone={diff.tone}>{diff.label}</Badge>
            </div>
          </div>
        </div>

        {/* Target problems */}
        {remedy.targetProblems?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {remedy.targetProblems.map((p) => (
              <span
                key={p}
                className="rounded-full bg-[var(--color-surface-2)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-muted)]"
              >
                {p}
              </span>
            ))}
          </div>
        )}

        {/* Meta row */}
        <div className="mt-4 grid grid-cols-3 gap-3 rounded-[var(--radius-lg)] bg-[var(--color-bg-alt)] p-3 text-xs">
          <div className="flex flex-col items-center gap-1 text-center">
            <Clock3 className="h-4 w-4 text-[var(--color-text-faint)]" />
            <span className="font-semibold text-[var(--color-text)]">{remedy.prepTime}</span>
            <span className="text-[var(--color-text-faint)]">Prep</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-[var(--color-border)] text-center">
            <span className="text-base">📅</span>
            <span className="font-semibold text-[var(--color-text)]">{remedy.frequency}</span>
            <span className="text-[var(--color-text-faint)]">Frequency</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <TrendingUp className="h-4 w-4 text-[var(--color-text-faint)]" />
            <span className="font-semibold text-[var(--color-text)]">{remedy.resultTimeline}</span>
            <span className="text-[var(--color-text-faint)]">Results</span>
          </div>
        </div>

        {/* Toggle ingredients */}
        <button
          type="button"
          onClick={() => setExpanded((s) => !s)}
          className="mt-4 flex w-full cursor-pointer items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-pale)]"
          aria-expanded={expanded}
        >
          <span className="flex items-center gap-2">
            <Beaker className="h-4 w-4" />
            {expanded ? 'Hide Ingredients' : `Show Ingredients (${remedy.ingredients?.length ?? 0})`}
          </span>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {/* Ingredients */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-2">
                {remedy.ingredients?.map((ing) => (
                  <div
                    key={ing.name}
                    className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-alt)] px-3 py-2.5"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-sm font-semibold text-[var(--color-text)]">{ing.name}</span>
                        <span className="text-xs font-medium text-[var(--color-primary)]">{ing.quantity}</span>
                      </div>
                      {ing.role && (
                        <p className="mt-0.5 text-xs text-[var(--color-text-faint)]">{ing.role}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructions */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-alt)] px-5 py-4 sm:px-6">
        <h4 className="mb-3 text-sm font-semibold text-[var(--color-text)]">Instructions</h4>
        <ol className="space-y-3">
          {remedy.instructions?.map((inst, i) => (
            <li key={inst.step ?? i} className="flex gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
                {inst.step ?? i + 1}
              </span>
              <span className="leading-relaxed text-[var(--color-text-muted)] pt-0.5">{inst.action}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Benefits */}
      {remedy.benefits?.length > 0 && (
        <div className="border-t border-[var(--color-border)] px-5 py-4 sm:px-6">
          <h4 className="mb-3 text-sm font-semibold text-[var(--color-text)]">Benefits</h4>
          <ul className="space-y-2">
            {remedy.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {remedy.warnings?.length > 0 && (
        <div className="border-t border-amber-200 bg-[var(--color-warning-bg)] px-5 py-4 sm:px-6">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-800">
            <AlertTriangle className="h-4 w-4" />
            Caution
          </p>
          <ul className="space-y-1">
            {remedy.warnings.map((warning) => (
              <li key={warning} className="flex items-start gap-2 text-xs text-amber-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ayurvedic basis */}
      {remedy.ayurvedicBasis && (
        <div className="border-t border-[var(--color-border)] px-5 py-4 sm:px-6">
          <blockquote className="border-l-4 border-[var(--color-primary-soft)] pl-4 text-sm italic leading-relaxed text-[var(--color-text-muted)]">
            {remedy.ayurvedicBasis}
          </blockquote>
        </div>
      )}
    </motion.article>
  );
}

export default RemedyCard;
