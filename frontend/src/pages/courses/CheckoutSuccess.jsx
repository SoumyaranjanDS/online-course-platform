import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { paymentService } from "../../services/paymentService";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        const res = await paymentService.verifyCheckoutSession(sessionId);
        if (res.success) {
          setStatus("success");
          setCourseId(res.courseId);
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("error");
      }
    };

    verify();
  }, [sessionId]);

  return (
    <div className="bg-background flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          {status === "verifying" && (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <h2 className="text-headline-sm font-headline-sm text-on-surface">
                Verifying your payment...
              </h2>
              <p className="text-body-md text-on-surface-variant mt-2">
                Please don't close this page.
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl">
                  check_circle
                </span>
              </div>
              <h2 className="text-headline-md font-headline-md text-on-surface mb-2">
                Payment Successful!
              </h2>
              <p className="text-body-md text-on-surface-variant mb-8">
                Thank you for your purchase. You are now enrolled in the course.
              </p>
              <button
                onClick={() => navigate(`/student/course/${courseId}/learn`)}
                className="w-full bg-primary text-on-primary py-3 rounded-xl font-label-md hover:bg-primary/90 transition-colors"
              >
                Start Learning
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-error-container text-on-error-container rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl">error</span>
              </div>
              <h2 className="text-headline-md font-headline-md text-on-surface mb-2">
                Verification Failed
              </h2>
              <p className="text-body-md text-on-surface-variant mb-8">
                We couldn't verify your payment. If you were charged, please
                contact support.
              </p>
              <Link
                to="/student/dashboard"
                className="w-full bg-surface-container-highest text-on-surface py-3 rounded-xl font-label-md hover:bg-surface-container-high transition-colors block text-center"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
