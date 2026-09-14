import React from "react";

const Footer = () => {
  return (
    <footer className="mt-8 pb-4">
      <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/70 px-5 py-6 text-center shadow-[0_12px_40px_rgba(31,20,24,0.05)] backdrop-blur-xl">
        {/* Decorative glow */}
        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#ff4d6d]/10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-pink-300/10 blur-2xl" />

        <div className="relative">
          {/* Brand mark */}
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4d6d] to-[#ff365c] text-lg shadow-[0_8px_22px_rgba(255,77,109,0.22)]">
            ❤️
          </div>

          <p className="mt-3 font-playfair text-lg font-bold text-[#171717]">
            Lovers Play
          </p>

          <p className="mx-auto mt-1 max-w-[260px] text-[9px] leading-5 text-gray-400">
            Games, memories and moments made for two.
          </p>

          {/* Divider */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gray-200" />
            <span className="text-xs text-[#ff4d6d]">♥</span>
            <span className="h-px w-10 bg-gray-200" />
          </div>

          {/* Company */}
          <p className="mt-4 text-[10px] font-semibold text-gray-500">
            A product of SELEC-DORCO (PTY) LTD
          </p>

          <p className="mt-1 text-[9px] text-gray-400">
            © 2026 Lovers Play • All Rights Reserved
          </p>

          {/* Tagline */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#fff7f8] px-3 py-1.5">
            <span className="text-xs">❤️</span>
            <span className="text-[9px] font-bold text-[#ff4d6d]">
              Built for lovers in the kasi and beyond
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;