import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const games = [
  { id: 'knowme', title: 'Know Me Quiz', emoji: '🧠', desc: 'Test how well your partner knows you', path: '/create' },
  { id: 'wyr', title: 'Would You Rather', emoji: '🤔', desc: 'Choose together and see if you match', path: '/play/wyr' },
  { id: 'tod', title: 'Truth or Dare', emoji: '🍾', desc: 'Spin the bottle for fun challenges', path: '/play/tod' },
  { id: 'calculator', title: 'Love Calculator', emoji: '💕', desc: 'Calculate your compatibility', path: '/play/calculator' },
  { id: 'kmb', title: 'Kiss Marry Block', emoji: '💋', desc: 'Lock your choices and compare', path: '/play/kmb' },
  { id: 'slideshow', title: 'Memory Slideshow', emoji: '📸', desc: 'Create a romantic slideshow', path: '/play/slideshow' },
];

const Games = () => {
  const navigate = useNavigate();
  const { vibrate } = useApp();

  return (
    <div className="pb-4">
      <div className="mt-4">
        <h2 className="font-playfair text-2xl font-bold">All Games</h2>
        <p className="text-gray-600 text-sm">Choose a game to play with your lover</p>
        <div className="mt-4 space-y-3">
          {games.map(g => (
            <div key={g.id} className="game-card flex items-center gap-4" onClick={() => { vibrate(50); navigate(g.path); }}>
              <span className="text-4xl">{g.emoji}</span>
              <div className="flex-1">
                <h3 className="font-bold">{g.title}</h3>
                <p className="text-xs text-gray-600">{g.desc}</p>
              </div>
              <span className="text-red">▶</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;