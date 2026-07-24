"use client";

import { useCallback } from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function CTAButton({ className, children }: Props) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const section = document.getElementById("quote-request");
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (section) {
        section.scrollIntoView({
          behavior: prefersReduced ? "instant" : "smooth",
        });
      }

      // Focus the start button if visible, otherwise the first focusable element
      const delay = prefersReduced ? 0 : 450;
      setTimeout(() => {
        const startBtn = document.getElementById("quote-flow-start");
        if (startBtn) {
          startBtn.focus({ preventScroll: true });
          return;
        }
        if (section) {
          const focusable = section.querySelector<HTMLElement>(
            'button:not([disabled]), input, textarea, [tabindex="0"]'
          );
          focusable?.focus({ preventScroll: true });
        }
      }, delay);
    },
    []
  );

  return (
    <a href="#quote-request" className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
