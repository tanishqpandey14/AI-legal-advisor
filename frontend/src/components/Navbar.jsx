import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Moon, Sun, ArrowRight } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-[#FCFBFA]/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-stone-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="font-semibold text-lg text-slate-900 dark:text-white block leading-tight">
              Legal Advisor
            </span>
            <span className="text-[10px] tracking-wider uppercase text-stone-500 dark:text-slate-400 font-medium block">
              AI · INDIAN LAW
            </span>
          </div>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/' 
                ? 'text-brand font-semibold dark:text-rose-400' 
                : 'text-slate-600 dark:text-slate-300 hover:text-brand'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/about' 
                ? 'text-brand font-semibold dark:text-rose-400' 
                : 'text-slate-600 dark:text-slate-300 hover:text-brand'
            }`}
          >
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-full border border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link
            to="/chat"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand hover:bg-brand-hover text-white text-sm font-medium transition-all shadow-sm shadow-brand/20 active:scale-95"
          >
            <span>Start</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}