"use client";

import { useEffect, useState } from "react";

const CUTE_WORDS = [
  "pookie",
  "cutie",
  "love",
  "xoxo",
  "smooch",
  "babe",
  "honey",
  "sweetheart",
  "angel",
  "darling",
  "mwah",
  "cuddles",
  "kisses",
  "forever",
  "soulmate",
  "beloved",
  "precious",
  "sunshine",
  "butterflies",
  "adorable",
  "hubby",
  "wifey",
  "lovebug",
  "snuggles",
  "teddy",
  "sugar",
  "valentine",
  "charming",
  "dreamy",
  "sparkle",
  "heartbeat",
  "cupcake",
  "lovebird",
  "boo",
  "sweetpea",
  "dearest",
  "dimples",
  "gorgeous",
  "treasure",
  "magical",
  "bliss",
  "giggles",
  "cherry",
  "peach",
  "starlight",
  "moonlight",
  "honeybun",
  "candy",
  "rosie",
  "dolly",
  "twinkle",
  "bubbly",
  "cozy",
  "hugs",
  "warmth",
  "gentle",
  "bloom",
  "fairy",
  "daisy",
  "bunny",
];

const FONTS = [
  "Pacifico",
  "Dancing Script",
  "Caveat",
  "Sacramento",
  "Satisfy",
  "Great Vibes",
  "Indie Flower",
  "Shadows Into Light",
  "Cookie",
  "Kalam",
];

const COLORS = [
  "#FF6B8A",
  "#FF85A1",
  "#E05297",
  "#FF4D6D",
  "#C9184A",
  "#FF758F",
  "#D946EF",
  "#A855F7",
  "#EC4899",
  "#F472B6",
  "#FB7185",
  "#FF3366",
  "#E11D48",
  "#BE185D",
  "#DB2777",
  "#F43F5E",
  "#FF69B4",
  "#FF1493",
  "#C084FC",
  "#E879F9",
];

const BEE_IMAGES = [
  "/images/bees/1.png",
  "/images/bees/2.png",
  "/images/bees/3.png",
  "/images/bees/4.png",
  "/images/bees/5.png",
  "/images/bees/6.png",
  "/images/bees/7.png",
  "/images/bees/8.png",
];

interface ScatteredWord {
  text: string;
  font: string;
  color: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  delay: number;
}

interface ScatteredBee {
  src: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  delay: number;
}

function generateWords(): ScatteredWord[] {
  const words: ScatteredWord[] = [];
  CUTE_WORDS.forEach((text, i) => {
    words.push({
      text,
      font: FONTS[i % FONTS.length],
      color: COLORS[i % COLORS.length],
      x: 2 + Math.random() * 88,
      y: 2 + Math.random() * 90,
      size: 16 + Math.random() * 28,
      rotation: -30 + Math.random() * 60,
      delay: i * 0.06,
    });
  });
  return words;
}

function generateBees(): ScatteredBee[] {
  const bees: ScatteredBee[] = [];
  for (let i = 0; i < 18; i++) {
    bees.push({
      src: BEE_IMAGES[i % BEE_IMAGES.length],
      x: 3 + Math.random() * 85,
      y: 3 + Math.random() * 85,
      size: 40 + Math.random() * 50,
      rotation: -20 + Math.random() * 40,
      delay: 0.3 + i * 0.1,
    });
  }
  return bees;
}

export default function Hello({ onNext }: { onNext: () => void }) {
  const [words, setWords] = useState<ScatteredWord[]>([]);
  const [bees, setBees] = useState<ScatteredBee[]>([]);
  const [visible, setVisible] = useState(false);
  const [centerVisible, setCenterVisible] = useState(false);

  useEffect(() => {
    setWords(generateWords());
    setBees(generateBees());
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => setCenterVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#FBD3D7",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Scattered cute words */}
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${w.x}%`,
            top: `${w.y}%`,
            fontFamily: `'${w.font}', cursive`,
            fontSize: `${w.size}px`,
            color: w.color,
            transform: `rotate(${w.rotation}deg) scale(${visible ? 1 : 0})`,
            opacity: visible ? 0.85 : 0,
            transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${w.delay}s`,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          {w.text}
        </span>
      ))}

      {/* Scattered bees */}
      {bees.map((b, i) => (
        <img
          key={`bee-${i}`}
          src={b.src}
          alt="cute bee"
          style={{
            position: "absolute",
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            objectFit: "contain",
            transform: `rotate(${b.rotation}deg) scale(${visible ? 1 : 0})`,
            opacity: visible ? 1 : 0,
            transition: `all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${b.delay}s`,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 5,
          }}
        />
      ))}

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          opacity: centerVisible ? 1 : 0,
          transform: centerVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s ease-out",
        }}
      >
        {/* Milky white rounded card */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 250, 0.92)",
            borderRadius: "28px",
            padding: "40px 48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          }}
        >
          <img
            src="https://media.tenor.com/uBQM6iJ_hsgAAAAd/hug-cute.gif"
            alt="Cute bear hug"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "16px",
            }}
          />
          <h1
            style={{
              fontFamily: "'Bubblegum Sans', cursive",
              fontSize: "44px",
              fontWeight: 400,
              color: "#F5A623",
              textShadow: "0 2px 8px rgba(245,166,35,0.25)",
              textAlign: "center",
            }}
          >
            mithuuu mota pakoraaaaaaa
          </h1>
          <button
            onClick={onNext}
            style={{
              padding: "14px 40px",
              fontSize: "20px",
              fontWeight: 400,
              fontFamily: "'Bubblegum Sans', cursive",
              backgroundColor: "#F5A623",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              color: "#fff",
              boxShadow: "0 3px 14px rgba(245,166,35,0.3)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.06)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
