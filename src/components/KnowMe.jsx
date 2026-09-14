import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../App';
import confetti from 'canvas-confetti';

const KnowMe = () => {
  const navigate = useNavigate();
  const { vibrate, share } = useApp();
  const [searchParams] = useSearchParams();
  
  // Get both the ID (for the creator) and the encoded data (for the partner)
  const id = searchParams.get('id');
  const encodedData = searchParams.get('data');
  const from = searchParams.get('from') || 'Partner';

  // States for create mode
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState([
    { q: 'My fav food?', options: ['Pizza', 'Burgers', 'Sushi', 'Pap & Meat'] },
    { q: 'My go-to drink?', options: ['Coffee', 'Tea', 'Juice', 'Water'] },
    { q: 'My dream vacation?', options: ['Beach', 'Mountains', 'City', 'Safari'] },
    { q: 'My love language?', options: ['Words', 'Touch', 'Gifts', 'Time'] },
    { q: 'My pet name?', options: ['Babe', 'Love', 'Sweetie', 'Boo'] },
  ]);
  const [createdId, setCreatedId] = useState(null);
  const [link, setLink] = useState('');

  // States for play mode
  const [quizData, setQuizData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  // Load quiz if id or encodedData is present
  useEffect(() => {
    if (encodedData) {
      // PLAYER MODE: Decode the data directly from the URL
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(encodedData)));
        setQuizData(decoded);
        setAnswers(new Array(decoded.questions.length).fill(-1));
      } catch (err) {
        alert('Invalid quiz link!');
        navigate('/');
      }
    } else if (id) {
      // CREATOR MODE: Load from local storage (for the person who made it)
      const data = loadFromLocal(`lovers_quiz_${id}`);
      if (!data) {
        alert('Quiz not found! If you are the creator, please recreate it on this device.');
        navigate('/');
        return;
      }
      setQuizData(data);
      setAnswers(new Array(data.questions.length).fill(-1));
    }
  }, [id, encodedData, navigate]);

  // Helpers
  const generateId = () => Date.now() + '_' + Math.random().toString(36).slice(2, 6);
  const getOrigin = () => window.location.origin;
  const saveToLocal = (key, data) => { try { localStorage.setItem(key, JSON.stringify(data)); } catch {} };
  const loadFromLocal = (key) => { try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : null; } catch { return null; } };

  // Create handlers
  const addQuestion = () => {
    if (questions.length < 10) {
      setQuestions([...questions, { q: '', options: ['', '', '', ''] }]);
    }
  };
  const removeQuestion = (idx) => {
    if (questions.length > 2) {
      const newQ = [...questions];
      newQ.splice(idx, 1);
      setQuestions(newQ);
    }
  };
  const updateQuestion = (idx, field, value) => {
    const newQ = [...questions];
    newQ[idx][field] = value;
    setQuestions(newQ);
  };
  const updateOption = (qIdx, oIdx, value) => {
    const newQ = [...questions];
    newQ[qIdx].options[oIdx] = value;
    setQuestions(newQ);
  };

  const handleCreate = () => {
    if (!name.trim()) { alert('Please enter your name'); return; }
    const valid = questions.every(q => q.q.trim() && q.options.every(o => o.trim()));
    if (!valid) { alert('Fill all questions and options'); return; }
    
    const newId = generateId();
    const data = { name: name.trim(), questions };
    
    // 1. Save locally (so the creator can still access it on this device)
    saveToLocal(`lovers_quiz_${newId}`, data);
    
    // 2. Encode the data into a Base64 string to put inside the URL
    // We use encodeURIComponent to safely handle emojis and special characters
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
    
    // 3. Build the full link with BOTH the id and the encoded data
    const fullLink = `${getOrigin()}/play/knowme?id=${newId}&from=${encodeURIComponent(name.trim())}&data=${encoded}`;
    
    setCreatedId(newId);
    setLink(fullLink);
    vibrate(50);
  };

  const handleShare = () => {
    const text = `How well do you know me? Play here ${link}`;
    share(text, link);
  };

  // Play handlers
  const handleAnswer = (idx) => {
    const newAns = [...answers];
    newAns[current] = idx;
    setAnswers(newAns);
    vibrate(30);
    if (current < quizData.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Calculate score
      const creatorName = quizData.name || 'Lover';
      let correctCount = 0;
      quizData.questions.forEach((q, qi) => {
        const correctIdx = (creatorName.length + qi) % 4;
        if (answers[qi] === correctIdx) correctCount++;
      });
      setScore(correctCount);
      setDone(true);
      if (correctCount >= 4) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, useWorker: false });
      }
      vibrate(50);
    }
  };

  const resetPlay = () => {
    setDone(false);
    setCurrent(0);
    setAnswers(new Array(quizData.questions.length).fill(-1));
    setScore(0);
  };

  // Render create mode
  if (!id && !encodedData) {
    if (createdId) {
      return (
        <div className="pb-4">
          <div className="mt-6 text-center">
            <span className="text-6xl">🎉</span>
            <h2 className="font-playfair text-2xl font-bold mt-2">Quiz Created!</h2>
            <p className="text-gray-600 text-sm mt-1">Share this link with your partner</p>
            <div className="glass rounded-[32px] p-4 mt-4 break-all text-sm">{link}</div>
            <div className="mt-4 flex flex-col gap-3">
              <button className="btn-primary" onClick={handleShare}>📤 Share on WhatsApp</button>
              <button className="btn-secondary" onClick={() => { navigator.clipboard?.writeText(link); alert('Copied!'); }}>📋 Copy Link</button>
              <button className="bg-gray-100 text-black py-3 rounded-full font-semibold" onClick={() => navigate('/')}>Back Home</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="pb-4">
        <div className="mt-4">
          <h2 className="font-playfair text-2xl font-bold">Create Your Quiz</h2>
          <p className="text-gray-600 text-sm">Your partner will answer these questions about you</p>
          <div className="mt-4">
            <label className="block font-semibold text-sm text-gray-700">Your Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sandile" className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:border-pink outline-none" />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-sm text-gray-700">Questions ({questions.length})</label>
              <button onClick={addQuestion} className="text-red font-semibold text-sm">+ Add</button>
            </div>
            {questions.map((q, qi) => (
              <div key={qi} className="mt-3 p-4 bg-white rounded-2xl shadow-sm border border-pink/10">
                <div className="flex items-center gap-2">
                  <input value={q.q} onChange={e => updateQuestion(qi, 'q', e.target.value)} placeholder={`Question ${qi+1}`} className="flex-1 p-2 border border-gray-200 rounded-xl" />
                  {questions.length > 2 && <button onClick={() => removeQuestion(qi)} className="text-red-400 text-xl">✕</button>}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {q.options.map((o, oi) => (
                    <input key={oi} value={o} onChange={e => updateOption(qi, oi, e.target.value)} placeholder={`Option ${oi+1}`} className="p-2 border border-gray-200 rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="btn-primary mt-6" onClick={handleCreate}>🚀 Generate Quiz Link</button>
        </div>
      </div>
    );
  }

  // Play mode
  if (!quizData) return <div className="py-8 text-center">Loading quiz...</div>;

  if (done) {
    const perfect = score >= 4;
    return (
      <div className="pb-4">
        <div className="mt-8 text-center">
          <span className="text-7xl">{perfect ? '😍' : '😭'}</span>
          <h2 className="font-playfair text-3xl font-bold mt-2">
            {perfect ? `You REALLY know ${from}!` : `My guy you need to pay more attention`}
          </h2>
          <p className="text-4xl font-bold text-red mt-2">{score} / {quizData.questions.length}</p>
          <div className="mt-6 flex flex-col gap-3">
            <button className="btn-primary" onClick={() => navigate('/')}>🏠 Home</button>
            <button className="btn-secondary" onClick={resetPlay}>🔄 Play Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4">
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Question {current + 1} / {quizData.questions.length}</span>
          <span>{from}'s Quiz</span>
        </div>
        <div className="progress-bar mt-2">
          <div className="fill" style={{ width: `${((current+1)/quizData.questions.length)*100}%` }} />
        </div>
        <div className="mt-6 p-6 bg-white rounded-[32px] shadow-lg">
          <h3 className="text-xl font-bold">{quizData.questions[current].q}</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {quizData.questions[current].options.map((opt, oi) => (
              <button key={oi} className="bg-gray-50 p-4 rounded-2xl font-medium hover:bg-pink/10 active:scale-95 transition-all" onClick={() => handleAnswer(oi)}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowMe;