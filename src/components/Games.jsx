import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../App";

const games = [
  {
    id: "knowme",
    title: "Know Me Quiz",
    emoji: "🧠",
    desc: "Test how well your partner really knows you.",
    path: "/create",
    tag: "2 Phones",
    category: "Connection",
    accent: "pink",
    featured: true,
  },
  {
    id: "wyr",
    title: "Would You Rather",
    emoji: "🤔",
    desc: "Make impossible choices and see how closely you match.",
    path: "/play/wyr",
    tag: "2 Phones",
    category: "Choices",
    accent: "purple",
  },
  {
    id: "tod",
    title: "Truth or Dare",
    emoji: "🍾",
    desc: "Spin the bottle for questions, challenges and surprises.",
    path: "/play/tod",
    tag: "1 Phone",
    category: "Playful",
    accent: "orange",
  },
  {
    id: "calculator",
    title: "Love Calculator",
    emoji: "💕",
    desc: "Discover your compatibility and compare your chemistry.",
    path: "/play/calculator",
    tag: "1 Phone",
    category: "Romance",
    accent: "red",
  },
  {
    id: "kmb",
    title: "Kiss Marry Block",
    emoji: "💋",
    desc: "Make your choices, lock them in and compare with your person.",
    path: "/play/kmb",
    tag: "2 Phones",
    category: "Choices",
    accent: "dark",
  },
  {
    id: "slideshow",
    title: "Memory Slideshow",
    emoji: "📸",
    desc: "Turn your favorite memories into a romantic slideshow.",
    path: "/play/slideshow",
    tag: "1 Phone",
    category: "Memories",
    accent: "gold",
  },
];

const accentStyles = {
  pink: {
    icon: "bg-[#fff0f3]",
    glow: "bg-[#ff4d6d]/10",
    tag: "bg-[#fff0f3] text-[#ff4d6d]",
  },
  purple: {
    icon: "bg-purple-50",
    glow: "bg-purple-500/10",
    tag: "bg-purple-50 text-purple-600",
  },
  orange: {
    icon: "bg-orange-50",
    glow: "bg-orange-400/10",
    tag: "bg-orange-50 text-orange-600",
  },
  red: {
    icon: "bg-red-50",
    glow: "bg-red-500/10",
    tag: "bg-red-50 text-red-600",
  },
  dark: {
    icon: "bg-gray-100",
    glow: "bg-gray-900/10",
    tag: "bg-gray-100 text-gray-700",
  },
  gold: {
    icon: "bg-amber-50",
    glow: "bg-amber-400/10",
    tag: "bg-amber-50 text-amber-600",
  },
};

const Games = () => {
  const navigate = useNavigate();
  const { vibrate } = useApp();

  const handleGameClick = (path) => {
    vibrate(40);
    navigate(path);
  };

  return (
    <div className="pb-6">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="pt-4">
        <div className="relative overflow-hidden rounded-[34px] bg-[#171717] p-6 text-white shadow-[0_24px_60px_rgba(23,23,23,0.18)]">
          <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#ff4d6d]/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">
              🎮 Lovers Play
            </div>

            <h1 className="mt-4 font-playfair text-4xl font-bold leading-tight">
              Pick your
              <br />
              next moment.
            </h1>

            <p className="mt-3 max-w-[290px] text-sm leading-6 text-white/55">
              From playful challenges to deeper conversations, choose a game
              and make some memories together.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                6 Games
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                1 & 2 Phones
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                No Login
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK INTRO
      ====================================================== */}
      <section className="mt-7">
        <div className="section-label">
          Choose your vibe
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-[#171717]">
              All Games
            </h2>

            <p className="mt-1 text-[10px] text-gray-400">
              Something for every kind of couple moment.
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0f3] text-lg">
            ❤️
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED GAME
      ====================================================== */}
      {games
        .filter((game) => game.featured)
        .map((game) => {
          const styles = accentStyles[game.accent];

          return (
            <section key={game.id} className="mt-4">
              <button
                type="button"
                onClick={() => handleGameClick(game.path)}
                className="relative w-full overflow-hidden rounded-[30px] bg-gradient-to-br from-[#ff4d6d] to-[#ff365c] p-5 text-left text-white shadow-[0_18px_45px_rgba(255,77,109,0.24)] transition-all active:scale-[0.985]"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/15 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.13em] text-white/85">
                      ⭐ Most popular
                    </span>

                    <span className="text-lg">→</span>
                  </div>

                  <div className="mt-5 flex items-end gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[25px] bg-white/15 text-5xl backdrop-blur-sm">
                      {game.emoji}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-playfair text-2xl font-bold">
                        {game.title}
                      </h3>

                      <p className="mt-1 text-[11px] leading-5 text-white/75">
                        {game.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="rounded-full bg-white/15 px-3 py-1.5 text-[9px] font-bold">
                        {game.tag}
                      </span>

                      <span className="rounded-full bg-white/15 px-3 py-1.5 text-[9px] font-bold">
                        {game.category}
                      </span>
                    </div>

                    <span className="rounded-full bg-white px-4 py-2 text-[10px] font-bold text-[#171717]">
                      Play now
                    </span>
                  </div>
                </div>
              </button>
            </section>
          );
        })}

      {/* =====================================================
          GAME GRID
      ====================================================== */}
      <section className="mt-4 grid grid-cols-2 gap-3">
        {games
          .filter((game) => !game.featured)
          .map((game) => {
            const styles = accentStyles[game.accent];

            return (
              <button
                key={game.id}
                type="button"
                onClick={() => handleGameClick(game.path)}
                className="group relative overflow-hidden rounded-[28px] border border-white bg-white p-4 text-left shadow-[0_14px_40px_rgba(31,20,24,0.07)] transition-all duration-200 active:scale-[0.97]"
              >
                {/* Glow */}
                <div
                  className={`absolute -right-8 -top-8 h-20 w-20 rounded-full ${styles.glow} blur-2xl`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${styles.icon}`}
                    >
                      {game.emoji}
                    </div>

                    <span className="text-gray-300 transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                  <h3 className="mt-4 text-sm font-bold leading-5 text-[#171717]">
                    {game.title}
                  </h3>

                  <p className="mt-1.5 min-h-[40px] text-[9px] leading-4 text-gray-400">
                    {game.desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-1">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${styles.tag}`}
                    >
                      {game.tag}
                    </span>

                    <span className="text-[8px] font-bold uppercase tracking-wide text-gray-300">
                      {game.category}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
      </section>

      {/* =====================================================
          GAME GUIDE
      ====================================================== */}
      <section className="mt-8">
        <div className="section-label">
          Find your mood
        </div>

        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={() => handleGameClick("/play/tod")}
            className="flex w-full items-center gap-4 rounded-[24px] border border-white bg-white p-4 text-left shadow-[0_10px_30px_rgba(31,20,24,0.05)] transition-all active:scale-[0.98]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-xl">
              🔥
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#171717]">
                Feeling playful?
              </p>

              <p className="mt-1 text-[9px] text-gray-400">
                Try Truth or Dare for something spontaneous.
              </p>
            </div>

            <span className="text-sm text-gray-300">→</span>
          </button>

          <button
            type="button"
            onClick={() => handleGameClick("/play/calculator")}
            className="flex w-full items-center gap-4 rounded-[24px] border border-white bg-white p-4 text-left shadow-[0_10px_30px_rgba(31,20,24,0.05)] transition-all active:scale-[0.98]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-xl">
              💕
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#171717]">
                Feeling romantic?
              </p>

              <p className="mt-1 text-[9px] text-gray-400">
                Check your chemistry with the Love Calculator.
              </p>
            </div>

            <span className="text-sm text-gray-300">→</span>
          </button>

          <button
            type="button"
            onClick={() => handleGameClick("/play/slideshow")}
            className="flex w-full items-center gap-4 rounded-[24px] border border-white bg-white p-4 text-left shadow-[0_10px_30px_rgba(31,20,24,0.05)] transition-all active:scale-[0.98]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-xl">
              📸
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#171717]">
                Feeling nostalgic?
              </p>

              <p className="mt-1 text-[9px] text-gray-400">
                Turn your favorite moments into a slideshow.
              </p>
            </div>

            <span className="text-sm text-gray-300">→</span>
          </button>
        </div>
      </section>

      {/* =====================================================
          BOTTOM MESSAGE
      ====================================================== */}
      <section className="mt-8">
        <div className="relative overflow-hidden rounded-[30px] bg-[#171717] p-6 text-center text-white">
          <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-[#ff4d6d]/15 blur-2xl" />
          <div className="absolute -bottom-12 -right-10 h-28 w-28 rounded-full bg-pink-400/10 blur-2xl" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl">
              💞
            </div>

            <h3 className="mt-4 font-playfair text-2xl font-bold">
              Pick a game.
              <br />
              Make a memory.
            </h3>

            <p className="mx-auto mt-2 max-w-[260px] text-[10px] leading-5 text-white/45">
              There is no right way to play. Just choose something that makes
              both of you smile.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOT NOTE
      ====================================================== */}
      <div className="mt-8 text-center">
        <div className="mx-auto flex items-center justify-center gap-3 text-gray-200">
          <span className="h-px w-12 bg-gray-200" />
          <span className="text-sm">♥</span>
          <span className="h-px w-12 bg-gray-200" />
        </div>

        <p className="mt-3 text-[9px] font-medium text-gray-300">
          Six games. Countless moments. One person you love.
        </p>
      </div>
    </div>
  );
};

export default Games;