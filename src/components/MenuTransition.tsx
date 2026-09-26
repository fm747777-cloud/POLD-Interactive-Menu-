import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Language } from '../types/menu';
import { IntroAnimation } from './IntroAnimation';

interface MenuTransitionProps {
  showIntro: boolean;
  lang: Language;
  onIntroComplete: () => void;
  onSkipIntro: () => void;
  children: React.ReactNode;
}

export const MenuTransition: React.FC<MenuTransitionProps> = ({
  showIntro,
  lang,
  onIntroComplete,
  onSkipIntro,
  children,
}) => {
  return (
    <div className="relative min-h-dvh bg-[#0A0A0D] text-[#FFFFFF] overflow-x-hidden">
      {/* Continuous Cinematic Hero Overlay */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroAnimation
            key="pold-cinematic-hero"
            lang={lang}
            onComplete={onIntroComplete}
            onSkip={onSkipIntro}
          />
        )}
      </AnimatePresence>

      {/* Interactive Digital Menu — Revealed in the same dark POLD world */}
      <motion.div
        initial={false}
        animate={{
          opacity: showIntro ? 0 : 1,
          y: showIntro ? 14 : 0,
        }}
        transition={{
          duration: 0.52,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={showIntro ? 'pointer-events-none select-none' : ''}
      >
        {children}
      </motion.div>
    </div>
  );
};
