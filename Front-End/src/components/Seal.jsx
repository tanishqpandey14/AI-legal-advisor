export default function Seal({ size = 38 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className="seal"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18.5" fill="none" stroke="var(--brass)" strokeWidth="1.4" />
      <circle cx="20" cy="20" r="15" fill="none" stroke="var(--brass)" strokeWidth="0.6" opacity="0.5" />
      <text
        x="20"
        y="26"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="19"
        fill="var(--brass)"
      >
        §
      </text>
    </svg>
  );
}
