import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../App';
import html2canvas from 'html2canvas';

const songs = [
  { name: 'Lo-fi Chill', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { name: 'Romantic Beat', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { name: 'Soft Melody', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

const MemorySlideshow = () => {
  const { vibrate, share, toggleMusic, musicOn } = useApp();
  
  const [names, setNames] = useState({ p1: 'Sandile', p2: 'Her' });
  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [songChoice, setSongChoice] = useState('default');
  const [customSongUrl, setCustomSongUrl] = useState('');
  const [song, setSong] = useState(songs[0].url);
  
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideshowRef = useRef(null);
  const audioRef = useRef(null);

  // ... [Previous photo upload and remove functions remain exactly the same] ...
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 50) {
      alert('Maximum 50 photos');
      return;
    }
    const newPhotos = [...photos, ...files];
    setPhotos(newPhotos);
    const newPreviews = newPhotos.map(f => URL.createObjectURL(f));
    setPreviews(newPreviews);
    vibrate(30);
  };

  const removePhoto = (idx) => {
    const newPhotos = [...photos];
    newPhotos.splice(idx, 1);
    setPhotos(newPhotos);
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[idx]);
    newPreviews.splice(idx, 1);
    setPreviews(newPreviews);
    vibrate(30);
  };

  const getFinalSongSrc = () => {
    if (songChoice === 'custom' && customSongUrl) {
      return customSongUrl;
    }
    return song;
  };

  const isSpotifyLink = songChoice === 'custom' && customSongUrl.includes('open.spotify.com');
  const isAppleMusicLink = songChoice === 'custom' && customSongUrl.includes('music.apple.com');

  const getEmbedUrl = () => {
    if (isSpotifyLink) {
      return customSongUrl.replace('open.spotify.com', 'open.spotify.com/embed');
    }
    if (isAppleMusicLink) {
      return customSongUrl.replace('music.apple.com', 'embed.music.apple.com');
    }
    return '';
  };

  // **NEW: Auto-advance slideshow logic (Loops back to start)**
  useEffect(() => {
    if (!showSlideshow || !isPlaying) return;

    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => {
        if (prevIndex < previews.length - 1) {
          return prevIndex + 1;
        } else {
          return 0; // Loop back to the first image
        }
      });
    }, 4000); // Change picture every 4 seconds

    return () => clearInterval(interval);
  }, [showSlideshow, isPlaying, previews.length]);

  // **NEW: Play local song after slideshow renders**
  useEffect(() => {
    if (showSlideshow && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [showSlideshow]);

  const startSlideshow = () => {
    if (photos.length < 1) {
      alert('Upload at least 1 photo');
      return;
    }
    if (!names.p1.trim() || !names.p2.trim()) {
      alert('Enter both names');
      return;
    }
    if (songChoice === 'custom' && !customSongUrl) {
      alert('Please paste your Spotify, Apple Music, or MP3 link');
      return;
    }

    // Stop global music
    if (musicOn) toggleMusic();

    vibrate(50);
    setShowSlideshow(true);
    setSlideIndex(0);
    setIsPlaying(true);
  };

  const nextSlide = () => {
    if (slideIndex < previews.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(0); // Loop back if at the end
    }
  };

  // **FIX: Toggle Play now controls BOTH audio and auto-advance**
  const togglePlay = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    
    if (audioRef.current) {
      if (newIsPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  };

  const downloadImage = async () => {
    if (!slideshowRef.current) return;
    try {
      const canvas = await html2canvas(slideshowRef.current, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
      });
      const link = document.createElement('a');
      link.download = `lovers-memory-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      vibrate(50);
    } catch {
      alert('Could not download image (Note: Embedded Spotify/Apple Music players might not appear in the download)');
    }
  };

  const shareWhatsApp = () => {
    const text = `Our Story - ${names.p1} & ${names.p2} ❤️ Created with Lovers Play by SELEC-DORCO (PTY) LTD`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (showSlideshow) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden" ref={slideshowRef}>
        
        {/* **FIX: Crossfade all images stacked on top of each other** */}
        <div className="absolute inset-0">
          {previews.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Slide ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                idx === slideIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-16 left-0 right-0 text-center text-white text-shadow-lg p-4 pointer-events-none z-10">
          <h2 className="font-playfair text-3xl">{names.p1} & {names.p2}</h2>
          <p className="text-xs opacity-70">Our Story ❤️ Created with Lovers Play by SELEC-DORCO (PTY) LTD</p>
        </div>

        <div className="absolute top-4 left-4 right-4 flex justify-between z-20">
          <span className="text-white text-sm bg-black/30 px-3 py-1 rounded-full">{slideIndex + 1} / {previews.length}</span>
          <button className="text-white text-2xl bg-black/30 w-10 h-10 rounded-full flex items-center justify-center" onClick={togglePlay}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-20">
          <button className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-semibold" onClick={nextSlide}>
            {slideIndex < previews.length - 1 ? 'Next →' : '🔄 Restart'}
          </button>
          <button className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-semibold" onClick={downloadImage}>💾 Download</button>
          <button className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-semibold" onClick={shareWhatsApp}>📤 Share</button>
          <button className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-semibold" onClick={() => { setShowSlideshow(false); if (audioRef.current) audioRef.current.pause(); }}>✕</button>
        </div>

        <div className="absolute top-16 left-4 right-4 z-10">
          {isSpotifyLink || isAppleMusicLink ? (
            <iframe 
              title="music-player"
              src={getEmbedUrl()}
              width="100%" 
              height="80" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          ) : (
            <audio ref={audioRef} src={getFinalSongSrc()} loop autoPlay />
          )}
        </div>
      </div>
    );
  }

  // ... [The regular form UI remains exactly the same] ...
  return (
    <div className="pb-4">
      <div className="mt-4">
        <h2 className="font-playfair text-2xl font-bold">Memory Slideshow</h2>
        <p className="text-gray-600 text-sm">Create a romantic slideshow with your photos (Up to 50 photos)</p>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-sm text-gray-700">Your Name</label>
              <input value={names.p1} onChange={e => setNames({...names, p1: e.target.value})} placeholder="e.g. Sandile" className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:border-pink outline-none" />
            </div>
            <div>
              <label className="block font-semibold text-sm text-gray-700">Partner</label>
              <input value={names.p2} onChange={e => setNames({...names, p2: e.target.value})} placeholder="e.g. Lerato" className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:border-pink outline-none" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-sm text-gray-700">Upload Photos (Max 50)</label>
            <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="w-full p-2 border-2 border-gray-200 rounded-2xl" />
            <div className="flex gap-2 mt-2 flex-wrap">
              {previews.map((p, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden">
                  <img src={p} className="w-full h-full object-cover" />
                  <button className="absolute top-0 right-0 bg-black/60 text-white w-5 h-5 rounded-full text-xs" onClick={() => removePhoto(idx)}>✕</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-sm text-gray-700">Choose Song</label>
            <select value={songChoice} onChange={e => setSongChoice(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:border-pink outline-none">
              <option value="default">Select from Playlist</option>
              <option value="custom">Custom (Spotify / Apple Music / MP3)</option>
            </select>
          </div>

          {songChoice === 'default' && (
            <select value={song} onChange={e => setSong(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:border-pink outline-none">
              {songs.map(s => <option key={s.url} value={s.url}>{s.name}</option>)}
            </select>
          )}

          {songChoice === 'custom' && (
            <div>
              <label className="block font-semibold text-sm text-gray-700">Paste your Spotify / Apple Music / MP3 URL</label>
              <input 
                type="url" 
                value={customSongUrl} 
                onChange={e => setCustomSongUrl(e.target.value)} 
                placeholder="e.g. https://open.spotify.com/track/..." 
                className="w-full p-3 border-2 border-gray-200 rounded-2xl focus:border-pink outline-none" 
              />
              <p className="text-xs text-gray-500 mt-1">Note: Spotify/Apple Music links will show an embed. Direct MP3 links will play in-app.</p>
            </div>
          )}

        </div>

        <button className="btn-primary mt-6" onClick={startSlideshow}>🎬 Generate Slideshow</button>
      </div>

      <style>{`
        .text-shadow-lg {
          text-shadow: 0 4px 20px rgba(0,0,0,0.6);
        }
      `}</style>
    </div>
  );
};

export default MemorySlideshow;