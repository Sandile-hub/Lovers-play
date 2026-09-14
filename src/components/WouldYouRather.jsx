import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../App';
import confetti from 'canvas-confetti';

const questions = [
  { q1: 'Cuddle all night with no phone', q2: 'Expensive dinner but no cuddles' },
  { q1: 'Travel the world together', q2: 'Buy a dream home together' },
  { q1: 'Cook together every night', q2: 'Order takeout every night' },
  { q1: 'Movie marathon at home', q2: 'Dress up and go to the cinema' },
  { q1: 'Wake up early to watch sunrise', q2: 'Stay up late to watch stars' },
  { q1: 'Write love letters to each other', q2: 'Send memes all day' },
  { q1: 'Dance in the kitchen together', q2: 'Sing in the shower together' },
  { q1: 'Have a picnic in the park', q2: 'Have a candlelit dinner at home' },
  { q1: 'Give each other massages', q2: 'Take a relaxing bath together' },
  { q1: 'Go on a road trip with no plan', q2: 'Plan a detailed itinerary' },
  { q1: 'Read a book together aloud', q2: 'Listen to a podcast together' },
  { q1: 'Build a fort at home', q2: 'Camp under the stars' },
  { q1: 'Make a time capsule together', q2: 'Write future letters to each other' },
  { q1: 'Learn a new skill together', q2: 'Teach each other something new' },
  { q1: 'Have a lazy Sunday in bed', q2: 'Go for a long walk in nature' },
];

const WouldYouRather = () => {
  const { vibrate, share } = useApp();
  const [searchParams] = useSearchParams();
  
  // URL Data for Player 2
  const encodedData = searchParams.get('data');
  
  const [phase, setPhase] = useState('setup'); // setup, p1, share, p2, done
  const [p1Name, setP1Name] = useState('');
  const [p2Name, setP2Name] = useState('');
  
  const [round, setRound] = useState(0);
  const [p1Choices, setP1Choices] = useState([]);
  const [p2Choices, setP2Choices] = useState([]);
  const [matches, setMatches] = useState(0);

  // Check if Player 2 is opening the link
  useEffect(() => {
    if (encodedData) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(encodedData)));
        setP1Choices(decoded.choices);
        setP1Name(decoded.name || 'Partner');
        setPhase('p2');
        setRound(0);
      } catch (err) {
        alert('Invalid or corrupted link!');
        setPhase('setup');
      }
    }
  }, [encodedData]);

  const handleStart = () => {
    if (!p1Name.trim()) { alert('Please enter your name'); return; }
    vibrate(30);
    setPhase('p1');
    setRound(0);
    setP1Choices([]);
  };

  const handleChoice = (choice) => {
    vibrate(30);
    
    if (phase === 'p1') {
      const newP1 = [...p1Choices, choice];
      setP1Choices(newP1);
      
      if (round < questions.length - 1) {
        setRound(round + 1);
      } else {
        setPhase('share');
        vibrate(50);
      }
    } 
    else if (phase === 'p2') {
      const newP2 = [...p2Choices, choice];
      setP2Choices(newP2);
      
      if (round < questions.length - 1) {
        setRound(round + 1);
      } else {
        let matchCount = 0;
        for (let i = 0; i < questions.length; i++) {
          if (p1Choices[i] === newP2[i]) matchCount++;
        }
        setMatches(matchCount);
        setPhase('done');
        if (matchCount >= 12) {
          confetti({ particleCount: 200, spread: 80, origin: { y: 0.5 }, useWorker: false });
        }
        vibrate(50);
      }
    }
  };

  const generateLink = () => {
    const dataToEncode = { name: p1Name.trim(), choices: p1Choices };
    const encoded = btoa(encodeURIComponent(JSON.stringify(dataToEncode)));
    return `${window.location.origin}/play/wyr?data=${encoded}`;
  };

  const handleShareLink = () => {
    const link = generateLink();
    const text = `${p1Name} has answered 15 Would You Rather questions! Can you match their choices? Play here: ${link}`;
    share(text, link);
  };

  const resetGame = () => {
    setPhase('setup');
    setRound(0);
    setP1Choices([]);
    setP2Choices([]);
    setMatches(0);
    setP1Name('');
    setP2Name('');
    vibrate(30);
  };

  // 1. SETUP PHASE
  if (phase === 'setup') {
    return (
      <div className="pb-4">
        <div className="mt-6 text-center">
          <span className="text-6xl">💑</span>
          <h2 className="font-playfair text-2xl font-bold mt-2">Would You Rather</h2>
          <p className="text-gray-600 text-sm">See how well you match with your partner</p>
          
          <div className="mt-6 glass rounded-[32px] p-6 text-left">
            <label className="block font-semibold text-sm text-gray-700">Your Name</label>
            <input 
              value={p1Name} 
              onChange={e => setP1Name(e.target.value)} 
              placeholder="e.g. Sandile" 
              className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:border-pink outline-none mt-1" 
            />
            <button className="btn-primary mt-6 w-full" onClick={handleStart}>
              🚀 Start Playing
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. SHARE PHASE (Player 1 done)
  if (phase === 'share') {
    const link = generateLink();
    return (
      <div className="pb-4">
        <div className="mt-6 text-center">
          <span className="text-6xl">📱</span>
          <h2 className="font-playfair text-2xl font-bold mt-2">Ready to send!</h2>
          <p className="text-gray-600 text-sm mt-1">Send this link to your partner so they can guess your choices.</p>
          
          <div className="glass rounded-[32px] p-4 mt-4 break-all text-xs text-gray-500 bg-gray-50 border">
            {link}
          </div>
          
          <div className="mt-6 flex flex-col gap-3">
            <button className="btn-primary" onClick={handleShareLink}>📤 Share on WhatsApp</button>
            <button className="btn-secondary" onClick={() => { navigator.clipboard?.writeText(link); alert('Copied!'); }}>📋 Copy Link</button>
            <button className="bg-gray-100 text-black py-3 rounded-full font-semibold" onClick={resetGame}>Back to Start</button>
          </div>
        </div>
      </div>
    );
  }

  // 3. DONE PHASE (Player 2 finished)
  if (phase === 'done') {
    const perfect = matches >= 12;
    return (
      <div className="pb-4">
        <div className="mt-8 text-center">
          <span className="text-7xl">{perfect ? '🔥' : '💕'}</span>
          <h2 className="font-playfair text-3xl font-bold mt-2">
            {perfect ? 'Soulmates!' : 'You match well!'}
          </h2>
          <p className="text-4xl font-bold text-red mt-2">{matches} / {questions.length}</p>
          <p className="text-gray-600 text-sm mt-1">{p1Name} and you matched on {matches} questions!</p>
          
          <div className="mt-6 flex flex-col gap-3">
            <button className="btn-primary" onClick={resetGame}>🔄 Play Again</button>
            <button className="btn-secondary" onClick={() => { vibrate(50); window.open(`https://wa.me/?text=${encodeURIComponent(`We matched ${matches}/${questions.length} in Would You Rather! ❤️ Play at Lovers Play`)}`, '_blank'); }}>
              📤 Share Score
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. PLAYING PHASE (P1 or P2)
  const q = questions[round];
  const label = phase === 'p1' ? `${p1Name}'s Turn` : "Your Turn";
  const progress = phase === 'p1' ? p1Choices.length : p2Choices.length;
  const progressColor = phase === 'p1' ? 'bg-pink' : 'bg-blue-500';

  return (
    <div className="pb-4">
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{label} – Question {round + 1} / {questions.length}</span>
          <span>{progress} / {questions.length}</span>
        </div>
        
        {/* Dynamic Progress Bar */}
        <div className="progress-bar mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
          <div className={`fill h-full transition-all duration-300 ${progressColor}`} style={{ width: `${(progress/questions.length)*100}%` }} />
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-lg font-medium text-gray-500">Would you rather…</p>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <button 
              className={`bg-white p-6 rounded-3xl shadow-lg text-lg font-semibold active:scale-95 transition-all border-2 ${phase === 'p1' ? 'border-pink/20 hover:border-pink' : 'border-blue-200 hover:border-blue-500'}`} 
              onClick={() => handleChoice(0)}
            >
              {q.q1}
            </button>
            <button 
              className={`bg-white p-6 rounded-3xl shadow-lg text-lg font-semibold active:scale-95 transition-all border-2 ${phase === 'p1' ? 'border-pink/20 hover:border-pink' : 'border-blue-200 hover:border-blue-500'}`} 
              onClick={() => handleChoice(1)}
            >
              {q.q2}
            </button>
          </div>
          
          <p className="text-xs text-gray-400 mt-4 italic">
            {phase === 'p1' 
              ? "Answer all questions, then share the link with your partner" 
              : `Try to guess what ${p1Name} chose!`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WouldYouRather;