import React, { useState } from "react";
import { courseService } from "../../services/courseService";

export default function Step4Pricing({
  courseId,
  formData,
  setFormData,
  onNext,
  onPrev,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFree, setIsFree] = useState(formData.price === 0);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const finalPrice = isFree ? 0 : Number(formData.price || 0);

      await courseService.updateCourse(courseId, {
        price: finalPrice,
        validityPeriod: formData.validityPeriod ? Number(formData.validityPeriod) : null,
      });
      onNext();
    } catch (err) {
      setError(err.message || "Failed to save pricing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-8 relative z-10">
      {error && (
        <div className="p-4 bg-error-container text-on-error-container rounded-lg">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-8 border-b border-outline-variant/20 pb-8">
        <div>
          <h2 className="text-headline-sm font-headline-sm text-on-surface mb-2">
            Pricing
          </h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Determine how you want to charge students for your course.
          </p>
        </div>

        {/* Pricing Type Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <label
            className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${
              !isFree
                ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                : "border-outline-variant/50 bg-surface hover:border-outline-variant"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined text-[28px] ${!isFree ? "text-primary" : "text-on-surface-variant"}`}
                >
                  payments
                </span>
                <span className="font-bold text-on-surface text-lg">
                  Paid Course
                </span>
              </div>
              <input
                type="radio"
                name="pricingType"
                checked={!isFree}
                onChange={() => setIsFree(false)}
                className="w-5 h-5 text-primary border-outline-variant focus:ring-primary"
              />
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Charge a one-time fee for lifetime access to this course.
            </p>
          </label>

          <label
            className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${
              isFree
                ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                : "border-outline-variant/50 bg-surface hover:border-outline-variant"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined text-[28px] ${isFree ? "text-primary" : "text-on-surface-variant"}`}
                >
                  redeem
                </span>
                <span className="font-bold text-on-surface text-lg">
                  Free Course
                </span>
              </div>
              <input
                type="radio"
                name="pricingType"
                checked={isFree}
                onChange={() => {
                  setIsFree(true);
                  setFormData((prev) => ({ ...prev, price: 0 }));
                }}
                className="w-5 h-5 text-primary border-outline-variant focus:ring-primary"
              />
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Offer this course for free to build an audience and gather
              reviews.
            </p>
          </label>
        </div>

        {/* Price Input field (only shows if Paid) */}
        {!isFree && (
          <div className="mt-5 animate-in fade-in slide-in-from-top-4">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              {/* Soft background accent */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-blue-100/70 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-emerald-100/70 blur-2xl" />

              <div className="relative z-10">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <label
                      className="block text-sm font-bold text-slate-950"
                      htmlFor="price"
                    >
                      Course Price
                    </label>
                    {/* <p className="mt-1 text-xs leading-5 text-slate-500">
                      Set a fair price based on your course length, depth, and
                      value.
                    </p> */}
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    INR
                  </span>
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
                    <span className="text-lg font-bold">₹</span>
                  </div>

                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="1"
                    step="1"
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    required={!isFree}
                    placeholder="1999"
                    className="h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-20 pr-4 text-2xl font-extrabold tracking-tight text-slate-950 outline-none transition-all placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[499, 999, 1999].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          price: String(amount),
                        }))
                      }
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>

                <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-800">
                  Tip: For beginner courses, ₹499–₹999 works well. For advanced
                  or project-based courses, ₹1499–₹2999 is suitable.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-8 border-b border-outline-variant/20 pb-8">
        <div>
          <h2 className="text-headline-sm font-headline-sm text-on-surface mb-2">
            Course Expiration (Optional)
          </h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Set an automatic expiration for this course. After this period, students will no longer be able to access the course.
          </p>
        </div>

        <div>
          <label
            className="block text-sm font-bold text-slate-950 mb-2"
            htmlFor="validityPeriod"
          >
            Validity Period (in months)
          </label>
          <div className="relative">
            <input
              type="number"
              id="validityPeriod"
              name="validityPeriod"
              min="1"
              step="1"
              value={formData.validityPeriod || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  validityPeriod: e.target.value,
                }))
              }
              placeholder="e.g., 6"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-bold text-slate-950 outline-none transition-all placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Leave blank for lifetime access. If set to 6, the course will expire 6 months after the student enrolls.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 rounded-full text-on-surface-variant hover:bg-surface-container-low font-bold transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          Back
        </button>
        <button
          type="submit"
          disabled={
            loading || (!isFree && (!formData.price || formData.price <= 0))
          }
          className="px-8 py-3 rounded-[16px] bg-primary text-on-primary font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save & Next"}
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </button>
      </div>
    </form>
  );
}
