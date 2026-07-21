export default function Mark({ size = 36 }) {
  return (
    <div
      className="mark"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3v18M6 7h12M4 7l2.5 6a2.5 2.5 0 0 0 5 0L9 7M15 7l2.5 6a2.5 2.5 0 0 0 5 0L20 7"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
