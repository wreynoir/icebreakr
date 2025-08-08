
"use client";
import confetti from "canvas-confetti";
import { useCallback, useState } from "react";

type Props = { onClick: () => void; children: React.ReactNode };

export default function IceButton({ onClick, children }: Props) {
  const [cracking, setCracking] = useState(false);

  const handleClick = useCallback(() => {
    // light haptic if available
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate(20); } catch {}
    }
    setCracking(true);
    setTimeout(() => setCracking(false), 500);
    confetti({ particleCount: 80, spread: 60, startVelocity: 35, scalar: 0.9 });
    onClick();
  }, [onClick]);

  return (
    <button
      onClick={handleClick}
      className={`relative w-full py-4 rounded-xl font-semibold text-white transition 
        ${cracking ? "scale-95" : "scale-100"} bg-gradient-to-r from-ice-700 to-ice-500 shadow-lg`}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-white/30" />
    </button>
  );
}
