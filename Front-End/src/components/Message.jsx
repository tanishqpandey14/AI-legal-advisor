import Mark from "./Mark.jsx";

function formatText(text) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const html = escaped
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
  return { __html: html };
}

export default function Message({ role, text }) {
  if (role === "user") {
    return (
      <div className="message user-message">
        <div className="user-bubble">{text}</div>
      </div>
    );
  }
  return (
    <div className="message bot-message">
      <div className="avatar">
        <Mark size={26} />
      </div>
      <div className="bubble" dangerouslySetInnerHTML={formatText(text)} />
    </div>
  );
}
