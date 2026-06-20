import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import BackToTop from './components/layout/BackToTop';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
        <BackToTop />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
