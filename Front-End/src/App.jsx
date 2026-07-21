import { useEffect, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Welcome from "./components/Welcome.jsx";
import Message from "./components/Message.jsx";
import TypingIndicator from "./components/TypingIndicator.jsx";
import Composer from "./components/Composer.jsx";
import "./App.css";

const BACKEND_URL = "/api/chat";
const RESET_URL = "/api/reset";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const chatAreaRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function scrollToBottom() {
    const el = chatAreaRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }

  async function send(rawText) {
    const text = (rawText ?? input).trim();
    if (!text || isLoading) return;

    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";

    setMessages((m) => [...m, { role: "user", text }]);
    setIsTyping(true);
    setIsLoading(true);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setIsTyping(false);
      setMessages((m) => [
        ...m,
        { role: "bot", text: data.reply || "Something went wrong. Please try again." },
      ]);
    } catch {
      setIsTyping(false);
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Backend not reachable. Please try again shortly." },
      ]);
    }

    setIsLoading(false);
    inputRef.current?.focus();
  }

  async function resetChat() {
    try {
      await fetch(RESET_URL, { method: "POST" });
    } catch {
      /* ignore */
    }
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <div className="app-shell">
      <Header onReset={resetChat} />

      <main className="main">
        <div className="chat-area" ref={chatAreaRef}>
          {messages.length === 0 && (
            <Welcome onPick={(prompt) => send(prompt)} onFocusInput={() => inputRef.current?.focus()} />
          )}

          {messages.map((m, i) => (
            <Message key={i} role={m.role} text={m.text} />
          ))}

          {isTyping && <TypingIndicator />}
        </div>

        <Composer
          value={input}
          onChange={setInput}
          onSend={() => send()}
          disabled={isLoading}
          inputRef={inputRef}
        />
      </main>
    </div>
  );
}
