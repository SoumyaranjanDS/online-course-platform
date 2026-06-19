import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      {/* TopNavBar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm w-full">
        <div className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-20">
          {/* Brand */}
          <Link className="flex items-center gap-2" to="/">
            <img src="/logo.png" alt="Skillwell Logo" className="w-14 h-14 object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-lg font-body-md text-body-md">
            <Link className="text-black font-bold border-b-2 border-primary pb-1" to="/">Home</Link>
            <Link className="text-black hover:opacity-75 transition-opacity" to="/courses">Courses</Link>
            <a className="text-black hover:opacity-75 transition-opacity" href="#">Mentors</a>
            <a className="text-black hover:opacity-75 transition-opacity" href="#">Pricing</a>
            <a className="text-black hover:opacity-75 transition-opacity" href="#">Resources</a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-md">
            <Link to="/login" className="font-label-md text-label-md text-black hover:bg-surface-container-low transition-all px-4 py-2 rounded-lg scale-98 active:scale-95 duration-200">
              Login
            </Link>
            <Link to="/signup" className="font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-all px-6 py-3 rounded-xl scale-98 active:scale-95 duration-200 shadow-sm">
              Register
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-on-surface-variant p-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>
    </>
  );
}
