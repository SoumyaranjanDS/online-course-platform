import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const getDashboardLink = () => {
    if (user?.role === 'INSTRUCTOR') return '/instructor/dashboard';
    if (user?.role === 'STUDENT') return '/student/dashboard';
    if (user?.role === 'ADMIN') return '/admin/dashboard';
    return '/';
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm w-full">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        
        <div className="flex items-center gap-12">
          <Link className="flex items-center gap-2 text-2xl font-bold text-primary tracking-tight" to="/">
            <img src="/logo.png" alt="Skillwell Logo" className="h-8 w-auto object-contain" />
            Skillwell
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link className="text-slate-600 hover:text-primary transition-colors" to="/courses">Courses</Link>
            <a className="text-slate-600 hover:text-primary transition-colors" href="#why-us">Why Us</a>
            <a className="text-slate-600 hover:text-primary transition-colors" href="#about">About</a>
            <a className="text-slate-600 hover:text-primary transition-colors" href="#pricing">Pricing</a>
            <a className="text-slate-600 hover:text-primary transition-colors" href="#faq">FAQ</a>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-3 pr-1 rounded-full border border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 transition-all focus:outline-none"
              >
                <span className="font-bold text-sm text-slate-700">{user.name?.split(' ')[0]}</span>
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-outline-variant/20 py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-outline-variant/20 mb-2">
                    <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.role?.toLowerCase()}</p>
                  </div>
                  
                  <Link 
                    to={getDashboardLink()}
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-6 py-2.5 font-bold text-primary hover:bg-primary/5 transition-all rounded-xl"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-6 py-2.5 font-bold bg-primary text-white hover:shadow-lg hover:shadow-primary/20 transition-all rounded-full hover:scale-105 active:scale-95"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-600 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
      </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed left-0 right-0 bottom-0 top-20 bg-white z-[60] flex flex-col border-t border-outline-variant/20 overflow-y-auto shadow-xl">
          {user && (
            <div className="p-6 border-b border-outline-variant/20 flex items-center gap-4 bg-slate-50">
               <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{user.name}</p>
                  <p className="text-sm text-slate-500 capitalize">{user.role?.toLowerCase()}</p>
                </div>
            </div>
          )}

          <div className="flex flex-col p-6 gap-6 text-lg font-bold text-slate-700">
            {user && (
              <>
                <Link to={getDashboardLink()} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-primary">
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </Link>
                <div className="h-px bg-outline-variant/20 w-full"></div>
              </>
            )}

            <Link to="/courses" onClick={() => setIsMobileMenuOpen(false)}>Courses</Link>
            <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)}>Why Us</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
          </div>

          <div className="mt-auto p-6 border-t border-outline-variant/20 flex flex-col gap-4">
            {user ? (
               <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 font-bold bg-red-50 text-red-600 rounded-xl"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-6 py-3 font-bold text-primary bg-primary/5 rounded-xl"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-6 py-3 font-bold bg-primary text-white rounded-full shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
