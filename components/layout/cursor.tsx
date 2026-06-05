"use client";
import { useRef, useEffect } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;
    let rafId = 0;

    const loop = () => {
      // Move dot directly to mouse position
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + "px";
        dotRef.current.style.top = mouseY + "px";
      }

      // Move ring with lerp (lag effect)
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      if (ringRef.current) {
        ringRef.current.style.left = ringX + "px";
        ringRef.current.style.top = ringY + "px";
      }

      rafId = requestAnimationFrame(loop);
    };

    loop();

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-9999 w-2 h-2 rounded-full bg-v2 -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-9998 w-[34px] h-[34px] rounded-full border border-v2/45 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
