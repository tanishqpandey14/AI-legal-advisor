import Mark from "./Mark.jsx";

export default function TypingIndicator() {
  return (
    <div className="typing">
      <div className="avatar">
        <Mark size={26} />
      </div>
      <div className="typing-bubble">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
