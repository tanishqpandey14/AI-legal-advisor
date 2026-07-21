import Mark from "./Mark.jsx";
import { CATEGORIES } from "../data/categories.js";

export default function Welcome({ onPick, onFocusInput }) {
  return (
    <div className="welcome">
      <div className="welcome-card">
        <Mark size={52} />
        <h2 className="welcome-title">Know where you stand, in plain terms</h2>
        <p className="welcome-text">
          Ask about your legal rights under Indian law and get clear,
          step-by-step guidance — free, in English or Hindi.
        </p>
      </div>

      <p className="section-label">Start with a topic</p>

      <div className="categories">
        {CATEGORIES.map((c) => (
          <button
            key={c.label}
            className="category-card"
            onClick={() => (c.prompt ? onPick(c.prompt) : onFocusInput())}
          >
            <span className="cat-icon">{c.icon}</span>
            <span className="cat-label">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
