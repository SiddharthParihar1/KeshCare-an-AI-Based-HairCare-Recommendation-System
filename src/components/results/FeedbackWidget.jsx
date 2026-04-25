import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsDown, ThumbsUp, Heart, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';

function FeedbackWidget() {
  const [vote, setVote] = useState(null);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handlePositive = () => {
    setVote('yes');
    toast.success('Thank you for your feedback!');
  };

  const submitFeedback = () => {
    if (!note.trim()) return;
    toast.success('Feedback submitted  thank you for helping us improve!');
    setNote('');
    setSubmitted(true);
  };

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
      <h3 className="text-base font-semibold text-[var(--color-text)]">Was this plan helpful?</h3>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        Your feedback helps us improve recommendations for everyone.
      </p>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={handlePositive}
          className={[
            'flex cursor-pointer items-center gap-2 rounded-[var(--radius-md)] border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200',
            vote === 'yes'
              ? 'border-[var(--color-success)] bg-[var(--color-success-bg)] text-[var(--color-success)]'
              : 'border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-success)] hover:text-[var(--color-success)]',
          ].join(' ')}
        >
          <ThumbsUp className="h-4 w-4" />
          Yes, it helped
        </button>
        <button
          type="button"
          onClick={() => setVote('no')}
          className={[
            'flex cursor-pointer items-center gap-2 rounded-[var(--radius-md)] border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200',
            vote === 'no'
              ? 'border-[var(--color-error)] bg-[var(--color-error-bg)] text-[var(--color-error)]'
              : 'border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-error)] hover:text-[var(--color-error)]',
          ].join(' ')}
        >
          <ThumbsDown className="h-4 w-4" />
          Needs work
        </button>
      </div>

      <AnimatePresence>
        {vote === 'yes' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-4 flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-success-bg)] px-4 py-3 text-sm text-[var(--color-success)]"
          >
            <Heart className="h-4 w-4 fill-current" />
            <span>Great! Your feedback helps KeshCare become smarter.</span>
          </motion.div>
        )}

        {vote === 'no' && !submitted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 space-y-3"
          >
            <label className="block text-sm font-medium text-[var(--color-text)]" htmlFor="feedback-note">
              What could be better?
            </label>
            <textarea
              id="feedback-note"
              rows={3}
              className="form-input resize-none"
              placeholder="Tell us what didn't work or what you'd like improved…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button
              size="sm"
              onClick={submitFeedback}
              disabled={!note.trim()}
            >
              <Send className="h-4 w-4" />
              Submit Feedback
            </Button>
          </motion.div>
        )}

        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm text-[var(--color-text-muted)]"
          >
            Thank you  your feedback has been noted.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FeedbackWidget;
