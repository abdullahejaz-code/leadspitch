"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}

export default function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

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

  const revealClassName = `transition-all duration-slow ease-out-expo ${
    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  } ${className}`;
  const style = { transitionDelay: isVisible ? `${delay}ms` : "0ms" };

  if (as === "li") {
    return (
      <li ref={ref} style={style} className={revealClassName}>
        {children}
      </li>
    );
  }

  return (
    <div ref={ref} style={style} className={revealClassName}>
      {children}
    </div>
  );
}
