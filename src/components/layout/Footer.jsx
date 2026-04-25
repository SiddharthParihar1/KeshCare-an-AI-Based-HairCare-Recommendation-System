import { Link } from 'react-router-dom';
import { Leaf, Github, Heart } from 'lucide-react';

const footerLinks = [
  {
    heading: 'Product',
    items: [
      { label: 'Hair Assessment', to: '/assess' },
      { label: 'My Results', to: '/results' },
      { label: 'About KeshCare', to: '/about' },
    ],
  },
  {
    heading: 'Hair Topics',
    items: [
      { label: 'Hair Fall', to: '/assess' },
      { label: 'Scalp Care', to: '/assess' },
      { label: 'Natural Remedies', to: '/assess' },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-text)] text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          {/* Brand column */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--color-primary-soft)]">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-semibold text-white">
                Kesh<span className="text-[var(--color-primary-soft)]">Care</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              AI-powered Ayurvedic hair care recommendations  personalized, natural, and grounded in traditional wisdom.
            </p>
            <div className="flex items-center gap-1 text-xs text-white/40">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-400 fill-red-400" />
              <span>for healthier hair</span>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-white/60 transition-colors duration-200 hover:text-white cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-white/40 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} KeshCare  AI-Based Haircare Recommendation System</p>
          <p className="flex items-center gap-1">
            <span>Built by KeshCare Team</span>
            <span className="mx-1 text-white/20">·</span>
            <span>Guided by Prof. Jayashree Gorakh</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
