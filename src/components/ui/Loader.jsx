import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';

const cycleMessages = [
  'Analyzing your hair profile…',
  'Consulting Ayurvedic wisdom…',
  'Matching your unique concerns…',
  'Crafting natural remedies…',
  'Finalizing your plan…',
];

function Loader({ fullscreen = false, message }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgId = setInterval(() => setIndex((v) => (v + 1) % cycleMessages.length), 2200);
    return () => clearInterval(msgId);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const duration = 11000;
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(92, (elapsed / duration) * 100));
      if (elapsed >= duration) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, []);

  const content = (
    <div className="flex max-w-sm flex-col items-center gap-6 rounded-[var(--radius-2xl)] bg-white p-10 text-center shadow-[var(--shadow-xl)]">
      {/* Animated leaf icon */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-[var(--color-primary-pale)] animate-pulse-soft" />
        <span className="absolute inset-2 rounded-full bg-[var(--color-primary-pale)]" />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]">
          <Leaf className="h-6 w-6 text-white animate-leaf-sway" aria-hidden="true" />
        </div>
      </div>

      {/* Cycling message */}
      <div className="h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-base font-medium text-[var(--color-text)]"
          >
            {message || cycleMessages[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="w-full overflow-hidden rounded-full bg-[var(--color-surface-2)] h-1.5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-soft)]"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2, ease: 'linear' }}
        />
      </div>

      <p className="text-xs text-[var(--color-text-faint)]">
        Powered by Gemini AI · Ayurvedic principles
      </p>
    </div>
  );

  if (fullscreen) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg)]/90 backdrop-blur-sm"
        role="status"
        aria-live="polite"
        aria-label="Loading your recommendations"
      >
        {content}
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center p-12" role="status" aria-live="polite">
      {content}
    </div>
  );
}

export default Loader;
