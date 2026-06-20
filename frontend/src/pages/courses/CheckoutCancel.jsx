import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function CheckoutCancel() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course_id");

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="w-16 h-16 bg-surface-container-high text-on-surface-variant rounded-full flex items-center justify-center mb-6 mx-auto">
            <span className="material-symbols-outlined text-4xl">
              cancel
            </span>
          </div>
          <h2 className="text-headline-md font-headline-md text-on-surface mb-2">
            Checkout Canceled
          </h2>
          <p className="text-body-md text-on-surface-variant mb-8">
            You have canceled the payment process. Your card was not charged.
          </p>
          <div className="flex flex-col gap-3">
            {courseId && (
              <Link
                to={`/courses/${courseId}`}
                className="w-full bg-primary text-on-primary py-3 rounded-xl font-label-md hover:bg-primary/90 transition-colors block"
              >
                Return to Course
              </Link>
            )}
            <Link
              to="/courses"
              className="w-full bg-surface-container-highest text-on-surface py-3 rounded-xl font-label-md hover:bg-surface-container-high transition-colors block text-center"
            >
              Browse other courses
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
