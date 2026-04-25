import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/ui/Loader';
import SetupRequiredPage from './pages/SetupRequiredPage';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AssessmentPage = lazy(() => import('./pages/AssessmentPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="flex min-h-[calc(100vh-9rem)] flex-col">
      <Suspense fallback={<Loader fullscreen message="Loading KeshCare experience..." />}>
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/assess" element={<AssessmentPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    return <SetupRequiredPage />;
  }

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {!isOnline ? (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-900" role="alert">
          You are offline. Some features may be unavailable until connection is restored.
        </div>
      ) : null}
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
          },
        }}
      />
    </div>
  );
}

export default App;
