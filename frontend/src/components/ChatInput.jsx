import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function ChatInput({ input, setInput, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="flex items-center gap-2 p-2 pl-5 bg-white dark:bg-slate-800 border-2 border-rose-200 dark:border-rose-900/40 focus-within:border-brand dark:focus-within:border-brand rounded-full shadow-md transition-all">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your legal situation..."
          className="flex-1 bg-transparent border-none text-slate-800 dark:text-slate-100 placeholder:text-stone-400 focus:outline-none text-sm md:text-base"
        />

        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 rounded-full bg-rose-200/80 dark:bg-slate-700 text-stone-600 dark:text-slate-300 hover:bg-brand hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-rose-200/80 disabled:hover:text-stone-600 shrink-0"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}