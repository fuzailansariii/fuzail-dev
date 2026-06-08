"use client";
import { useEffect } from "react";

const SECTIONS = ["about", "stack", "work", "contact"];

export function useActiveSection() {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            history.replaceState(null, "", `#${id}`);
          }
        },
        { threshold: 0.5 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    const onScroll = () => {
      if (window.scrollY < 100) history.replaceState(null, "", "/");
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
