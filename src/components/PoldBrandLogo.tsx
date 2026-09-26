import React from 'react';

interface PoldBrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

/**
 * Renders the authentic POLD brand wordmark with the signature burger-O emblem
 * matching the POLD managers' uniform chest insignia.
 */
export const PoldBrandLogo: React.FC<PoldBrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: {
      text: 'text-2xl tracking-tight',
      burger: 'w-5 h-5 mx-0.5',
      sub: 'text-[9px] tracking-[0.26em]',
    },
    md: {
      text: 'text-3xl sm:text-4xl tracking-tight',
      burger: 'w-6 h-6 sm:w-7 sm:h-7 mx-0.5',
      sub: 'text-[10px] tracking-[0.28em]',
    },
    lg: {
      text: 'text-5xl sm:text-6xl tracking-tight',
      burger: 'w-9 h-9 sm:w-11 sm:h-11 mx-1',
      sub: 'text-xs tracking-[0.3em]',
    },
    xl: {
      text: 'text-6xl sm:text-7xl tracking-tight',
      burger: 'w-11 h-11 sm:w-14 sm:h-14 mx-1',
      sub: 'text-xs sm:text-sm tracking-[0.32em]',
    },
  }[size];

  return (
    <div
      dir="ltr"
      className={`inline-flex flex-col items-center select-none ${className}`}
    >
      <div
        className={`inline-flex items-center font-display font-bold text-white leading-none ${sizeClasses.text}`}
      >
        <span>P</span>
        {/* Stylized Burger 'O' Emblem matching the uniform chest logo */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses.burger} shrink-0 drop-shadow-[0_4px_10px_rgba(229,9,9,0.35)]`}
          aria-hidden="true"
        >
          {/* Top Golden Bun */}
          <path
            d="M8 20C8 11.5 15 6 24 6C33 6 40 11.5 40 20H8Z"
            fill="#F59E0B"
          />
          <path
            d="M12 17C14.5 11.5 19 9 24 9C29 9 33.5 11.5 36 17"
            stroke="#FDE68A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.65"
          />
          {/* Crisp POLD Red & Cheddar Middle Layers */}
          <rect x="6" y="22" width="36" height="4.5" rx="2.25" fill="#E50909" />
          <path d="M9 26.5H39L35 30H13L9 26.5Z" fill="#FBBF24" />
          <rect
            x="7"
            y="29.5"
            width="34"
            height="4.5"
            rx="2.25"
            fill="#78350F"
          />
          {/* Bottom Golden Bun */}
          <path
            d="M9 36H39C39 40.5 33.5 43 24 43C14.5 43 9 40.5 9 36Z"
            fill="#F59E0B"
          />
        </svg>
        <span>LD</span>
      </div>

      {showTagline && (
        <span
          className={`mt-1.5 font-display font-bold uppercase text-white/75 ${sizeClasses.sub}`}
        >
          BURGER • FRIED CHICKEN
        </span>
      )}
    </div>
  );
};
