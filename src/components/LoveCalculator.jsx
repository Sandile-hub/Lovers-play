import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../App";
import confetti from "canvas-confetti";

const vibes = ["😊", "😍", "🔥", "💕", "✨", "🌟", "💖", "🌹"];

const reasons = [
  "Because you both love food and late night chats",
  "Your energies match perfectly!",
  "You share the same sense of humor",
  "You balance each other out beautifully",
  "Your love languages align perfectly",
  "You bring out the best in each other",
  "The chemistry is undeniable",
  "You're both adventurous at heart",
];

const relationshipOptions = [
  "Just met",
  "1-3 months",
  "6 months+",
  "1 year+",
];

const getCompatibilityMessage = (score) => {
  if (score >= 97) {
    return {
      title: "Cosmic Soulmates ✨",
      subtitle: "The chemistry is seriously off the charts.",
      emoji: "💞",
    };
  }

  if (score >= 93) {
    return {
      title: "Perfect Match ❤️‍🔥",
      subtitle: "You two have an incredible connection.",
      emoji: "❤️‍🔥",
    };
  }

  if (score >= 88) {
    return {
      title: "Lovebirds 💕",
      subtitle: "There is definitely something special here.",
      emoji: "🥰",
    };
  }

  if (score >= 80) {
    return {
      title: "Strong Chemistry 💖",
      subtitle: "You two could make a very good pair.",
      emoji: "😍",
    };
  }

  if (score >= 70) {
    return {
      title: "Promising Pair ✨",
      subtitle: "There is plenty of room for sparks to grow.",
      emoji: "😊",
    };
  }

  return {
    title: "Worth Exploring 💕",
    subtitle: "Every great love story starts somewhere.",
    emoji: "🌹",
  };
};

const LoveCalculator = () => {
  const { vibrate } = useApp();

  const [name, setName] = useState("");
  const [crush, setCrush] = useState("");
  const [together, setTogether] = useState("Just met");
  const [vibe, setVibe] = useState("😊");

  const [calculating, setCalculating] = useState(false);
  const [calculationProgress, setCalculationProgress] = useState(0);
  const [result, setResult] = useState(null);

  const intervalRef = useRef(null);

  // =======================================================
  // CLEANUP
  // =======================================================
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // =======================================================
  // CALCULATE
  // =======================================================
  const handleCalculate = () => {
    const cleanName = name.trim();
    const cleanCrush = crush.trim();

    if (!cleanName || !cleanCrush) {
      alert("Please enter both names.");
      return;
    }

    if (calculating) {
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    vibrate(50);
    setCalculating(true);
    setResult(null);
    setCalculationProgress(0);

    let progress = 0;

    intervalRef.current = setInterval(() => {
      progress += Math.random() * 8 + 3;

      if (progress >= 100) {
        progress = 100;

        clearInterval(intervalRef.current);
        intervalRef.current = null;

        // Keep the playful/random nature of the original calculator.
        const compat = Math.round(
          Math.min(99, 85 + Math.random() * 14)
        );

        const trust = Math.round(80 + Math.random() * 18);
        const fun = Math.round(80 + Math.random() * 18);
        const spice = Math.round(75 + Math.random() * 22);

        const reason =
          reasons[Math.floor(Math.random() * reasons.length)];

        setCalculationProgress(100);

        window.setTimeout(() => {
          setResult({
            compat,
            trust,
            fun,
            spice,
            reason,
            name: cleanName,
            crush: cleanCrush,
            together,
            vibe,
          });

          setCalculating(false);

          if (compat >= 90) {
            confetti({
              particleCount: 180,
              spread: 85,
              origin: { y: 0.52 },
              useWorker: false,
            });
          }

          vibrate(50);
        }, 350);

        return;
      }

      setCalculationProgress(Math.round(progress));
    }, 55);
  };

  // =======================================================
  // SHARE
  // =======================================================
  const shareResult = () => {
    if (!result) {
      return;
    }

    const message = getCompatibilityMessage(result.compat);

    const text =
      `${message.emoji} ${result.name} & ${result.crush} are ${result.compat}% compatible!\n\n` +
      `${message.title} — ${message.subtitle}\n\n` +
      `✨ Trust: ${result.trust}%\n` +
      `🎉 Fun: ${result.fun}%\n` +
      `🔥 Spice: ${result.spice}%\n\n` +
      `${result.reason}\n\n` +
      `💕 Lovers Play`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    vibrate(30);
  };

  // =======================================================
  // RESET
  // =======================================================
  const calculateAgain = () => {
    setResult(null);
    setCalculationProgress(0);
    vibrate(30);
  };

  // =======================================================
  // RESULT VIEW
  // =======================================================
  if (result) {
    const compatibilityMessage = getCompatibilityMessage(
      result.compat
    );

    return (
      <div className="pb-6">
        {/* ===================================================
            RESULT HERO
        ==================================================== */}
        <section className="pt-4">
          <div className="relative overflow-hidden rounded-[34px] bg-[#171717] px-5 py-7 text-center text-white shadow-[0_24px_65px_rgba(23,23,23,0.20)]">
            <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[#ff4d6d]/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-10 h-44 w-44 rounded-full bg-pink-400/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/10 bg-white/10 text-5xl shadow-inner">
                {compatibilityMessage.emoji}
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                Compatibility result
              </p>

              <h1 className="mt-2 font-playfair text-3xl font-bold leading-tight">
                {result.name}
                <span className="mx-2 text-[#ff4d6d]">&</span>
                {result.crush}
              </h1>

              <div className="mt-5 flex justify-center">
                <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-white/5">
                  <div className="absolute inset-0 rounded-full border-4 border-[#ff4d6d]/20" />

                  <svg
                    className="absolute inset-0 h-full w-full -rotate-90"
                    viewBox="0 0 120 120"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="7"
                    />

                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#ff4d6d"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={`${result.compat * 3.267} 327`}
                    />
                  </svg>

                  <div className="relative">
                    <p className="text-4xl font-black tracking-tight">
                      {result.compat}%
                    </p>

                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">
                      match
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="mt-5 text-xl font-bold">
                {compatibilityMessage.title}
              </h2>

              <p className="mx-auto mt-2 max-w-[280px] text-xs leading-5 text-white/55">
                {compatibilityMessage.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            MATCH SUMMARY
        ==================================================== */}
        <section className="mt-6">
          <div className="section-label">
            Your chemistry
          </div>

          <div className="soft-card mt-3 p-5">
            <div className="space-y-5">
              {/* Trust */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-sm">
                      🤝
                    </span>

                    <span className="text-xs font-bold text-[#171717]">
                      Trust
                    </span>
                  </div>

                  <span className="text-xs font-black text-blue-500">
                    {result.trust}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-400 transition-all duration-700"
                    style={{ width: `${result.trust}%` }}
                  />
                </div>
              </div>

              {/* Fun */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-sm">
                      🎉
                    </span>

                    <span className="text-xs font-bold text-[#171717]">
                      Fun
                    </span>
                  </div>

                  <span className="text-xs font-black text-amber-500">
                    {result.fun}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-700"
                    style={{ width: `${result.fun}%` }}
                  />
                </div>
              </div>

              {/* Spice */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-sm">
                      🔥
                    </span>

                    <span className="text-xs font-bold text-[#171717]">
                      Spice
                    </span>
                  </div>

                  <span className="text-xs font-black text-red-500">
                    {result.spice}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-700"
                    style={{ width: `${result.spice}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            RESULT INSIGHT
        ==================================================== */}
        <section className="mt-4">
          <div className="relative overflow-hidden rounded-[28px] border border-[#ff4d6d]/10 bg-[#fff7f8] p-5">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#ff4d6d]/10 blur-2xl" />

            <div className="relative flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                ✨
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#ff4d6d]">
                  Love insight
                </p>

                <p className="mt-2 text-sm font-semibold leading-6 text-[#171717]">
                  “{result.reason}.”
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-gray-500 shadow-sm">
                    {result.vibe} Your vibe
                  </span>

                  <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-gray-500 shadow-sm">
                    💕 {result.together}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            ACTIONS
        ==================================================== */}
        <div className="mt-5 space-y-3">
          <button
            type="button"
            className="btn-primary"
            onClick={shareResult}
          >
            📤 Share Your Love Score
          </button>

          <button
            type="button"
            className="w-full rounded-full bg-[#171717] py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(23,23,23,0.16)] transition-all active:scale-[0.98]"
            onClick={calculateAgain}
          >
            🔄 Calculate Again
          </button>
        </div>

        {/* ===================================================
            FOOT NOTE
        ==================================================== */}
        <div className="mt-8 text-center">
          <div className="mx-auto flex items-center justify-center gap-3 text-gray-200">
            <span className="h-px w-12 bg-gray-200" />
            <span className="text-sm">♥</span>
            <span className="h-px w-12 bg-gray-200" />
          </div>

          <p className="mt-3 text-[9px] font-medium text-gray-300">
            Just for fun — real love is impossible to measure. ❤️
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN CALCULATOR
  // =========================================================
  return (
    <div className="pb-6">
      {/* ===================================================
          HERO
      ==================================================== */}
      <section className="pt-4">
        <div className="relative overflow-hidden rounded-[34px] bg-[#171717] p-6 text-white shadow-[0_24px_60px_rgba(23,23,23,0.18)]">
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#ff4d6d]/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-pink-400/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
              💕 Love Lab
            </div>

            <h1 className="mt-4 font-playfair text-4xl font-bold leading-tight">
              How compatible
              <br />
              are you?
            </h1>

            <p className="mt-3 max-w-[290px] text-sm leading-6 text-white/60">
              Enter two names, choose your vibe, and let the Love Calculator
              reveal your chemistry.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                ❤️ Compatibility
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                ✨ Just for fun
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                No Login
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          STEP 1 — NAMES
      ==================================================== */}
      <section className="mt-7">
        <div className="section-label">
          Step 1 • Who are we checking?
        </div>

        <div className="soft-card mt-3 p-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.10em] text-gray-400">
                Your name
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Sandile"
                maxLength={30}
                className="love-input"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.10em] text-gray-400">
                Their name
              </label>

              <input
                type="text"
                value={crush}
                onChange={(event) => setCrush(event.target.value)}
                placeholder="e.g. Lerato"
                maxLength={30}
                className="love-input"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-[#fff7f8] px-4 py-3">
            <span className="max-w-[110px] truncate text-xs font-bold text-[#171717]">
              {name.trim() || "You"}
            </span>

            <span className="text-[#ff4d6d]">
              ♥
            </span>

            <span className="max-w-[110px] truncate text-xs font-bold text-[#171717]">
              {crush.trim() || "Them"}
            </span>
          </div>
        </div>
      </section>

      {/* ===================================================
          STEP 2 — RELATIONSHIP
      ==================================================== */}
      <section className="mt-7">
        <div className="section-label">
          Step 2 • Your story
        </div>

        <div className="soft-card mt-3 p-5">
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.10em] text-gray-400">
            How long have you known each other?
          </label>

          <select
            value={together}
            onChange={(event) => setTogether(event.target.value)}
            className="love-input appearance-none"
          >
            {relationshipOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {relationshipOptions.map((option) => {
              const selected = together === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setTogether(option);
                    vibrate(20);
                  }}
                  className={`rounded-2xl border px-2 py-3 text-[9px] font-bold transition-all active:scale-[0.96] ${
                    selected
                      ? "border-[#ff4d6d]/20 bg-[#fff0f3] text-[#ff4d6d]"
                      : "border-gray-100 bg-white text-gray-400"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================
          STEP 3 — VIBE
      ==================================================== */}
      <section className="mt-7">
        <div className="section-label">
          Step 3 • Choose your vibe
        </div>

        <div className="soft-card mt-3 p-5">
          <p className="text-xs font-bold text-[#171717]">
            What does your relationship feel like?
          </p>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {vibes.map((item) => {
              const selected = vibe === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setVibe(item);
                    vibrate(30);
                  }}
                  className={`relative flex aspect-square items-center justify-center rounded-[20px] border text-2xl transition-all duration-200 active:scale-[0.92] ${
                    selected
                      ? "border-[#ff4d6d]/20 bg-[#fff0f3] shadow-[0_10px_25px_rgba(255,77,109,0.10)]"
                      : "border-gray-100 bg-white hover:bg-gray-50"
                  }`}
                >
                  {item}

                  {selected && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff4d6d] text-[9px] font-black text-white">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-2xl bg-gray-50 px-4 py-3 text-center">
            <span className="text-2xl">
              {vibe}
            </span>

            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400">
              Your chosen vibe
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          CALCULATION
      ==================================================== */}
      {calculating && (
        <section className="mt-7">
          <div className="relative overflow-hidden rounded-[30px] bg-[#171717] p-6 text-center text-white shadow-[0_20px_55px_rgba(23,23,23,0.16)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,109,0.15),transparent_55%)]" />

            <div className="relative">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-8 border-[#ff4d6d]/20">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-4xl animate-pulse">
                  💕
                </div>
              </div>

              <p className="mt-5 text-sm font-bold">
                Calculating your chemistry...
              </p>

              <p className="mt-1 text-[10px] text-white/45">
                Comparing vibes, trust, fun & chemistry
              </p>

              <div className="mx-auto mt-5 max-w-[260px]">
                <div className="flex items-center justify-between text-[9px] font-bold text-white/40">
                  <span>Love analysis</span>
                  <span>{calculationProgress}%</span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff9ab0] transition-all duration-100"
                    style={{
                      width: `${calculationProgress}%`,
                    }}
                  />
                </div>
              </div>

              <p className="mt-5 text-[9px] font-medium text-white/25">
                Lovers Play Love Lab
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================
          CALCULATE BUTTON
      ==================================================== */}
      <button
        type="button"
        className={`mt-6 w-full rounded-full py-4 font-bold transition-all ${
          calculating
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-gradient-to-r from-[#ff4d6d] to-[#ff365c] text-white shadow-[0_14px_35px_rgba(255,77,109,0.28)] active:scale-[0.98]"
        }`}
        onClick={handleCalculate}
        disabled={calculating}
      >
        <span className="flex items-center justify-center gap-2">
          {calculating ? "💕" : "💖"}
          {calculating
            ? `Calculating ${calculationProgress}%...`
            : "Calculate Our Compatibility"}
        </span>
      </button>

      {/* ===================================================
          HOW IT WORKS
      ==================================================== */}
      <section className="mt-8">
        <div className="section-label">
          How it works
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="soft-card p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-50 text-lg">
              💕
            </div>

            <p className="mt-3 text-[10px] font-bold text-[#171717]">
              Enter
            </p>

            <p className="mt-1 text-[9px] leading-4 text-gray-400">
              Add both names.
            </p>
          </div>

          <div className="soft-card p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-lg">
              ✨
            </div>

            <p className="mt-3 text-[10px] font-bold text-[#171717]">
              Choose
            </p>

            <p className="mt-1 text-[9px] leading-4 text-gray-400">
              Pick your relationship vibe.
            </p>
          </div>

          <div className="soft-card p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-lg">
              ❤️
            </div>

            <p className="mt-3 text-[10px] font-bold text-[#171717]">
              Reveal
            </p>

            <p className="mt-1 text-[9px] leading-4 text-gray-400">
              Discover your score.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          FOOT NOTE
      ==================================================== */}
      <div className="mt-8 text-center">
        <div className="mx-auto flex items-center justify-center gap-3 text-gray-200">
          <span className="h-px w-12 bg-gray-200" />
          <span className="text-sm">♥</span>
          <span className="h-px w-12 bg-gray-200" />
        </div>

        <p className="mt-3 text-[9px] font-medium text-gray-300">
          For fun, flirting and seeing what the stars have to say. ✨
        </p>
      </div>
    </div>
  );
};

export default LoveCalculator;