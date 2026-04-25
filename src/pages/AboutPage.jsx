import { Leaf, Brain, Cpu, FlaskConical, Users, ArrowRight, Sparkles, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '../components/ui/Button';

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
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

const techStack = [
  { name: 'React 18', desc: 'Component-based UI with hooks and lazy loading', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Vite', desc: 'Lightning-fast build tool and dev server', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'Tailwind CSS', desc: 'Utility-first CSS for consistent styling', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { name: 'Framer Motion', desc: 'Smooth animations and page transitions', color: 'bg-pink-50 text-pink-700 border-pink-200' },
  { name: 'Zustand', desc: 'Lightweight persistent state management', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'React Hook Form', desc: 'Type-safe form validation at every step', color: 'bg-green-50 text-green-700 border-green-200' },
  { name: 'Google Gemini AI', desc: 'State-of-the-art LLM for hair analysis', color: 'bg-red-50 text-red-700 border-red-200' },
  { name: 'Firebase', desc: 'Authentication and cloud Firestore database', color: 'bg-orange-50 text-orange-700 border-orange-200' },
];

const team = [
  { name: 'Mahak Ashtankar', initials: 'MA', role: 'Developer', grad: 'from-emerald-400 to-teal-500' },
  { name: 'Komal Morghade', initials: 'KM', role: 'Developer', grad: 'from-teal-400 to-cyan-500' },
  { name: 'Nandini Dixit', initials: 'ND', role: 'Developer', grad: 'from-green-400 to-emerald-500' },
  { name: 'Mansi Shete', initials: 'MS', role: 'Developer', grad: 'from-cyan-400 to-blue-500' },
];

const aiSteps = [
  {
    icon: Brain,
    step: '01',
    title: 'Profile Collection',
    desc: 'We gather your hair type, scalp condition, problems, lifestyle, and environmental factors through 4 focused steps.',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'AI Analysis',
    desc: 'A structured prompt is sent to Google Gemini 2.0 Flash with strict JSON output rules  ensuring reliable, parseable results.',
  },
  {
    icon: FlaskConical,
    step: '03',
    title: 'Remedy Generation',
    desc: 'Gemini returns ranked natural remedies with ingredients, quantities, step-by-step instructions, benefits, and safety warnings.',
  },
];

const stats = [
  { value: '4', label: 'Assessment Steps' },
  { value: 'AI', label: 'Powered' },
  { value: '100%', label: 'Natural Remedies' },
  { value: 'Free', label: 'Always' },
];

function AboutPage() {
  return (
    <div className="bg-[var(--color-bg)]">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden px-4 py-24 text-white sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(135deg, #0a2318 0%, #1b4332 35%, #2d6a4f 65%, #40916c 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 ring-2 ring-white/25 backdrop-blur-sm">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">About KeshCare</h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Bridging traditional Ayurvedic wisdom and modern AI to make personalized haircare
              accessible, natural, and effective for everyone.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="rounded-[var(--radius-lg)] bg-white/10 px-4 py-4 backdrop-blur-sm">
                <p className="font-display text-2xl font-bold text-white">{s.value}</p>
                <p className="mt-0.5 text-xs text-white/65">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-20 px-4 py-20 sm:px-6 lg:px-8">

        {/* ── Mission ── */}
        <FadeIn>
          <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-card)] sm:p-10">
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-16 rounded-full bg-[var(--color-primary-pale)] opacity-60 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-pale)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                <Sparkles className="h-3.5 w-3.5" />
                Our Mission
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
                Haircare that actually works for <em>you</em>
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-[var(--color-text-muted)]">
                KeshCare was built to solve a real problem: most people don't know what's actually causing their
                hair issues, and generic product recommendations rarely help. We use AI to deliver truly personalized,
                chemical-free Ayurvedic recommendations  so anyone can achieve healthier hair without expensive
                consultations or trial-and-error with products.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* ── How AI Works ── */}
        <FadeIn>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-pale)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
              <Cpu className="h-3.5 w-3.5" />
              Under the Hood
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-[var(--color-text)] sm:text-3xl">How the AI Works</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[var(--color-text-muted)]">
              Three stages  from your answers to a personalised Ayurvedic remedy plan.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {aiSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary-pale)]">
                  <step.icon className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
                <span className="font-display text-4xl font-bold text-[var(--color-primary-pale)] select-none leading-none">
                  {step.step}
                </span>
                <h3 className="mt-2 text-base font-semibold text-[var(--color-text)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* ── Tech Stack ── */}
        <FadeIn>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-pale)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
              <Github className="h-3.5 w-3.5" />
              Built With
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-[var(--color-text)] sm:text-3xl">Technology Stack</h2>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-5 py-4 shadow-[var(--shadow-xs)]"
              >
                <span className={`inline-flex shrink-0 rounded-[var(--radius-sm)] border px-2.5 py-1 text-xs font-bold ${tech.color}`}>
                  {tech.name}
                </span>
                <p className="text-sm text-[var(--color-text-muted)]">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* ── Team ── */}
        <FadeIn>
          <div
            className="relative overflow-hidden rounded-[var(--radius-2xl)] p-8 sm:p-10"
            style={{ background: 'linear-gradient(135deg, #0a2318 0%, #1b4332 50%, #2d6a4f 100%)' }}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="relative">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-white/15">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white">Meet the Team</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {team.map((member) => (
                  <div key={member.name} className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] bg-white/10 px-4 py-5 text-center backdrop-blur-sm">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${member.grad} text-lg font-bold text-white shadow-lg`}>
                      {member.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{member.name}</p>
                      <p className="text-xs text-white/55">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-[var(--radius-lg)] border border-white/15 bg-white/5 px-5 py-4">
                <p className="text-sm text-white/70">
                  Project guided by{' '}
                  <span className="font-semibold text-white">Prof. Jayashree Gorakh</span>
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── CTA ── */}
        <FadeIn className="text-center">
          <div className="rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-white px-8 py-12 shadow-[var(--shadow-card)]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary-pale)]">
              <Leaf className="h-7 w-7 text-[var(--color-primary)]" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
              Ready to try it yourself?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[var(--color-text-muted)]">
              Get your personalized Ayurvedic hair care plan in under two minutes  completely free.
            </p>
            <Link to="/assess" className="mt-7 inline-block">
              <Button size="lg">
                Start My Assessment
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}

export default AboutPage;
