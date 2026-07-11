import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        canvas: "rgb(var(--color-page-rgb) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--color-surface-rgb) / <alpha-value>)",
          2: "rgb(var(--color-surface-2-rgb) / <alpha-value>)",
          3: "var(--color-surface-3)",
        },
        band: "rgb(var(--color-band-rgb) / <alpha-value>)",
        // Ink scale
        ink: {
          DEFAULT: "var(--color-ink)",
          strong: "var(--color-ink-strong)",
          secondary: "var(--color-ink-secondary)",
          faint: "var(--color-ink-faint)",
        },
        // Hairlines
        hairline: {
          DEFAULT: "var(--color-hairline)",
          strong: "var(--color-hairline-strong)",
        },
        // Accent — the one interactive colour
        accent: {
          DEFAULT: "rgb(var(--color-accent-rgb) / <alpha-value>)",
          hover: "var(--color-accent-hover)",
          soft: "var(--color-accent-soft)",
        },
        // Semantic
        danger: {
          DEFAULT: "var(--color-danger)",
          soft: "var(--color-danger-soft)",
        },
        notice: {
          DEFAULT: "var(--color-notice)",
          soft: "var(--color-notice-soft)",
          border: "var(--color-notice-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
      spacing: {
        section: "var(--space-section)",
      },
      maxWidth: {
        prose: "72ch",
        shell: "72rem", // 1152px page shell (design frames sit ~1280 incl. gutters)
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "300ms",
        slow: "500ms",
      },
    },
  },
  plugins: [],
};

export default config;
