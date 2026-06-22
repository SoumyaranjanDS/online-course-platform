import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { auth, googleProvider } from "../../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import {
  Loader2,
  Sun,
  GraduationCap,
  Presentation,
  Check,
  Star,
  MessageSquare,
  ShieldCheck,
  Users,
  Award,
  Sparkles,
  PlayCircle,
  BookOpen,
  CheckCircle,
} from "lucide-react";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["STUDENT", "INSTRUCTOR"]),
});

const SignupPage = () => {
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "STUDENT",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await signup(data);
      toast.success(res.message || "Account created successfully!");

      if (res.data.role === "STUDENT") navigate("/student/dashboard");
      else if (res.data.role === "INSTRUCTOR")
        navigate("/instructor/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const idToken = await user.getIdToken();

      const res = await googleLogin({
        idToken,
        role: selectedRole,
      });

      toast.success(res.message || "Account created successfully!");
      if (res.data.role === "STUDENT") navigate("/student/dashboard");
      else if (res.data.role === "INSTRUCTOR")
        navigate("/instructor/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to sign up with Google",
      );
    }
  };

  return (
    <main className="min-h-screen lg:h-screen w-full bg-white text-slate-950 lg:grid lg:grid-cols-[57%_43%]">
      {/* LEFT VISUAL PANEL */}
      <section className="hidden lg:flex relative h-full flex-col justify-center overflow-hidden bg-gradient-to-br from-[#eef5ff] via-[#dff7f2] to-[#76efbd]">
        {/* Background animated blobs */}
        <div className="absolute -top-28 -right-24 h-[360px] w-[360px] rounded-full bg-blue-300/40 blur-3xl animate-blob-slow" />
        <div className="absolute bottom-[-120px] left-[-80px] h-[420px] w-[420px] rounded-full bg-emerald-300/50 blur-3xl animate-blob-reverse" />
        <div className="absolute left-[22%] top-[18%] h-[260px] w-[260px] rounded-full bg-cyan-200/45 blur-3xl animate-pulse-soft" />

        {/* Decorative grid dots */}
        <div className="absolute inset-0 opacity-[0.22]">
          <div className="absolute left-16 top-20 h-28 w-28 bg-[radial-gradient(circle,#075CE8_1.2px,transparent_1.2px)] [background-size:18px_18px]" />
          <div className="absolute bottom-24 right-20 h-32 w-32 bg-[radial-gradient(circle,#0f9f6e_1.2px,transparent_1.2px)] [background-size:18px_18px]" />
        </div>

        {/* Floating small shapes */}
        <div className="absolute left-[12%] top-[12%] h-8 w-8 rounded-2xl bg-white/70 shadow-lg animate-float-y" />
        <div className="absolute right-[18%] top-[16%] h-5 w-5 rounded-full bg-yellow-300/80 shadow-lg animate-float-x" />
        <div className="absolute right-[9%] bottom-[24%] h-10 w-10 rounded-2xl bg-blue-500/15 shadow-lg animate-float-y-delay" />
        <div className="absolute left-[18%] bottom-[14%] h-6 w-6 rounded-full bg-emerald-500/20 shadow-lg animate-float-x-delay" />

        {/* Main content */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 py-6 xl:px-10">
          <div className="relative flex h-full max-h-[500px] w-full max-w-[540px] items-center justify-center scale-90 xl:scale-100">
            {/* Large glass card behind illustration */}
            <div className="absolute inset-x-8 top-[70px] bottom-[70px] rounded-[34px] border border-white/60 bg-white/35 shadow-[0_35px_100px_rgba(15,23,42,0.18)] backdrop-blur-md" />

            {/* Large glow behind image */}
            <div className="absolute h-[430px] w-[430px] rounded-full bg-gradient-to-br from-white/60 to-emerald-200/50 blur-2xl" />

            {/* Main illustration */}
            <img
              className="relative z-10 w-full max-w-[520px] object-contain drop-shadow-[0_30px_45px_rgba(15,23,42,0.22)] animate-float-main"
              alt="Online learning signup illustration"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0_DdTIsIsj9Jwe2kqZ2AP0_P4b_pEt4Jiac23SFzUgO0tVC9M73krY_P1W7UHl0HYe8duePZVjlEmmx0_HVO_jiiBECV8n0oAFpJz-v8aT8nIKup4jl-SwCIRR3c5N-5fj9J_x-YuKGwSpsuk1WaV2aB2O-1m5tX8wDSct2HtcXuzCXjm2CEFUtSmNAN2ucNaxNmTR8InwjRqjl8582M_g7uwMvGOot35u09rBHKo6clFXOawWyu2cIRSJpxT08mRYcQv4XmpCsM"
            />

            {/* Top Rated */}
            <div className="absolute right-[7%] top-[16%] z-20 flex items-center gap-2 rounded-2xl bg-orange-200 px-4 py-3 text-[12px] font-bold text-slate-900 shadow-[0_18px_40px_rgba(251,146,60,0.25)] animate-float-y">
              <Star className="h-4 w-4 fill-slate-900 text-slate-900" />
              Top Rated
            </div>

            {/* Active Community */}
            <div className="absolute left-[1%] top-[43%] z-20 flex items-center gap-2 rounded-xl rounded-bl-none bg-[#075CE8] px-4 py-3 text-[12px] font-bold text-white shadow-[0_18px_40px_rgba(7,92,232,0.28)] animate-float-x">
              <MessageSquare className="h-4 w-4" />
              Active Community
            </div>

            {/* Verified Educators */}
            <div className="absolute bottom-[19%] left-[8%] z-20 flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-[12px] font-bold text-emerald-950 shadow-[0_18px_40px_rgba(16,185,129,0.26)] animate-float-y-delay">
              <ShieldCheck className="h-4 w-4" />
              Verified Educators
            </div>

            {/* Students card */}
            <div className="absolute left-[10%] top-[19%] z-20 w-[168px] rounded-3xl border border-white/70 bg-white/80 p-4 shadow-[0_24px_55px_rgba(15,23,42,0.16)] backdrop-blur-md animate-float-y-delay">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-[#075CE8]">
                <Users className="h-5 w-5" />
              </div>
              <p className="text-[19px] font-bold leading-none text-slate-950">
                50k+
              </p>
              <p className="mt-1 text-[11px] font-medium text-slate-500">
                Active learners
              </p>
            </div>

            {/* Course progress card */}
            <div className="absolute right-[4%] bottom-[23%] z-20 w-[178px] rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_24px_55px_rgba(15,23,42,0.16)] backdrop-blur-md animate-float-x-delay">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  75%
                </span>
              </div>

              <p className="text-[12px] font-bold text-slate-950">
                Course Progress
              </p>

              <div className="mt-3 h-2 rounded-full bg-slate-200">
                <div className="h-2 w-3/4 rounded-full bg-emerald-500" />
              </div>
            </div>

            {/* Achievement card */}
            <div className="absolute bottom-[10%] right-[28%] z-20 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-[0_20px_45px_rgba(15,23,42,0.16)] backdrop-blur-md animate-float-y">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-slate-950">
                  New Badge
                </p>
                <p className="text-[10px] text-slate-500">Skill unlocked</p>
              </div>
            </div>

            {/* Lesson complete */}
            <div className="absolute right-[18%] top-[33%] z-20 flex items-center gap-2 rounded-full bg-white/85 px-4 py-2.5 text-[11px] font-bold text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.14)] backdrop-blur-md animate-float-x-delay">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              Lesson completed
            </div>

            {/* Play lesson */}
            <div className="absolute left-[29%] bottom-[28%] z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[#075CE8] text-white shadow-[0_18px_40px_rgba(7,92,232,0.32)] animate-pulse-soft">
              <PlayCircle className="h-7 w-7" />
            </div>

            {/* Sparkle badge */}
            <div className="absolute right-[33%] top-[10%] z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/75 text-[#075CE8] shadow-[0_18px_40px_rgba(15,23,42,0.14)] backdrop-blur-md animate-spin-soft">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT SIGNUP PANEL */}
      <section className="relative flex h-full flex-col px-6 py-8 sm:px-12 md:py-12 lg:px-16 xl:px-20 lg:overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center justify-center lg:justify-start mb-8 lg:mb-0">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center text-[#075CE8]">
              <Sun className="h-4 w-4" />
            </span>
            <span className="text-[14px] font-bold text-[#075CE8]">
              Skillwell Learning
            </span>
          </Link>
        </div>

        {/* Form Center */}
        <div className="flex flex-1 items-center justify-center lg:justify-start w-full">
          <div className="w-full max-w-[400px] lg:max-w-[345px]">
            <header className="mb-8 text-center lg:text-left">
              <h1 className="mb-2.5 text-[29px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[32px]">
                Start your journey
                <br className="hidden lg:block" /> with us.
              </h1>

              <p className="text-[14px] leading-relaxed text-slate-500">
                Choose how you&apos;ll use Skillwell Learning.
              </p>
            </header>

            {/* Role Selector */}
            <div className="mb-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setValue("role", "STUDENT", { shouldValidate: true })
                }
                className={`relative h-[84px] rounded-lg border p-3 text-left transition ${
                  selectedRole === "STUDENT"
                    ? "border-[#075CE8] bg-[#075CE8]/5 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="mb-3 flex items-start justify-between">
                  <GraduationCap
                    className={`h-4 w-4 ${
                      selectedRole === "STUDENT"
                        ? "text-[#075CE8]"
                        : "text-slate-400"
                    }`}
                  />

                  {selectedRole === "STUDENT" && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#075CE8] text-white">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>

                <p className="text-[12px] font-semibold text-slate-950">
                  Student
                </p>
                <p className="mt-0.5 text-[10px] text-slate-500">
                  Learn new skills
                </p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setValue("role", "INSTRUCTOR", { shouldValidate: true })
                }
                className={`relative h-[84px] rounded-lg border p-3 text-left transition ${
                  selectedRole === "INSTRUCTOR"
                    ? "border-emerald-500 bg-emerald-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="mb-3 flex items-start justify-between">
                  <Presentation
                    className={`h-4 w-4 ${
                      selectedRole === "INSTRUCTOR"
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`}
                  />

                  {selectedRole === "INSTRUCTOR" && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>

                <p className="text-[12px] font-semibold text-slate-950">
                  Teacher
                </p>
                <p className="mt-0.5 text-[10px] text-slate-500">
                  Share your expertise
                </p>
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-slate-800">
                  Full Name
                </label>

                <input
                  {...register("name")}
                  type="text"
                  placeholder="Alex Johnson"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-[13px] text-slate-900 outline-none transition focus:border-[#075CE8] focus:ring-4 focus:ring-blue-100"
                />

                {errors.name && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-slate-800">
                  Email Address
                </label>

                <input
                  {...register("email")}
                  type="email"
                  placeholder="alex@example.com"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-[13px] text-slate-900 outline-none transition focus:border-[#075CE8] focus:ring-4 focus:ring-blue-100"
                />

                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-slate-800">
                  Password
                </label>

                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-[13px] text-slate-900 outline-none transition focus:border-[#075CE8] focus:ring-4 focus:ring-blue-100"
                />

                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg text-[12px] font-semibold text-white shadow-[0_12px_24px_rgba(7,92,232,0.18)] transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 ${
                  selectedRole === "INSTRUCTOR"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-[#075CE8] hover:bg-[#064FC7]"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : selectedRole === "INSTRUCTOR" ? (
                  "Create Teacher Account"
                ) : (
                  "Create Student Account"
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="flex h-10 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white text-[12px] font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.67l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
            </div>

            <p className="mt-8 mb-8 lg:mb-0 text-center text-[11px] text-slate-500">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 font-semibold text-[#075CE8] hover:underline"
              >
                Log in.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
