import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function NotFoundPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-12 max-w-lg w-full text-center shadow-lg">
          <div className="w-24 h-24 bg-surface-container-high text-on-surface-variant rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-6xl">explore_off</span>
          </div>
          <h1 className="text-display-sm font-bold text-on-surface mb-4">
            Page Not Found
          </h1>
          <p className="text-body-lg text-on-surface-variant mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-primary text-on-primary py-3 px-6 rounded-xl font-label-md hover:bg-primary/90 transition-colors"
            >
              Go Home
            </Link>
            <Link
              to="/courses"
              className="bg-surface-container-highest text-on-surface py-3 px-6 rounded-xl font-label-md hover:bg-surface-container-high transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}