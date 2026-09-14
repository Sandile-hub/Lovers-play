import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 -mx-4 px-4 py-3 bg-[#fff9f7]/85 backdrop-blur-xl border-b border-[#ff4d6d]/10">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4d6d] to-[#ff365c] shadow-[0_8px_24px_rgba(255,77,109,0.28)]">
            <span className="text-xl drop-shadow-sm">❤️</span>
            
            <span className="absolute -right-1 -top-1 text-[10px]">
              ✨
            </span>
          </div>

          <div className="leading-none">
            <h1 className="font-playfair text-xl font-bold tracking-tight text-[#171717]">
              Lovers Play
            </h1>

            <p className="mt-1 text-[9px] font-medium tracking-[0.12em] text-gray-400 uppercase">
              Play together, wherever you are
            </p>
          </div>
        </div>

        {/* Company attribution */}
        <div className="hidden text-right sm:block">
          <p className="text-[8px] font-semibold tracking-wider text-gray-400 uppercase">
            By
          </p>
          <p className="text-[9px] font-semibold text-gray-500">
            SELEC-DORCO (PTY) LTD
          </p>
        </div>

        {/* Mobile attribution mark */}
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm border border-[#ff4d6d]/10 sm:hidden"
          aria-label="Made by SELEC-DORCO"
          title="SELEC-DORCO (PTY) LTD"
        >
          <span className="text-sm">♥</span>
        </div>
      </div>
    </header>
  );
};

export default Header;