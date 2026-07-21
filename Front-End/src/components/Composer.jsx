import { useRef } from "react";

export default function Composer({ value, onChange, onSend, disabled, inputRef }) {
  const localRef = useRef(null);
  const ref = inputRef || localRef;

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  function autoResize(e) {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
    onChange(el.value);
  }

  return (
    <div className="input-wrapper">
      <div className="input-box">
        <textarea
          ref={ref}
          value={value}
          rows={1}
          placeholder="Describe your situation…"
          onKeyDown={handleKey}
          onChange={autoResize}
        />
        <button
          id="sendBtn"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          title="Send"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      <p className="input-footer">
        General legal information only — not a substitute for a qualified advocate.
      </p>
    </div>
  );
}
