interface GridBackdropProps {
  mask: string;
  lineColor?: string;
}

/**
 * Faint graph-paper backdrop used behind the hero and closing CTA. The mask
 * fades the grid out toward the edges so it reads as texture, not a pattern.
 */
export default function GridBackdrop({
  mask,
  lineColor = "var(--color-hairline)",
}: GridBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
        backgroundSize: "52px 52px",
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    />
  );
}
