import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Scale, ArrowUpRight, ArrowLeft, Loader2 } from 'lucide-react';
import ChatInput from '../components/ChatInput';

const SUGGESTED_PROMPTS = [
  { text: 'Can I file an FIR online?' },
  { text: 'How do I apply for RTI?' },
  { text: 'What are my consumer rights?' },
  { text: 'Property dispute between siblings.' },
  { text: 'Cyber fraud complaint procedure.' },
  { text: 'Tenant rights in India.' },
];

// Dynamically resolves backend URL using Vite environment variable
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const BACKEND_API_URL = `${BACKEND_BASE_URL}/chat`;

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ref for auto-scrolling
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handlePromptClick = (promptText) => {
    handleSend(promptText);
  };

  const handleSend = async (userText) => {
    if (!userText.trim() || loading) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to backend server');
      }

      const data = await response.json();

      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: data.reply || 'No response received from AI.',
        },
      ]);
    } catch (error) {
      console.error('Error connecting to backend:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: '⚠️ Could not connect to the backend server. Please make sure your backend server is running and GROQ_API_KEY is configured.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 pt-2 pb-4 h-full flex flex-col overflow-hidden">
      
      {/* Top Bar: Back Button Positioned Left */}
      <div className="flex items-center justify-start mb-2 shrink-0 px-1">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-stone-600 dark:text-slate-300 hover:text-brand dark:hover:text-rose-400 text-xs sm:text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Expanded Container */}
      <div className="flex-1 bg-white/60 dark:bg-slate-800/40 border border-stone-200/80 dark:border-slate-700/60 rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-sm backdrop-blur-sm overflow-hidden">
        
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center items-center text-center my-auto overflow-y-auto px-2 space-y-6">
            
            {/* Logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand flex items-center justify-center text-white shadow-sm">
              <Scale className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-serif text-slate-900 dark:text-white mb-2 leading-tight">
                How can I help with your legal question?
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                Describe your situation in plain language. I'll explain your rights and what you can do next.
              </p>
            </div>

            {/* Suggested Prompts */}
            <div className="w-full max-w-2xl pt-2">
              <div className="text-[11px] font-semibold tracking-wider text-rose-800/60 dark:text-rose-400/60 uppercase mb-3">
                ✦ Suggested Prompts
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePromptClick(prompt.text)}
                    disabled={loading}
                    className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-brand/40 dark:hover:border-rose-400/40 text-xs sm:text-sm transition-all group disabled:opacity-50"
                  >
                    <span className="truncate pr-2">{prompt.text}</span>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-brand dark:group-hover:text-rose-400 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Active Message Stream */
          <div className="flex-1 space-y-4 mb-4 overflow-y-auto pr-1">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-brand text-white rounded-br-none shadow-sm'
                      : 'bg-stone-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none border border-stone-200 dark:border-slate-600'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-stone-100 dark:bg-slate-700 text-stone-500 dark:text-slate-300 rounded-2xl rounded-bl-none px-5 py-3 border border-stone-200 dark:border-slate-600 flex items-center gap-2 text-xs">
                  <Loader2 className="w-4 h-4 animate-spin text-brand dark:text-rose-400" />
                  <span>Analyzing legal provisions...</span>
                </div>
              </div>
            )}

            {/* Target anchor for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Bottom Input bar */}
        <div className="pt-3 shrink-0 border-t border-stone-100 dark:border-slate-700/50">
          <ChatInput input={input} setInput={setInput} onSubmit={handleSend} disabled={loading} />
          <p className="text-[11px] text-center text-stone-400 dark:text-slate-500 mt-2">
            Legal Advisor can make mistakes. Educational information only — not a substitute for a qualified advocate.
          </p>
        </div>

      </div>
    </div>
  );
}