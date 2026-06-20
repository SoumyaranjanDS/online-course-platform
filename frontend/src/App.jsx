import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import BackToTop from './components/layout/BackToTop';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <AppRoutes />
        <BackToTop />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
