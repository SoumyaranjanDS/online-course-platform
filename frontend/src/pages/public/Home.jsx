import { Link } from "react-router-dom";
import {
  BookOpen,
  Code2,
  Database,
  Layout,
  Shield,
  CreditCard,
  PlayCircle,
  Users,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Layout className="w-6 h-6 text-blue-500" />,
      title: "Modern Frontend",
      description:
        "Built with React 19, Vite, and the brand new Tailwind CSS v4 for blazing fast performance and modern styling.",
    },
    {
      icon: <Database className="w-6 h-6 text-emerald-500" />,
      title: "Robust Backend",
      description:
        "Powered by Node.js, Express, and MongoDB with a scalable, modular MVC architecture.",
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      title: "Secure Authentication",
      description:
        "Role-based access control with JWT for Students, Instructors, and Administrators.",
    },
    {
      icon: <PlayCircle className="w-6 h-6 text-rose-500" />,
      title: "Cloudinary Media",
      description:
        "Secure, direct-to-cloud video and image uploading with signed URLs for course content.",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-amber-500" />,
      title: "Stripe Payments",
      description:
        "Integrated Stripe Checkout for seamless course purchases and secure payment processing.",
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      title: "Multi-Role Platform",
      description:
        "Instructors can create courses, students can learn, and admins manage the entire ecosystem.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500 selection:text-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Skillwell
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="relative pt-24 pb-32 overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] max-w-4xl opacity-40 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8">
              <Code2 className="w-4 h-4" />
              <span>Full-Stack Foundation Setup Complete</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 max-w-4xl mx-auto leading-tight">
              Build the ultimate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
                Online Learning Platform
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              A comprehensive Udemy-like clone boilerplate strictly built with
              JavaScript, React, Tailwind CSS v4, Express, and MongoDB. No
              TypeScript, no Redux, pure simplicity and power.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/courses"
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2"
              >
                Explore Courses
              </Link>
              <a
                href="#tech-stack"
                className="px-8 py-3.5 bg-white text-slate-700 font-medium rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95"
              >
                View Tech Stack
              </a>
            </div>
          </div>
        </section>

        {/* Features / Tech Stack Section */}
        <section
          id="tech-stack"
          className="py-24 bg-white border-y border-slate-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">
                Project Architecture & Features
              </h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                Everything you need to build a scalable, multi-role online
                course platform, set up and ready for business logic
                implementation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-900"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to start building?
            </h2>
            <p className="text-slate-300 mb-10 text-lg">
              The boilerplate is fully set up. Check the <code>docs/</code>{" "}
              folder for the API flows, project structure, and environment
              variable requirements.
            </p>
            <div className="inline-block p-1 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="bg-slate-950/50 px-6 py-4 rounded-xl text-slate-300 font-mono text-sm flex items-center gap-3">
                <span className="text-emerald-400">❯</span>
                npm run dev
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 py-8 border-t border-white/10 text-center">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Skillwell. Built for the Online
          Course Platform Project.
        </p>
      </footer>
    </div>
  );
}
