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
        canvas: "var(--color-canvas)",
        surface: {
          DEFAULT: "var(--color-surface)",
          2: "var(--color-surface-2)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          secondary: "var(--color-ink-secondary)",
          faint: "var(--color-ink-faint)",
          hover: "var(--color-ink-hover)",
        },
        hairline: {
          DEFAULT: "var(--color-hairline)",
          soft: "var(--color-hairline-soft)",
        },
        dot: "var(--color-dot)",
        accent: {
          DEFAULT: "var(--color-accent)",
          deep: "var(--color-accent-deep)",
          soft: "var(--color-accent-soft)",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          soft: "var(--color-danger-soft)",
        },
        notice: {
          DEFAULT: "var(--color-notice)",
          soft: "var(--color-notice-soft)",
        },
        "cta-bg": "var(--color-cta-bg)",
        "cta-ink": "var(--color-cta-ink)",
        "cta-sub": "var(--color-cta-sub)",
        "cta-border": "var(--color-cta-border)",
        "cta-btn-bg": "var(--color-cta-btn-bg)",
        "cta-btn-ink": "var(--color-cta-btn-ink)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        hairline: "0 1px 2px rgba(19, 19, 22, 0.04)",
        lift: "0 2px 8px rgba(19, 19, 22, 0.04), 0 12px 32px -16px rgba(19, 19, 22, 0.08)",
        elevated: "var(--shadow)",
      },
      spacing: {
        section: "var(--space-section)",
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "300ms",
        slow: "600ms",
      },
    },
  },
  plugins: [],
};

export default config;
