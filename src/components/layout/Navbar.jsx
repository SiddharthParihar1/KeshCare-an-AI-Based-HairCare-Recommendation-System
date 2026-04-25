import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import keshCareLogo from '../../assets/keshcarelogo.png';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/assess', label: 'Assessment' },
  { to: '/results', label: 'Results' },
  { to: '/about', label: 'About' },
  { to: '/profile', label: 'Profile' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 shadow-md backdrop-blur-md border-b border-[var(--color-border)]'
          : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          aria-label="KeshCare home"
        >
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[12px] bg-[var(--color-primary)] shadow-sm transition-shadow duration-200 group-hover:shadow-md">
            <img
              src={keshCareLogo}
              alt="KeshCare logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-display text-xl font-semibold text-[var(--color-primary)]">
            Kesh<span className="text-[var(--color-primary-soft)]">Care</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors duration-200 ${
                  isActive
                    ? 'text-[var(--color-primary)] bg-[var(--color-primary-pale)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-bg-alt)]"
          >
            <User className="h-4 w-4" />
            {user ? user.displayName || 'My Profile' : 'Login'}
          </Link>
          <Link
            to="/assess"
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[var(--color-primary-mid)] hover:shadow-md active:scale-95"
          >
            <Leaf className="h-3.5 w-3.5" />
            Get My Plan
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors duration-200 hover:bg-[var(--color-bg-alt)] md:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-[var(--color-border)] bg-white md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `rounded-[var(--radius-md)] px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/assess"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white"
              >
                <Leaf className="h-4 w-4" />
                Get My Personalized Plan
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
