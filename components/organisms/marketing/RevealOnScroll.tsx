"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "from-left" | "from-right" | "scale-in";
};

type RevealEntry = {
  onVisible: () => void;
};

let sharedObserver: IntersectionObserver | null = null;
const revealEntries = new WeakMap<Element, RevealEntry>();

function getSharedObserver() {
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const revealEntry = revealEntries.get(entry.target);
        if (!revealEntry) continue;

        revealEntry.onVisible();
        revealEntries.delete(entry.target);
        sharedObserver?.unobserve(entry.target);
      }
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  return sharedObserver;
}

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  variant = "default",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const frameId = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    const observer = getSharedObserver();
    revealEntries.set(node, {
      onVisible: () => {
        setIsVisible(true);
      },
    });
    observer.observe(node);

    return () => {
      revealEntries.delete(node);
      observer.unobserve(node);
    };
  }, []);

  const revealClassName =
    variant === "from-left"
      ? "reveal from-left"
      : variant === "from-right"
        ? "reveal from-right"
        : variant === "scale-in"
          ? "reveal scale-in"
          : "reveal";

  const style = delay
    ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      style={style}
      className={`${revealClassName} ${isVisible ? "visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
