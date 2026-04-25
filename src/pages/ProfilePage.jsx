import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  User, LogOut, ShieldCheck, History, Eye, EyeOff,
  Mail, Lock, Phone, UserCircle2, Leaf, ArrowRight,
  MapPin, Calendar, Trash2, ChevronRight,
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useKeshCareStore } from '../store/useKeshCareStore';

function InputField({ label, icon: Icon, type = 'text', value, onChange, placeholder, required, minLength, rightSlot }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
        {label}
      </label>
      <div className="relative flex items-center">
        {Icon && (
          <span className="pointer-events-none absolute left-3.5 text-[var(--color-text-faint)]">
            <Icon className="h-4 w-4" />
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          className={[
            'w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)]',
            'outline-none transition-all duration-200',
            'focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-[var(--color-primary-soft)]/20',
            Icon ? 'pl-10' : 'pl-4',
            rightSlot ? 'pr-11' : 'pr-4',
          ].join(' ')}
        />
        {rightSlot && <span className="absolute right-3">{rightSlot}</span>}
      </div>
    </div>
  );
}

function ProfileField({ label, icon: Icon, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{label}</label>
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-3.5 text-[var(--color-text-faint)]">
          <Icon className="h-4 w-4" />
        </span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-alt)] py-3 pl-10 pr-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all duration-200 focus:border-[var(--color-border-focus)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary-soft)]/20"
        />
      </div>
    </div>
  );
}

function ProfilePage() {
  const { user, profile, loading, signIn, signUp, signOut, saveProfile, isFirebaseConfigured } = useAuth();
  const history = useKeshCareStore((s) => s.history);
  const clearHistory = useKeshCareStore((s) => s.clearHistory);

  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [authForm, setAuthForm] = useState({ displayName: '', email: '', phone: '', password: '' });
  const [profileForm, setProfileForm] = useState({
    displayName: profile?.displayName || user?.displayName || '',
    phone: profile?.phone || '',
    city: profile?.city || '',
  });

  useEffect(() => {
    setProfileForm({
      displayName: profile?.displayName || user?.displayName || '',
      phone: profile?.phone || '',
      city: profile?.city || '',
    });
  }, [profile, user]);

  const sortedHistory = useMemo(() => [...history].sort((a, b) => (a.date < b.date ? 1 : -1)), [history]);

  const initials = (profileForm.displayName || user?.displayName || user?.email || '?')
    .split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

  const onAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      if (mode === 'signup') {
        await signUp(authForm);
        toast.success('Account created!');
      } else {
        await signIn(authForm);
        toast.success('Welcome back!');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const onProfileSave = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const latest = await saveProfile(profileForm);
      setProfileForm({ displayName: latest?.displayName || '', phone: latest?.phone || '', city: latest?.city || '' });
      toast.success('Profile saved!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaveLoading(false);
    }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-primary)] border-t-transparent" />
      </div>
    );
  }

  /* ── Firebase not configured ── */
  if (!isFirebaseConfigured) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-[var(--color-text-muted)]">Add Firebase environment variables to enable login.</p>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     AUTH SCREEN  (not logged in)
  ══════════════════════════════════════════════════════ */
  if (!user) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-[var(--shadow-xl)]">

            {/* Gradient header */}
            <div
              className="relative px-8 py-10 text-center"
              style={{ background: 'linear-gradient(135deg, #0a2318 0%, #1b4332 40%, #2d6a4f 70%, #40916c 100%)' }}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 ring-2 ring-white/25 backdrop-blur-sm">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-white">
                {mode === 'login' ? 'Welcome Back' : 'Join KeshCare'}
              </h1>
              <p className="mt-1 text-sm text-white/65">
                {mode === 'login' ? 'Sign in to your account' : 'Create your free account today'}
              </p>
            </div>

            {/* Form body */}
            <div className="bg-white px-8 py-7">
              {/* Tab switcher */}
              <div className="mb-6 flex rounded-[var(--radius-md)] bg-[var(--color-bg-alt)] p-1">
                {['login', 'signup'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => { setMode(tab); setShowPassword(false); }}
                    className={[
                      'flex-1 rounded-[var(--radius-sm)] py-2.5 text-sm font-semibold transition-all duration-200',
                      mode === tab
                        ? 'bg-white text-[var(--color-primary)] shadow-[var(--shadow-sm)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
                    ].join(' ')}
                  >
                    {tab === 'login' ? 'Sign In' : 'Sign Up'}
                  </button>
                ))}
              </div>

              <form className="space-y-4" onSubmit={onAuthSubmit}>
                {mode === 'signup' && (
                  <>
                    <InputField label="Full Name" icon={UserCircle2}
                      value={authForm.displayName}
                      onChange={(e) => setAuthForm((s) => ({ ...s, displayName: e.target.value }))}
                      placeholder="Priya Sharma" required />
                    <InputField label="Phone Number" icon={Phone} type="tel"
                      value={authForm.phone}
                      onChange={(e) => setAuthForm((s) => ({ ...s, phone: e.target.value }))}
                      placeholder="+91 98765 43210" />
                  </>
                )}

                <InputField label="Email Address" icon={Mail} type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm((s) => ({ ...s, email: e.target.value }))}
                  placeholder="you@example.com" required />

                <InputField
                  label="Password" icon={Lock}
                  type={showPassword ? 'text' : 'password'}
                  value={authForm.password}
                  onChange={(e) => setAuthForm((s) => ({ ...s, password: e.target.value }))}
                  placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                  required minLength={6}
                  rightSlot={
                    <button type="button" onClick={() => setShowPassword((v) => !v)}
                      className="text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text-muted)]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />

                <Button type="submit" fullWidth loading={authLoading} className="!py-3 mt-1">
                  {mode === 'signup' ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <p className="mt-5 text-center text-xs text-[var(--color-text-faint)]">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button type="button"
                  onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setShowPassword(false); }}
                  className="font-semibold text-[var(--color-primary)] hover:underline">
                  {mode === 'login' ? 'Sign up free' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     LOGGED-IN PROFILE SCREEN
  ══════════════════════════════════════════════════════ */
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[var(--color-bg)]">

      {/* Profile hero banner */}
      <div
        className="px-4 pb-20 pt-10 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(135deg, #0a2318 0%, #1b4332 40%, #2d6a4f 100%)' }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end">
            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-3xl font-bold text-white ring-4 ring-white/30 backdrop-blur-sm">
              {initials}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                {profileForm.displayName || 'My Profile'}
              </h1>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-white/65 sm:justify-start">
                <Mail className="h-3.5 w-3.5" />
                {user.email}
              </p>
            </div>
            <div className="sm:ml-auto">
              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content  pulled up over banner */}
      <div className="mx-auto -mt-10 max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">

          {/* ── Left: Edit profile card ── */}
          <div className="space-y-5">
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]">
              <div className="border-b border-[var(--color-border)] px-6 py-4">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[var(--color-text)]">
                  <User className="h-4 w-4 text-[var(--color-primary)]" />
                  Edit Profile
                </h2>
              </div>
              <form className="space-y-4 p-6" onSubmit={onProfileSave}>
                <ProfileField label="Display Name" icon={UserCircle2}
                  value={profileForm.displayName}
                  onChange={(e) => setProfileForm((s) => ({ ...s, displayName: e.target.value }))}
                  placeholder="Your name" />
                <ProfileField label="Phone Number" icon={Phone} type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm((s) => ({ ...s, phone: e.target.value }))}
                  placeholder="+91 98765 43210" />
                <ProfileField label="City" icon={MapPin}
                  value={profileForm.city}
                  onChange={(e) => setProfileForm((s) => ({ ...s, city: e.target.value }))}
                  placeholder="Mumbai, Delhi…" />
                <Button type="submit" fullWidth loading={saveLoading}>
                  <ShieldCheck className="h-4 w-4" />
                  Save Changes
                </Button>
              </form>
            </div>

            {/* Account info */}
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]">
              <div className="border-b border-[var(--color-border)] px-6 py-4">
                <h2 className="font-display text-lg font-bold text-[var(--color-text)]">Account Info</h2>
              </div>
              <div className="divide-y divide-[var(--color-border)]">
                {[
                  { label: 'Email', value: user.email, icon: Mail },
                  { label: 'Member since', value: user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '', icon: Calendar },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 px-6 py-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-primary-pale)]">
                      <Icon className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-[var(--color-text-faint)]">{label}</p>
                      <p className="truncate text-sm font-medium text-[var(--color-text)]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Assessment history ── */}
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[var(--color-text)]">
                <History className="h-4 w-4 text-[var(--color-primary)]" />
                Assessment History
              </h2>
              {sortedHistory.length > 0 && (
                <button
                  type="button"
                  onClick={clearHistory}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-1.5 text-xs font-semibold text-[var(--color-error)] transition hover:bg-[var(--color-error-bg)]"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear All
                </button>
              )}
            </div>

            <div className="max-h-[520px] overflow-auto">
              {sortedHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary-pale)]">
                    <History className="h-7 w-7 text-[var(--color-primary-soft)]" />
                  </div>
                  <p className="text-sm font-medium text-[var(--color-text)]">No assessments yet</p>
                  <p className="text-xs text-[var(--color-text-faint)]">Complete your first hair assessment to see results here.</p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--color-border)]">
                  {sortedHistory.map((entry, i) => (
                    <div key={entry.id} className="flex items-start gap-4 px-6 py-4 transition hover:bg-[var(--color-bg-alt)]">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-pale)] text-xs font-bold text-[var(--color-primary)]">
                        {sortedHistory.length - i}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1.5 text-xs text-[var(--color-text-faint)]">
                          <Calendar className="h-3 w-3" />
                          {new Date(entry.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[var(--color-text)] truncate">
                          {entry.result?.primaryConcern || 'Hair Assessment'}
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {[
                            entry.profile?.hairType,
                            entry.profile?.scalpCondition,
                          ].filter(Boolean).map((tag) => (
                            <span key={tag} className="inline-flex rounded-full bg-[var(--color-primary-pale)] px-2.5 py-0.5 text-[11px] font-medium capitalize text-[var(--color-primary)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[var(--color-text-faint)]" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
