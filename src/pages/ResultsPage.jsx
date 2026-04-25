import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Share2, RotateCcw, Printer, CheckCheck, AlertCircle,
  Leaf, Utensils, Clock, ArrowRight, CalendarPlus,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import RemedyCard from '../components/results/RemedyCard';
import FeedbackWidget from '../components/results/FeedbackWidget';
import { useKeshCareStore } from '../store/useKeshCareStore';

const WEEKDAY_INDEX = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function toGoogleCalendarDate(date) {
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`;
}

function nextDateForWeekday(dayName) {
  const targetDay = WEEKDAY_INDEX[dayName] ?? 1;
  const current = new Date();
  const currentDay = current.getDay();
  const delta = (targetDay - currentDay + 7) % 7;
  const next = new Date(current);
  next.setDate(current.getDate() + delta);
  return next;
}

function buildGoogleCalendarUrl(entry) {
  const start = nextDateForWeekday(entry.day);
  start.setHours(8, 0, 0, 0);
  const end = new Date(start);
  end.setMinutes(start.getMinutes() + 30);

  const title = `KeshCare ${entry.day} Hair Routine`;
  const details = `Morning: ${entry.morning}\n\nEvening: ${entry.evening}`;
  const dates = `${toGoogleCalendarDate(start)}/${toGoogleCalendarDate(end)}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details,
    dates,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function ResultsPage() {
  const navigate = useNavigate();
  const { recommendations, isLoading, error, resetForm } = useKeshCareStore();

  const safeRecommendations = useMemo(() => {
    if (!recommendations || typeof recommendations !== 'object') {
      return null;
    }

    return {
      summary:
        typeof recommendations.summary === 'string' && recommendations.summary.trim()
          ? recommendations.summary
          : 'Your personalized plan is being prepared based on your profile.',
      primaryConcern:
        typeof recommendations.primaryConcern === 'string' && recommendations.primaryConcern.trim()
          ? recommendations.primaryConcern
          : 'Scalp and strand balance',
      tips: Array.isArray(recommendations.tips) ? recommendations.tips.filter(Boolean) : [],
      remedies: Array.isArray(recommendations.remedies) ? recommendations.remedies : [],
      dietaryAdvice:
        typeof recommendations.dietaryAdvice === 'string' ? recommendations.dietaryAdvice : '',
      avoidList: Array.isArray(recommendations.avoidList) ? recommendations.avoidList : [],
      followUpIn:
        typeof recommendations.followUpIn === 'string' && recommendations.followUpIn.trim()
          ? recommendations.followUpIn
          : '4-6 weeks',
      weeklySchedule: Array.isArray(recommendations.weeklySchedule)
        ? recommendations.weeklySchedule
        : [],
    };
  }, [recommendations]);

  const summary = safeRecommendations?.summary ?? '';

  if (isLoading) return <Loader fullscreen />;

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-[var(--radius-2xl)] border border-[var(--color-error-bg)] bg-white p-8 shadow-[var(--shadow-md)] text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-error-bg)]">
            <AlertCircle className="h-7 w-7 text-[var(--color-error)]" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text)]">Something went wrong</h1>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]" role="alert">{error}</p>
          <Button className="mt-6" onClick={() => navigate('/assess')} fullWidth>
            Retry Assessment
          </Button>
        </div>
      </div>
    );
  }

  if (!safeRecommendations) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-[var(--radius-2xl)] bg-white p-8 shadow-[var(--shadow-md)] text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary-pale)]">
            <Leaf className="h-7 w-7 text-[var(--color-primary)]" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text)]">No recommendations yet</h1>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Complete the assessment to get your personalized Ayurvedic hair care plan.
          </p>
          <Button className="mt-6" onClick={() => navigate('/assess')} fullWidth>
            <ArrowRight className="h-4 w-4" />
            Start Assessment
          </Button>
        </div>
      </div>
    );
  }

  const shareResults = async () => {
    const message = `My KeshCare Hair Plan:\n\nPrimary Concern: ${safeRecommendations.primaryConcern}\n\n${safeRecommendations.summary}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'My KeshCare Hair Plan', text: message });
        return;
      }
      await navigator.clipboard.writeText(message);
      toast.success('Summary copied to clipboard!');
    } catch {
      toast.error('Could not share results.');
    }
  };

  const addFullWeekToCalendar = () => {
    safeRecommendations.weeklySchedule.forEach((entry, index) => {
      const url = buildGoogleCalendarUrl(entry);
      setTimeout(() => window.open(url, '_blank', 'noopener,noreferrer'), index * 150);
    });
    toast.success('Opening Google Calendar reminders for your weekly routine.');
  };

  return (
    <div className="bg-gradient-to-b from-[var(--color-bg-alt)] to-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* ── Hero summary card ────────────────────────────────��─ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[var(--radius-2xl)] p-6 text-white shadow-[var(--shadow-lg)] sm:p-8"
          style={{ backgroundImage: 'var(--gradient-hero)' }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge tone="dark" className="border-white/20 bg-white/15 text-white" dot>
                  Primary Concern
                </Badge>
                <span className="text-base font-semibold text-white">
                  {safeRecommendations.primaryConcern}
                </span>
              </div>
              <p className="text-[15px] leading-relaxed text-white/90">{summary}</p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-white/15">
              <Leaf className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Quick tips */}
          {safeRecommendations.tips.length > 0 && (
            <div className="mt-5 rounded-[var(--radius-lg)] bg-white/10 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/60">
                Quick Tips
              </p>
              <ul className="space-y-2">
                {safeRecommendations.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-white/90">
                    <CheckCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary-soft)]" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Follow-up timeline */}
          {safeRecommendations.followUpIn && (
            <div className="mt-4 flex items-center gap-2 text-sm text-white/70">
              <Clock className="h-4 w-4" />
              <span>Reassess in: <strong className="text-white">{safeRecommendations.followUpIn}</strong></span>
            </div>
          )}
        </motion.div>

        {/* ── Remedies ────────────────────────────────��────────── */}
        <div>
          <h2 className="mb-4 font-display text-2xl font-bold text-[var(--color-text)]">
            Your Personalized Remedies
          </h2>
          <div className="space-y-4">
            {safeRecommendations.remedies.map((remedy, idx) => (
              <RemedyCard key={remedy.id ?? idx} remedy={remedy} index={idx} />
            ))}
            {safeRecommendations.remedies.length === 0 ? (
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 text-sm text-[var(--color-text-muted)] shadow-[var(--shadow-card)]">
                No detailed remedies were generated in this attempt. Please run the assessment again.
              </div>
            ) : null}
          </div>
        </div>

        {/* ── Dietary advice ───────────────────────────────��───── */}
        {safeRecommendations.dietaryAdvice && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-pale)]">
                <Utensils className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Dietary Advice</h3>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
              {safeRecommendations.dietaryAdvice}
            </p>
          </motion.div>
        )}

        {/* ── Avoid list ───────────────────────────────────────── */}
        {safeRecommendations.avoidList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-[var(--radius-xl)] border border-amber-200 bg-[var(--color-warning-bg)] p-6"
          >
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-amber-900">
              <AlertCircle className="h-5 w-5" />
              What to Avoid
            </h3>
            <ul className="space-y-2">
              {safeRecommendations.avoidList.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-amber-800">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* ── Weekly schedule ──────────────────────────────────── */}
        {safeRecommendations.weeklySchedule.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">Your Weekly Hair Care Schedule</h3>
              <Button variant="secondary" size="sm" onClick={addFullWeekToCalendar}>
                <CalendarPlus className="h-4 w-4" />
                Add Full Week to Google Calendar
              </Button>
            </div>
            <div className="space-y-3">
              {safeRecommendations.weeklySchedule.map((entry, index) => (
                <div
                  key={`${entry.day}-${index}`}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-[var(--color-primary)]">{entry.day}</p>
                    <a
                      href={buildGoogleCalendarUrl(entry)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]"
                    >
                      <CalendarPlus className="h-3.5 w-3.5" />
                      Add Day
                    </a>
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    <strong className="text-[var(--color-text)]">Morning:</strong> {entry.morning}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    <strong className="text-[var(--color-text)]">Evening:</strong> {entry.evening}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Feedback ─────────────────────────────────────────── */}
        <FeedbackWidget />

        {/* ── Actions ──────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 pb-4 no-print">
          <Button variant="secondary" onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
            Save as PDF
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              resetForm();
              navigate('/assess');
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Start Over
          </Button>
          <Button onClick={shareResults}>
            <Share2 className="h-4 w-4" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
