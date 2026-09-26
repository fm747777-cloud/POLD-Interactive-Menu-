import React from 'react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/menuData';
import { Language } from '../types/menu';

interface LogoRevealProps {
  visible: boolean;
  reducedMotion: boolean;
  lang: Language;
}

export const LogoReveal: React.FC<LogoRevealProps> = ({
  visible,
  reducedMotion,
  lang,
}) => {
  return (
    <motion.div
      initial={
        reducedMotion
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.94, y: 10 }
      }
      animate={
        reducedMotion || visible
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.94, y: 10 }
      }
      transition={{
        duration: reducedMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center select-none flex flex-col items-center"
    >
      {/* Bold Condensed White POLD Brand Wordmark */}
      <h1 className="font-display text-6xl sm:text-7xl font-bold tracking-tight text-[#FFFFFF] leading-none drop-shadow-[0_6px_20px_rgba(0,0,0,0.28)]">
        {RESTAURANT_INFO.brandName}
      </h1>

      {/* Descriptor: BURGER • FRIED CHICKEN */}
      <div className="mt-2.5 flex items-center gap-2.5">
        <span className="h-[1.5px] w-5 bg-white/45 rounded-full" aria-hidden="true" />
        <p className="font-display text-xs sm:text-sm font-bold tracking-[0.24em] uppercase text-[#FFF9F5]">
          {RESTAURANT_INFO.taglineEn}
        </p>
        <span className="h-[1.5px] w-5 bg-white/45 rounded-full" aria-hidden="true" />
      </div>

      {/* Subtle Arabic Descriptor */}
      <p className="mt-1 font-arabic text-xs sm:text-sm font-bold text-white/85">
        {lang === 'ar'
          ? 'برجر مشوي على اللهب • فرايد تشيكن'
          : 'Flame-Grilled Burgers • Crispy Fried Chicken'}
      </p>
    </motion.div>
  );
};
