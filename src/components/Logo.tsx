import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md';
}

export default function Logo({ className = "", iconOnly = false, size = "md" }: LogoProps) {
  const textClass = size === 'sm' 
    ? 'text-[28px]' 
    : 'text-[35px]';

  const svgClass = size === 'sm'
    ? 'h-11'
    : 'h-14';

  return (
    <div className={`flex flex-row items-end gap-2.5 ${className}`}>
      {!iconOnly && (
        <span className={`${textClass} text-[#FF5500] font-normal uppercase tracking-[0.03em] leading-none select-none pb-[2px]`}>
          AGÊNCIA
        </span>
      )}

      {/* Crisp scalable vector implementation of the custom uploaded OZ logo */}
      <svg
        viewBox="0 8 100 72"
        className={`${svgClass} w-auto shrink-0 select-none`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Blue gradient for the 'O' ring */}
          <linearGradient id="oGradient" x1="15" y1="35" x2="60" y2="75" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          {/* Silver/Grey gradient for the 'Z' */}
          <linearGradient id="zGradient" x1="55" y1="35" x2="85" y2="75" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* 1. Energy Rays / Sparks above the 'O' */}
        {/* Ray 1 (Blue - left) */}
        <path d="M15 44 L5 41" stroke="#2563EB" strokeWidth="3.5" strokeLinecap="round" />
        {/* Ray 2 (Vibrant Blue - up-left) */}
        <path d="M16 34 L8 27" stroke="#3B82F6" strokeWidth="3.5" strokeLinecap="round" />
        {/* Ray 3 (Emerald Green - top-left-up) */}
        <path d="M21 26 L16 17" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
        {/* Ray 4 (Silver/Grey - top-up) */}
        <path d="M29 21 L26 11" stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round" />
        {/* Ray 5 (Dark Blue - top-right-up) */}
        <path d="M38 19 L39 10" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" />

        {/* 2. Stylized O Ring (Blue) */}
        <circle cx="36" cy="56" r="18" stroke="url(#oGradient)" strokeWidth="10" />

        {/* 3. Bold Rounded Z (Grey/Silver) */}
        <path
          d="M58 38 H80 L58 74 H80"
          stroke="url(#zGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
