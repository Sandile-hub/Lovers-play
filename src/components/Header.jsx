import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-3 border-b border-pink/10">
      <div className="flex items-center gap-2">
        <span className="text-2xl">❤️</span>
        <h1 className="font-playfair text-xl font-bold text-black">Lovers Play</h1>
      </div>
      <div className="badge-gold text-[10px]">
        by SELEC-DORCO (PTY) LTD
      </div>
    </header>
  );
};

export default Header;