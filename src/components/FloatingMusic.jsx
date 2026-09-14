import React from "react";
import { useApp } from "../App";

const FloatingMusic = () => {
  const { musicOn, toggleMusic } = useApp();

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={musicOn ? "Turn music off" : "Turn music on"}
      aria-pressed={musicOn}
      title={musicOn ? "Music on" : "Music off"}
      className={`
        group fixed right-4 top-4 z-50
        flex h-11 w-11 items-center justify-center
        rounded-2xl border backdrop-blur-xl
        shadow-[0_12px_30px_rgba(31,20,24,0.12)]
        transition-all duration-200
        active:scale-90
        ${
          musicOn
            ? "border-[#ff4d6d]/15 bg-[#171717] text-white shadow-[0_12px_30px_rgba(255,77,109,0.18)]"
            : "border-white/80 bg-white/80 text-gray-500"
        }
      `}
    >
      <span
        className={`
          relative text-lg leading-none transition-transform duration-200
          ${musicOn ? "group-hover:scale-110" : ""}
        `}
      >
        {musicOn ? "🔊" : "🔇"}

        {musicOn && (
          <span className="absolute -right-2 -top-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff4d6d] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff4d6d]" />
          </span>
        )}
      </span>
    </button>
  );
};

export default FloatingMusic;