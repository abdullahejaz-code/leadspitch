"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RevealVariant =
  | "fade-up"
  | "fade"
  | "slide-left"
  | "slide-right"
  | "zoom"
  | "blur-up";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
  variant?: RevealVariant;
}

// Hidden state per variant; every variant resolves to the same neutral
// visible state so they can be mixed freely on one page.
const HIDDEN_STATE: Record<RevealVariant, string> = {
  "fade-up": "translate-y-4 opacity-0",
  fade: "opacity-0",
  "slide-left": "-translate-x-5 opacity-0",
  "slide-right": "translate-x-5 opacity-0",
  zoom: "scale-[0.96] opacity-0",
  "blur-up": "translate-y-3 opacity-0 blur-[6px]",
};

const VISIBLE_STATE = "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  variant = "fade-up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion needs no special-casing here: the global
    // prefers-reduced-motion CSS zeroes transition durations, so elements
    // simply appear the moment they intersect.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const revealClassName = `transition-all duration-slow ease-out-expo will-change-[transform,opacity] ${
    isVisible ? VISIBLE_STATE : HIDDEN_STATE[variant]
  } ${className}`;
  const style = { transitionDelay: isVisible ? `${delay}ms` : "0ms" };

  if (as === "li") {
    return (
      <li ref={ref} style={style} className={revealClassName}>
        {children}
      </li>
    );
  }

  if (as === "section") {
    return (
      <section ref={ref} style={style} className={revealClassName}>
        {children}
      </section>
    );
  }

  return (
    <div ref={ref} style={style} className={revealClassName}>
      {children}
    </div>
  );
}
