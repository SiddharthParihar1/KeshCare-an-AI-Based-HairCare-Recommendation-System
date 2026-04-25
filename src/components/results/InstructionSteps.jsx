import { motion } from 'framer-motion';

function InstructionSteps({ instructions = [] }) {
  return (
    <ol className="space-y-3">
      {instructions.map((item, index) => (
        <motion.li
          key={`${item.step}-${index}`}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] p-3"
        >
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
            {item.step}
          </span>
          <p className="text-sm leading-relaxed">{item.action}</p>
        </motion.li>
      ))}
    </ol>
  );
}

export default InstructionSteps;
