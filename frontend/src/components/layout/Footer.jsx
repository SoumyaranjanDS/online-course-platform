import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Video, Camera, ChevronDown, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f1f5f9] pt-20 pb-10 border-t border-outline-variant/20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-6">
            <Link className="text-2xl font-bold text-primary tracking-tight" to="/">LearnHub</Link>
            <p className="text-base text-slate-600 leading-relaxed">
              Building the future of digital education, one lesson at a time. Join our community of lifelong learners.
            </p>
            <div className="flex gap-4 pt-2">
              <a className="w-10 h-10 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm" href="#">
                <Globe className="w-5 h-5" />
              </a>
              <a className="w-10 h-10 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm" href="#">
                <Video className="w-5 h-5" />
              </a>
              <a className="w-10 h-10 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm" href="#">
                <Camera className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h6 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Company</h6>
            <ul className="space-y-4 text-base text-slate-600 font-medium">
              <li><Link className="hover:text-primary transition-colors" to="/about">About Us</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/careers">Careers</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/press">Press</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Resources</h6>
            <ul className="space-y-4 text-base text-slate-600 font-medium">
              <li><Link className="hover:text-primary transition-colors" to="/blog">Blog</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/help">Help Center</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/success-stories">Success Stories</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/newsletter">Newsletter</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h6 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Stay Updated</h6>
            <p className="text-sm text-slate-600 mb-4 font-medium">Get latest course updates and news.</p>
            <div className="flex gap-2">
              <input 
                className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all shadow-sm" 
                placeholder="Email address" 
                type="email"
              />
              <button className="px-4 py-2.5 bg-primary text-white rounded-xl shadow-md hover:bg-primary-container hover:text-white transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 font-medium">© {new Date().getFullYear()} LearnHub. All rights reserved.</p>
          
          <div className="flex items-center gap-8 text-sm text-slate-500 font-medium">
            <Link className="hover:text-primary transition-colors" to="/privacy">Privacy Policy</Link>
            <Link className="hover:text-primary transition-colors" to="/terms">Terms of Service</Link>
            
            <div className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-outline-variant/30 hover:border-outline-variant transition-colors shadow-sm text-slate-700">
              <Globe className="w-4 h-4" />
              <span>English</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
