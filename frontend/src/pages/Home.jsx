import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-2">
      <div className="max-w-3xl text-center space-y-6 sm:space-y-8">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-200 dark:border-rose-900/50 bg-brand-light dark:bg-rose-950/30 text-brand dark:text-rose-300 text-xs font-medium">
          <span className="text-rose-500">✦</span>
          <span>AI Legal Assistant · Indian Law</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white leading-tight">
          Know Your Rights. <br />
          <span className="italic font-normal text-brand dark:text-rose-400">Get Legal Guidance</span> Instantly.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-stone-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          AI-powered legal assistance that simplifies Indian laws — free, private, and always available.
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand hover:bg-brand-hover text-white font-medium text-base shadow-md shadow-brand/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>Start Consultation</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
}