import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../App';
import confetti from 'canvas-confetti';

const KnowMe = () => {
  const navigate = useNavigate();
  const { vibrate, share } = useApp();
  const [searchParams] = useSearchParams();
  
  const id = searchParams.get('id');
  const encodedData = searchParams.get('data');
  const from = searchParams.get('from') || 'Partner';

  // States for create mode
  const [name, setName] = useState('');
  // Added correctIndex to track the creator's chosen correct answer for each question
  const [questions, setQuestions] = useState([
    { q: 'My fav food?', options: ['Pizza', 'Burgers', 'Sushi', 'Pap & Meat'], correctIndex: null },
    { q: 'My go-to drink?', options: ['Coffee', 'Tea', 'Juice', 'Water'], correctIndex: null },
    { q: 'My dream vacation?', options: ['Beach', 'Mountains', 'City', 'Safari'], correctIndex: null },
    { q: 'My love language?', options: ['Words', 'Touch', 'Gifts', 'Time'], correctIndex: null },
    { q: 'My pet name?', options: ['Babe', 'Love', 'Sweetie', 'Boo'], correctIndex: null },
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
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(encodedData)));
        setQuizData(decoded);
        setAnswers(new Array(decoded.questions.length).fill(-1));
      } catch (err) {
        alert('Invalid quiz link!');
        navigate('/');
      }
    } else if (id) {
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
      setQuestions([...questions, { q: '', options: ['', '', '', ''], correctIndex: null }]);
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
  
  // NEW: Handler to set the correct answer
  const setCorrectOption = (qIdx, oIdx) => {
    const newQ = [...questions];
    newQ[qIdx].correctIndex = oIdx;
    setQuestions(newQ);
    vibrate(20);
  };

  const handleCreate = () => {
    if (!name.trim()) { alert('Please enter your name'); return; }
    
    // Validate that all text fields are filled
    const validText = questions.every(q => q.q.trim() && q.options.every(o => o.trim()));
    if (!validText) { alert('Fill all questions and options'); return; }
    
    // Validate that a correct answer has been selected for every question
    const validCorrect = questions.every(q => q.correctIndex !== null && q.correctIndex !== undefined);
    if (!validCorrect) { alert('Please select the correct answer for every question (tap the circle next to the option)'); return; }
    
    const newId = generateId();
    const data = { name: name.trim(), questions };
    
    saveToLocal(`lovers_quiz_${newId}`, data);
    
    // Encode the entire quiz data (including correctIndex) into Base64
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
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
      // Calculate REAL score based on the creator's chosen correct answers
      let correctCount = 0;
      quizData.questions.forEach((q, qi) => {
        if (answers[qi] === q.correctIndex) correctCount++;
      });
      
      setScore(correctCount);
      setDone(true);
      
      if (correctCount === quizData.questions.length) {
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
          <p className="text-gray-600 text-sm">Select the correct answer for each question</p>
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
                
                {/* Updated Option UI: Radio circle + Input */}
                <div className="mt-3 flex flex-col gap-2">
                  {q.options.map((o, oi) => (
                    <div key={oi} className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setCorrectOption(qi, oi)}
                        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                          q.correctIndex === oi 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {q.correctIndex === oi && <span className="text-xs">✓</span>}
                      </button>
                      <input 
                        value={o} 
                        onChange={e => updateOption(qi, oi, e.target.value)} 
                        placeholder={`Option ${oi+1}`} 
                        className={`flex-1 p-2 border rounded-xl outline-none transition-colors ${
                          q.correctIndex === oi 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 focus:border-pink'
                        }`} 
                      />
                    </div>
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
    const perfect = score === quizData.questions.length;
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
          <div className="mt-4 grid grid-cols-1 gap-3">
            {quizData.questions[current].options.map((opt, oi) => (
              <button key={oi} className="bg-gray-50 p-4 rounded-2xl font-medium hover:bg-pink/10 active:scale-95 transition-all text-left" onClick={() => handleAnswer(oi)}>
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