"use client";

import { useState } from "react";
import Hello from "./components/Hello";
import Choose from "./components/Choose";
import Wow from "./components/Wow";

export default function Home() {
  const [step, setStep] = useState<"hello" | "choose" | "wow">("hello");

  if (step === "hello") return <Hello onNext={() => setStep("choose")} />;
  if (step === "choose") return <Choose onYes={() => setStep("wow")} />;
  return <Wow />;
}
