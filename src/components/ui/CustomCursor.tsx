"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== "undefined") {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      if (isTouch) return;
    }

    document.documentElement.classList.add("custom-cursor-active");

    const cursor = cursorRef.current;
    const ring = ringRef.current;

    if (!cursor || !ring) return;

    // Quick positioning setters
    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      setHidden(false);
      // Center the elements on the cursor
      cursorX(e.clientX - 4);
      cursorY(e.clientY - 4);
      ringX(e.clientX - 16);
      ringY(e.clientY - 16);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Hover triggers for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.classList.contains("interactive-hover");

      if (isClickable) {
        setHovered(true);
        gsap.to(ring, {
          scale: 1.8,
          borderColor: "rgba(0, 242, 258, 0.8)",
          backgroundColor: "rgba(0, 242, 258, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursor, {
          scale: 0.5,
          backgroundColor: "#00f2fe",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.classList.contains("interactive-hover");

      if (isClickable) {
        setHovered(false);
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(127, 0, 255, 0.4)",
          backgroundColor: "transparent",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "#7f00ff",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-[#7f00ff] pointer-events-none z-[9999] transition-opacity duration-300 ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-[rgba(127,0,255,0.4)] pointer-events-none z-[9998] transition-opacity duration-300 ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          boxShadow: hovered ? "0 0 15px rgba(0, 242, 258, 0.2)" : "none",
        }}
      />
    </>
  );
}
