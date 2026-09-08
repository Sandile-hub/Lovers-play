import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const games = [
  { id: 'knowme', title: 'Know Me Quiz', emoji: '🧠', tag: '2 Phones', desc: 'Create a quiz and test your partner', path: '/create' },
  { id: 'wyr', title: 'Would You Rather', emoji: '🤔', tag: '1 Phone', desc: 'Compare your choices', path: '/play/wyr' },
  { id: 'tod', title: 'Truth or Dare', emoji: '🍾', tag: '1 Phone', desc: 'Spin the bottle', path: '/play/tod' },
  { id: 'calculator', title: 'Love Calculator', emoji: '💕', tag: '1 Phone', desc: 'Check your compatibility', path: '/play/calculator' },
  { id: 'kmb', title: 'Kiss Marry Block', emoji: '💋', tag: '2 Phones', desc: 'Lock your choices', path: '/play/kmb' },
  { id: 'slideshow', title: 'Memory Slideshow', emoji: '📸', tag: '1 Phone', desc: 'Create a romantic slideshow', path: '/play/slideshow' },
];

const Home = () => {
  const navigate = useNavigate();
  const { vibrate } = useApp();

  const handleGameClick = (path) => {
    vibrate(50);
    navigate(path);
  };

  return (
    <div className="pb-4">
      <div className="mt-4 text-center">
        <h1 className="font-playfair text-5xl font-bold text-black leading-tight">
          Games Made for Lovers ❤️🎮
        </h1>
        <p className="text-gray-600 mt-3 text-sm max-w-xs mx-auto">
          Play with your person – long distance or same bed • 6 addictive games • No download needed • Works on WhatsApp
        </p>
        <button className="btn-primary mt-5" onClick={() => { vibrate(50); navigate('/create'); }}>
          Start Playing Now 👇
        </button>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-2 gap-4">
          {games.map((g) => (
            <div key={g.id} className="game-card" onClick={() => handleGameClick(g.path)}>
              <span className="text-4xl block mb-1">{g.emoji}</span>
              <h3 className="font-bold text-base leading-tight">{g.title}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="pill-tag">{g.tag}</span>
                <span className="pill-tag live">Live</span>
              </div>
              <button className="btn-secondary w-full mt-3 py-2 text-sm" onClick={(e) => { e.stopPropagation(); handleGameClick(g.path); }}>
                Play
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 glass rounded-[32px] p-6 text-center">
        <h3 className="font-bold text-lg">Why Couples Love It</h3>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div><span className="text-3xl">🚀</span><p className="text-xs font-semibold mt-1">No Login Needed</p></div>
          <div><span className="text-3xl">📱</span><p className="text-xs font-semibold mt-1">Share on WhatsApp</p></div>
          <div><span className="text-3xl">🔒</span><p className="text-xs font-semibold mt-1">100% Private</p></div>
        </div>
      </div>
    </div>
  );
};

export default Home;