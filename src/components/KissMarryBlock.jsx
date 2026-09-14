import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../App";
import confetti from "canvas-confetti";

// =========================================================
// CELEBRITY / CHARACTER POOL
// =========================================================
const allCelebrities = [
  { id: 0, name: "Your Ex" },
  { id: 1, name: "Brad Pitt" },
  { id: 2, name: "Your Best Friend" },
  { id: 3, name: "Megan Fox" },
  { id: 4, name: "The Rock" },
  { id: 5, name: "Rihanna" },
  { id: 6, name: "Drake" },
  { id: 7, name: "Your Crush" },
  { id: 8, name: "Kanye West" },
  { id: 9, name: "Beyoncé" },
  { id: 10, name: "A Random Stranger" },
  { id: 11, name: "Your Childhood Friend" },
  { id: 12, name: "Chris Hemsworth" },
  { id: 13, name: "Zendaya" },
  { id: 14, name: "Tom Holland" },
  { id: 15, name: "Your Boss" },
  { id: 16, name: "A Supermodel" },
  { id: 17, name: "The Mailman" },
  { id: 18, name: "Your Teacher" },
  { id: 19, name: "Your Neighbor" },
  { id: 20, name: "Leonardo DiCaprio" },
  { id: 21, name: "Jennifer Aniston" },
  { id: 22, name: "Harry Styles" },
  { id: 23, name: "Taylor Swift" },
  { id: 24, name: "Your Partner's Best Friend" },
  { id: 25, name: "Your Celebrity Look-Alike" },
  { id: 26, name: "Your First Kiss" },
  { id: 27, name: "A Famous Singer" },
  { id: 28, name: "A Famous Actor" },
  { id: 29, name: "Nicki Minaj" },
  { id: 30, name: "Chris Evans" },
  { id: 31, name: "Scarlett Johansson" },
  { id: 32, name: "Ryan Reynolds" },
  { id: 33, name: "Margot Robbie" },
  { id: 34, name: "Kim Kardashian" },
  { id: 35, name: "Elon Musk" },
  { id: 36, name: "Your Gym Trainer" },
  { id: 37, name: "Your Dentist" },
  { id: 38, name: "The Barista" },
  { id: 39, name: "Your High School Crush" },
  { id: 40, name: "Your College Professor" },
  { id: 41, name: "A Professional Athlete" },
  { id: 42, name: "Your Stylist" },
  { id: 43, name: "The Cashier" },
  { id: 44, name: "Your Ex's Best Friend" },
  { id: 45, name: "A Famous YouTuber" },
  { id: 46, name: "A TikTok Star" },
  { id: 47, name: "Your Doctor" },
  { id: 48, name: "The Hot Neighbor" },
  { id: 49, name: "Your Driving Instructor" },
  { id: 50, name: "Your Roommate" },
  { id: 51, name: "A Billionaire" },
  { id: 52, name: "Your Favorite Villain" },
  { id: 53, name: "A Celebrity Chef" },
  { id: 54, name: "Your Personal Trainer" },
  { id: 55, name: "A Famous Model" },
  { id: 56, name: "The Pizza Delivery Guy" },
  { id: 57, name: "Your Lawyer" },
  { id: 58, name: "Your Banker" },
  { id: 59, name: "Your Old Fling" },
  { id: 60, name: "A Secret Admirer" },
  { id: 61, name: "Your Partner's Ex" },
  { id: 62, name: "An Alien" },
  { id: 63, name: "A Vampire" },
  { id: 64, name: "A Werewolf" },
  { id: 65, name: "Prince Harry" },
  { id: 66, name: "Michael B. Jordan" },
  { id: 67, name: "Anya Taylor-Joy" },
  { id: 68, name: "David Beckham" },
  { id: 69, name: "Selena Gomez" },
  { id: 70, name: "Justin Bieber" },
  { id: 71, name: "Dua Lipa" },
  { id: 72, name: "Ryan Gosling" },
  { id: 73, name: "Emma Stone" },
  { id: 74, name: "A Kasi Legend" },
];

// =========================================================
// GAME CONFIG
// =========================================================
const ACTIONS = [
  {
    id: "kiss",
    label: "Kiss",
    emoji: "💋",
    activeClass:
      "border-pink-200 bg-pink-50 text-[#ff4d6d] shadow-[0_10px_25px_rgba(255,77,109,0.12)]",
    idleClass:
      "border-gray-100 bg-white text-gray-500 hover:border-pink-100 hover:bg-pink-50",
  },
  {
    id: "marry",
    label: "Marry",
    emoji: "💍",
    activeClass:
      "border-amber-200 bg-amber-50 text-amber-600 shadow-[0_10px_25px_rgba(245,158,11,0.12)]",
    idleClass:
      "border-gray-100 bg-white text-gray-500 hover:border-amber-100 hover:bg-amber-50",
  },
  {
    id: "block",
    label: "Block",
    emoji: "🚫",
    activeClass:
      "border-gray-300 bg-gray-900 text-white shadow-[0_10px_25px_rgba(23,23,23,0.15)]",
    idleClass:
      "border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50",
  },
];

const getRandomThree = () => {
  const shuffled = [...allCelebrities].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

const getAction = (actionId) =>
  ACTIONS.find((action) => action.id === actionId);

const getInitial = (name) => {
  const clean = name.trim();

  if (!clean) return "?";

  return clean.charAt(0).toUpperCase();
};

// =========================================================
// MAIN COMPONENT
// =========================================================
const KissMarryBlock = () => {
  const navigate = useNavigate();
  const { vibrate, share } = useApp();
  const [searchParams] = useSearchParams();

  const encodedData = searchParams.get("data");

  const [currentCelebrities, setCurrentCelebrities] = useState(getRandomThree);
  const [assignments, setAssignments] = useState({});
  const [locked, setLocked] = useState(false);
  const [compareData, setCompareData] = useState(null);
  const [copied, setCopied] = useState(false);

  // =======================================================
  // LOAD COMPARISON DATA
  // =======================================================
  useEffect(() => {
    if (!encodedData) {
      setCompareData(null);
      return;
    }

    try {
      const decoded = JSON.parse(
        decodeURIComponent(atob(encodedData))
      );

      if (!Array.isArray(decoded) || decoded.length === 0) {
        throw new Error("Invalid comparison data");
      }

      setCompareData(decoded);
    } catch (error) {
      alert("Invalid or corrupted comparison link!");
      navigate("/play/kmb", { replace: true });
    }
  }, [encodedData, navigate]);

  // =======================================================
  // HELPERS
  // =======================================================
  const getOrigin = () => window.location.origin;

  const getCompletedCount = () => Object.keys(assignments).length;

  const getProgress = () => (getCompletedCount() / 3) * 100;

  // =======================================================
  // SHUFFLE
  // =======================================================
  const handleShuffle = () => {
    if (locked) return;

    vibrate(30);
    setCurrentCelebrities(getRandomThree());
    setAssignments({});
    setCopied(false);
  };

  // =======================================================
  // ASSIGN ACTION
  // =======================================================
  const handleAssign = (celebId, action) => {
    if (locked) return;

    vibrate(25);

    const newAssignments = { ...assignments };

    // Each action can only be used once.
    for (const [key, value] of Object.entries(newAssignments)) {
      if (value === action) {
        delete newAssignments[key];
      }
    }

    // Clicking the same action again removes it.
    if (newAssignments[celebId] === action) {
      delete newAssignments[celebId];
    } else {
      newAssignments[celebId] = action;
    }

    setAssignments(newAssignments);
    setCopied(false);
  };

  // =======================================================
  // LOCK CHOICES
  // =======================================================
  const handleLock = () => {
    const actions = Object.values(assignments);

    const hasKiss = actions.includes("kiss");
    const hasMarry = actions.includes("marry");
    const hasBlock = actions.includes("block");

    if (!hasKiss || !hasMarry || !hasBlock) {
      vibrate(20);
      alert("Assign one Kiss 💋, one Marry 💍, and one Block 🚫");
      return;
    }

    vibrate(50);
    setLocked(true);

    confetti({
      particleCount: 140,
      spread: 75,
      origin: { y: 0.55 },
      useWorker: false,
    });
  };

  // =======================================================
  // SHARE
  // =======================================================
  const generateShareLink = () => {
    const dataToShare = currentCelebrities.map((celeb) => ({
      name: celeb.name,
      action: assignments[celeb.id] || null,
    }));

    const encoded = btoa(
      encodeURIComponent(JSON.stringify(dataToShare))
    );

    return `${getOrigin()}/play/kmb/compare?data=${encoded}`;
  };

  const handleShare = () => {
    const link = generateShareLink();

    const text =
      "💞 My Kiss, Marry, Block choices are locked!\n\n" +
      "Think you can guess who I kissed, married and blocked? " +
      "Open this and compare with me:\n\n" +
      link;

    share(text, link);
    setCopied(false);
  };

  // =======================================================
  // COPY
  // =======================================================
  const handleCopyLink = async () => {
    const link = generateShareLink();

    try {
      await navigator.clipboard.writeText(link);

      setCopied(true);
      vibrate(30);

      setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch {
      alert("Could not copy the link. Please use Share instead.");
    }
  };

  // =======================================================
  // RESET
  // =======================================================
  const resetGame = () => {
    setAssignments({});
    setLocked(false);
    setCopied(false);
    vibrate(30);
  };

  const startFreshGame = () => {
    setCurrentCelebrities(getRandomThree());
    setAssignments({});
    setLocked(false);
    setCopied(false);
    vibrate(30);
  };

  // =======================================================
  // COMPARISON VIEW
  // =======================================================
  if (encodedData && compareData) {
    return (
      <div className="pb-6">
        <section className="pt-4">
          <div className="relative overflow-hidden rounded-[32px] bg-[#171717] p-6 text-white shadow-[0_24px_60px_rgba(23,23,23,0.18)]">
            <div className="absolute -right-14 -top-12 h-36 w-36 rounded-full bg-[#ff4d6d]/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                💞
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
                Partner comparison
              </p>

              <h1 className="mt-2 font-playfair text-4xl font-bold leading-tight">
                They chose...
              </h1>

              <p className="mt-2 text-sm leading-6 text-white/60">
                Here are the choices your partner locked in.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="section-label">
            Their choices
          </div>

          <div className="mt-3 space-y-3">
            {compareData.map((item, index) => {
              const action = getAction(item.action);

              return (
                <div
                  key={`${item.name}-${index}`}
                  className="soft-card overflow-hidden p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fff0f3] to-white text-xl font-black text-[#ff4d6d]">
                      {getInitial(item.name)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#171717]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-[10px] font-medium text-gray-400">
                        Choice #{index + 1}
                      </p>
                    </div>

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        item.action === "kiss"
                          ? "bg-pink-50"
                          : item.action === "marry"
                          ? "bg-amber-50"
                          : item.action === "block"
                          ? "bg-gray-100"
                          : "bg-gray-50"
                      }`}
                    >
                      <span className="text-2xl">
                        {action?.emoji || "❓"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <p
                      className={`text-xs font-bold ${
                        item.action === "kiss"
                          ? "text-[#ff4d6d]"
                          : item.action === "marry"
                          ? "text-amber-600"
                          : item.action === "block"
                          ? "text-gray-700"
                          : "text-gray-400"
                      }`}
                    >
                      {action?.label || "Not assigned"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#ff4d6d]/10 bg-[#fff7f8] p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
              👀
            </div>

            <div>
              <p className="text-sm font-bold text-[#171717]">
                Now it’s your turn
              </p>

              <p className="mt-1 text-[10px] leading-5 text-gray-500">
                Make your own choices and see whether you two would pick the
                same people.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-5 space-y-3">
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate("/play/kmb")}
          >
            💋 Play Kiss Marry Block
          </button>

          <button
            type="button"
            className="w-full rounded-full bg-gray-100 py-3.5 text-sm font-bold text-[#171717] transition-all active:scale-[0.98]"
            onClick={() => navigate("/games")}
          >
            ← Back to Games
          </button>
        </div>
      </div>
    );
  }

  // =======================================================
  // MAIN GAME
  // =======================================================
  return (
    <div className="pb-6">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="pt-4">
        <div className="relative overflow-hidden rounded-[32px] bg-[#171717] p-6 text-white shadow-[0_24px_60px_rgba(23,23,23,0.18)]">
          <div className="absolute -right-14 -top-12 h-36 w-36 rounded-full bg-[#ff4d6d]/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
              💋 Couples game
            </div>

            <h1 className="mt-4 font-playfair text-4xl font-bold leading-tight">
              Kiss, Marry, Block
            </h1>

            <p className="mt-2 max-w-[290px] text-sm leading-6 text-white/60">
              Three choices. Three people. No escaping your decisions. 😈
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                3 People
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                1 Phone
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                Share & Compare
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROGRESS / HEADER
      ====================================================== */}
      <section className="mt-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="section-label">
              Make your choices
            </div>

            <p className="mt-2 text-xs font-medium text-gray-400">
              Assign one person to each category.
            </p>
          </div>

          <button
            type="button"
            disabled={locked}
            onClick={handleShuffle}
            className="shrink-0 rounded-full border border-gray-100 bg-white px-4 py-2.5 text-xs font-bold text-gray-600 shadow-sm transition-all active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
          >
            🎲 Shuffle
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-gray-400">
              {getCompletedCount()}/3 assigned
            </span>

            <span
              className={
                getCompletedCount() === 3
                  ? "text-emerald-500"
                  : "text-[#ff4d6d]"
              }
            >
              {getCompletedCount() === 3 ? "Ready to lock" : "Choose wisely"}
            </span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ff4d6d] via-[#ff6682] to-amber-400 transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          ACTION LEGEND
      ====================================================== */}
      <section className="mt-5 grid grid-cols-3 gap-2">
        {ACTIONS.map((action) => (
          <div
            key={action.id}
            className="rounded-2xl border border-gray-100 bg-white p-3 text-center"
          >
            <div className="text-xl">{action.emoji}</div>

            <p className="mt-1 text-[10px] font-bold text-[#171717]">
              {action.label}
            </p>
          </div>
        ))}
      </section>

      {/* =====================================================
          PEOPLE CARDS
      ====================================================== */}
      <section className="mt-5 space-y-3">
        {currentCelebrities.map((celeb, index) => {
          const selectedAction = assignments[celeb.id];

          return (
            <article
              key={celeb.id}
              className={`relative overflow-hidden rounded-[28px] border bg-white p-5 shadow-[0_16px_45px_rgba(31,20,24,0.07)] transition-all duration-200 ${
                selectedAction
                  ? "border-[#ff4d6d]/15"
                  : "border-white"
              }`}
            >
              {selectedAction && (
                <div
                  className={`absolute left-0 top-0 h-full w-1 ${
                    selectedAction === "kiss"
                      ? "bg-[#ff4d6d]"
                      : selectedAction === "marry"
                      ? "bg-amber-400"
                      : "bg-gray-800"
                  }`}
                />
              )}

              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] text-xl font-black text-white shadow-[0_12px_30px_rgba(255,77,109,0.18)] ${
                    selectedAction === "marry"
                      ? "bg-gradient-to-br from-amber-300 to-amber-500"
                      : selectedAction === "block"
                      ? "bg-gradient-to-br from-gray-700 to-gray-950"
                      : "bg-gradient-to-br from-[#ff7b98] to-[#ff365c]"
                  }`}
                >
                  {getInitial(celeb.name)}

                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-white text-xs shadow-sm">
                    {index + 1}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-base font-bold leading-5 text-[#171717]">
                    {celeb.name}
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-gray-400">
                    {selectedAction
                      ? `You've chosen ${getAction(selectedAction)?.label}`
                      : "Who gets the rose?"}
                  </p>
                </div>

                {selectedAction && (
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                      selectedAction === "kiss"
                        ? "bg-pink-50"
                        : selectedAction === "marry"
                        ? "bg-amber-50"
                        : "bg-gray-100"
                    }`}
                  >
                    <span className="text-xl">
                      {getAction(selectedAction)?.emoji}
                    </span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {ACTIONS.map((action) => {
                  const isSelected = selectedAction === action.id;

                  // Determine whether another person already has this action.
                  const actionTakenByOtherPerson = Object.entries(
                    assignments
                  ).some(
                    ([personId, assignedAction]) =>
                      assignedAction === action.id &&
                      String(personId) !== String(celeb.id)
                  );

                  return (
                    <button
                      key={action.id}
                      type="button"
                      disabled={
                        locked || (actionTakenByOtherPerson && !isSelected)
                      }
                      onClick={() => handleAssign(celeb.id, action.id)}
                      className={`rounded-2xl border px-2 py-3 transition-all duration-200 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40 ${
                        isSelected ? action.activeClass : action.idleClass
                      }`}
                    >
                      <span className="block text-base">
                        {action.emoji}
                      </span>

                      <span className="mt-1 block text-[9px] font-bold">
                        {action.label}
                      </span>

                      {isSelected && (
                        <span className="mt-0.5 block text-[8px] font-semibold opacity-70">
                          Selected
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>

      {/* =====================================================
          LOCK / SHARING
      ====================================================== */}
      {!locked ? (
        <section className="mt-5">
          <button
            type="button"
            className={`w-full rounded-full py-4 text-sm font-bold transition-all ${
              getCompletedCount() === 3
                ? "bg-gradient-to-r from-[#ff4d6d] to-[#ff365c] text-white shadow-[0_14px_35px_rgba(255,77,109,0.28)] active:scale-[0.98]"
                : "cursor-not-allowed bg-gray-200 text-gray-400"
            }`}
            onClick={handleLock}
            disabled={getCompletedCount() !== 3}
          >
            🔒 Lock My Choices
          </button>

          {getCompletedCount() !== 3 && (
            <p className="mt-2 text-center text-[9px] font-medium text-gray-300">
              Pick one Kiss, one Marry and one Block first.
            </p>
          )}
        </section>
      ) : (
        <section className="mt-5">
          {/* Success panel */}
          <div className="relative overflow-hidden rounded-[30px] border border-emerald-100 bg-emerald-50 p-5">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-200/30 blur-2xl" />

            <div className="relative flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                ✅
              </div>

              <div>
                <p className="text-sm font-bold text-emerald-700">
                  Your choices are locked!
                </p>

                <p className="mt-1 text-[10px] leading-5 text-emerald-700/70">
                  Send your choices to your partner and see whether they agree
                  with you.
                </p>
              </div>
            </div>
          </div>

          {/* Chosen summary */}
          <div className="mt-3 rounded-[28px] bg-white p-4 shadow-[0_12px_35px_rgba(31,20,24,0.06)]">
            <div className="grid grid-cols-3 gap-2">
              {ACTIONS.map((action) => {
                const assignedPersonId = Object.keys(assignments).find(
                  (id) => assignments[id] === action.id
                );

                const assignedPerson = currentCelebrities.find(
                  (person) => String(person.id) === String(assignedPersonId)
                );

                return (
                  <div
                    key={action.id}
                    className="rounded-2xl bg-gray-50 p-3 text-center"
                  >
                    <div className="text-lg">{action.emoji}</div>

                    <p className="mt-1 text-[9px] font-bold uppercase tracking-wide text-gray-400">
                      {action.label}
                    </p>

                    <p className="mt-1 truncate text-[10px] font-bold text-[#171717]">
                      {assignedPerson?.name || "—"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-3 space-y-3">
            <button
              type="button"
              className="btn-primary"
              onClick={handleShare}
            >
              📤 Share My Choices
            </button>

            <button
              type="button"
              className="w-full rounded-full bg-white py-3.5 text-sm font-bold text-[#171717] shadow-[0_10px_25px_rgba(31,20,24,0.07)] transition-all active:scale-[0.98]"
              onClick={handleCopyLink}
            >
              {copied ? "✅ Link Copied!" : "🔗 Copy Comparison Link"}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="rounded-full bg-gray-100 py-3.5 text-sm font-bold text-[#171717] transition-all active:scale-[0.98]"
                onClick={resetGame}
              >
                🔄 Same People
              </button>

              <button
                type="button"
                className="rounded-full bg-gray-100 py-3.5 text-sm font-bold text-[#171717] transition-all active:scale-[0.98]"
                onClick={startFreshGame}
              >
                🎲 New People
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          HOW TO PLAY
      ====================================================== */}
      <section className="mt-8">
        <div className="section-label">
          How it works
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="soft-card p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-50 text-lg">
              💋
            </div>

            <p className="mt-3 text-[10px] font-bold text-[#171717]">
              Pick
            </p>

            <p className="mt-1 text-[9px] leading-4 text-gray-400">
              Choose one person for each role.
            </p>
          </div>

          <div className="soft-card p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-lg">
              🔒
            </div>

            <p className="mt-3 text-[10px] font-bold text-[#171717]">
              Lock
            </p>

            <p className="mt-1 text-[9px] leading-4 text-gray-400">
              Your choices become final.
            </p>
          </div>

          <div className="soft-card p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-100 text-lg">
              💞
            </div>

            <p className="mt-3 text-[10px] font-bold text-[#171717]">
              Compare
            </p>

            <p className="mt-1 text-[9px] leading-4 text-gray-400">
              Send the link and see theirs.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <div className="mt-8 text-center">
        <div className="mx-auto flex items-center justify-center gap-3 text-gray-200">
          <span className="h-px w-12 bg-gray-200" />
          <span className="text-sm">♥</span>
          <span className="h-px w-12 bg-gray-200" />
        </div>

        <p className="mt-3 text-[9px] font-medium text-gray-300">
          Make your choice. Lock it. See what your person thinks. 😏
        </p>
      </div>
    </div>
  );
};

export default KissMarryBlock;