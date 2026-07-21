import React from 'react';
import { Scale, Users, Shield } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center space-y-4 mb-16">
        <span className="text-xs font-semibold tracking-widest text-brand uppercase dark:text-rose-400">
          ABOUT
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-white">
          Legal knowledge, made <span className="italic text-brand dark:text-rose-400">accessible.</span>
        </h1>
        <p className="text-base sm:text-lg text-stone-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Millions of Indians face legal issues every year without knowing where to start. Legal Advisor is an AI-powered assistant that translates complex Indian law into calm, clear, actionable guidance — free for anyone who needs it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 space-y-4">
          <div className="w-10 h-10 rounded-full bg-brand-light dark:bg-rose-950/40 text-brand dark:text-rose-400 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Grounded in law</h3>
          <p className="text-sm text-stone-500 dark:text-slate-400 leading-relaxed">
            Answers reference the IPC, CrPC, Constitution, and central statutes.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 space-y-4">
          <div className="w-10 h-10 rounded-full bg-brand-light dark:bg-rose-950/40 text-brand dark:text-rose-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Built for citizens</h3>
          <p className="text-sm text-stone-500 dark:text-slate-400 leading-relaxed">
            Written for people, not lawyers — no jargon, no gatekeeping.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 space-y-4">
          <div className="w-10 h-10 rounded-full bg-brand-light dark:bg-rose-950/40 text-brand dark:text-rose-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Private by design</h3>
          <p className="text-sm text-stone-500 dark:text-slate-400 leading-relaxed">
            Your conversations stay yours. We never sell or train on them.
          </p>
        </div>
      </div>
    </div>
  );
}