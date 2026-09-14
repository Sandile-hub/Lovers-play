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

const OPTION_LETTERS = ['A', 'B'];

const WouldYouRather = () => {
  const { vibrate, share } = useApp();
  const [searchParams] = useSearchParams();

  const encodedData = searchParams.get('data');

  const [phase, setPhase] = useState('setup');
  const [p1Name, setP1Name] = useState('');
  const [p2Name, setP2Name] = useState('');

  const [round, setRound] = useState(0);
  const [p1Choices, setP1Choices] = useState([]);
  const [p2Choices, setP2Choices] = useState([]);
  const [matches, setMatches] = useState(0);

  // --------------------------------------------------
  // LOAD PLAYER 1 DATA
  // --------------------------------------------------

  useEffect(() => {
    if (!encodedData) return;

    try {
      const decoded = JSON.parse(
        decodeURIComponent(atob(encodedData))
      );

      if (
        !decoded ||
        !Array.isArray(decoded.choices) ||
        decoded.choices.length !== questions.length
      ) {
        throw new Error('Invalid game data');
      }

      setP1Choices(decoded.choices);
      setP1Name(decoded.name || 'Partner');
      setPhase('p2');
      setRound(0);
    } catch (err) {
      alert('Invalid or corrupted game link!');
      setPhase('setup');
    }
  }, [encodedData]);

  // --------------------------------------------------
  // SETUP
  // --------------------------------------------------

  const handleStart = () => {
    if (!p1Name.trim()) {
      alert('Please enter your name.');
      return;
    }

    vibrate(30);

    setP1Name(p1Name.trim());
    setRound(0);
    setP1Choices([]);
    setP2Choices([]);
    setMatches(0);
    setPhase('p1');
  };

  // --------------------------------------------------
  // ANSWERS
  // --------------------------------------------------

  const handleChoice = (choice) => {
    vibrate(30);

    if (phase === 'p1') {
      const newP1Choices = [...p1Choices, choice];

      setP1Choices(newP1Choices);

      if (round < questions.length - 1) {
        setTimeout(() => {
          setRound((previous) => previous + 1);
        }, 120);
      } else {
        setTimeout(() => {
          setPhase('share');
          vibrate(50);
        }, 150);
      }

      return;
    }

    if (phase === 'p2') {
      const newP2Choices = [...p2Choices, choice];

      setP2Choices(newP2Choices);

      if (round < questions.length - 1) {
        setTimeout(() => {
          setRound((previous) => previous + 1);
        }, 120);
        return;
      }

      // Calculate using the newly selected answer array.
      let matchCount = 0;

      for (let i = 0; i < questions.length; i++) {
        if (p1Choices[i] === newP2Choices[i]) {
          matchCount++;
        }
      }

      setMatches(matchCount);
      setPhase('done');

      if (matchCount >= 12) {
        setTimeout(() => {
          confetti({
            particleCount: 220,
            spread: 90,
            origin: { y: 0.5 },
            useWorker: false,
          });
        }, 200);
      }

      vibrate(60);
    }
  };

  // --------------------------------------------------
  // LINK / SHARE
  // --------------------------------------------------

  const generateLink = () => {
    const dataToEncode = {
      name: p1Name.trim(),
      choices: p1Choices,
    };

    const encoded = btoa(
      encodeURIComponent(JSON.stringify(dataToEncode))
    );

    return `${window.location.origin}/play/wyr?data=${encoded}`;
  };

  const handleShareLink = () => {
    const link = generateLink();

    const text =
      `💕 ${p1Name} has answered 15 Would You Rather questions!\n\n` +
      `Think you know what they chose? Take the challenge and find out how compatible you are.\n\n` +
      `${link}`;

    share(text, link);
  };

  const handleCopy = async () => {
    const link = generateLink();

    try {
      await navigator.clipboard?.writeText(link);
      alert('Game link copied!');
    } catch {
      alert('Could not copy the link. Please copy it manually.');
    }
  };

  // --------------------------------------------------
  // RESET
  // --------------------------------------------------

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

  // --------------------------------------------------
  // SETUP SCREEN
  // --------------------------------------------------

  if (phase === 'setup') {
    return (
      <div className="pb-8">
        <div className="mt-5">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-[34px] bg-[#171717] p-6 text-white shadow-[0_25px_60px_rgba(23,23,23,0.18)]">
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#ff4d6d]/30 blur-3xl" />
            <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-[#ff365c]/20 blur-3xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                💑
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                Lovers Play • Couple Challenge
              </p>

              <h2 className="mt-2 font-playfair text-3xl font-bold leading-tight">
                Would you rather...
              </h2>

              <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">
                Choose your favourites and see if your person can
                predict your answers.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                  15 Questions
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                  2 Players
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                  No Login
                </span>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="soft-card mt-5 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f3] text-lg">
                👤
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Player 1
                </p>

                <p className="text-xs text-gray-500">
                  Start by answering all 15 questions.
                </p>
              </div>
            </div>

            <input
              value={p1Name}
              onChange={(e) => setP1Name(e.target.value)}
              placeholder="What's your name?"
              maxLength={30}
              className="love-input mt-4"
            />

            <button
              className="btn-primary mt-4"
              onClick={handleStart}
            >
              💕 Start My Answers
            </button>
          </div>

          {/* How it works */}
          <div className="mt-6">
            <p className="section-label">
              💡 How it works
            </p>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
                <span className="text-2xl">1️⃣</span>
                <p className="mt-2 text-[10px] font-bold">
                  You choose
                </p>
              </div>

              <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
                <span className="text-2xl">📤</span>
                <p className="mt-2 text-[10px] font-bold">
                  Send link
                </p>
              </div>

              <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
                <span className="text-2xl">💕</span>
                <p className="mt-2 text-[10px] font-bold">
                  Compare
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // SHARE SCREEN
  // --------------------------------------------------

  if (phase === 'share') {
    const link = generateLink();

    return (
      <div className="pb-8">
        <div className="mt-5">
          <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#ff4d6d] to-[#ff365c] p-6 text-white text-center shadow-[0_25px_60px_rgba(255,77,109,0.22)]">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

            <div className="relative">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/15 text-5xl">
                📱
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                Step 2 of 2
              </p>

              <h2 className="mt-2 font-playfair text-3xl font-bold">
                Your answers are locked!
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Now send your challenge to your person and see
                whether they can read your mind. 👀
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-[24px] bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-black text-[#171717]">
                15
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-gray-400">
                Choices locked
              </p>
            </div>

            <div className="rounded-[24px] bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-black text-[#ff4d6d]">
                1
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-gray-400">
                Link to share
              </p>
            </div>
          </div>

          {/* Link */}
          <div className="glass mt-4 rounded-[28px] p-4">
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
              Your private game link
            </p>

            <div className="mt-3 rounded-2xl bg-white p-3">
              <p className="break-all text-[11px] leading-relaxed text-gray-500">
                {link}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col gap-3">
            <button
              className="btn-primary"
              onClick={handleShareLink}
            >
              💕 Send to My Person
            </button>

            <button
              className="btn-secondary"
              onClick={handleCopy}
            >
              📋 Copy Game Link
            </button>

            <button
              className="w-full rounded-full bg-gray-100 py-3.5 font-semibold text-[#171717] transition-all active:scale-[0.97]"
              onClick={resetGame}
            >
              ← Start Over
            </button>
          </div>

          <p className="mt-4 text-center text-[10px] text-gray-400">
            Your choices stay hidden until your partner finishes.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // RESULTS
  // --------------------------------------------------

  if (phase === 'done') {
    const total = questions.length;
    const percentage = Math.round((matches / total) * 100);

    let emoji = '💕';
    let title = 'You match well!';
    let message = 'There is definitely something special here.';

    if (matches === total) {
      emoji = '🔥';
      title = 'Soulmates!';
      message = 'Okay... you two might actually share one brain.';
    } else if (percentage >= 80) {
      emoji = '😍';
      title = 'Almost psychic!';
      message = 'You know each other ridiculously well.';
    } else if (percentage >= 60) {
      emoji = '🥰';
      title = 'Pretty compatible!';
      message = 'You two definitely understand each other.';
    } else if (percentage >= 40) {
      emoji = '😊';
      title = 'Getting there!';
      message = 'A few more dates and you might be unstoppable.';
    } else {
      emoji = '😂';
      title = 'Opposites attract!';
      message = 'You clearly have some explaining to do!';
    }

    return (
      <div className="pb-8">
        <div className="mt-5 overflow-hidden rounded-[34px] bg-[#171717] p-6 text-center text-white shadow-[0_25px_60px_rgba(23,23,23,0.18)]">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-6xl">
            {emoji}
          </div>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Your compatibility result
          </p>

          <h2 className="mt-2 font-playfair text-3xl font-bold">
            {title}
          </h2>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/60">
            {message}
          </p>

          {/* Score */}
          <div className="mx-auto mt-7 flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-[#ff4d6d]/25">
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white/10">
              <span className="text-4xl font-black">
                {percentage}%
              </span>

              <span className="mt-1 text-[10px] font-semibold text-white/50">
                {matches} / {total} matches
              </span>
            </div>
          </div>
        </div>

        {/* Names */}
        <div className="mt-4 rounded-[28px] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-center gap-3">
            <div className="rounded-2xl bg-[#fff0f3] px-4 py-3 text-center">
              <p className="text-[9px] font-bold uppercase text-gray-400">
                Player 1
              </p>
              <p className="mt-1 font-bold text-[#171717]">
                {p1Name}
              </p>
            </div>

            <div className="text-xl">❤️</div>

            <div className="rounded-2xl bg-[#eef6ff] px-4 py-3 text-center">
              <p className="text-[9px] font-bold uppercase text-gray-400">
                Player 2
              </p>
              <p className="mt-1 font-bold text-[#171717]">
                {p2Name || 'You'}
              </p>
            </div>
          </div>
        </div>

        {/* Match message */}
        <div className="glass mt-4 rounded-[28px] p-5 text-center">
          <p className="text-2xl">💌</p>

          <p className="mt-2 text-sm font-semibold text-[#171717]">
            You matched on {matches} out of {total} choices.
          </p>

          <p className="mt-1 text-xs leading-relaxed text-gray-400">
            {percentage >= 80
              ? 'That is some serious couple chemistry.'
              : 'The fun part is discovering where your answers differ.'}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <button
            className="btn-primary"
            onClick={resetGame}
          >
            🔄 Play Again
          </button>

          <button
            className="btn-secondary"
            onClick={() => {
              vibrate(50);

              const text =
                `💕 We matched ${matches}/${total} in Would You Rather!\n\n` +
                `Our Lovers Play compatibility score is ${percentage}% 🔥`;

              const url =
                `https://wa.me/?text=${encodeURIComponent(text)}`;

              window.open(url, '_blank');
            }}
          >
            📤 Share Our Score
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // PLAY SCREEN
  // --------------------------------------------------

  const q = questions[round];

  const isPlayerOne = phase === 'p1';

  const label = isPlayerOne
    ? `${p1Name}'s Turn`
    : `${p2Name || 'Your'} Turn`;

  const progress = isPlayerOne
    ? p1Choices.length
    : p2Choices.length;

  const progressPercentage =
    (progress / questions.length) * 100;

  return (
    <div className="pb-8">
      <div className="mt-5">
        {/* Player header */}
        <div className="flex items-center justify-between">
          <div>
            <span
              className={`
                inline-flex items-center rounded-full px-3 py-1.5
                text-[10px] font-bold uppercase tracking-[0.12em]
                ${
                  isPlayerOne
                    ? 'bg-[#fff0f3] text-[#ff4d6d]'
                    : 'bg-[#eef6ff] text-blue-500'
                }
              `}
            >
              {isPlayerOne
                ? '❤️ Your Choices'
                : '🧠 Guess Their Choices'}
            </span>

            <h2 className="mt-2 font-playfair text-2xl font-bold text-[#171717]">
              {label}
            </h2>
          </div>

          <div
            className={`
              flex h-11 w-11 items-center justify-center rounded-2xl text-lg
              ${
                isPlayerOne
                  ? 'bg-[#fff0f3]'
                  : 'bg-[#eef6ff]'
              }
            `}
          >
            {isPlayerOne ? '💕' : '🎯'}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Question {round + 1} of {questions.length}
            </p>

            <p
              className={`
                text-[10px] font-bold
                ${
                  isPlayerOne
                    ? 'text-[#ff4d6d]'
                    : 'text-blue-500'
                }
              `}
            >
              {progress} answered
            </p>
          </div>

          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`
                h-full rounded-full transition-all duration-500
                ${
                  isPlayerOne
                    ? 'bg-gradient-to-r from-[#ff8fa3] to-[#ff365c]'
                    : 'bg-gradient-to-r from-blue-300 to-blue-500'
                }
              `}
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="relative mt-6 overflow-hidden rounded-[34px] bg-white p-5 shadow-[0_20px_60px_rgba(31,20,24,0.09)]">
          <div
            className={`
              absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl
              ${
                isPlayerOne
                  ? 'bg-[#fff0f3]'
                  : 'bg-[#eef6ff]'
              }
            `}
          />

          <div className="relative">
            <div className="flex items-center justify-center">
              <span className="rounded-full bg-[#171717] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-white">
                Would you rather...
              </span>
            </div>

            <h3 className="mt-5 text-center font-playfair text-2xl font-bold leading-tight text-[#171717]">
              Pick one.
            </h3>

            <p className="mt-1 text-center text-xs text-gray-400">
              {isPlayerOne
                ? 'Choose the option that feels most like you.'
                : `Try to guess what ${p1Name} picked.`}
            </p>

            {/* Choices */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleChoice(0)}
                className={`
                  group relative flex w-full items-center gap-3
                  rounded-[24px] border-2 p-4 text-left
                  transition-all duration-200
                  active:scale-[0.97]
                  ${
                    isPlayerOne
                      ? 'border-[#ff4d6d]/15 bg-[#fff9fa] hover:border-[#ff4d6d] hover:bg-[#fff1f4]'
                      : 'border-blue-100 bg-[#f8fbff] hover:border-blue-500 hover:bg-blue-50'
                  }
                `}
              >
                <span
                  className={`
                    flex h-11 w-11 flex-shrink-0 items-center justify-center
                    rounded-2xl text-xs font-black transition-all
                    ${
                      isPlayerOne
                        ? 'bg-white text-[#ff4d6d] shadow-sm group-hover:bg-[#ff4d6d] group-hover:text-white'
                        : 'bg-white text-blue-500 shadow-sm group-hover:bg-blue-500 group-hover:text-white'
                    }
                  `}
                >
                  {OPTION_LETTERS[0]}
                </span>

                <span className="flex-1 text-sm font-semibold leading-relaxed text-[#171717]">
                  {q.q1}
                </span>

                <span className="text-xl text-gray-300 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>

              {/* OR */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">
                  OR
                </span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              <button
                type="button"
                onClick={() => handleChoice(1)}
                className={`
                  group relative flex w-full items-center gap-3
                  rounded-[24px] border-2 p-4 text-left
                  transition-all duration-200
                  active:scale-[0.97]
                  ${
                    isPlayerOne
                      ? 'border-[#ff4d6d]/15 bg-[#fff9fa] hover:border-[#ff4d6d] hover:bg-[#fff1f4]'
                      : 'border-blue-100 bg-[#f8fbff] hover:border-blue-500 hover:bg-blue-50'
                  }
                `}
              >
                <span
                  className={`
                    flex h-11 w-11 flex-shrink-0 items-center justify-center
                    rounded-2xl text-xs font-black transition-all
                    ${
                      isPlayerOne
                        ? 'bg-white text-[#ff4d6d] shadow-sm group-hover:bg-[#ff4d6d] group-hover:text-white'
                        : 'bg-white text-blue-500 shadow-sm group-hover:bg-blue-500 group-hover:text-white'
                    }
                  `}
                >
                  {OPTION_LETTERS[1]}
                </span>

                <span className="flex-1 text-sm font-semibold leading-relaxed text-[#171717]">
                  {q.q2}
                </span>

                <span className="text-xl text-gray-300 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom hint */}
        <div className="mt-5 rounded-2xl bg-white/60 p-3 text-center">
          <p className="text-[10px] font-medium leading-relaxed text-gray-400">
            {isPlayerOne
              ? '🔐 Your choices will be hidden from your partner.'
              : `👀 Don't overthink it — guess what ${p1Name} would choose!`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WouldYouRather;