import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../App";
import confetti from "canvas-confetti";

// Massive pool of 75 celebrities and fun characters!
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

// Helper function to get 3 random unique celebrities
const getRandomThree = () => {
  const shuffled = [...allCelebrities].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

const KissMarryBlock = () => {
  const navigate = useNavigate();
  const { vibrate, share } = useApp();
  const [searchParams] = useSearchParams();
  const compareId = searchParams.get("compare");

  // State for the current 3 celebrities
  const [currentCelebrities, setCurrentCelebrities] = useState(getRandomThree);
  const [assignments, setAssignments] = useState({});
  const [locked, setLocked] = useState(false);
  const [compareData, setCompareData] = useState(null);

  // Load comparison if present
  useEffect(() => {
    if (compareId) {
      const data = loadFromLocal(`kmb_${compareId}`);
      if (!data) {
        alert("Comparison not found!");
        navigate("/play/kmb");
        return;
      }
      setCompareData(data);
    }
  }, [compareId, navigate]);

  const saveToLocal = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {}
  };
  const loadFromLocal = (key) => {
    try {
      const d = localStorage.getItem(key);
      return d ? JSON.parse(d) : null;
    } catch {
      return null;
    }
  };
  const generateId = () =>
    Date.now() + "_" + Math.random().toString(36).slice(2, 6);
  const getOrigin = () => window.location.origin;

  // Shuffle to get a new set of 3 celebrities
  const handleShuffle = () => {
    vibrate(30);
    setCurrentCelebrities(getRandomThree());
    setAssignments({});
    setLocked(false);
  };

  const handleAssign = (celebId, action) => {
    if (locked) return;
    vibrate(30);
    const newAssign = { ...assignments };
    for (const [k, v] of Object.entries(newAssign)) {
      if (v === action) delete newAssign[k];
    }
    if (newAssign[celebId] === action) {
      delete newAssign[celebId];
    } else {
      newAssign[celebId] = action;
    }
    setAssignments(newAssign);
  };

  const getActionEmoji = (celebId) => {
    const a = assignments[celebId];
    if (a === "kiss") return "💋";
    if (a === "marry") return "💍";
    if (a === "block") return "🚫";
    return null;
  };

  const handleLock = () => {
    const actions = Object.values(assignments);
    const hasKiss = actions.includes("kiss");
    const hasMarry = actions.includes("marry");
    const hasBlock = actions.includes("block");
    if (!hasKiss || !hasMarry || !hasBlock) {
      alert("Assign one Kiss 💋, one Marry 💍, and one Block 🚫");
      return;
    }
    vibrate(50);
    setLocked(true);
    confetti({ particleCount: 100, spread: 60, origin: { y: 0.5 } });
  };

  const handleShare = () => {
    const id = generateId();

    const dataToShare = currentCelebrities.map((celeb) => ({
      name: celeb.name,
      action: assignments[celeb.id] || null,
    }));

    saveToLocal(`kmb_${id}`, dataToShare);

    const link = `${getOrigin()}/play/kmb/compare?compare=${id}`;
    const text = `My KMB choices are locked! Compare with me: ${link}`;
    share(text, link);
  };

  const resetGame = () => {
    setAssignments({});
    setLocked(false);
    vibrate(30);
  };

  // Comparison view
  if (compareId && compareData) {
    const emojis = { kiss: "💋", marry: "💍", block: "🚫" };
    return (
      <div className="pb-4">
        <div className="mt-4 text-center">
          <span className="text-6xl">💞</span>
          <h2 className="font-playfair text-2xl font-bold mt-2">
            Compare Choices
          </h2>
          <div className="mt-4 space-y-3">
            {compareData.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between"
              >
                <span>{item.name}</span>
                <span className="text-2xl">{emojis[item.action] || "❓"}</span>
              </div>
            ))}
          </div>
          <button
            className="btn-secondary mt-6"
            onClick={() => navigate("/play/kmb")}
          >
            ↩️ Back to Game
          </button>
        </div>
      </div>
    );
  }

  // Main game
  return (
    <div className="pb-4">
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-playfair text-2xl font-bold">
              Kiss Marry Block
            </h2>
            <p className="text-gray-600 text-sm">Assign one 💋 one 💍 one 🚫</p>
          </div>
          <button
            className="bg-gray-100 text-black px-3 py-2 rounded-full text-sm font-semibold shadow-sm"
            onClick={handleShuffle}
          >
            🎲 Shuffle
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          {currentCelebrities.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-[24px] p-4 shadow-md text-center"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-pink to-red flex items-center justify-center text-5xl font-bold text-white shadow-lg">
                {c.name.charAt(0)}
              </div>
              <p className="font-bold mt-3 text-lg">{c.name}</p>
              <div className="flex gap-2 mt-3 justify-center flex-wrap">
                <button
                  className="bg-pink text-white px-4 py-1 rounded-full text-xs font-semibold"
                  onClick={() => handleAssign(c.id, "kiss")}
                  disabled={locked}
                >
                  💋 Kiss
                </button>
                <button
                  className="bg-gold text-white px-4 py-1 rounded-full text-xs font-semibold"
                  onClick={() => handleAssign(c.id, "marry")}
                  disabled={locked}
                >
                  💍 Marry
                </button>
                <button
                  className="bg-black text-white px-4 py-1 rounded-full text-xs font-semibold"
                  onClick={() => handleAssign(c.id, "block")}
                  disabled={locked}
                >
                  🚫 Block
                </button>
              </div>
              {getActionEmoji(c.id) && (
                <div className="text-3xl mt-2">
                  {getActionEmoji(c.id)} {assignments[c.id]}
                </div>
              )}
            </div>
          ))}
        </div>

        {!locked ? (
          <button className="btn-primary mt-4" onClick={handleLock}>
            🔒 Lock Choices
          </button>
        ) : (
          <div className="mt-4 text-center">
            <p className="text-lg font-bold text-green-600">
              ✅ Choices Locked!
            </p>
            <p className="text-sm text-gray-600">
              Send to your partner to compare 😉
            </p>
            <div className="mt-3 flex flex-col gap-3">
              <button className="btn-primary" onClick={handleShare}>
                📤 Share Link
              </button>
              <button className="btn-secondary" onClick={resetGame}>
                🔄 Play Again
              </button>
              <button
                className="bg-gray-100 text-black py-3 rounded-full font-semibold text-sm"
                onClick={handleShuffle}
              >
                🎲 Shuffle New People
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KissMarryBlock;
