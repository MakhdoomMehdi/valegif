"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BEAR_EMOTIONS = [
  { src: "/images/bears/happy.png", label: "happy" },
  { src: "/images/bears/blushing.png", label: "blushing" },
  { src: "/images/bears/playful.png", label: "playful" },
  { src: "/images/bears/calm.png", label: "calm" },
  { src: "/images/bears/sad.png", label: "sad" },
  { src: "/images/bears/scared.png", label: "scared" },
];

function getBearForRatio(ratio: number) {
  if (ratio < 0.15) return BEAR_EMOTIONS[0]; // happy
  if (ratio < 0.3) return BEAR_EMOTIONS[1]; // blushing
  if (ratio < 0.45) return BEAR_EMOTIONS[2]; // playful
  if (ratio < 0.6) return BEAR_EMOTIONS[3]; // calm
  if (ratio < 0.8) return BEAR_EMOTIONS[4]; // sad
  return BEAR_EMOTIONS[5]; // scared
}

// Interpolate between two hex colors based on t (0–1)
function lerpColor(a: string, b: string, t: number): string {
  const ah = parseInt(a.replace("#", ""), 16);
  const bh = parseInt(b.replace("#", ""), 16);
  const ar = (ah >> 16) & 0xff,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff;
  const br = (bh >> 16) & 0xff,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff;
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `rgb(${rr},${rg},${rb})`;
}

// Soft calm colors when near Yes, scary red when near No
function getBackgroundForRatio(ratio: number): string {
  // ratio 0 = near Yes, 1 = near No
  if (ratio < 0.4) {
    // Soft palette: transition from warm yellow-pink to calm pink
    const t = ratio / 0.4;
    return lerpColor("#FFF5E6", "#FBD3D7", t);
  } else if (ratio < 0.6) {
    // Neutral zone: baby pink
    return "#FBD3D7";
  } else {
    // Danger zone: transition from pink to scary red
    const t = (ratio - 0.6) / 0.4;
    return lerpColor("#FBD3D7", "#8B0000", t);
  }
}

function getShakeIntensity(ratio: number): number {
  if (ratio < 0.6) return 0;
  // Scale from 0 to 1 as ratio goes from 0.6 to 1
  return ((ratio - 0.6) / 0.4);
}

export default function Choose({ onYes }: { onYes: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const yesBtnRef = useRef<HTMLButtonElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [bear, setBear] = useState(BEAR_EMOTIONS[3]);
  const [ratio, setRatio] = useState(0.5);
  const shakeRef = useRef<number | null>(null);

  // Track cursor → update bear emotion, background, shake
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const yesBtn = yesBtnRef.current;
      const noBtn = noBtnRef.current;
      if (!yesBtn || !noBtn) return;

      const yesRect = yesBtn.getBoundingClientRect();
      const noRect = noBtn.getBoundingClientRect();

      const distToYes = Math.sqrt(
        (e.clientX - (yesRect.left + yesRect.width / 2)) ** 2 +
          (e.clientY - (yesRect.top + yesRect.height / 2)) ** 2
      );
      const distToNo = Math.sqrt(
        (e.clientX - (noRect.left + noRect.width / 2)) ** 2 +
          (e.clientY - (noRect.top + noRect.height / 2)) ** 2
      );

      const total = distToYes + distToNo;
      if (total === 0) return;

      const r = distToYes / total;
      setRatio(r);
      setBear(getBearForRatio(r));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Shake effect
  useEffect(() => {
    const intensity = getShakeIntensity(ratio);
    const container = containerRef.current;
    if (!container) return;

    if (intensity <= 0) {
      container.style.transform = "translate(0, 0)";
      if (shakeRef.current) {
        cancelAnimationFrame(shakeRef.current);
        shakeRef.current = null;
      }
      return;
    }

    let running = true;
    const shake = () => {
      if (!running) return;
      const px = intensity * 12;
      const x = (Math.random() - 0.5) * 2 * px;
      const y = (Math.random() - 0.5) * 2 * px;
      container.style.transform = `translate(${x}px, ${y}px)`;
      shakeRef.current = requestAnimationFrame(shake);
    };
    shake();

    return () => {
      running = false;
      if (shakeRef.current) cancelAnimationFrame(shakeRef.current);
      if (container) container.style.transform = "translate(0, 0)";
    };
  }, [ratio]);

  const bgColor = getBackgroundForRatio(ratio);

  const runAway = useCallback(
    (e: React.MouseEvent) => {
      const container = containerRef.current;
      const btn = noBtnRef.current;
      if (!container || !btn) return;

      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      const cursorX = e.clientX;
      const cursorY = e.clientY;

      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      let dx = btnCenterX - cursorX;
      let dy = btnCenterY - cursorY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist === 0) {
        dx = (Math.random() - 0.5) * 2;
        dy = (Math.random() - 0.5) * 2;
      } else {
        dx /= dist;
        dy /= dist;
      }

      const jump = 150 + Math.random() * 150;
      let newX =
        btnCenterX - containerRect.left + dx * jump - btnRect.width / 2;
      let newY =
        btnCenterY - containerRect.top + dy * jump - btnRect.height / 2;

      const pad = 10;
      const maxX = containerRect.width - btnRect.width - pad;
      const maxY = containerRect.height - btnRect.height - pad;
      newX = Math.max(pad, Math.min(newX, maxX));
      newY = Math.max(pad, Math.min(newY, maxY));

      const newCenterX = containerRect.left + newX + btnRect.width / 2;
      const newCenterY = containerRect.top + newY + btnRect.height / 2;
      const newDist = Math.sqrt(
        (newCenterX - cursorX) ** 2 + (newCenterY - cursorY) ** 2
      );

      if (newDist < 100) {
        newX =
          cursorX - containerRect.left > containerRect.width / 2 ? pad : maxX;
        newY =
          cursorY - containerRect.top > containerRect.height / 2 ? pad : maxY;
      }

      setNoPos({ x: newX, y: newY });
    },
    []
  );

  // Text color: dark on light bg, white on dark bg
  const textColor = ratio > 0.7 ? "#fff" : "#8B2252";

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: bgColor,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Bear that reacts to cursor */}
      <img
        src={bear.src}
        alt={bear.label}
        style={{
          width: "160px",
          height: "160px",
          objectFit: "contain",
          transition: "opacity 0.3s ease",
        }}
      />

      <h1
        style={{
          fontSize: "36px",
          fontWeight: 600,
          color: textColor,
          fontFamily: "'Great Vibes', cursive",
          transition: "color 0.3s ease",
        }}
      >
        Will you be my valentine?
      </h1>

      {/* Big green Yes button */}
      <button
        ref={yesBtnRef}
        onClick={onYes}
        style={{
          padding: "20px 64px",
          fontSize: "28px",
          fontWeight: 700,
          fontFamily: "'Dancing Script', cursive",
          backgroundColor: "#22c55e",
          border: "none",
          borderRadius: "16px",
          cursor: "pointer",
          color: "#fff",
          boxShadow: "0 4px 20px rgba(34,197,94,0.4)",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.08)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
      >
        Yes!
      </button>

      {/* Small runaway No button */}
      <button
        ref={noBtnRef}
        onMouseEnter={runAway}
        onMouseMove={runAway}
        style={{
          position: noPos ? "absolute" : "relative",
          left: noPos ? `${noPos.x}px` : undefined,
          top: noPos ? `${noPos.y}px` : undefined,
          padding: "6px 18px",
          fontSize: "22px",
          fontWeight: 700,
          fontFamily: "'Dancing Script', cursive",
          backgroundColor: "#ef4444",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          color: "#fff",
          transition: "left 0.3s ease-out, top 0.3s ease-out",
          zIndex: 20,
          boxShadow: "0 3px 12px rgba(239,68,68,0.35)",
        }}
      >
        No
      </button>
    </div>
  );
}
