import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../App';

// =========================================================
// SOFT QUESTIONS
// =========================================================
const truthsSoft = [
  "When did you first know you liked me?",
  "What's your favorite memory of us?",
  "What do you admire most about me?",
  "What song reminds you of me?",
  "What's a secret you've never told me?",
  "What's the first thing you noticed about me?",
  "What's your favorite thing I do for you?",
  "What's a small thing I do that makes you happy?",
  "What's your dream date with me?",
  "What's something you want to do together?",
  "What's your favorite outfit of mine?",
  "What's something you learned from me?",
  "What's a place you want to travel with me?",
  "What's your favorite thing we do together?",
  "What's a funny memory of us?",
  "What's something you love about my personality?",
  "What's a goal you have for us?",
  "What's your favorite date we've had?",
  "What's something you appreciate about me?",
  "What's a tradition you want to start with me?",
  "What's your favorite quality about how I treat you?",
  "What's your favorite pet name I call you?",
  "What is the nicest compliment you've ever received from me?",
  "What's your favorite childhood memory you want to share with me?",
  "What's your favorite season to spend with me and why?",
  "What dish reminds you of me?",
  "What's your biggest dream for us?",
  "What's a movie you want to watch with me this weekend?",
  "What's the funniest text I've ever sent you?",
  "What is your favorite smell on me?",
  "What is your favorite word I say?",
  "What's your favorite smile of mine?",
  "If you could describe our relationship in one word, what would it be?",
  "What's your favorite thing about our hugs?",
  "What's your favorite holiday memory with me?",
];

const daresSoft = [
  "Send me your cutest selfie right now",
  "Let me post 'I love you' on your status",
  "Do a silly dance for 10 seconds",
  "Sing your favorite song to me",
  "Tell me a joke in a funny accent",
  "Do 10 push-ups while saying my name",
  "Send a voice note with a compliment",
  "Let me take a silly photo of you",
  "Do your best impression of me",
  "Say 'I love you' in 3 different languages",
  "Make a funny face for 5 seconds",
  "Tell me a secret you've never told anyone",
  "Give me a foot massage for 1 minute",
  "Do a dramatic reading of a love poem",
  "Send a 'good morning' text with 5 emojis",
  "Make a paper heart and give it to me",
  "Do a cartwheel or a silly jump",
  "Tell me 3 things you love about me right now",
  "Send a voice note with a kiss sound",
  "Write my name on your hand and show me",
  "Serenade me with a love song for 10 seconds",
  "Let me draw a heart on your cheek",
  "Do 20 jumping jacks while telling me about your day",
  "Give me a high-five for 30 seconds",
  "Let me choose your outfit for tomorrow",
  "Speak in a British accent until your next turn",
  "Do an impression of a cat trying to seduce me",
  "Let me tickle you for 10 seconds",
  "Send me a picture of your favorite thing in the room",
  "Tell me a childhood story",
  "Do the robot dance for 15 seconds",
  "Send me a voice note of you saying 'I love you' in a whisper",
  "Let me style your hair or beard",
  "Say 'I miss you' in a super dramatic voice",
  "Compliment my eyes without blinking",
];

// =========================================================
// SPICY QUESTIONS
// =========================================================
const truthsSpicy = [
  "Where is the most unexpected place you want to kiss me?",
  "What's your favorite body part of mine and why?",
  "What's your wildest fantasy involving us?",
  "What is the most attractive thing I do without realizing it?",
  "What's something you want to try with me in the bedroom?",
  "What has been your favorite kiss we've ever had?",
  "What's a spot on my body that turns you on the most?",
  "If we were alone on a beach at sunset, what would you do?",
  "When did you realize you were fully physically attracted to me?",
  "What is the sexiest outfit I own?",
  "What is your favorite physical feature of mine?",
  "What's your favorite thing about my touch?",
  "What is the most romantic thing I've ever done for you?",
  "Where would your ultimate 'quickie' location be?",
  "What is your favorite thing about our kisses?",
  "What's the most attractive sound I make?",
  "What's the most adventurous thing you want to do with me?",
  "What is your favorite memory of holding me?",
  "What is the sexiest text you've ever sent or received from me?",
  "What part of my personality turns you on the most?",
  "What is your favorite non-intimate activity that gets you in the mood?",
  "If we were in a movie, what's the steamy scene you'd want to play out?",
  "What's something you think about when I'm not around?",
  "What's your favorite way to wake me up?",
  "What's your favorite type of physical affection?",
  "What's a specific pose or angle you love seeing me in?",
  "What is the most intense feeling I've ever given you?",
  "What's a secret fantasy you've had about me?",
  "Do you prefer making out in the rain or under the stars?",
  "What's the most flirtatious thing you've ever done to get my attention?",
  "What's your favorite time of day to be with me?",
  "What outfit do you secretly wish I'd wear more often?",
  "What is the biggest turn-on in our relationship?",
  "Where is the first place you'd kiss me if we were suddenly celebrities?",
  "What's your favorite part of my voice?",
];

const daresSpicy = [
  "Kiss my neck for 10 seconds.",
  "Give me a sensual massage for 2 minutes.",
  "Send me a seductive voice note.",
  "Let me blindfold you for 5 minutes.",
  "Whisper your favorite fantasy in my ear.",
  "Do a slow, sexy dance for me.",
  "Send me a tasteful bathroom mirror selfie.",
  "Let me trace my fingers down your spine.",
  "Give me a passionate kiss for 15 seconds.",
  "Let me bite your ear softly.",
  "Tell me in detail what you want to do to me tonight.",
  "Let me kiss your stomach.",
  "Give me a lap dance for 1 minute.",
  "Take a sexy picture of yourself for me.",
  "Describe your dream outfit on me, in detail.",
  "Let me leave a hickey somewhere hidden.",
  "Let me whisper something dirty in your ear.",
  "Give me a 'massage' with your eyes closed.",
  "Let me kiss your hand for a full minute.",
  "Strip tease: remove one piece of clothing.",
  "Let me kiss your inner thigh.",
  "Give me a back massage while sitting on my lap.",
  "Send me a text describing your current mood, using only emojis.",
  "Let me bite your lip gently.",
  "Touch your forehead to mine and stare into my eyes for 30 seconds.",
  "Let me take a video of you saying 'I'm yours'.",
  "Give me a very slow, drawn-out hug.",
  "Let me hold your hips for 30 seconds.",
  "Kiss the back of my neck.",
  "Let me kiss your shoulder.",
  "Whisper 'I need you' in my ear.",
  "Let me trace your jawline with my finger.",
  "Give me a kiss on my collarbone.",
  "Let me pick the next song to set the mood.",
  "Let me guide your hand to my waist.",
];

// =========================================================
// CRAZY QUESTIONS
// =========================================================
const truthsCrazy = [
  "What's your favorite thing about my body during intimate moments?",
  "What's your favorite sexual memory of us?",
  "Where is the most adventurous place you want to make love to me?",
  "What's your biggest turn-on that I do?",
  "What is something new you want to experiment with?",
  "What was your first impression of me in bed?",
  "What's the dirtiest thought you've ever had about me?",
  "What's the most daring thing you want to try?",
  "What's your favorite position and why?",
  "What are your biggest boundaries or hard limits?",
  "What part of my body do you fantasize about the most?",
  "Have you ever had a dream about us that was a bit too graphic?",
  "What's the spiciest thing I've ever said to you?",
  "Where is a place you'd love to get caught?",
  "What's the most extreme thing you've ever done?",
  "What's your favorite part of our sexual chemistry?",
  "What's a specific dirty phrase that drives you wild?",
  "What kind of roleplay do you secretly wish I would try?",
  "Would you ever want to watch me do something revealing online?",
  "What's your favorite fantasy involving a public place?",
  "What is the longest you've ever gone thinking about me in that way?",
  "What is your favorite part of my scent when we are close?",
  "Are there any toys you want to introduce to our bedroom?",
  "What is the most intense orgasm you've had with me?",
  "What's something you want me to do to you that I've never done?",
  "What is the most forbidden thing you want to do with me?",
  "What's your favorite memory of my hands on you?",
  "Do you prefer making love in the morning or at night? Why?",
  "What's the spiciest photo you've ever taken for me?",
  "What is a specific position you'd love to try in a mirror?",
  "What is your favorite sound I make when you're pleasing me?",
  "Have you ever thought about a threesome?",
  "What's the naughtiest thing you've ever done in a car?",
  "If you had to pick a random place for us to hook up, where would it be?",
  "What is the one thing you've been too shy to ask me to do?",
];

const daresCrazy = [
  "Take off one piece of clothing.",
  "Let me pick a toy or accessory for you to use.",
  "Send me a sensual video of you.",
  "Give me a lap dance.",
  "Write a short erotic story about us and read it to me.",
  "Let me draw on your body and kiss it off.",
  "Tell me your dirtiest secret right now.",
  "Let me tie you up for a few minutes.",
  "Let me shower you with kisses from head to toe.",
  "Let me bite your lip and hold it for 10 seconds.",
  "Show me your favorite pose.",
  "Let me blindfold you and tease you for a minute.",
  "Give me a very intense kiss.",
  "Let me whisper the dirtiest thing I can think of in your ear.",
  "Let me put whipped cream on you and eat it off.",
  "Send me a voice note of you moaning my name.",
  "Give me a foot massage using your tongue.",
  "Let me take a very risqué photo of you.",
  "Let me kiss your inner thigh for 30 seconds.",
  "Do a slow strip tease while looking into my eyes.",
  "Let me kiss your stomach and go lower for 20 seconds.",
  "Let me put ice on you and kiss it off.",
  "Give me an erotic massage for 5 minutes.",
  "Let me guide your hand down my body.",
  "Let me kiss your neck until I leave a mark.",
  "Show me your favorite position right now (just pose).",
  "Let me undress you slowly.",
  "Let me bite your ear for 10 seconds.",
  "Tell me your most taboo desire out loud.",
  "Let me pin you against the wall and kiss you.",
  "Give me a 1-minute hot and heavy make-out session.",
  "Let me touch you anywhere I want for 30 seconds.",
  "Send me a dirty text message right now.",
  "Let me kiss the back of your knees.",
  "Let me take full control for 2 minutes.",
];

// =========================================================
// MODE CONFIG
// =========================================================
const MODES = {
  soft: {
    label: 'Soft',
    emoji: '😊',
    subtitle: 'Cute & romantic',
    description: 'Sweet questions and playful dares',
    accent: 'pink',
  },
  spicy: {
    label: 'Spicy',
    emoji: '🌶️',
    subtitle: 'Flirty & intimate',
    description: 'Turn up the chemistry',
    accent: 'red',
  },
  crazy: {
    label: 'Crazy',
    emoji: '🔥',
    subtitle: 'For very comfortable couples',
    description: 'Only when you both feel ready',
    accent: 'purple',
  },
};

const TruthOrDare = () => {
  const { vibrate } = useApp();

  const [difficulty, setDifficulty] = useState('soft');
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [type, setType] = useState('');
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const timerRef = useRef(null);
  const spinTimeoutRef = useRef(null);
  const resultTimeoutRef = useRef(null);

  // Clean up timers when page unmounts.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
      if (resultTimeoutRef.current) clearTimeout(resultTimeoutRef.current);
    };
  }, []);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setTimerActive(false);
  };

  const clearRoundTimeouts = () => {
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
      spinTimeoutRef.current = null;
    }

    if (resultTimeoutRef.current) {
      clearTimeout(resultTimeoutRef.current);
      resultTimeoutRef.current = null;
    }
  };

  const getCurrentLists = () => {
    switch (difficulty) {
      case 'spicy':
        return {
          truths: truthsSpicy,
          dares: daresSpicy,
        };

      case 'crazy':
        return {
          truths: truthsCrazy,
          dares: daresCrazy,
        };

      case 'soft':
      default:
        return {
          truths: truthsSoft,
          dares: daresSoft,
        };
    }
  };

  const startDareTimer = () => {
    clearTimer();

    let count = 30;
    setTimer(count);
    setTimerActive(true);

    timerRef.current = setInterval(() => {
      count -= 1;
      setTimer(count);

      if (count <= 0) {
        clearTimer();
        vibrate(40);
      }
    }, 1000);
  };

  const spinBottle = () => {
    if (spinning) return;

    clearTimer();
    clearRoundTimeouts();

    vibrate(50);

    setSpinning(true);
    setResult(null);
    setType('');
    setTimer(0);

    const { truths, dares } = getCurrentLists();

    const isTruth = Math.random() < 0.5;
    const list = isTruth ? truths : dares;
    const item = list[Math.floor(Math.random() * list.length)];

    const spins = 5 + Math.floor(Math.random() * 5);
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + randomAngle;

    spinTimeoutRef.current = setTimeout(() => {
      setRotation(totalRotation);
    }, 60);

    resultTimeoutRef.current = setTimeout(() => {
      setType(isTruth ? 'Truth' : 'Dare');
      setResult(item);
      setSpinning(false);

      if (!isTruth) {
        startDareTimer();
      }

      vibrate(30);
    }, 2100);
  };

  const nextRound = () => {
    clearTimer();
    clearRoundTimeouts();

    setResult(null);
    setType('');
    setTimer(0);

    vibrate(30);
  };

  const skipDare = () => {
    clearTimer();
    clearRoundTimeouts();

    setResult(null);
    setType('');
    setTimer(0);

    vibrate(30);
  };

  const changeDifficulty = (mode) => {
    if (spinning) return;

    clearTimer();
    clearRoundTimeouts();

    setDifficulty(mode);
    setResult(null);
    setType('');
    setTimer(0);

    vibrate(20);
  };

  const currentMode = MODES[difficulty];

  const getModeClasses = (mode) => {
    const isActive = difficulty === mode;

    if (!isActive) {
      return 'border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50';
    }

    if (mode === 'soft') {
      return 'border-[#ff4d6d]/20 bg-[#fff0f3] text-[#ff4d6d] shadow-[0_10px_30px_rgba(255,77,109,0.10)]';
    }

    if (mode === 'spicy') {
      return 'border-red-100 bg-red-50 text-red-500 shadow-[0_10px_30px_rgba(239,68,68,0.10)]';
    }

    return 'border-purple-100 bg-purple-50 text-purple-600 shadow-[0_10px_30px_rgba(147,51,234,0.10)]';
  };

  return (
    <div className="pb-6">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="pt-4">
        <div className="relative overflow-hidden rounded-[32px] bg-[#171717] p-6 text-white shadow-[0_24px_60px_rgba(23,23,23,0.18)]">
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#ff4d6d]/20 blur-2xl" />
          <div className="absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-pink-500/10 blur-2xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/80">
              <span>🍾</span>
              Couple's game
            </div>

            <h1 className="mt-4 font-playfair text-4xl font-bold leading-tight">
              Truth or Dare
            </h1>

            <p className="mt-2 max-w-[290px] text-sm leading-6 text-white/65">
              Spin the bottle, answer honestly, and make your next moment unforgettable.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/80">
                1 Phone
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/80">
                3 Levels
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/80">
                No Login
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MODE SELECTOR
      ====================================================== */}
      <section className="mt-7">
        <div className="section-label">
          Choose your vibe
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {Object.entries(MODES).map(([mode, config]) => (
            <button
              key={mode}
              type="button"
              disabled={spinning}
              onClick={() => changeDifficulty(mode)}
              className={`rounded-[22px] border p-3 text-left transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 ${getModeClasses(mode)}`}
              aria-pressed={difficulty === mode}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-xl">{config.emoji}</span>

                {difficulty === mode && (
                  <span className="text-[10px] font-black">✓</span>
                )}
              </div>

              <p className="mt-2 text-xs font-bold">
                {config.label}
              </p>

              <p className="mt-0.5 text-[9px] leading-4 opacity-70">
                {config.subtitle}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-[20px] bg-white/70 px-4 py-3 shadow-[0_10px_35px_rgba(31,20,24,0.05)]">
          <span className="text-lg">{currentMode.emoji}</span>

          <div className="min-w-0">
            <p className="text-xs font-bold text-[#171717]">
              {currentMode.label} mode
            </p>

            <p className="mt-0.5 text-[10px] leading-4 text-gray-400">
              {currentMode.description}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CRAZY WARNING
      ====================================================== */}
      {difficulty === 'crazy' && (
        <div className="mt-4 rounded-[22px] border border-purple-100 bg-purple-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-lg">
              🔥
            </div>

            <div>
              <p className="text-xs font-bold text-purple-700">
                Crazy mode
              </p>

              <p className="mt-1 text-[10px] leading-5 text-purple-600/80">
                Only play if you are both 18+ and fully comfortable.
                Either player can skip any challenge at any time.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          BOTTLE AREA
      ====================================================== */}
      <section className="mt-8">
        <div className="relative flex items-center justify-center">
          {/* Outer glow */}
          <div
            className={`absolute h-52 w-52 rounded-full blur-3xl transition-all duration-700 ${
              spinning
                ? 'bg-[#ff4d6d]/25 scale-110'
                : 'bg-[#ff4d6d]/10 scale-100'
            }`}
          />

          {/* Bottle stage */}
          <div className="relative flex h-56 w-56 items-center justify-center">
            {/* Decorative ring */}
            <div
              className={`absolute inset-2 rounded-full border border-[#ff4d6d]/10 transition-all duration-700 ${
                spinning ? 'scale-110 rotate-45' : 'scale-100'
              }`}
            />

            <div className="absolute inset-6 rounded-full border border-white bg-white/50 shadow-[inset_0_0_40px_rgba(255,77,109,0.05)]" />

            {/* Bottle */}
            <div
              className={`relative z-10 flex h-36 w-36 items-center justify-center rounded-full transition-shadow duration-500 ${
                spinning
                  ? 'shadow-[0_20px_60px_rgba(255,77,109,0.35)]'
                  : 'shadow-[0_15px_45px_rgba(255,77,109,0.16)]'
              }`}
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning
                  ? 'transform 2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  : 'none',
              }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#ff6b88] via-[#ff4d6d] to-[#f72f59]">
                <span className="text-[90px] leading-none drop-shadow-[0_8px_12px_rgba(0,0,0,0.16)]">
                  🍾
                </span>
              </div>
            </div>

            {/* Center sparkle */}
            <div className="absolute -right-1 top-10 z-20 text-xl">
              ✨
            </div>

            <div className="absolute -bottom-1 left-2 z-20 text-sm">
              💕
            </div>
          </div>
        </div>

        <div className="mt-2 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-300">
            {spinning ? 'The bottle is choosing...' : 'Ready when you are'}
          </p>
        </div>

        <button
          type="button"
          className={`mt-5 w-full rounded-full px-6 py-4 font-bold text-white transition-all duration-200 ${
            spinning
              ? 'cursor-not-allowed bg-gray-300 shadow-none'
              : 'bg-gradient-to-r from-[#ff4d6d] to-[#ff365c] shadow-[0_12px_35px_rgba(255,77,109,0.30)] hover:scale-[1.01] active:scale-[0.97]'
          }`}
          onClick={spinBottle}
          disabled={spinning}
        >
          <span className="flex items-center justify-center gap-2">
            <span className={spinning ? 'animate-spin' : ''}>
              {spinning ? '🌀' : '🍾'}
            </span>

            {spinning ? 'Spinning...' : 'Spin the Bottle'}
          </span>
        </button>
      </section>

      {/* =====================================================
          RESULT CARD
      ====================================================== */}
      {result && (
        <section className="mt-7">
          <div className="relative overflow-hidden rounded-[30px] border border-white bg-white p-5 shadow-[0_20px_60px_rgba(31,20,24,0.10)]">
            {/* Accent */}
            <div
              className={`absolute left-0 top-0 h-1.5 w-full ${
                type === 'Truth'
                  ? 'bg-gradient-to-r from-[#ff7b98] to-[#ff4d6d]'
                  : 'bg-gradient-to-r from-orange-400 to-red-500'
              }`}
            />

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm ${
                    type === 'Truth'
                      ? 'bg-[#fff0f3] text-[#ff4d6d]'
                      : 'bg-orange-50 text-orange-500'
                  }`}
                >
                  {type === 'Truth' ? '💭' : '🔥'}
                </span>

                <div>
                  <p
                    className={`text-[10px] font-bold uppercase tracking-[0.12em] ${
                      type === 'Truth'
                        ? 'text-[#ff4d6d]'
                        : 'text-orange-500'
                    }`}
                  >
                    {type}
                  </p>

                  <p className="text-[9px] font-medium text-gray-400">
                    Your challenge
                  </p>
                </div>
              </div>

              {type === 'Dare' && (
                <div
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${
                    timerActive
                      ? 'bg-red-50 text-red-500'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  ⏱ {timer}s
                </div>
              )}
            </div>

            <div className="mt-5 rounded-[22px] bg-[#fffaf9] p-5">
              <p className="text-[20px] font-bold leading-8 tracking-tight text-[#171717]">
                {result}
              </p>
            </div>

            {type === 'Dare' && timerActive && (
              <div className="mt-4">
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#ff4d6d] to-red-500 transition-all duration-1000"
                    style={{
                      width: `${(timer / 30) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <div className="mt-5">
              {type === 'Truth' ? (
                <button
                  type="button"
                  className="w-full rounded-full bg-[#171717] py-3.5 text-sm font-bold text-white transition-all active:scale-[0.98]"
                  onClick={nextRound}
                >
                  Next Question →
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="rounded-full bg-emerald-500 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(16,185,129,0.20)] transition-all active:scale-[0.97]"
                    onClick={nextRound}
                  >
                    ✅ Done
                  </button>

                  <button
                    type="button"
                    className="rounded-full bg-gray-100 py-3.5 text-sm font-bold text-gray-700 transition-all active:scale-[0.97]"
                    onClick={skipDare}
                  >
                    Skip
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="mt-3 text-center text-[10px] font-medium text-gray-300">
            No pressure. You can skip any challenge.
          </p>
        </section>
      )}

      {/* =====================================================
          EMPTY STATE / HOW TO PLAY
      ====================================================== */}
      {!result && !spinning && (
        <section className="mt-8">
          <div className="section-label">
            How it works
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="soft-card p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff0f3] text-lg">
                1
              </div>
              <p className="mt-3 text-[11px] font-bold text-[#171717]">
                Pick a vibe
              </p>
              <p className="mt-1 text-[9px] leading-4 text-gray-400">
                Soft, spicy or crazy
              </p>
            </div>

            <div className="soft-card p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-100 text-lg">
                2
              </div>
              <p className="mt-3 text-[11px] font-bold text-[#171717]">
                Spin
              </p>
              <p className="mt-1 text-[9px] leading-4 text-gray-400">
                Let fate decide
              </p>
            </div>

            <div className="soft-card p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-lg">
                3
              </div>
              <p className="mt-3 text-[11px] font-bold text-[#171717]">
                Play
              </p>
              <p className="mt-1 text-[9px] leading-4 text-gray-400">
                Answer or complete it
              </p>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          FOOT NOTE
      ====================================================== */}
      <div className="mt-8 text-center">
        <div className="mx-auto flex items-center justify-center gap-3 text-gray-200">
          <span className="h-px w-12 bg-gray-200" />
          <span className="text-sm">♥</span>
          <span className="h-px w-12 bg-gray-200" />
        </div>

        <p className="mt-3 text-[9px] font-medium text-gray-300">
          Made for playful moments, honest answers & memories together.
        </p>
      </div>
    </div>
  );
};

export default TruthOrDare;