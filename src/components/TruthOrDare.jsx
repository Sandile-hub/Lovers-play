import React, { useState, useRef } from 'react';
import { useApp } from '../App';

// SAFE / SOFT QUESTIONS
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

// SPICY QUESTIONS (Intimate but tasteful)
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

// EXPLICIT QUESTIONS (For very comfortable couples)
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

const TruthOrDare = () => {
  const { vibrate } = useApp();
  const [difficulty, setDifficulty] = useState('soft'); // 'soft', 'spicy', 'crazy'
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [type, setType] = useState('');
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);

  const spinBottle = () => {
    if (spinning) return;
    vibrate(50);
    setSpinning(true);
    setResult(null);
    setTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);

    // Select the correct lists based on difficulty
    const truths = difficulty === 'soft' ? truthsSoft : difficulty === 'spicy' ? truthsSpicy : truthsCrazy;
    const dares = difficulty === 'soft' ? daresSoft : difficulty === 'spicy' ? daresSpicy : daresCrazy;

    const isTruth = Math.random() < 0.5;
    const list = isTruth ? truths : dares;
    const item = list[Math.floor(Math.random() * list.length)];

    // Smooth spin animation (5 to 10 full rotations + random angle)
    const spins = 5 + Math.floor(Math.random() * 5);
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + randomAngle;
    
    // Slight delay to ensure the spinning state is registered before rotation
    setTimeout(() => {
      setRotation(totalRotation);
    }, 50);

    setTimeout(() => {
      setType(isTruth ? 'Truth' : 'Dare');
      setResult(item);
      setSpinning(false);
      
      // Start timer for dares
      if (!isTruth) {
        setTimer(30);
        setTimerActive(true);
        let count = 30;
        timerRef.current = setInterval(() => {
          count--;
          setTimer(count);
          if (count <= 0) {
            clearInterval(timerRef.current);
            setTimerActive(false);
            vibrate(30);
          }
        }, 1000);
      }
      vibrate(30);
    }, 2000); // 2 seconds for the spin to finish
  };

  const nextRound = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerActive(false);
    setResult(null);
    setType('');
    setTimer(0);
    vibrate(30);
  };

  const skipDare = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerActive(false);
    setTimer(0);
    setResult(null);
    setType('');
    vibrate(30);
  };

  return (
    <div className="pb-4">
      <div className="mt-4 text-center">
        <h2 className="font-playfair text-2xl font-bold">Truth or Dare</h2>
        <p className="text-gray-600 text-sm">Spin the bottle!</p>

        {/* Difficulty Selector */}
        <div className="mt-4 inline-flex bg-gray-100 p-1 rounded-full">
          <button 
            onClick={() => setDifficulty('soft')} 
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${difficulty === 'soft' ? 'bg-white shadow text-pink' : 'text-gray-500'}`}
          >Soft 😊</button>
          <button 
            onClick={() => setDifficulty('spicy')} 
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${difficulty === 'spicy' ? 'bg-white shadow text-red' : 'text-gray-500'}`}
          >Spicy 🌶️</button>
          <button 
            onClick={() => setDifficulty('crazy')} 
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${difficulty === 'crazy' ? 'bg-white shadow text-purple-600' : 'text-gray-500'}`}
          >Crazy 🔥</button>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="relative w-48 h-48">
            <div
              className="w-full h-full rounded-full bg-gradient-to-br from-pink to-red flex items-center justify-center text-8xl shadow-xl"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? 'transform 2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
              }}
            >
              🍾
            </div>
          </div>
        </div>

        <button className="btn-primary mt-4" onClick={spinBottle} disabled={spinning}>
          {spinning ? 'Spinning...' : 'Spin Bottle 🌀'}
        </button>

        {/* Warning for Crazy Mode */}
        {difficulty === 'crazy' && (
          <p className="text-xs text-red-500 mt-2 font-semibold">🔥 Explicit mode: Only play if you are both 18+ and fully comfortable!</p>
        )}

        {result && (
          <div className="mt-6 p-6 bg-white rounded-[32px] shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-red">{type}</span>
              {type === 'Dare' && timerActive && (
                <span className="text-sm font-bold text-red">⏱ {timer}s</span>
              )}
            </div>
            <p className="text-xl font-bold mt-2">{result}</p>
            <div className="flex gap-3 mt-4">
              {type === 'Truth' && (
                <button className="btn-secondary flex-1 py-3 text-sm" onClick={nextRound}>Next</button>
              )}
              {type === 'Dare' && (
                <>
                  <button className="bg-green-500 text-white flex-1 py-3 rounded-full font-semibold text-sm" onClick={nextRound}>✅ Done</button>
                  <button className="bg-gray-100 text-black flex-1 py-3 rounded-full font-semibold text-sm" onClick={skipDare}>Skip</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TruthOrDare;