import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Toaster } from 'react-hot-toast';

// Components
import { LoadingScreen } from './components/ui/LoadingScreen';

// Pages
import { Home } from './pages/Home';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AuthProvider } from './hooks/useAuth';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
        <div className="min-h-screen flex flex-col">
          <Toaster position="top-right" />
          <AnimatePresence>
            {isLoading && <LoadingScreen />}
          </AnimatePresence>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}


