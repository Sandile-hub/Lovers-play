import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../App';
import confetti from 'canvas-confetti';

const DEFAULT_QUESTIONS = [
  {
    q: 'My fav food?',
    options: ['Pizza', 'Burgers', 'Sushi', 'Pap & Meat'],
    correctIndex: null,
  },
  {
    q: 'My go-to drink?',
    options: ['Coffee', 'Tea', 'Juice', 'Water'],
    correctIndex: null,
  },
  {
    q: 'My dream vacation?',
    options: ['Beach', 'Mountains', 'City', 'Safari'],
    correctIndex: null,
  },
  {
    q: 'My love language?',
    options: ['Words', 'Touch', 'Gifts', 'Time'],
    correctIndex: null,
  },
  {
    q: 'My pet name?',
    options: ['Babe', 'Love', 'Sweetie', 'Boo'],
    correctIndex: null,
  },
];

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

const KnowMe = () => {
  const navigate = useNavigate();
  const { vibrate, share } = useApp();
  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');
  const encodedData = searchParams.get('data');
  const from = searchParams.get('from') || 'Partner';

  // --------------------------------------------------
  // CREATE MODE
  // --------------------------------------------------

  const [name, setName] = useState('');
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [createdId, setCreatedId] = useState(null);
  const [link, setLink] = useState('');

  // --------------------------------------------------
  // PLAY MODE
  // --------------------------------------------------

  const [quizData, setQuizData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  // --------------------------------------------------
  // HELPERS
  // --------------------------------------------------

  const generateId = () =>
    Date.now() + '_' + Math.random().toString(36).slice(2, 8);

  const getOrigin = () => window.location.origin;

  const saveToLocal = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Ignore localStorage failures.
    }
  };

  const loadFromLocal = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  // --------------------------------------------------
  // LOAD QUIZ
  // --------------------------------------------------

  useEffect(() => {
    if (encodedData) {
      try {
        const decoded = JSON.parse(
          decodeURIComponent(atob(encodedData))
        );

        if (
          !decoded ||
          !Array.isArray(decoded.questions) ||
          decoded.questions.length === 0
        ) {
          throw new Error('Invalid quiz');
        }

        setQuizData(decoded);
        setAnswers(new Array(decoded.questions.length).fill(-1));
      } catch (err) {
        alert('Invalid quiz link!');
        navigate('/');
      }
    } else if (id) {
      const data = loadFromLocal(`lovers_quiz_${id}`);

      if (!data) {
        alert(
          'Quiz not found! If you are the creator, please recreate it on this device.'
        );
        navigate('/');
        return;
      }

      setQuizData(data);
      setAnswers(new Array(data.questions.length).fill(-1));
    }
  }, [id, encodedData, navigate]);

  // --------------------------------------------------
  // CREATE HANDLERS
  // --------------------------------------------------

  const addQuestion = () => {
    if (questions.length >= 10) {
      alert('You can have a maximum of 10 questions.');
      return;
    }

    setQuestions([
      ...questions,
      {
        q: '',
        options: ['', '', '', ''],
        correctIndex: null,
      },
    ]);

    vibrate(20);
  };

  const removeQuestion = (idx) => {
    if (questions.length <= 2) {
      alert('You need at least 2 questions.');
      return;
    }

    const newQuestions = questions.filter((_, index) => index !== idx);

    setQuestions(newQuestions);
    vibrate(20);
  };

  const updateQuestion = (idx, field, value) => {
    setQuestions((previous) =>
      previous.map((question, index) =>
        index === idx
          ? { ...question, [field]: value }
          : question
      )
    );
  };

  const updateOption = (qIdx, oIdx, value) => {
    setQuestions((previous) =>
      previous.map((question, index) => {
        if (index !== qIdx) return question;

        const options = [...question.options];
        options[oIdx] = value;

        return {
          ...question,
          options,
        };
      })
    );
  };

  const setCorrectOption = (qIdx, oIdx) => {
    setQuestions((previous) =>
      previous.map((question, index) =>
        index === qIdx
          ? { ...question, correctIndex: oIdx }
          : question
      )
    );

    vibrate(20);
  };

  const handleCreate = () => {
    if (!name.trim()) {
      alert('Please enter your name.');
      return;
    }

    const validText = questions.every(
      (question) =>
        question.q.trim() &&
        question.options.length === 4 &&
        question.options.every((option) => option.trim())
    );

    if (!validText) {
      alert('Please fill in every question and option.');
      return;
    }

    const validCorrect = questions.every(
      (question) =>
        question.correctIndex !== null &&
        question.correctIndex !== undefined
    );

    if (!validCorrect) {
      alert(
        'Please select the correct answer for every question.'
      );
      return;
    }

    const newId = generateId();

    const data = {
      name: name.trim(),
      questions,
    };

    saveToLocal(`lovers_quiz_${newId}`, data);

    const encoded = btoa(
      encodeURIComponent(JSON.stringify(data))
    );

    const fullLink =
      `${getOrigin()}/play/knowme` +
      `?id=${newId}` +
      `&from=${encodeURIComponent(name.trim())}` +
      `&data=${encoded}`;

    setCreatedId(newId);
    setLink(fullLink);

    vibrate(50);
  };

  const handleShare = () => {
    const text = `💕 How well do you know ${name || 'me'}?\n\nTake my Lovers Play quiz and find out!\n\n${link}`;

    share(text, link);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(link);
      alert('Quiz link copied!');
    } catch {
      alert('Could not copy the link. Please copy it manually.');
    }
  };

  // --------------------------------------------------
  // PLAY HANDLERS
  // --------------------------------------------------

  const handleAnswer = (idx) => {
    const newAnswers = [...answers];
    newAnswers[current] = idx;

    setAnswers(newAnswers);
    vibrate(30);

    const isLastQuestion =
      current === quizData.questions.length - 1;

    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrent((previous) => previous + 1);
      }, 120);
      return;
    }

    // Calculate using newAnswers, not the old answers state.
    let correctCount = 0;

    quizData.questions.forEach((question, questionIndex) => {
      if (
        newAnswers[questionIndex] === question.correctIndex
      ) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setDone(true);

    if (correctCount === quizData.questions.length) {
      setTimeout(() => {
        confetti({
          particleCount: 180,
          spread: 85,
          origin: { y: 0.55 },
          useWorker: false,
        });
      }, 200);
    }

    vibrate(60);
  };

  const resetPlay = () => {
    setDone(false);
    setCurrent(0);
    setAnswers(
      new Array(quizData.questions.length).fill(-1)
    );
    setScore(0);
    vibrate(30);
  };

  // --------------------------------------------------
  // CREATE SUCCESS SCREEN
  // --------------------------------------------------

  if (!id && !encodedData && createdId) {
    return (
      <div className="pb-8">
        <div className="mt-5">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#171717] via-[#24181b] to-[#ff365c] p-6 text-white shadow-[0_25px_60px_rgba(255,77,109,0.22)]">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-[#ff4d6d]/30 blur-2xl" />

            <div className="relative">
              <span className="text-5xl">🎉</span>

              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                Your quiz is ready
              </p>

              <h2 className="mt-1 font-playfair text-3xl font-bold">
                Let the love test begin.
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Send this quiz to your person and see how well
                they really know you.
              </p>
            </div>
          </div>

          <div className="glass mt-5 rounded-[28px] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Quiz creator
                </p>
                <p className="mt-1 font-semibold text-[#171717]">
                  {name}
                </p>
              </div>

              <div className="rounded-full bg-[#fff0f3] px-3 py-1.5 text-xs font-bold text-[#ff4d6d]">
                {questions.length} Questions
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-gray-50 p-3">
              <p className="break-all text-xs leading-relaxed text-gray-500">
                {link}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <button
              className="btn-primary"
              onClick={handleShare}
            >
              💕 Share with My Person
            </button>

            <button
              className="btn-secondary"
              onClick={handleCopy}
            >
              📋 Copy Quiz Link
            </button>

            <button
              className="w-full rounded-full bg-gray-100 py-3.5 font-semibold text-[#171717] transition-all active:scale-[0.97]"
              onClick={() => navigate('/')}
            >
              ← Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // CREATE MODE
  // --------------------------------------------------

  if (!id && !encodedData) {
    const completedQuestions = questions.filter(
      (question) =>
        question.q.trim() &&
        question.options.every((option) => option.trim()) &&
        question.correctIndex !== null
    ).length;

    return (
      <div className="pb-8">
        {/* Header */}
        <div className="mt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="section-label">
                ✨ Create a challenge
              </span>

              <h2 className="mt-3 font-playfair text-3xl font-bold leading-tight text-[#171717]">
                How well do they
                <span className="text-[#ff4d6d]"> know you?</span>
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
                Create your questions, choose the answers,
                then send the challenge to your person.
              </p>
            </div>

            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#fff0f3] text-2xl">
              💕
            </div>
          </div>
        </div>

        {/* Creator name */}
        <div className="soft-card mt-6 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#171717] text-lg">
              👤
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Your name
              </p>
              <p className="text-xs text-gray-500">
                This will appear on their quiz.
              </p>
            </div>
          </div>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sandile"
            maxLength={30}
            className="love-input mt-4"
          />
        </div>

        {/* Questions heading */}
        <div className="mt-7 flex items-end justify-between">
          <div>
            <p className="section-label">
              📝 Build your quiz
            </p>
            <h3 className="mt-1 font-playfair text-2xl font-bold text-[#171717]">
              Your questions
            </h3>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-[#171717]">
              {questions.length}
              <span className="text-gray-300">/10</span>
            </p>
            <p className="text-[9px] font-semibold text-gray-400 uppercase">
              Questions
            </p>
          </div>
        </div>

        {/* Question progress */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] font-semibold text-gray-400">
            <span>{completedQuestions} completed</span>
            <span>
              {Math.round(
                (completedQuestions / questions.length) * 100
              )}%
            </span>
          </div>

          <div className="progress-bar mt-1.5">
            <div
              className="fill"
              style={{
                width: `${
                  (completedQuestions / questions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="mt-4 flex flex-col gap-4">
          {questions.map((question, qi) => (
            <div
              key={qi}
              className="relative overflow-hidden rounded-[28px] border border-white bg-white p-5 shadow-[0_12px_40px_rgba(31,20,24,0.07)]"
            >
              {/* Question number */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#171717] text-xs font-bold text-white">
                    {String(qi + 1).padStart(2, '0')}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Question {qi + 1}
                    </p>

                    <p className="text-[10px] text-gray-400">
                      Tap the answer to mark it correct
                    </p>
                  </div>
                </div>

                {questions.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qi)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    aria-label={`Remove question ${qi + 1}`}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Question input */}
              <input
                value={question.q}
                onChange={(e) =>
                  updateQuestion(qi, 'q', e.target.value)
                }
                placeholder="Write your question..."
                maxLength={100}
                className="love-input mt-4"
              />

              {/* Options */}
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Answers
                  </p>

                  {question.correctIndex !== null && (
                    <span className="text-[10px] font-bold text-green-600">
                      ✓ Correct answer selected
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2.5">
                  {question.options.map((option, oi) => {
                    const isCorrect =
                      question.correctIndex === oi;

                    return (
                      <div
                        key={oi}
                        className={`
                          flex items-center gap-2 rounded-2xl border p-2
                          transition-all duration-200
                          ${
                            isCorrect
                              ? 'border-green-400 bg-green-50'
                              : 'border-gray-100 bg-gray-50'
                          }
                        `}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setCorrectOption(qi, oi)
                          }
                          aria-label={`Mark option ${
                            oi + 1
                          } as correct`}
                          className={`
                            flex h-9 w-9 flex-shrink-0 items-center justify-center
                            rounded-xl border-2 text-xs font-bold transition-all
                            ${
                              isCorrect
                                ? 'border-green-500 bg-green-500 text-white shadow-[0_5px_15px_rgba(34,197,94,0.25)]'
                                : 'border-gray-200 bg-white text-gray-400 hover:border-[#ff4d6d] hover:text-[#ff4d6d]'
                            }
                          `}
                        >
                          {isCorrect ? '✓' : OPTION_LETTERS[oi]}
                        </button>

                        <input
                          value={option}
                          onChange={(e) =>
                            updateOption(
                              qi,
                              oi,
                              e.target.value
                            )
                          }
                          placeholder={`Option ${oi + 1}`}
                          maxLength={50}
                          className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm font-medium text-[#171717] outline-none placeholder:text-gray-300"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add question */}
        {questions.length < 10 && (
          <button
            type="button"
            onClick={addQuestion}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-[22px] border-2 border-dashed border-[#ff4d6d]/20 bg-white/60 py-4 text-sm font-bold text-[#ff4d6d] transition-all hover:border-[#ff4d6d]/40 hover:bg-[#fff7f8] active:scale-[0.98]"
          >
            <span className="text-xl">+</span>
            Add Another Question
          </button>
        )}

        {/* Generate */}
        <div className="mt-6">
          <button
            className="btn-primary"
            onClick={handleCreate}
          >
            💌 Generate My Quiz Link
          </button>

          <p className="mt-3 text-center text-[10px] leading-relaxed text-gray-400">
            Your quiz is stored on this device and shared
            through a unique link.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (!quizData) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#fff0f3] text-3xl animate-pulse">
          💕
        </div>

        <h2 className="mt-4 font-playfair text-2xl font-bold">
          Preparing your quiz...
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Almost ready ❤️
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // RESULTS
  // --------------------------------------------------

  if (done) {
    const total = quizData.questions.length;
    const percentage = Math.round((score / total) * 100);
    const perfect = score === total;

    let emoji = '🥹';
    let title = 'Not bad at all!';
    let message = 'There is still some love homework to do.';

    if (perfect) {
      emoji = '😍';
      title = `You REALLY know ${from}!`;
      message = 'Okay wow... you two are definitely locked in. ❤️';
    } else if (percentage >= 80) {
      emoji = '🥰';
      title = `You know ${from} pretty well!`;
      message = 'Someone has clearly been paying attention. 👀💕';
    } else if (percentage >= 60) {
      emoji = '😊';
      title = 'Pretty good!';
      message = 'You know your person, but there is room to improve.';
    } else if (percentage >= 40) {
      emoji = '🥲';
      title = 'We need to talk...';
      message = 'A little more attention might be necessary. 😂';
    } else {
      emoji = '😭';
      title = 'My guy...';
      message = 'You seriously need to pay more attention! 😂';
    }

    return (
      <div className="pb-8">
        <div className="mt-5 overflow-hidden rounded-[34px] bg-[#171717] p-6 text-center text-white shadow-[0_25px_60px_rgba(23,23,23,0.18)]">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-6xl">
            {emoji}
          </div>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
            {from}'s Know Me Quiz
          </p>

          <h2 className="mt-2 font-playfair text-3xl font-bold leading-tight">
            {title}
          </h2>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/60">
            {message}
          </p>

          {/* Score */}
          <div className="mx-auto mt-7 flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-[#ff4d6d]/25">
            <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white/10">
              <span className="text-4xl font-black text-white">
                {percentage}%
              </span>

              <span className="mt-0.5 text-[10px] font-semibold text-white/50">
                {score} / {total} correct
              </span>
            </div>
          </div>
        </div>

        {/* Result message */}
        <div className="glass mt-5 rounded-[28px] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f3]">
              💌
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Your result
              </p>

              <p className="text-sm font-semibold text-[#171717]">
                You got {score} out of {total} questions right.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <button
            className="btn-primary"
            onClick={() => navigate('/')}
          >
            🏠 Back to Lovers Play
          </button>

          <button
            className="btn-secondary"
            onClick={resetPlay}
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // PLAY MODE
  // --------------------------------------------------

  const currentQuestion = quizData.questions[current];
  const totalQuestions = quizData.questions.length;
  const progress =
    ((current + 1) / totalQuestions) * 100;

  return (
    <div className="pb-8">
      {/* Quiz top */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="section-label">
              💕 Know Me
            </span>

            <p className="mt-1 text-xs font-semibold text-gray-500">
              {from}'s challenge
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <span className="text-lg">❤️</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
            <span className="text-gray-400">
              Question {current + 1}
            </span>

            <span className="text-[#ff4d6d]">
              {current + 1} / {totalQuestions}
            </span>
          </div>

          <div className="progress-bar mt-2">
            <div
              className="fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="relative mt-5 overflow-hidden rounded-[34px] bg-white p-6 shadow-[0_20px_60px_rgba(31,20,24,0.09)]">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#fff0f3] blur-2xl" />

          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#171717] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white">
                Question {current + 1}
              </span>

              <span className="text-xs text-gray-300">
                •
              </span>

              <span className="text-[10px] font-semibold text-gray-400">
                Choose one
              </span>
            </div>

            <h3 className="mt-5 font-playfair text-2xl font-bold leading-tight text-[#171717]">
              {currentQuestion.q}
            </h3>

            {/* Answers */}
            <div className="mt-6 flex flex-col gap-3">
              {currentQuestion.options.map(
                (option, oi) => (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => handleAnswer(oi)}
                    className="group flex w-full items-center gap-3 rounded-[22px] border border-gray-100 bg-gray-50 p-3 text-left transition-all duration-200 hover:border-[#ff4d6d]/30 hover:bg-[#fff5f7] active:scale-[0.97]"
                  >
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[16px] bg-white text-xs font-black text-gray-400 shadow-sm transition-all group-hover:bg-[#ff4d6d] group-hover:text-white">
                      {OPTION_LETTERS[oi]}
                    </span>

                    <span className="flex-1 text-sm font-semibold text-[#171717]">
                      {option}
                    </span>

                    <span className="text-lg text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-[#ff4d6d]">
                      →
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Small footer hint */}
        <div className="mt-5 flex items-center justify-center gap-2 text-center">
          <span className="text-sm">🔒</span>
          <p className="text-[10px] font-medium text-gray-400">
            No account needed • Just play
          </p>
        </div>
      </div>
    </div>
  );
};

export default KnowMe;