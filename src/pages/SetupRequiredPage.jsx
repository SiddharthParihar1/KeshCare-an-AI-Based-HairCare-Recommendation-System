import { KeyRound, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ENV_LINE = 'VITE_GEMINI_API_KEY=your_key_here';

function SetupRequiredPage() {
  const [copied, setCopied] = useState(false);

  const copyEnv = async () => {
    await navigator.clipboard.writeText(ENV_LINE);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[var(--color-bg-alt)] to-[var(--color-bg)] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-lg)]"
      >
        {/* Icon */}
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary-pale)]">
          <KeyRound className="h-7 w-7 text-[var(--color-primary)]" />
        </div>

        <h1 className="font-display text-2xl font-bold text-[var(--color-text)]">Setup Required</h1>
        <p className="mt-3 text-[var(--color-text-muted)]">
          KeshCare needs a Google Gemini API key to generate personalized hair care recommendations.
        </p>

        {/* Steps */}
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
              1
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">Get a free API key</p>
              <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
                Visit Google AI Studio to generate your free Gemini API key.
              </p>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:underline"
              >
                Open Google AI Studio
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
              2
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">Create a .env file</p>
              <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
                In the root of the project, create a <code className="rounded bg-[var(--color-surface-2)] px-1 py-0.5 font-mono text-xs">.env</code> file.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
              3
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--color-text)]">Add your API key</p>
              <div className="mt-2 flex items-center justify-between gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-2)] p-3">
                <code className="text-xs font-mono text-[var(--color-text)]">{ENV_LINE}</code>
                <button
                  type="button"
                  onClick={copyEnv}
                  className="ml-2 shrink-0 cursor-pointer rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-white p-1.5 transition-colors hover:bg-[var(--color-bg-alt)]"
                  aria-label="Copy to clipboard"
                >
                  {copied
                    ? <CheckCircle className="h-4 w-4 text-[var(--color-success)]" />
                    : <Copy className="h-4 w-4 text-[var(--color-text-muted)]" />
                  }
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
              4
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">Restart the dev server</p>
              <code className="mt-1 block rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-xs font-mono text-[var(--color-text)]">
                npm run dev
              </code>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-[var(--color-text-faint)]">
          Your API key is stored locally and never sent to any server other than Google's API.
        </p>
      </motion.div>
    </main>
  );
}

export default SetupRequiredPage;
