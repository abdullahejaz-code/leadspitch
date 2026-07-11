interface CheckTickProps {
  size?: number;
  /** Stroke colour. Defaults to Pitch Cobalt; pass "#fff" for the sheet header. */
  color?: string;
  className?: string;
}

/** The single verified-tick mark — cobalt by default, used sitewide. */
export default function CheckTick({
  size = 14,
  color = "currentColor",
  className = "",
}: CheckTickProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.5 6.4L4.8 8.7L9.5 3.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
