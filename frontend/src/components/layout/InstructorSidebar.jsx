import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const instructorNavItems = [
  { to: "/instructor/dashboard", icon: "dashboard", label: "Dashboard" },
  { to: "/instructor/courses", icon: "video_library", label: "My Courses" },
  { to: "/instructor/doubts", icon: "forum", label: "Student Q&A" },
  { to: "/instructor/reviews", icon: "star", label: "Reviews" },
];

export default function InstructorSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile TopBar */}
      <header className="md:hidden flex justify-between items-center w-full px-4 h-16 bg-surface-container-lowest border-b border-outline-variant fixed top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-headline-sm font-headline-sm font-bold text-primary">
          <img src="/logo.png" alt="Skillwell" className="h-10 w-auto object-contain" />
          Skillwell
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-on-surface-variant p-2 rounded-full hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Slide-out Sidebar */}
      <nav
        className={`md:hidden fixed top-16 left-0 bottom-0 w-72 bg-surface-container-lowest border-r border-outline-variant z-40 p-6 flex flex-col gap-2 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-4 mb-8 p-2 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface font-semibold">
              {user?.name}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Instructor Account
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          {instructorNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-label-md text-label-md transition-all duration-200 active:scale-98 ${
                isActive(item.to)
                  ? "bg-secondary-container text-on-secondary-container font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="mt-auto">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl px-4 py-3 transition-all w-full"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Logout</span>
          </button>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col h-screen w-72 bg-surface-container-lowest border-r border-outline-variant fixed left-0 top-0 z-40 p-6 gap-2">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-headline-sm font-headline-sm font-bold text-primary">
            <img src="/logo.png" alt="Skillwell" className="h-10 w-auto object-contain" />
            Skillwell
          </Link>
        </div>
        <div className="flex items-center gap-4 mb-8 p-2 rounded-xl hover:bg-surface-container-high transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface font-semibold">
              {user?.name}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Instructor Account
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          {instructorNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-label-md text-label-md transition-all duration-200 active:scale-98 ${
                isActive(item.to)
                  ? "bg-secondary-container text-on-secondary-container font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-4">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl px-4 py-3 transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
}
