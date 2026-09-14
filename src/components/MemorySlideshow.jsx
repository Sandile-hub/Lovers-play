import React, { useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "../App";
import html2canvas from "html2canvas";

// =========================================================
// BUILT-IN MUSIC
// =========================================================
// These must be direct URLs, not Markdown links.
const songs = [
  {
    name: "Lo-fi Chill",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    name: "Romantic Beat",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    name: "Soft Melody",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

const MAX_PHOTOS = 50;
const SLIDE_DURATION = 4000;

// =========================================================
// HELPERS
// =========================================================
const isValidHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const isSpotifyLink = (url) =>
  /(^|\/\/)open\.spotify\.com/i.test(url);

const isAppleMusicLink = (url) =>
  /(^|\/\/)music\.apple\.com/i.test(url);

const getSpotifyEmbedUrl = (url) => {
  try {
    const parsed = new URL(url);

    if (!parsed.pathname.startsWith("/embed/")) {
      parsed.pathname = `/embed${parsed.pathname}`;
    }

    return parsed.toString();
  } catch {
    return url;
  }
};

const getAppleMusicEmbedUrl = (url) => {
  try {
    const parsed = new URL(url);

    if (!parsed.hostname.startsWith("embed.")) {
      parsed.hostname = `embed.${parsed.hostname}`;
    }

    return parsed.toString();
  } catch {
    return url;
  }
};

// =========================================================
// COMPONENT
// =========================================================
const MemorySlideshow = () => {
  const { vibrate, share, toggleMusic, musicOn } = useApp();

  const [names, setNames] = useState({
    p1: "Sandile",
    p2: "Her",
  });

  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [songChoice, setSongChoice] = useState("default");
  const [customSongUrl, setCustomSongUrl] = useState("");
  const [song, setSong] = useState(songs[0].url);

  const [showSlideshow, setShowSlideshow] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const slideshowRef = useRef(null);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  // =======================================================
  // DERIVED VALUES
  // =======================================================
  const currentSongSrc = useMemo(() => {
    if (songChoice === "custom") {
      return customSongUrl.trim();
    }

    return song;
  }, [songChoice, customSongUrl, song]);

  const customIsSpotify =
    songChoice === "custom" && isSpotifyLink(customSongUrl);

  const customIsAppleMusic =
    songChoice === "custom" && isAppleMusicLink(customSongUrl);

  const customIsEmbed =
    customIsSpotify || customIsAppleMusic;

  const currentEmbedUrl = useMemo(() => {
    if (customIsSpotify) {
      return getSpotifyEmbedUrl(customSongUrl);
    }

    if (customIsAppleMusic) {
      return getAppleMusicEmbedUrl(customSongUrl);
    }

    return "";
  }, [customIsSpotify, customIsAppleMusic, customSongUrl]);

  const photoCount = photos.length;

  const progress =
    photoCount > 0
      ? Math.round((photoCount / MAX_PHOTOS) * 100)
      : 0;

  // =======================================================
  // CLEAN UP OBJECT URLS
  // =======================================================
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // =======================================================
  // AUTO ADVANCE
  // =======================================================
  useEffect(() => {
    if (!showSlideshow || !isPlaying || previews.length <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setSlideIndex((previous) =>
        previous < previews.length - 1
          ? previous + 1
          : 0
      );
    }, SLIDE_DURATION);

    return () => {
      window.clearInterval(interval);
    };
  }, [showSlideshow, isPlaying, previews.length]);

  // =======================================================
  // START LOCAL AUDIO
  // =======================================================
  useEffect(() => {
    if (!showSlideshow || customIsEmbed || !audioRef.current) {
      return;
    }

    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [
    showSlideshow,
    isPlaying,
    currentSongSrc,
    customIsEmbed,
  ]);

  // =======================================================
  // FILE UPLOAD
  // =======================================================
  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    const remainingSlots = MAX_PHOTOS - photos.length;

    if (remainingSlots <= 0) {
      alert(`You can upload a maximum of ${MAX_PHOTOS} photos.`);
      event.target.value = "";
      return;
    }

    const selectedFiles = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      alert(
        `Only ${remainingSlots} more photo${
          remainingSlots === 1 ? "" : "s"
        } can be added.`
      );
    }

    const newPhotos = [...photos, ...selectedFiles];

    const newPreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setPhotos(newPhotos);
    setPreviews((previous) => [
      ...previous,
      ...newPreviews,
    ]);

    vibrate(30);

    event.target.value = "";
  };

  // =======================================================
  // REMOVE PHOTO
  // =======================================================
  const removePhoto = (index) => {
    const previewToRemove = previews[index];

    if (previewToRemove) {
      URL.revokeObjectURL(previewToRemove);
    }

    setPhotos((previous) =>
      previous.filter((_, photoIndex) => photoIndex !== index)
    );

    setPreviews((previous) =>
      previous.filter((_, previewIndex) => previewIndex !== index)
    );

    vibrate(30);
  };

  // =======================================================
  // MOVE PHOTO
  // =======================================================
  const movePhoto = (index, direction) => {
    const targetIndex =
      direction === "left" ? index - 1 : index + 1;

    if (
      index < 0 ||
      targetIndex < 0 ||
      index >= photos.length ||
      targetIndex >= photos.length
    ) {
      return;
    }

    const newPhotos = [...photos];
    const newPreviews = [...previews];

    [newPhotos[index], newPhotos[targetIndex]] = [
      newPhotos[targetIndex],
      newPhotos[index],
    ];

    [newPreviews[index], newPreviews[targetIndex]] = [
      newPreviews[targetIndex],
      newPreviews[index],
    ];

    setPhotos(newPhotos);
    setPreviews(newPreviews);

    vibrate(20);
  };

  // =======================================================
  // START SLIDESHOW
  // =======================================================
  const startSlideshow = () => {
    if (photos.length < 1) {
      alert("Upload at least 1 photo.");
      return;
    }

    if (!names.p1.trim() || !names.p2.trim()) {
      alert("Please enter both names.");
      return;
    }

    if (songChoice === "custom") {
      const url = customSongUrl.trim();

      if (!url) {
        alert(
          "Please paste a Spotify, Apple Music, or direct MP3 link."
        );
        return;
      }

      if (!isValidHttpUrl(url)) {
        alert("Please enter a valid music URL.");
        return;
      }
    }

    // Stop the app's global background music.
    if (musicOn) {
      toggleMusic();
    }

    vibrate(50);

    setSlideIndex(0);
    setIsPlaying(true);
    setShowSlideshow(true);
  };

  // =======================================================
  // CLOSE SLIDESHOW
  // =======================================================
  const closeSlideshow = () => {
    setShowSlideshow(false);
    setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    vibrate(30);
  };

  // =======================================================
  // NEXT / PREVIOUS
  // =======================================================
  const nextSlide = () => {
    if (!previews.length) return;

    setSlideIndex((previous) =>
      previous < previews.length - 1
        ? previous + 1
        : 0
    );

    vibrate(20);
  };

  const previousSlide = () => {
    if (!previews.length) return;

    setSlideIndex((previous) =>
      previous > 0
        ? previous - 1
        : previews.length - 1
    );

    vibrate(20);
  };

  // =======================================================
  // PLAY / PAUSE
  // =======================================================
  const togglePlay = () => {
    const nextPlaying = !isPlaying;

    setIsPlaying(nextPlaying);

    if (audioRef.current && !customIsEmbed) {
      if (nextPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }

    vibrate(20);
  };

  // =======================================================
  // DOWNLOAD CURRENT SLIDE
  // =======================================================
  const downloadImage = async () => {
    if (!slideshowRef.current || isDownloading) {
      return;
    }

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(
        slideshowRef.current,
        {
          scale: Math.min(window.devicePixelRatio || 1, 2),
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#000000",
          logging: false,
        }
      );

      const link = document.createElement("a");

      link.download = `lovers-memory-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      vibrate(50);
    } catch (error) {
      console.error(error);

      alert(
        "Could not create the image. Embedded Spotify or Apple Music players may not appear in the downloaded image."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  // =======================================================
  // SHARE WHATSAPP
  // =======================================================
  const shareWhatsApp = () => {
    const text =
      `❤️ Our Story — ${names.p1} & ${names.p2}\n\n` +
      "A little collection of our favorite memories, created with Lovers Play.\n\n" +
      "Created with Lovers Play by SELEC-DORCO (PTY) LTD";

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    vibrate(30);
  };

  // =======================================================
  // CLEAR EVERYTHING
  // =======================================================
  const clearPhotos = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));

    setPhotos([]);
    setPreviews([]);

    vibrate(30);
  };

  // =======================================================
  // ENTER KEY / ESCAPE
  // =======================================================
  useEffect(() => {
    if (!showSlideshow) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeSlideshow();
      }

      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }

      if (event.key === " ") {
        event.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSlideshow, previews.length, isPlaying]);

  // =======================================================
  // FULL-SCREEN SLIDESHOW
  // =======================================================
  if (showSlideshow) {
    return (
      <div
        ref={slideshowRef}
        className="fixed inset-0 z-[60] overflow-hidden bg-black"
      >
        {/* ===================================================
            BACKGROUND PHOTOS
        ==================================================== */}
        <div className="absolute inset-0">
          {previews.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt={`Memory ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === slideIndex
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/80" />

          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        </div>

        {/* ===================================================
            TOP CONTROLS
        ==================================================== */}
        <div className="absolute left-0 right-0 top-0 z-20 px-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-bold text-white backdrop-blur-xl">
              {slideIndex + 1}
              <span className="mx-1 text-white/40">/</span>
              {previews.length}
            </div>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-lg text-white backdrop-blur-xl transition-all active:scale-95"
              onClick={closeSlideshow}
              aria-label="Close slideshow"
            >
              ✕
            </button>
          </div>

          {/* Progress */}
          <div className="mt-4 flex gap-1">
            {previews.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setSlideIndex(index)}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index === slideIndex
                    ? "bg-white"
                    : "bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            MUSIC
        ==================================================== */}
        <div className="absolute left-4 right-4 top-24 z-20">
          {customIsEmbed ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-xl backdrop-blur-xl">
              <iframe
                title="Music player"
                src={currentEmbedUrl}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          ) : (
            <>
              <audio
                ref={audioRef}
                src={currentSongSrc}
                loop
                preload="auto"
              />

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[10px] font-semibold text-white backdrop-blur-xl">
                <span className={isPlaying ? "animate-pulse" : ""}>
                  🎵
                </span>

                {songChoice === "custom"
                  ? "Your music"
                  : songs.find((item) => item.url === song)?.name ||
                    "Romantic music"}
              </div>
            </>
          )}
        </div>

        {/* ===================================================
            CENTER TEXT
        ==================================================== */}
        <div className="pointer-events-none absolute inset-x-0 bottom-36 z-10 px-6 text-center text-white">
          <div className="mx-auto mb-3 flex items-center justify-center gap-3 text-white/60">
            <span className="h-px w-8 bg-white/30" />
            <span className="text-sm">♥</span>
            <span className="h-px w-8 bg-white/30" />
          </div>

          <h1 className="font-playfair text-4xl font-bold tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            {names.p1} & {names.p2}
          </h1>

          <p className="mt-2 text-xs font-medium text-white/75 drop-shadow-lg">
            Our Story • Memory {slideIndex + 1}
          </p>
        </div>

        {/* ===================================================
            SIDE NAVIGATION
        ==================================================== */}
        {previews.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousSlide}
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/25 text-xl text-white backdrop-blur-xl transition-all active:scale-90"
              aria-label="Previous slide"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/25 text-xl text-white backdrop-blur-xl transition-all active:scale-90"
              aria-label="Next slide"
            >
              ›
            </button>
          </>
        )}

        {/* ===================================================
            BOTTOM CONTROLS
        ==================================================== */}
        <div className="absolute bottom-5 left-4 right-4 z-20">
          <div className="mx-auto flex max-w-[520px] items-center justify-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/15 text-lg text-white backdrop-blur-xl transition-all active:scale-90"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="rounded-full border border-white/10 bg-white/15 px-5 py-3 text-xs font-bold text-white backdrop-blur-xl transition-all active:scale-95"
            >
              {slideIndex < previews.length - 1
                ? "Next →"
                : "↻ Restart"}
            </button>

            <button
              type="button"
              onClick={downloadImage}
              disabled={isDownloading}
              className="rounded-full border border-white/10 bg-white/15 px-4 py-3 text-xs font-bold text-white backdrop-blur-xl transition-all active:scale-95 disabled:opacity-50"
            >
              {isDownloading ? "Saving..." : "↓ Save"}
            </button>

            <button
              type="button"
              onClick={shareWhatsApp}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/15 text-lg text-white backdrop-blur-xl transition-all active:scale-90"
              aria-label="Share on WhatsApp"
            >
              📤
            </button>
          </div>

          <p className="mt-3 text-center text-[8px] font-medium tracking-wide text-white/40">
            Space = play/pause • ← → = change memory • Esc = close
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // CREATOR PAGE
  // =========================================================
  return (
    <div className="pb-6">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="pt-4">
        <div className="relative overflow-hidden rounded-[32px] bg-[#171717] p-6 text-white shadow-[0_24px_60px_rgba(23,23,23,0.18)]">
          <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#ff4d6d]/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
              📸 Your memories
            </div>

            <h1 className="mt-4 font-playfair text-4xl font-bold leading-tight">
              Your Story,
              <br />
              In Moments.
            </h1>

            <p className="mt-3 max-w-[290px] text-sm leading-6 text-white/60">
              Turn your favorite photos into a romantic slideshow you can
              replay, save and share.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                Up to 50 photos
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                Music
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/70">
                Share
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STEP 1 — NAMES
      ====================================================== */}
      <section className="mt-7">
        <div className="section-label">
          Step 1 • The two of you
        </div>

        <div className="soft-card mt-3 p-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.10em] text-gray-400">
                Your name
              </label>

              <input
                type="text"
                value={names.p1}
                onChange={(event) =>
                  setNames((previous) => ({
                    ...previous,
                    p1: event.target.value,
                  }))
                }
                placeholder="e.g. Sandile"
                className="love-input"
                maxLength={30}
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.10em] text-gray-400">
                Partner
              </label>

              <input
                type="text"
                value={names.p2}
                onChange={(event) =>
                  setNames((previous) => ({
                    ...previous,
                    p2: event.target.value,
                  }))
                }
                placeholder="e.g. Lerato"
                className="love-input"
                maxLength={30}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-[#fff7f8] px-4 py-3">
            <span className="font-semibold text-[#171717]">
              {names.p1.trim() || "You"}
            </span>

            <span className="text-[#ff4d6d]">♥</span>

            <span className="font-semibold text-[#171717]">
              {names.p2.trim() || "Your person"}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          STEP 2 — PHOTOS
      ====================================================== */}
      <section className="mt-7">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="section-label">
              Step 2 • Your photos
            </div>

            <p className="mt-2 text-[10px] font-medium text-gray-400">
              Add your favorite moments in the order you want them to appear.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1.5 text-[9px] font-bold text-gray-500">
            {photoCount}/{MAX_PHOTOS}
          </span>
        </div>

        {/* Upload box */}
        <button
          type="button"
          disabled={photoCount >= MAX_PHOTOS}
          onClick={() => fileInputRef.current?.click()}
          className="mt-3 flex w-full flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-[#ff4d6d]/20 bg-[#fffafa] px-5 py-8 text-center transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-[0_10px_25px_rgba(255,77,109,0.10)]">
            📸
          </div>

          <p className="mt-4 text-sm font-bold text-[#171717]">
            Add your memories
          </p>

          <p className="mt-1 text-[10px] leading-5 text-gray-400">
            Tap here to choose photos from your device
          </p>

          <span className="mt-4 rounded-full bg-[#171717] px-4 py-2 text-[10px] font-bold text-white">
            Choose Photos
          </span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          className="hidden"
        />

        {/* Upload progress */}
        {photoCount > 0 && (
          <div className="mt-3 rounded-2xl bg-white p-3 shadow-[0_8px_25px_rgba(31,20,24,0.05)]">
            <div className="flex items-center justify-between text-[9px] font-bold">
              <span className="text-gray-400">
                Memory collection
              </span>

              <span className="text-[#ff4d6d]">
                {photoCount} photo{photoCount === 1 ? "" : "s"}
              </span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff9ab0] transition-all duration-300"
                style={{
                  width: `${Math.max(progress, 3)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Photo thumbnails */}
        {previews.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#171717]">
                Your memories
              </p>

              <button
                type="button"
                onClick={clearPhotos}
                className="text-[10px] font-bold text-red-400"
              >
                Clear all
              </button>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {previews.map((preview, index) => (
                <div
                  key={`${preview}-${index}`}
                  className="group relative aspect-square overflow-hidden rounded-[18px] bg-gray-100"
                >
                  <img
                    src={preview}
                    alt={`Memory ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute left-2 top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-black/55 px-1.5 text-[9px] font-bold text-white backdrop-blur-sm">
                    {index + 1}
                  </div>

                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/65 text-[10px] font-bold text-white"
                    aria-label={`Remove photo ${index + 1}`}
                  >
                    ✕
                  </button>

                  <div className="absolute bottom-2 left-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => movePhoto(index, "left")}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-xs text-white backdrop-blur-sm"
                      >
                        ←
                      </button>
                    )}

                    {index < previews.length - 1 && (
                      <button
                        type="button"
                        onClick={() => movePhoto(index, "right")}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-xs text-white backdrop-blur-sm"
                      >
                        →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          STEP 3 — MUSIC
      ====================================================== */}
      <section className="mt-7">
        <div className="section-label">
          Step 3 • Set the mood
        </div>

        <div className="soft-card mt-3 p-5">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSongChoice("default")}
              className={`rounded-[20px] border p-4 text-left transition-all ${
                songChoice === "default"
                  ? "border-[#ff4d6d]/20 bg-[#fff0f3] text-[#ff4d6d]"
                  : "border-gray-100 bg-white text-gray-500"
              }`}
            >
              <span className="text-xl">🎵</span>

              <p className="mt-2 text-xs font-bold">
                Lovers Playlist
              </p>

              <p className="mt-1 text-[9px] leading-4 opacity-70">
                Choose built-in music
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSongChoice("custom")}
              className={`rounded-[20px] border p-4 text-left transition-all ${
                songChoice === "custom"
                  ? "border-[#ff4d6d]/20 bg-[#fff0f3] text-[#ff4d6d]"
                  : "border-gray-100 bg-white text-gray-500"
              }`}
            >
              <span className="text-xl">🔗</span>

              <p className="mt-2 text-xs font-bold">
                Your Music
              </p>

              <p className="mt-1 text-[9px] leading-4 opacity-70">
                Spotify, Apple Music or MP3
              </p>
            </button>
          </div>

          {songChoice === "default" && (
            <div className="mt-4">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.10em] text-gray-400">
                Pick a soundtrack
              </label>

              <select
                value={song}
                onChange={(event) =>
                  setSong(event.target.value)
                }
                className="love-input appearance-none"
              >
                {songs.map((item) => (
                  <option
                    key={item.url}
                    value={item.url}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {songChoice === "custom" && (
            <div className="mt-4">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.10em] text-gray-400">
                Music URL
              </label>

              <input
                type="url"
                value={customSongUrl}
                onChange={(event) =>
                  setCustomSongUrl(event.target.value)
                }
                placeholder="https://open.spotify.com/track/..."
                className="love-input"
              />

              <p className="mt-2 text-[9px] leading-4 text-gray-400">
                Spotify and Apple Music links are displayed as embedded
                players. Direct MP3 links can play directly in the slideshow.
              </p>

              {customSongUrl && !isValidHttpUrl(customSongUrl) && (
                <p className="mt-2 text-[10px] font-semibold text-red-400">
                  Please enter a valid http:// or https:// URL.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          PREVIEW SUMMARY
      ====================================================== */}
      <section className="mt-7">
        <div className="relative overflow-hidden rounded-[28px] border border-[#ff4d6d]/10 bg-[#fff7f8] p-5">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#ff4d6d]/10 blur-2xl" />

          <div className="relative flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
              ✨
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-[#171717]">
                Ready to relive it?
              </p>

              <p className="mt-1 text-[10px] leading-5 text-gray-500">
                {photoCount > 0
                  ? `${photoCount} ${
                      photoCount === 1 ? "memory" : "memories"
                    } ready for ${names.p1.trim() || "you"} & ${
                      names.p2.trim() || "your person"
                    }.`
                  : "Add some photos above and your memories will appear here."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          GENERATE
      ====================================================== */}
      <button
        type="button"
        className={`mt-5 w-full rounded-full py-4 font-bold transition-all ${
          photoCount > 0 &&
          names.p1.trim() &&
          names.p2.trim()
            ? "bg-gradient-to-r from-[#ff4d6d] to-[#ff365c] text-white shadow-[0_14px_35px_rgba(255,77,109,0.28)] active:scale-[0.98]"
            : "cursor-not-allowed bg-gray-200 text-gray-400"
        }`}
        onClick={startSlideshow}
        disabled={
          photoCount === 0 ||
          !names.p1.trim() ||
          !names.p2.trim()
        }
      >
        <span className="flex items-center justify-center gap-2">
          🎬
          Generate My Slideshow
        </span>
      </button>

      <p className="mt-3 text-center text-[9px] font-medium text-gray-300">
        Your photos stay on your device while you create the slideshow.
      </p>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section className="mt-8">
        <div className="section-label">
          How it works
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="soft-card p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-50 text-lg">
              📸
            </div>

            <p className="mt-3 text-[10px] font-bold text-[#171717]">
              Add
            </p>

            <p className="mt-1 text-[9px] leading-4 text-gray-400">
              Choose your favorite memories.
            </p>
          </div>

          <div className="soft-card p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-lg">
              🎵
            </div>

            <p className="mt-3 text-[10px] font-bold text-[#171717]">
              Add music
            </p>

            <p className="mt-1 text-[9px] leading-4 text-gray-400">
              Pick a soundtrack for the moment.
            </p>
          </div>

          <div className="soft-card p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-lg">
              ❤️
            </div>

            <p className="mt-3 text-[10px] font-bold text-[#171717]">
              Relive
            </p>

            <p className="mt-1 text-[9px] leading-4 text-gray-400">
              Watch, save and share it.
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
          Your favorite moments deserve their own soundtrack.
        </p>
      </div>
    </div>
  );
};

export default MemorySlideshow;