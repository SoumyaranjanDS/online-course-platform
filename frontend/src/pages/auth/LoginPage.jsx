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
  Eye,
  EyeOff,
  Lightbulb,
  CheckCircle,
  BookOpen,
  Play,
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await login(data);
      toast.success(res.message || "Logged in successfully!");

      if (res.data.role === "STUDENT") navigate("/student/dashboard");
      else if (res.data.role === "INSTRUCTOR")
        navigate("/instructor/dashboard");
      else if (res.data.role === "ADMIN") navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const idToken = await user.getIdToken();
      
      const res = await googleLogin({
        idToken,
      });

      toast.success(res.message || "Logged in successfully!");
      if (res.data.role === "STUDENT") navigate("/student/dashboard");
      else if (res.data.role === "INSTRUCTOR")
        navigate("/instructor/dashboard");
      else if (res.data.role === "ADMIN") navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to login with Google");
    }
  };

  return (
    <main className="min-h-screen lg:h-screen w-full bg-white text-slate-950 lg:grid lg:grid-cols-[57%_43%]">
      {/* LEFT VISUAL PANEL */}
      <section className="hidden lg:flex relative h-full flex-col justify-center overflow-hidden bg-gradient-to-br from-[#C7F3F0] via-[#E2F7F1] to-[#DFF1C6]">
        {/* Animated background glow */}
        <div className="absolute -left-32 top-8 h-[420px] w-[420px] rounded-full bg-cyan-200/70 blur-3xl animate-blob-slow" />
        <div className="absolute -bottom-36 right-0 h-[480px] w-[480px] rounded-full bg-cyan-200/70 blur-3xl animate-blob-reverse" />
        <div className="absolute right-16 top-14 h-[360px] w-[360px] rounded-full bg-cyan-100/80 blur-3xl animate-pulse-soft" />
    
        {/* Dot patterns */}
        <div className="absolute inset-0 opacity-[0.18]">
          <div className="absolute left-16 top-20 h-32 w-32 bg-[radial-gradient(circle,#075CE8_1.2px,transparent_1.2px)] [background-size:18px_18px]" />
          <div className="absolute bottom-24 right-20 h-36 w-36 bg-[radial-gradient(circle,#0f9f6e_1.2px,transparent_1.2px)] [background-size:18px_18px]" />
        </div>

        {/* Floating small decorative shapes */}
        <div className="absolute left-[10%] top-[14%] h-8 w-8 rounded-2xl bg-white/70 shadow-lg animate-float-y" />
        <div className="absolute right-[15%] top-[18%] h-5 w-5 rounded-full bg-yellow-300/80 shadow-lg animate-float-x" />
        <div className="absolute right-[8%] bottom-[22%] h-10 w-10 rounded-2xl bg-blue-500/15 shadow-lg animate-float-y-delay" />
        <div className="absolute left-[18%] bottom-[13%] h-6 w-6 rounded-full bg-emerald-500/20 shadow-lg animate-float-x-delay" />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 py-6 xl:px-10">
          <div className="relative flex h-full max-h-[500px] w-full max-w-[540px] items-center justify-center scale-90 xl:scale-100">
            {/* Large glass card */}
            <div className="absolute inset-x-8 top-[64px] bottom-[74px] rounded-[36px] border border-white/60 bg-white/35 shadow-[0_35px_100px_rgba(15,23,42,0.18)] backdrop-blur-md" />

            {/* Main glow */}
            <div className="absolute h-[430px] w-[430px] rounded-full bg-gradient-to-br from-white/65 to-emerald-200/50 blur-2xl" />

            {/* Main illustration */}
            <img
              className="relative z-10 w-full max-w-[520px] object-contain drop-shadow-[0_30px_45px_rgba(15,23,42,0.22)] animate-float-main"
              alt="Online learning illustration"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNS3Toas2B1ajgnKwzkneKLTX0hgZKlOEBuR2zdOQa586YucfsR8yrqfzZBis1XvLvpY0fAc0Q1ncghX3r9oFbCgf5ba_Lz_0lL_4ixkRCXG3_RXe3zM_LzIckWn-OIST9s17BHUC6D7KuiizehHKWzQWOYeI8BgYfPn38hXBbHTAYFVHTi9OLEjW8Wr-IZAmROFmIupk0CkxeGl_2Sli85QmEI97PhjyEjvTcuJXQJtSHubR14dBHzXcBrd5KDHVy5Ud0WcD4eIk"
            />

            {/* Video floating card */}
            <div className="absolute left-[2%] top-[23%] z-20 w-[250px] rounded-[24px] border border-white/70 bg-white/90 p-3 shadow-[0_24px_55px_rgba(15,23,42,0.18)] backdrop-blur-md animate-float-x">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-200">
                <img
                  className="h-full w-full object-cover"
                  alt="Course preview"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEMzvFZDh6sBVagPV-YkvGU_xiM-3Ol9ZDocK2-q5iE6VsozLsE-TGXKOWZ2mKzo6nCUxAtDLTNtcmyv80IzFzibinDSjRtKDxX00OdUEc5XPBQwSAAIgzYUzWyMbDQMCJqb5yidSxd_PTeKJNc5nyV8866pOXIhAlr7hs4n8O7OBOrNDJJHOpnEHk_BYxo4VfYEUKwDJUAk85MUmvgd311AC7Es7hFDM0YrVk7mYMEPGGS1QgpLMKLYDm0B-18_H5BR0t_SfvBqI"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#075CE8] shadow-lg">
                    <Play className="h-5 w-5 fill-[#075CE8]" />
                  </span>
                </div>
              </div>

              <div className="mt-3.5 space-y-2">
                <div className="h-2.5 w-4/5 rounded-full bg-slate-200" />
                <div className="h-2.5 w-3/5 rounded-full bg-slate-100" />
              </div>
            </div>

            {/* Lesson complete pill */}
            <div className="absolute right-[6%] top-[15%] z-20 flex items-center gap-2 rounded-full bg-[#7BF0B2] px-5 py-3 text-[12px] font-bold text-emerald-950 shadow-[0_18px_40px_rgba(16,185,129,0.26)] animate-float-y">
              <CheckCircle className="h-4 w-4" />
              Lesson complete! +50 XP
            </div>

            {/* Daily goal card */}
            <div className="absolute bottom-[22%] left-[10%] z-20 rounded-[24px] border border-white/70 bg-white/90 px-5 py-4 text-center shadow-[0_24px_55px_rgba(15,23,42,0.16)] backdrop-blur-md animate-float-y-delay">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full border-[6px] border-emerald-400 text-[13px] font-bold text-slate-800">
                75%
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                Daily Goal
              </p>
            </div>

            {/* Book icon */}
            <div className="absolute bottom-[22%] right-[12%] z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-700 text-white shadow-[0_18px_40px_rgba(146,64,14,0.28)] animate-pulse-soft">
              <BookOpen className="h-6 w-6" />
            </div>

            {/* New progress card */}
            <div className="absolute right-[5%] bottom-[37%] z-20 w-[178px] rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_24px_55px_rgba(15,23,42,0.16)] backdrop-blur-md animate-float-x-delay">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-100 text-[#075CE8]">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-[#075CE8]">
                  8/10
                </span>
              </div>

              <p className="text-[12px] font-bold text-slate-950">
                Modules Done
              </p>

              <div className="mt-3 h-2 rounded-full bg-slate-200">
                <div className="h-2 w-4/5 rounded-full bg-[#075CE8]" />
              </div>
            </div>

            {/* Small sparkle */}
            <div className="absolute right-[35%] top-[8%] z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-[#075CE8] shadow-[0_18px_40px_rgba(15,23,42,0.14)] backdrop-blur-md animate-spin-soft">
              ✦
            </div>
          </div>

          <div className="mt-4 max-w-[460px] text-center">
            <h2 className="text-[25px] font-semibold tracking-[-0.03em] text-slate-950">
              Unlocking potential through clarity.
            </h2>
            <p className="mx-auto mt-3 max-w-[390px] text-[14px] leading-6 text-slate-600">
              Join over 50,000 learners mastering new skills with Luminous
              Learning&apos;s adaptive curriculum.
            </p>
          </div>
        </div>
      </section>

      {/* RIGHT LOGIN PANEL */}
      <section className="relative flex h-full flex-col px-6 py-8 sm:px-12 md:py-12 lg:px-16 xl:px-20 lg:overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center justify-center lg:justify-start mb-8 lg:mb-0">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#075CE8] text-white">
              <Lightbulb className="h-4 w-4" />
            </span>
            <span className="text-[15px] font-bold text-[#075CE8]">
              Luminous
            </span>
          </Link>
        </div>

        {/* Form Center */}
        <div className="flex flex-1 items-center justify-center lg:justify-start w-full">
          <div className="w-full max-w-[400px] lg:max-w-[345px]">
            <header className="mb-8 text-center lg:text-left">
              <h1 className="mb-3 text-[28px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[32px]">
                Welcome back, let&apos;s keep learning.
              </h1>
              <p className="mx-auto lg:mx-0 max-w-[320px] text-[14px] leading-relaxed text-slate-500">
                Access your personalized learning dashboard and continue your
                professional growth journey.
              </p>
            </header>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500"
                >
                  Email Address
                </label>

                <input
                  {...register("email")}
                  id="email"
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
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-[11px] font-semibold text-[#075CE8] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    {...register("password")}
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 pr-10 text-[13px] text-slate-900 outline-none transition focus:border-[#075CE8] focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#075CE8] text-[13px] font-semibold text-white shadow-[0_12px_24px_rgba(7,92,232,0.18)] transition hover:bg-[#064FC7] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            {/* Keep this only if you still want the visual section.
                Since your final auth flow is email/password only, these buttons are UI-only. */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
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

            <p className="mt-7 text-center text-[12px] text-slate-500">
              Don&apos;t have an account?
              <Link
                to="/signup"
                className="ml-1 font-semibold text-[#075CE8] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <p className="pb-4 text-center lg:text-left text-[11px] text-slate-400 mt-8 lg:mt-0">
          © 2024 Luminous Learning. All rights reserved.
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
