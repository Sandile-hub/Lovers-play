import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingHearts from "./components/FloatingHearts";
import Home from "./components/Home";
import KnowMe from "./components/KnowMe";
import WouldYouRather from "./components/WouldYouRather";
import TruthOrDare from "./components/TruthOrDare";
import LoveCalculator from "./components/LoveCalculator";
import KissMarryBlock from "./components/KissMarryBlock";
import MemorySlideshow from "./components/MemorySlideshow";
import Games from "./components/Games";
import About from "./components/About";
import BottomNav from "./components/BottomNav";
import FloatingMusic from "./components/FloatingMusic";

// Context
export const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [musicOn, setMusicOn] = useState(false);
  const [audioRef, setAudioRef] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("lovers_music_on");
    if (saved === "true") setMusicOn(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("lovers_music_on", String(musicOn));
    if (audioRef) {
      if (musicOn) audioRef.play().catch(() => {});
      else audioRef.pause();
    }
  }, [musicOn, audioRef]);

  const toggleMusic = () => setMusicOn(!musicOn);

  const vibrate = (ms = 50) => {
    if (navigator.vibrate) navigator.vibrate(ms);
  };

  const share = async (text, url) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Lovers Play", text, url });
        return true;
      } catch {
        return false;
      }
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(text + (url ? " " + url : ""))}`,
        "_blank",
      );
      return true;
    }
  };

  return (
    <AppContext.Provider
      value={{ musicOn, toggleMusic, vibrate, share, setAudioRef, audioRef }}
    >
      {/* Audio player moved inside the Provider.
          This gives direct access to setAudioRef without calling a hook inside the ref callback. */}
      <audio
        ref={(el) => {
          if (el) {
            setAudioRef(el);
            el.volume = 0.3;
            el.loop = true;
          }
        }}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        preload="auto"
      />
      
      {children}
    </AppContext.Provider>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <FloatingHearts />
        <FloatingMusic />
        <div className="px-3">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<KnowMe />} />
          <Route path="/play/knowme" element={<KnowMe />} />
          <Route path="/play/wyr" element={<WouldYouRather />} />
          <Route path="/play/tod" element={<TruthOrDare />} />
          <Route path="/play/calculator" element={<LoveCalculator />} />
          <Route path="/play/kmb" element={<KissMarryBlock />} />
          <Route path="/play/kmb/compare" element={<KissMarryBlock />} />
          <Route path="/play/slideshow" element={<MemorySlideshow />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <BottomNav />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;