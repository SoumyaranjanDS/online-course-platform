import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service like Sentry here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-error/30 rounded-3xl p-8 md:p-12 text-center max-w-lg shadow-xl shadow-error/5">
            <div className="w-20 h-20 bg-error-container text-error rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[40px]">warning</span>
            </div>
            
            <h1 className="text-display-sm text-on-surface mb-2 font-bold">Something went wrong</h1>
            <p className="text-body-lg text-on-surface-variant mb-8">
              We've encountered an unexpected error. Please try refreshing the page or navigating back home.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto bg-primary text-on-primary font-label-md py-3 px-6 rounded-xl hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md"
              >
                Refresh Page
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="w-full sm:w-auto bg-surface-variant text-on-surface-variant font-label-md py-3 px-6 rounded-xl hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
