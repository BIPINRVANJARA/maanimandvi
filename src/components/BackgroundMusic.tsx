import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // URL-encoded path to song in public/songs/
    const audio = new Audio("/songs/Bhagvati%202.0.mp3");
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay policy prevents unprompted playback before user interaction
        setIsPlaying(false);
      }
    };

    playAudio();

    // Workaround for browsers that require user gesture before allowing audio playback
    const unlockAudio = () => {
      if (audioRef.current && !userInteracted && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {});
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      cleanup();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [userInteracted]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setUserInteracted(true);

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Playback failed:", err);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center">
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute background music" : "Play Bhagvati 2.0 background music"}
        className={`group relative flex items-center gap-3 rounded-full border px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? "border-gold/60 bg-maroon/90 text-gold shadow-[0_4px_24px_rgba(212,175,55,0.25)] hover:border-gold hover:shadow-[0_4px_30px_rgba(212,175,55,0.45)]"
            : "border-gold/40 bg-ink/90 text-cream/70 hover:border-gold/80 hover:bg-ink hover:text-gold"
        }`}
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Sound Bars */}
            <div className="flex h-4 items-end gap-[3px]" aria-hidden="true">
              <span className="w-[3px] rounded-full bg-gold animate-sound-bar-1" />
              <span className="w-[3px] rounded-full bg-gold animate-sound-bar-2" />
              <span className="w-[3px] rounded-full bg-gold animate-sound-bar-3" />
              <span className="w-[3px] rounded-full bg-gold animate-sound-bar-4" />
            </div>
            <Volume2 className="h-4 w-4 text-gold transition-transform group-hover:scale-110" />
            <div className="flex flex-col text-left">
              <span className="font-serif text-xs font-semibold leading-none tracking-wider text-gold">
                Bhagvati 2.0
              </span>
              <span className="mt-0.5 text-[9px] font-semibold tracking-[0.2em] text-cream/80 uppercase">
                Playing · Tap to Mute
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center">
              <span className="absolute -inset-1 rounded-full bg-gold/20 animate-ping opacity-75" />
              <VolumeX className="relative h-4 w-4 text-gold/80 transition-transform group-hover:scale-110 group-hover:text-gold" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-xs font-semibold leading-none tracking-wider text-cream/90 group-hover:text-gold">
                Bhagvati 2.0
              </span>
              <span className="mt-0.5 text-[9px] font-semibold tracking-[0.2em] text-gold uppercase group-hover:text-gold-bright">
                Muted · Tap to Play 🎵
              </span>
            </div>
          </>
        )}
      </button>
    </div>
  );
}
