import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, RefreshCw, Music, ExternalLink, Globe } from 'lucide-react';
import AnalogVuMeter from './AnalogVuMeter';

interface ProvoxPlayerProps {
  streamUrl?: string;
  title?: string;
  subtitle?: string;
  songName?: string;
  stationUrl?: string;
  className?: string;
}

// Web Audio API Backup Radio Music Synthesizer Engine
class RadioSynthEngine {
  private ctx: AudioContext | null = null;
  private isRunning = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;

  start(volume = 0.85) {
    if (this.isRunning) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.isRunning = true;
      this.scheduleLoop();
    } catch (e) {
      console.warn('RadioSynthEngine initialization:', e);
    }
  }

  setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  stop() {
    this.isRunning = false;
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }

  private scheduleLoop() {
    if (!this.ctx || !this.masterGain) return;

    // Harmonious Pop/Rock Radio Chord Loop: Cmaj7 -> Am7 -> Fmaj7 -> G7
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23], // G7
    ];
    let step = 0;

    const playStep = () => {
      if (!this.ctx || !this.isRunning || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const chord = chords[step % chords.length];

      // Soft Synth Pad Chords
      chord.forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.05, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start(now);
        osc.stop(now + 1.0);
      });

      // Bass Note
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(chord[0] / 2, now);
      bassGain.gain.setValueAtTime(0.09, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      bassOsc.connect(bassGain);
      bassGain.connect(this.masterGain);
      bassOsc.start(now);
      bassOsc.stop(now + 0.55);

      // Radio Lead Melody Note
      const melodyFreqs = [523.25, 659.25, 783.99, 880.00, 987.77, 1046.50];
      const mFreq = melodyFreqs[Math.floor(Math.random() * melodyFreqs.length)];
      const mOsc = this.ctx.createOscillator();
      const mGain = this.ctx.createGain();
      mOsc.type = 'sine';
      mOsc.frequency.setValueAtTime(mFreq, now + 0.15);
      mGain.gain.setValueAtTime(0.04, now + 0.15);
      mGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      mOsc.connect(mGain);
      mGain.connect(this.masterGain);
      mOsc.start(now + 0.15);
      mOsc.stop(now + 0.5);

      step++;
    };

    playStep();
    this.timerId = window.setInterval(playStep, 500);
  }
}

export default function ProvoxPlayer({
  streamUrl = "https://sv11.hdradios.net:6806/;",
  title = "RÁDIO CORPORATIVA RFM",
  subtitle = "Transmissão HD 24h",
  songName = "Seleção Exclusiva Pop, Rock & Hits Nacionais",
  stationUrl = "https://rebeldiafm.com.br",
  className = ""
}: ProvoxPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<RadioSynthEngine | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isUsingSynth, setIsUsingSynth] = useState<boolean>(false);
  const [liveSong, setLiveSong] = useState<string>('');

  useEffect(() => {
    synthRef.current = new RadioSynthEngine();
    return () => {
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  // Poll current playing song metadata from streaming server
  useEffect(() => {
    let isMounted = true;

    const fetchLiveSong = async () => {
      try {
        const res = await fetch("https://sv11.hdradios.net:6806/stats?json=1", { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const current = data.songtitle || data.song || data.title;
          if (current && isMounted) {
            setLiveSong(current);
            return;
          }
        }
      } catch (err) {
        // Fallback or CORS ignore
      }

      try {
        const res2 = await fetch("https://sv11.hdradios.net:6806/7.html", { cache: 'no-store' });
        if (res2.ok) {
          const text = await res2.text();
          const parts = text.split(',');
          if (parts.length >= 7 && parts[6] && isMounted) {
            const raw = parts.slice(6).join(',').replace(/<[^>]*>/g, '').trim();
            if (raw) {
              setLiveSong(raw);
              return;
            }
          }
        }
      } catch (err) {
        // Fallback ignore
      }
    };

    fetchLiveSong();
    const interval = setInterval(fetchLiveSong, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const currentVol = isMuted ? 0 : volume;
    if (audioRef.current) {
      audioRef.current.volume = currentVol;
    }
    if (synthRef.current) {
      synthRef.current.setVolume(currentVol);
    }
  }, [volume, isMuted]);

  // Strip unwanted prefix repetitions like "Tocando Agora:" or "Tocando:"
  const cleanSongText = (text: string) => {
    return text
      .replace(/^tocando\s*agora\s*:\s*/i, '')
      .replace(/^tocando\s*:\s*/i, '')
      .trim();
  };

  const currentDisplaySong = liveSong ? cleanSongText(liveSong) : cleanSongText(songName);

  // Audio stream URL
  const DEFAULT_STREAM_URL = "https://sv11.hdradios.net:6806/;";

  const stopAll = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      try {
        audioRef.current.src = "";
        audioRef.current.load();
      } catch (e) {
        // ignore
      }
    }
    if (synthRef.current) {
      synthRef.current.stop();
    }
    setIsPlaying(false);
    setIsLoading(false);
    setIsUsingSynth(false);
  };

  const togglePlay = async () => {
    if (isPlaying) {
      stopAll();
      return;
    }

    setIsLoading(true);

    let streamSuccess = false;

    // Try primary stream URL first, then fallback
    const urlsToTry = [
      streamUrl || DEFAULT_STREAM_URL,
      DEFAULT_STREAM_URL,
      "https://sv11.hdradios.net:6806/stream",
      "https://sv11.hdradios.net:6806"
    ];

    if (audioRef.current) {
      for (const src of urlsToTry) {
        if (!src) continue;
        try {
          audioRef.current.src = src;
          audioRef.current.volume = isMuted ? 0 : volume;
          audioRef.current.load();
          await audioRef.current.play();
          streamSuccess = true;
          setIsPlaying(true);
          setIsLoading(false);
          setIsUsingSynth(false);
          break;
        } catch (err) {
          console.warn("Stream playback error for:", src, err);
        }
      }
    }

    // Fallback to synth only if native radio stream fails completely
    if (!streamSuccess) {
      console.log("Activating backup Web Audio synth engine...");
      if (synthRef.current) {
        synthRef.current.start(isMuted ? 0 : volume);
        setIsPlaying(true);
        setIsUsingSynth(true);
      }
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className={`bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xl text-white relative overflow-hidden group ${className}`}>
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        preload="none"
        crossOrigin="anonymous"
        onPlaying={() => {
          setIsPlaying(true);
          setIsLoading(false);
        }}
        onPause={() => {
          if (!isUsingSynth) {
            setIsPlaying(false);
          }
        }}
        onError={() => {
          if (!isUsingSynth && isPlaying) {
            if (synthRef.current) {
              synthRef.current.start(isMuted ? 0 : volume);
              setIsUsingSynth(true);
              setIsPlaying(true);
            }
          }
        }}
      />

      {/* Single-Line Horizontal Integrated Player Bar */}
      <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Left Section: Radio Icon, Station Name & Live Track */}
        <div className="flex items-start gap-3 w-full xl:w-72 2xl:w-80 shrink-0 min-w-0 pt-0.5">
          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-500 shadow-inner shrink-0 mt-0.5 ${
            isPlaying 
              ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-orange-500/30' 
              : 'bg-slate-800 text-amber-400 border border-slate-700'
          }`}>
            <Radio className={`h-5 w-5 sm:h-6 sm:w-6 ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-extrabold text-base sm:text-lg text-white tracking-tight truncate leading-tight">
                {title}
              </span>
              <a
                href={stationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 transition-all shrink-0"
                title="Acessar rebeldiafm.com.br"
              >
                <Globe className="h-3 w-3" />
                <span>rebeldiafm.com.br</span>
                <ExternalLink className="h-2.5 w-2.5 opacity-80" />
              </a>
            </div>

            <div className="flex items-center gap-2 mt-1 text-xs text-slate-300 truncate">
              <span className="flex items-center gap-1 font-mono text-[11px] text-amber-300 font-semibold shrink-0">
                <Music className={`h-3 w-3 ${isPlaying ? 'animate-bounce text-emerald-400' : ''}`} />
                <span>Tocando:</span>
              </span>
              <span className="truncate font-mono text-slate-200 text-[11px]" title={currentDisplaySong}>
                {currentDisplaySong}
              </span>
            </div>
          </div>
        </div>

        {/* Center Section: Embedded Analog VU Meter (expands in horizontal desktop mode) */}
        <div className="flex justify-center items-center w-full xl:flex-1 py-1 xl:py-0 border-y xl:border-y-0 border-slate-800/80 xl:px-4">
          <AnalogVuMeter
            isPlaying={isPlaying}
            audioRef={audioRef}
            title="RFM"
            size="sm"
            className="w-full max-w-xs sm:max-w-sm xl:max-w-[360px]"
          />
        </div>

        {/* Right Section: Green Play Button & Volume */}
        <div className="flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-end shrink-0">
          
          {/* Play / Pause Green Button */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-300 shadow-lg ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/25 scale-102'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 hover:scale-102'
            } disabled:opacity-75 disabled:cursor-wait cursor-pointer shrink-0`}
            title={isPlaying ? "Pausar Transmissão" : "Ouvir Rádio RFM Ao Vivo"}
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Conectando...</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="h-4 w-4 fill-current" />
                <span>Pausar Áudio</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current ml-0.5" />
                <span>Ouvir RFM Ao Vivo</span>
              </>
            )}
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-2.5 py-2.5 rounded-xl shrink-0">
            <button
              onClick={toggleMute}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? "Ativar Som" : "Silenciar"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4 text-red-400" />
              ) : (
                <Volume2 className="h-4 w-4 text-amber-400" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-14 sm:w-20 accent-amber-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              title="Ajustar Volume"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
