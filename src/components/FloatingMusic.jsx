import React from 'react';
import { useApp } from '../App';

const FloatingMusic = () => {
  const { musicOn, toggleMusic } = useApp();
  return (
    <button
      onClick={toggleMusic}
      className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-xl border-none cursor-pointer transition-all active:scale-90"
      aria-label="Toggle music"
    >
      {musicOn ? '🔊' : '🔇'}
    </button>
  );
};

export default FloatingMusic;