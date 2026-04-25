import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Leaf, Sparkles, Shield, Clock, CheckCircle,
  ChevronDown, Star, Zap, FlaskConical, Sprout,
} from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { HAIR_PROBLEMS } from '../constants/hairData';
import Button from '../components/ui/Button';

/* ─── Data ─────────────────────────────────────────────────── */
const testimonials = [
  {
    name: 'Aarohi P.',
    role: 'Working professional, Mumbai',
    text: 'The plan matched my scalp issues perfectly and my dandruff dropped significantly in 3 weeks. The ingredient quantities are specific and everything is available locally.',
    rating: 5,
    initials: 'AP',
    color: 'bg-emerald-500',
  },
  {
    name: 'Ritika M.',
    role: 'Student, Pune',
    text: 'Finally got clear routines with exact quantities. The tips are practical, all-natural, and I can actually follow them. Hair fall reduced noticeably.',
    rating: 5,
    initials: 'RM',
    color: 'bg-teal-500',
  },
  {
    name: 'Neha K.',
    role: 'Homemaker, Delhi',
    text: 'Feels like a personal trichologist who understands Ayurveda and my lifestyle. My hair feels so much stronger and shinier now.',
    rating: 5,
    initials: 'NK',
    color: 'bg-green-600',
  },
];

const features = [
  {
    icon: Sparkles,
    title: 'Gemini AI-Powered',
    desc: "Google's most advanced AI analyzes your profile and generates highly personalized recommendations.",
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Leaf,
    title: '100% Natural & Ayurvedic',
    desc: 'Every remedy uses ingredients from your kitchen or local Indian grocery  zero chemicals ever.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Shield,
    title: 'Clinically Safe',
    desc: 'Each recommendation includes safety warnings, allergy notes, and dosage precision.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Clock,
    title: 'Results in 2 Minutes',
    desc: 'Complete the 4-step assessment and receive your full personalized plan instantly.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: FlaskConical,
    title: 'Science-Backed',
    desc: 'Remedies are backed by Ayurvedic principles and modern research on hair biology.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: Sprout,
    title: 'Track Your Progress',
    desc: 'Save your assessment history and revisit recommendations as your hair evolves.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
];

const stats = [
  { value: '10+', label: 'Hair Conditions', desc: 'Covered' },
  { value: '100%', label: 'Natural', desc: 'Ingredients only' },
  { value: '5+', label: 'Remedies', desc: 'Per assessment' },
  { value: '0', label: 'Chemicals', desc: 'Ever' },
];

const steps = [
  {
    num: '01',
    title: 'Share Your Hair Profile',
    desc: 'Answer 4 quick steps about your hair type, scalp condition, problems, and lifestyle. Takes under 2 minutes.',
    emoji: '📋',
  },
  {
    num: '02',
    title: 'AI Analyzes Your Needs',
    desc: 'Our Gemini-powered engine cross-references your profile with thousands of Ayurvedic remedy patterns.',
    emoji: '🤖',
  },
  {
    num: '03',
    title: 'Receive Natural Remedies',
    desc: 'Get 3–5 personalized remedies with exact quantities, step-by-step instructions, and expected timelines.',
    emoji: '🌿',
  },
];

/* ─── Sub-components ───────────────────────────────────────── */
function StatCard({ value, label, desc, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-1 text-center"
    >
      <span className="font-display text-4xl font-bold text-white">{value}</span>
      <span className="text-sm font-semibold text-white/90">{label}</span>
      <span className="text-xs text-white/60">{desc}</span>
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionBadge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--color-primary-pale)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
      {children}
    </span>
  );
}

/* ─── Main ─────────────────────────────────────────────────── */
function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial((v) => (v + 1) % testimonials.length), 4500);
    return () => clearInterval(id);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        left: `${(i * 97 + 5) % 100}%`,
        top: `${(i * 53 + 8) % 90}%`,
        delay: i * 0.35,
        size: i % 3 === 0 ? 'h-3 w-3' : 'h-2 w-2',
      })),
    [],
  );

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[94vh] overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8"
        style={{ backgroundImage: 'var(--gradient-hero)' }}
      >
        <div className="pointer-events-none absolute inset-0 pattern-dots opacity-40" />
        <div className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[var(--color-primary-soft)]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-40 h-[500px] w-[500px] rounded-full bg-[var(--color-accent-lt)]/8 blur-[100px]" />

        {particles.map((p) => (
          <motion.span
            key={p.id}
            className={`absolute rounded-full bg-white/20 ${p.size}`}
            style={{ left: p.left, top: p.top }}
            animate={{ y: [-8, 8, -8], opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: 5 + p.delay, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px]">
            {/* Left  copy */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
              >
                <Leaf className="h-3.5 w-3.5 text-[var(--color-primary-soft)]" />
                <span className="text-sm font-medium text-white/90">
                  Ayurvedic · AI-Powered · 100% Natural
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
              >
                Your Hair,{' '}
                <span className="text-gradient-green">Understood</span>
                {' '}by AI
              </motion.h1>

              <motion.p
                className="max-w-xl text-lg leading-relaxed text-white/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
              >
                Discover personalized Ayurvedic remedies crafted specifically for your hair type,
                scalp condition, and lifestyle  no chemicals, no guesswork, just nature.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link to="/assess">
                  <Button variant="white" size="lg">
                    Start My Hair Assessment
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white hover:bg-white/10 border border-white/20"
                  >
                    See How It Works
                  </Button>
                </a>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {['Free Assessment', 'No Login Required', 'Instant Results'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-[var(--color-primary-soft)]" />
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right  preview card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="rounded-[var(--radius-2xl)] border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/90">Your Hair Plan</span>
                    <span className="rounded-full bg-[var(--color-primary-soft)] px-2.5 py-1 text-xs font-semibold text-white">
                      Ready
                    </span>
                  </div>
                  {[
                    { name: 'Bhringraj Oil Treatment', cat: 'Oil Treatment', diff: 'Easy', color: 'bg-green-400' },
                    { name: 'Amla & Shikakai Mask', cat: 'Hair Mask', diff: 'Medium', color: 'bg-teal-400' },
                    { name: 'Neem Scalp Rinse', cat: 'Herbal Rinse', diff: 'Easy', color: 'bg-emerald-400' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className="mt-3 flex items-center gap-3 rounded-[var(--radius-lg)] bg-white/15 p-3"
                    >
                      <div className={`h-8 w-8 shrink-0 rounded-[var(--radius-sm)] ${item.color} flex items-center justify-center`}>
                        <Leaf className="h-4 w-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">{item.name}</p>
                        <p className="text-xs text-white/60">{item.cat} · {item.diff}</p>
                      </div>
                      <CheckCircle className="h-4 w-4 shrink-0 text-[var(--color-primary-soft)]" />
                    </motion.div>
                  ))}
                  <div className="mt-5 rounded-[var(--radius-md)] bg-white/10 p-3 text-center text-xs text-white/70">
                    3 remedies personalized for your profile
                  </div>
                </div>
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-6 rounded-[var(--radius-lg)] border border-white/20 bg-white/15 px-4 py-2 backdrop-blur-sm shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-semibold text-white">Instant AI Analysis</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="bg-[var(--color-primary-mid)] py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="how-it-works" className="section-pad bg-[var(--color-bg)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <SectionBadge>How It Works</SectionBadge>
            <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">
              Personalized plan in 3 simple steps
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--color-text-muted)]">
              No account needed, no complicated questionnaires  just honest answers about your hair.
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.12}>
                <div className="relative rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:translate-y-[-2px]">
                  <span className="font-display text-5xl font-bold text-[var(--color-primary-pale)] select-none">
                    {step.num}
                  </span>
                  <div className="mt-3 text-3xl" role="img" aria-label={step.title}>{step.emoji}</div>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--color-text)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-[var(--color-primary)] p-1.5 shadow-md md:block">
                      <ArrowRight className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="mt-10 text-center">
            <Link to="/assess">
              <Button size="lg">
                Start Your Assessment
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── PROBLEMS ─────────────────────────────────────────── */}
      <section className="section-pad bg-[var(--color-bg-alt)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Hair concerns we address</h2>
            <p className="mx-auto mt-3 max-w-lg text-[var(--color-text-muted)]">
              Tell us your concern and receive targeted, evidence-backed natural remedies.
            </p>
          </FadeIn>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {HAIR_PROBLEMS.map((problem, i) => (
              <FadeIn key={problem.id} delay={i * 0.05}>
                <Link
                  to="/assess"
                  className="group flex cursor-pointer items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-4 py-3.5 shadow-[var(--shadow-xs)] transition-all duration-200 hover:border-[var(--color-primary-soft)] hover:shadow-[var(--shadow-sm)] hover:-translate-y-0.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-primary-pale)] text-lg">
                    {problem.icon}
                  </span>
                  <span className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)]">
                    {problem.label}
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-[var(--color-text-faint)] opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="section-pad bg-[var(--color-bg)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Built for your hair journey</h2>
            <p className="mx-auto mt-3 max-w-lg text-[var(--color-text-muted)]">
              KeshCare combines ancient Ayurvedic knowledge with modern AI to deliver a truly personal experience.
            </p>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, i) => (
              <FadeIn key={feat.title} delay={i * 0.08}>
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5">
                  <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] ${feat.bg}`}>
                    <feat.icon className={`h-5 w-5 ${feat.color}`} />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-[var(--color-text)]">{feat.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section-pad bg-[var(--color-primary)]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-soft)]">
              Real Results
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">
              Loved by thousands of users
            </h2>
          </FadeIn>

          <div className="relative mt-12 min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
                className="rounded-[var(--radius-2xl)] border border-white/15 bg-white/10 p-8 backdrop-blur-sm"
              >
                <div className="mb-5 flex justify-center gap-1">
                  {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-lg italic leading-relaxed text-white/90">
                  &ldquo;{testimonials[activeTestimonial].text}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${testimonials[activeTestimonial].color}`}>
                    {testimonials[activeTestimonial].initials}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">{testimonials[activeTestimonial].name}</p>
                    <p className="text-xs text-white/50">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  activeTestimonial === i
                    ? 'w-6 bg-[var(--color-primary-soft)]'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden bg-gradient-to-br from-[var(--color-bg-alt)] to-[var(--color-primary-pale)]">
        <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-[var(--color-primary-soft)]/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary)] shadow-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h2 className="font-display text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
              Ready for healthier hair?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[var(--color-text-muted)]">
              Start your personalized Ayurvedic hair assessment in under two minutes.
              No account, no subscription  completely free.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/assess">
                <Button size="xl">
                  Start My Free Assessment
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="xl">
                  Learn More
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
