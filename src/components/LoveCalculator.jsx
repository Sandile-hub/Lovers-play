import React, { useState } from 'react';
import { useApp } from '../App';
import confetti from 'canvas-confetti';

const vibes = ['😊', '😍', '🔥', '💕', '✨', '🌟', '💖', '🌹'];

const LoveCalculator = () => {
  const { vibrate } = useApp();
  const [name, setName] = useState('');
  const [crush, setCrush] = useState('');
  const [together, setTogether] = useState('Just met');
  const [vibe, setVibe] = useState('😊');
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (!name.trim() || !crush.trim()) {
      alert('Please enter both names');
      return;
    }
    vibrate(50);
    setCalculating(true);
    setResult(null);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        const base = 85 + Math.random() * 14;
        const compat = Math.round(Math.min(99, base));
        const trust = Math.round(80 + Math.random() * 18);
        const fun = Math.round(80 + Math.random() * 18);
        const spice = Math.round(75 + Math.random() * 22);
        const reasons = [
          'Because you both love food and late night chats',
          'Your energies match perfectly!',
          'You share the same sense of humor',
          'You balance each other out beautifully',
          'Your love languages align perfectly',
          'You bring out the best in each other',
          'The chemistry is undeniable',
          "You're both adventurous at heart",
        ];
        const reason = reasons[Math.floor(Math.random() * reasons.length)];
        setResult({ compat, trust, fun, spice, reason, name: name.trim(), crush: crush.trim() });
        setCalculating(false);
        if (compat >= 90) {
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.5 } });
        }
        vibrate(50);
      }
    }, 50);
  };

  const shareResult = () => {
    if (!result) return;
    const text = `❤️ ${result.name} & ${result.crush} are ${result.compat}% compatible! ${result.reason} ✨ Lovers Play`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (result) {
    return (
      <div className="pb-4">
        <div className="mt-4 text-center">
          <span className="text-7xl">❤️‍🔥</span>
          <h2 className="font-playfair text-3xl font-bold mt-2">{result.name} & {result.crush}</h2>
          <p className="text-5xl font-bold text-red mt-2">{result.compat}%</p>
          <p className="text-lg font-semibold mt-1">Soulmates! ❤️‍🔥</p>
          <div className="mt-4 space-y-2 text-left max-w-xs mx-auto">
            <div>Trust <div className="progress-bar"><div className="fill" style={{ width: `${result.trust}%` }} /></div></div>
            <div>Fun <div className="progress-bar"><div className="fill" style={{ width: `${result.fun}%` }} /></div></div>
            <div>Spice <div className="progress-bar"><div className="fill" style={{ width: `${result.spice}%` }} /></div></div>
          </div>
          <p className="text-sm text-gray-600 mt-4 italic">{result.reason}</p>
          <div className="mt-6 flex flex-col gap-3">
            <button className="btn-primary" onClick={shareResult}>📤 Share on WhatsApp</button>
            <button className="btn-secondary" onClick={() => { setResult(null); vibrate(30); }}>🔄 Calculate Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4">
      <div className="mt-4">
        <h2 className="font-playfair text-2xl font-bold">Love Calculator</h2>
        <p className="text-gray-600 text-sm">Discover your compatibility ❤️</p>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block font-semibold text-sm text-gray-700">Your Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sandile" className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:border-pink outline-none" />
          </div>
          <div>
            <label className="block font-semibold text-sm text-gray-700">Crush's Name</label>
            <input value={crush} onChange={e => setCrush(e.target.value)} placeholder="e.g. Lerato" className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:border-pink outline-none" />
          </div>
          <div>
            <label className="block font-semibold text-sm text-gray-700">How Long Together</label>
            <select value={together} onChange={e => setTogether(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:border-pink outline-none">
              <option>Just met</option>
              <option>1-3 months</option>
              <option>6 months+</option>
              <option>1 year+</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-sm text-gray-700">Your Vibe</label>
            <div className="flex gap-2 flex-wrap">
              {vibes.map(v => (
                <button key={v} className={`text-2xl p-2 rounded-full ${vibe === v ? 'bg-pink/20 border-2 border-red' : 'bg-white'}`} onClick={() => { setVibe(v); vibrate(30); }}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {calculating && (
          <div className="mt-6 text-center">
            <div className="relative w-32 h-32 mx-auto">
              <div className="w-full h-full rounded-full border-8 border-pink/30 flex items-center justify-center text-4xl animate-pulse-slow">💕</div>
            </div>
            <p className="mt-3 font-semibold text-red">Calculating your chemistry... by SELEC-DORCO AI</p>
          </div>
        )}

        <button className="btn-primary mt-6" onClick={handleCalculate} disabled={calculating}>
          {calculating ? 'Calculating...' : '💖 Calculate'}
        </button>
      </div>
    </div>
  );
};

export default LoveCalculator;