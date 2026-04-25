import { Info } from 'lucide-react';

function Tooltip({ text }) {
  return (
    <span className="group relative inline-flex items-center">
      <Info className="h-4 w-4 text-[var(--color-text-muted)]" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-48 -translate-x-1/2 rounded-md bg-[var(--color-text)] px-3 py-2 text-xs text-white group-hover:block group-focus-within:block">
        {text}
      </span>
    </span>
  );
}

export default Tooltip;
