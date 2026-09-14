import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const games = [
  {
    id: 'knowme',
    title: 'Know Me Quiz',
    emoji: '🧠',
    tag: '2 Phones',
    desc: 'Create questions and discover how well your person really knows you.',
    path: '/create',
    featured: true,
  },
  {
    id: 'wyr',
    title: 'Would You Rather',
    emoji: '🤔',
    tag: '2 Phones',
    desc: 'Make impossible choices and compare your answers.',
    path: '/play/wyr',
  },
  {
    id: 'tod',
    title: 'Truth or Dare',
    emoji: '🍾',
    tag: '1 Phone',
    desc: 'Get honest, get daring, and make things interesting.',
    path: '/play/tod',
  },
  {
    id: 'calculator',
    title: 'Love Calculator',
    emoji: '💕',
    tag: '1 Phone',
    desc: 'Put your names in and see what the love meter says.',
    path: '/play/calculator',
  },
  {
    id: 'kmb',
    title: 'Kiss Marry Block',
    emoji: '💋',
    tag: '2 Phones',
    desc: 'Make your choices and see if your answers match.',
    path: '/play/kmb',
  },
  {
    id: 'slideshow',
    title: 'Memory Slideshow',
    emoji: '📸',
    tag: '1 Phone',
    desc: 'Turn your favourite memories into something romantic.',
    path: '/play/slideshow',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { vibrate } = useApp();

  const handleGameClick = (path) => {
    vibrate(50);
    navigate(path);
  };

  return (
    <main className="relative overflow-hidden pb-10">

      {/* Decorative background hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[5%] top-24 text-2xl opacity-20 rotate-[-15deg]">
          ♡
        </span>

        <span className="absolute right-[8%] top-40 text-4xl opacity-15 rotate-[20deg]">
          ♥
        </span>

        <span className="absolute left-[12%] top-[55%] text-3xl opacity-10">
          ♡
        </span>

        <span className="absolute right-[10%] top-[70%] text-5xl opacity-10">
          ♥
        </span>
      </div>

      {/* HERO */}
      <section className="relative pt-8 pb-8 text-center">

        {/* Small badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-4 py-2 text-xs font-semibold text-pink-600 shadow-sm backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-pink-500" />
          Made for two
          <span>❤️</span>
        </div>

        {/* Main heading */}
        <h1 className="font-playfair mt-5 text-5xl font-bold leading-[0.98] tracking-tight text-gray-900 sm:text-6xl">
          Love is better
          <br />
          <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent">
            when you play.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-md px-4 text-sm leading-6 text-gray-600 sm:text-base">
          Fun little games for you and your favourite person.
          Laugh, flirt, compete and discover something new about each other.
        </p>

        {/* CTA */}
        <div className="mt-7 flex flex-col items-center gap-3">
          <button
            className="btn-primary group flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 text-base font-bold shadow-lg transition-transform active:scale-95"
            onClick={() => {
              vibrate(50);
              navigate('/create');
            }}
          >
            Start Playing
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

          <p className="text-[11px] text-gray-500">
            No account • No download • Just you two
          </p>
        </div>

        {/* Mini social proof */}
        <div className="mt-7 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-pink-100 text-sm">
              🥰
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-purple-100 text-sm">
              😍
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-red-100 text-sm">
              💕
            </span>
          </div>

          <p className="text-xs font-medium text-gray-500">
            Better together.
          </p>
        </div>
      </section>

      {/* GAME SECTION */}
      <section className="relative mt-4">

        <div className="mb-5 flex items-end justify-between px-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-500">
              Pick your vibe
            </p>

            <h2 className="font-playfair mt-1 text-2xl font-bold text-gray-900">
              Choose a game
            </h2>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-500">
            {games.length} games
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">

          {games.map((game) => (
            <article
              key={game.id}
              onClick={() => handleGameClick(game.path)}
              className={`
                group relative cursor-pointer overflow-hidden rounded-[24px]
                border border-white/70 bg-white/80 p-4
                shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                backdrop-blur-xl transition-all duration-200
                hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.10)]
                active:scale-[0.98]
                ${game.featured ? 'col-span-2' : ''}
              `}
            >

              {/* Featured glow */}
              {game.featured && (
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-pink-200/40 blur-2xl" />
              )}

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div
                    className={`
                      flex items-center justify-center rounded-2xl
                      bg-gradient-to-br from-pink-50 to-rose-100
                      shadow-sm
                      ${game.featured ? 'h-16 w-16 text-4xl' : 'h-12 w-12 text-3xl'}
                    `}
                  >
                    {game.emoji}
                  </div>

                  {game.featured && (
                    <span className="rounded-full bg-gray-900 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
                      Popular
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <h3
                    className={`
                      font-bold leading-tight text-gray-900
                      ${game.featured ? 'text-xl' : 'text-base'}
                    `}
                  >
                    {game.title}
                  </h3>

                  <p
                    className={`
                      mt-1.5 leading-5 text-gray-500
                      ${game.featured ? 'max-w-md text-sm' : 'text-[11px]'}
                    `}
                  >
                    {game.desc}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">

                  <span className="pill-tag">
                    {game.tag}
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm text-white transition-transform group-hover:translate-x-1">
                    →
                  </span>

                </div>

              </div>
            </article>
          ))}

        </div>
      </section>

      {/* ROMANTIC BANNER */}
      <section className="relative mt-8 overflow-hidden rounded-[30px] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-6 text-white shadow-xl">

        <div className="absolute -right-8 -top-8 text-8xl opacity-10">
          ❤️
        </div>

        <div className="absolute -bottom-10 -left-8 text-8xl opacity-5">
          💕
        </div>

        <div className="relative">
          <span className="text-3xl">💌</span>

          <h3 className="font-playfair mt-3 text-2xl font-bold">
            Make ordinary moments
            <br />
            a little more special.
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-5 text-gray-300">
            Whether you're miles apart or lying next to each other,
            Lovers Play gives you something fun to do together.
          </p>

          <button
            onClick={() => {
              vibrate(50);
              navigate('/create');
            }}
            className="mt-5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-900 transition-transform active:scale-95"
          >
            Play together ❤️
          </button>
        </div>
      </section>

      {/* WHY LOVERS PLAY */}
      <section className="mt-8">

        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-500">
            Simple by design
          </p>

          <h2 className="font-playfair mt-1 text-2xl font-bold text-gray-900">
            Made for your moments
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">

          <div className="rounded-[22px] bg-white/70 p-4 text-center shadow-sm">
            <span className="text-3xl">🚀</span>
            <p className="mt-2 text-[11px] font-bold leading-4 text-gray-800">
              No Login
              <br />
              Needed
            </p>
          </div>

          <div className="rounded-[22px] bg-white/70 p-4 text-center shadow-sm">
            <span className="text-3xl">📱</span>
            <p className="mt-2 text-[11px] font-bold leading-4 text-gray-800">
              Share on
              <br />
              WhatsApp
            </p>
          </div>

          <div className="rounded-[22px] bg-white/70 p-4 text-center shadow-sm">
            <span className="text-3xl">🔒</span>
            <p className="mt-2 text-[11px] font-bold leading-4 text-gray-800">
              Private
              <br />
              by Design
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-10 text-center">

        <div className="mx-auto mb-3 h-px w-16 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />

        <p className="font-playfair text-sm font-semibold text-gray-500">
          Made with ❤️ for couples
        </p>

        <p className="mt-1 text-[10px] text-gray-400">
          Lovers Play • Play together, wherever you are.
        </p>

      </footer>

    </main>
  );
};

export default Home;

