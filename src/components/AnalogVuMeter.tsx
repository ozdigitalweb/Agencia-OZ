import React, { useEffect, useState, useRef } from 'react';

interface AnalogVuMeterProps {
  isPlaying: boolean;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
  title?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function AnalogVuMeter({
  isPlaying,
  audioRef,
  title = "VU METER",
  className = "",
  size = "md"
}: AnalogVuMeterProps) {
  const [levelL, setLevelL] = useState<number>(0);
  const [levelR, setLevelR] = useState<number>(0);
  
  // Animation frame loop for realistic needle physics
  const requestRef = useRef<number | null>(null);
  const currentL = useRef<number>(0);
  const currentR = useRef<number>(0);
  const targetL = useRef<number>(0);
  const targetR = useRef<number>(0);
  const velocityL = useRef<number>(0);
  const velocityR = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      if (isPlaying) {
        // Smooth vintage analog dual-channel VU meter dynamics
        const time = Date.now() / 160;
        const wave1 = Math.sin(time * 1.4) * 0.12;
        const wave2 = Math.cos(time * 2.7) * 0.08;
        const wave3 = Math.sin(time * 4.2) * 0.05;

        const waveR1 = Math.sin(time * 1.4 + 0.3) * 0.12;
        const waveR2 = Math.cos(time * 2.7 + 0.2) * 0.08;

        // Base music energy level around -5dB to -2dB range
        const rhythm = Math.sin(time * 0.7) > 0.4 ? 0.10 : 0.02;

        targetL.current = Math.min(0.82, Math.max(0.18, 0.42 + wave1 + wave2 + wave3 + rhythm));
        targetR.current = Math.min(0.80, Math.max(0.18, 0.40 + waveR1 + waveR2 + wave3 + rhythm));
      } else {
        targetL.current = 0;
        targetR.current = 0;
      }

      // Smooth damped needle physics (analog inertia)
      const spring = 0.09;
      const friction = 0.82;

      const forceL = (targetL.current - currentL.current) * spring;
      velocityL.current = (velocityL.current + forceL) * friction;
      currentL.current += velocityL.current;

      const forceR = (targetR.current - currentR.current) * spring;
      velocityR.current = (velocityR.current + forceR) * friction;
      currentR.current += velocityR.current;

      setLevelL(Math.max(0, Math.min(1, currentL.current)));
      setLevelR(Math.max(0, Math.min(1, currentR.current)));

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  const angleL = -48 + levelL * 96;
  const angleR = -48 + levelR * 96;

  const isSmall = size === 'sm';

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Stereo Dual Gauge Frame */}
      <div className={`bg-slate-950 border-2 border-slate-800 rounded-xl shadow-2xl relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 w-full ${
        isSmall ? 'p-1.5' : 'p-2'
      }`}>
        
        {/* Metal Bezel / Vintage Header */}
        <div className={`flex items-center justify-between border-b border-slate-800/80 pb-1 mb-1 px-1 ${
          isSmall ? 'text-[8px] sm:text-[9px]' : 'text-[9px] sm:text-[10px]'
        }`}>
          <div className="flex items-center gap-1.5">
            <span className={`rounded-full transition-colors duration-300 ${isSmall ? 'w-1.5 h-1.5' : 'w-2 h-2'} ${isPlaying ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-slate-700'}`} />
            <span className="font-extrabold uppercase tracking-widest text-slate-400 font-mono">
              ANALOG {title}
            </span>
          </div>
          <span className="font-mono font-bold text-amber-500/80 bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/20 text-[8px]">
            RFM dB
          </span>
        </div>

        {/* Meters Container (Left & Right Channel) */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 justify-items-center w-full">
          <SingleGauge angle={angleL} isPlaying={isPlaying} channel="CH-L" isSmall={isSmall} />
          <SingleGauge angle={angleR} isPlaying={isPlaying} channel="CH-R" isSmall={isSmall} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-xl" />
      </div>
    </div>
  );
}

function SingleGauge({ angle, isPlaying, channel, isSmall = false }: { angle: number; isPlaying: boolean; channel: string; isSmall?: boolean }) {
  return (
    <div className={`relative bg-[#fffbe6] rounded-lg border border-amber-900/30 overflow-hidden shadow-inner flex flex-col items-center justify-between pt-0.5 w-full ${
      isSmall ? 'max-w-[130px] sm:max-w-[150px] xl:max-w-[165px] h-13 sm:h-15' : 'max-w-[150px] sm:max-w-[175px] xl:max-w-[190px] h-15 sm:h-17'
    }`}>
      
      {/* Warm Analog Backlight Glow */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isPlaying ? 'opacity-100 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/80 via-amber-300/40 to-amber-100/20' : 'opacity-40 bg-amber-100/30'
        }`} 
      />

      {/* Dial Markings SVG */}
      <svg className="w-full h-full absolute inset-0 z-10" viewBox="0 0 120 70">
        <path d="M 18 48 A 45 45 0 0 1 88 22" fill="none" stroke="#1e293b" strokeWidth="1.8" />
        <path d="M 88 22 A 45 45 0 0 1 102 48" fill="none" stroke="#dc2626" strokeWidth="2.5" />

        <line x1="22" y1="46" x2="26" y2="42" stroke="#1e293b" strokeWidth="1.5" />
        <text x="21" y="55" fontSize="7" fontWeight="bold" fill="#334155" textAnchor="middle" fontFamily="sans-serif">-20</text>

        <line x1="34" y1="34" x2="38" y2="31" stroke="#1e293b" strokeWidth="1.5" />
        <text x="32" y="42" fontSize="6.5" fontWeight="bold" fill="#334155" textAnchor="middle" fontFamily="sans-serif">-10</text>

        <line x1="60" y1="22" x2="60" y2="18" stroke="#1e293b" strokeWidth="1.5" />
        <text x="60" y="30" fontSize="6.5" fontWeight="bold" fill="#334155" textAnchor="middle" fontFamily="sans-serif">-5</text>

        <line x1="86" y1="24" x2="88" y2="20" stroke="#dc2626" strokeWidth="2" />
        <text x="85" y="33" fontSize="7" fontWeight="900" fill="#dc2626" textAnchor="middle" fontFamily="sans-serif">0</text>

        <line x1="96" y1="31" x2="99" y2="28" stroke="#dc2626" strokeWidth="1.8" />
        <text x="100" y="40" fontSize="6.5" fontWeight="bold" fill="#dc2626" textAnchor="middle" fontFamily="sans-serif">+3</text>

        <text x="60" y="48" fontSize="8" fontWeight="bold" fill="#475569" textAnchor="middle" fontFamily="serif" letterSpacing="1">VU</text>
      </svg>

      {/* Channel Label */}
      <div className="absolute top-1 left-1.5 z-20 text-[8px] sm:text-[9px] font-mono font-extrabold text-slate-700 bg-amber-200/70 px-1 rounded border border-amber-400/50">
        {channel}
      </div>

      {/* Analog Needle Indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20 w-1 h-1 flex items-center justify-center">
        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-600 border border-slate-700 shadow-md relative z-30 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
        </div>

        <div 
          className={`absolute bottom-0.5 w-0.5 bg-gradient-to-t from-slate-900 via-slate-800 to-red-600 origin-bottom z-20 transition-transform duration-75 ease-out shadow-sm ${
            isSmall ? 'h-7 sm:h-8' : 'h-8 sm:h-9'
          }`}
          style={{ 
            transform: `rotate(${angle}deg)`,
            transformOrigin: 'bottom center'
          }}
        >
          {/* Small Red Arrow Tip */}
          <div className="absolute -top-1.5 -left-[2.5px] w-0 h-0 border-l-[3.5px] border-r-[3.5px] border-b-[7px] border-l-transparent border-r-transparent border-b-red-600 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none z-30" />
    </div>
  );
}
