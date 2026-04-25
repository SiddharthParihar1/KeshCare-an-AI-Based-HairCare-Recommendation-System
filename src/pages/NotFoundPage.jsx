import { Link } from 'react-router-dom';
import { Leaf, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Leaf icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--color-primary-pale)]">
            <Leaf className="h-10 w-10 text-[var(--color-primary)]" />
          </div>

          {/* 404 */}
          <p className="font-display text-7xl font-bold text-[var(--color-primary-pale)]">404</p>
          <h1 className="font-display mt-3 text-2xl font-bold text-[var(--color-text)]">
            Page not found
          </h1>
          <p className="mt-3 text-[var(--color-text-muted)]">
            The page you are looking for does not exist or has been moved.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link to="/">
              <Button variant="secondary">
                <ArrowLeft className="h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Link to="/assess">
              <Button>
                Start Assessment
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default NotFoundPage;
