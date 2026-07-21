import Mark from "./Mark.jsx";

export default function Header({ onReset }) {
  return (
    <header className="header">
      <div className="header-left">
        <Mark size={38} />
        <div className="header-text">
          <h1 className="app-title">Legal Advisor</h1>
          <p className="app-subtitle">AI guidance on Indian law</p>
        </div>
      </div>
      <div className="header-right">
        <button className="pill-btn" onClick={onReset}>
          New chat
        </button>
      </div>
    </header>
  );
}
