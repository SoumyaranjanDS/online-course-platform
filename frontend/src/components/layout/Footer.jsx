import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b] text-white w-full px-8 py-16 md:px-16 lg:px-24 mt-xl relative overflow-hidden flex flex-col">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-16 relative z-10 max-w-container-max mx-auto w-full">
        {/* Left: Brand & Description */}
        <div className="flex flex-col gap-6 max-w-sm">
          <Link className="flex items-center gap-3" to="/">
            <img src="/logo.png" alt="Skillwell Logo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold tracking-wide">SKILLWELL</span>
          </Link>
        </div>

        {/* Right: Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 w-full lg:w-auto">
          {/* Column 1 */}
          <div className="flex flex-col gap-5">
            <h4 className="font-semibold text-sm">Quick link</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
              <Link to="#" className="hover:text-white transition-colors">Mentors</Link>
              <Link to="#" className="hover:text-white transition-colors">Pricing</Link>
            </div>
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-5">
            <h4 className="font-semibold text-sm">Company</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <Link to="#" className="hover:text-white transition-colors">About us</Link>
              <Link to="#" className="hover:text-white transition-colors">Contact us</Link>
              <Link to="#" className="hover:text-white transition-colors">Careers</Link>
              <Link to="#" className="hover:text-white transition-colors">Blog</Link>
            </div>
          </div>
          {/* Column 3 */}
          <div className="flex flex-col gap-5">
            <h4 className="font-semibold text-sm">Legal</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">License</a>
            </div>
          </div>
          {/* Column 4 */}
          <div className="flex flex-col gap-5">
            <h4 className="font-semibold text-sm">Social</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 pt-8 relative z-10 border-t border-white/10 max-w-container-max mx-auto w-full">
        <p>©{new Date().getFullYear()} Skillwell All rights reserved.</p>
        <p className="mt-4 md:mt-0">Designed for Learning - Powered by Skillwell</p>
      </div>

      {/* Bottom Section: Huge Gradient Text */}
      <div className="w-full flex justify-center items-end leading-none select-none pointer-events-none relative z-0 mt-12 md:mt-16 overflow-hidden">
        <h1 className="text-[15vw] font-black uppercase tracking-tighter bg-gradient-to-b from-primary to-[#001a42] bg-clip-text text-transparent drop-shadow-2xl translate-y-[15%]">
          SKILLWELL
        </h1>
      </div>
    </footer>
  );
}
