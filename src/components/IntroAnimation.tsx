import React, { useCallback, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { MANAGERS } from '../data/managers';
import { Language } from '../types/menu';
import { BurgerAssembly } from './BurgerAssembly';
import { ManagerFigure } from './ManagerFigure';
import { PoldBrandLogo } from './PoldBrandLogo';

interface IntroAnimationProps {
  lang: Language;
  onComplete: () => void;
  onSkip: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({
  lang,
  onComplete,
  onSkip,
}) => {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [elapsedMs, setElapsedMs] = useState<number>(() =>
    reducedMotion ? 5300 : 0
  );
  const [isTransitioningToMenu, setIsTransitioningToMenu] =
    useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setElapsedMs(5300);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  // High-precision continuous timeline clock (0.0s -> 5.3s)
  useEffect(() => {
    if (reducedMotion) {
      setElapsedMs(5300);
      return;
    }

    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const current = now - startTime;
      setElapsedMs(current);
      if (current < 5400) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  // Smooth cinematic transition when user clicks EXPLORE MENU
  const handleExploreMenu = useCallback(() => {
    if (isTransitioningToMenu) return;
    setIsTransitioningToMenu(true);
    window.setTimeout(() => {
      onComplete();
    }, 620);
  }, [isTransitioningToMenu, onComplete]);

  // Keyboard support: Enter / Space activates Explore Menu once ready, Escape skips
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleExploreMenu();
      } else if (
        (e.key === 'Enter' || e.key === ' ') &&
        elapsedMs >= 5200
      ) {
        e.preventDefault();
        handleExploreMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [elapsedMs, handleExploreMenu]);

  // Exact Timeline Milestones (Section 4 & Section 14)
  const showTopLogo = reducedMotion || elapsedMs >= 300; // 0.3s
  const showMahmoud = reducedMotion || elapsedMs >= 600; // 0.6s (CENTER FOREGROUND)
  const showAhmed = reducedMotion || elapsedMs >= 800; // 0.8s (BACK LEFT)
  const showMohamed = reducedMotion || elapsedMs >= 1000; // 1.0s (BACK RIGHT)
  const showManagerNames =
    !reducedMotion && elapsedMs >= 1300 && elapsedMs < 2300; // 1.3s -> 2.3s
  const showManagersLabel =
    !reducedMotion && elapsedMs >= 1600 && elapsedMs < 2300; // 1.6s -> 2.3s
  const isIdlePhase = !reducedMotion && elapsedMs >= 2000; // 2.0s+
  const isRetreated = reducedMotion || elapsedMs >= 2300; // 2.3s+ managers retreat & open center
  const isBurgerVisible = reducedMotion || elapsedMs >= 2500; // 2.5s+
  const isBurgerHero = reducedMotion || elapsedMs >= 4300; // 4.3s+
  const showBrandStatement = reducedMotion || elapsedMs >= 4800; // 4.8s+
  const showExploreCta = reducedMotion || elapsedMs >= 5200; // 5.2s+

  return (
    <motion.section
      aria-label="POLD Cinematic Brand & Burger Experience"
      dir="ltr"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isTransitioningToMenu ? 0 : 1,
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-between px-4 py-4 sm:py-6 select-none bg-[#08080B] text-white"
    >
      {/* =================================================================
          0.0s & 2.3s: CONTINUOUS DARK STUDIO & RED ATMOSPHERIC GLOW
         ================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, #151014 0%, #0B0B0E 55%, #060608 100%)',
        }}
      />

      {/* Dynamic Center POLD Red Atmospheric Light (Intensifies at 2.3s when center opens) */}
      <motion.div
        initial={{ opacity: 0.22, scale: 0.85 }}
        animate={{
          opacity: isBurgerHero
            ? 0.95
            : isRetreated
            ? 0.8
            : elapsedMs >= 100
            ? 0.42
            : 0.2,
          scale: isBurgerHero ? 1.15 : isRetreated ? 1.05 : 0.9,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(229, 9, 9, 0.28) 0%, rgba(184, 6, 6, 0.09) 38%, rgba(8, 8, 11, 0) 68%)',
        }}
      />

      {/* =================================================================
          TOP BAR: 0.3s POLD LOGO REVEAL + SUBTLE SKIP BUTTON
         ================================================================= */}
      <div className="relative z-30 w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="w-20 sm:w-24">
          {/* 1.6s Supporting MANAGERS Label */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{
              opacity: showManagersLabel ? 1 : 0,
              y: showManagersLabel ? 0 : 4,
            }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50909]" />
            <span className="font-display text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-white/75">
              MANAGERS
            </span>
          </motion.div>
        </div>

        {/* 0.3s Minimal Elegant POLD Brand Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{
            opacity: showTopLogo ? (isRetreated ? 0.88 : 1) : 0,
            y: showTopLogo ? 0 : 8,
            scale: showTopLogo ? (isRetreated ? 0.92 : 1) : 0.96,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <PoldBrandLogo size="md" showTagline={!isRetreated} />
        </motion.div>

        {/* Accessible Quick Skip Control */}
        <div className="w-20 sm:w-24 flex justify-end">
          {!showExploreCta && (
            <button
              type="button"
              onClick={onSkip}
              aria-label={lang === 'ar' ? 'تخطي' : 'Skip to menu'}
              className="min-h-[38px] px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-[10px] font-display font-semibold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-all cursor-pointer"
            >
              SKIP
            </button>
          )}
        </div>
      </div>

      {/* =================================================================
          CONTINUOUS CENTER STAGE:
          THREE MANAGERS (0.6s-2.3s) -> OPEN CENTER (2.3s) -> BURGER (2.5s-4.3s)
         ================================================================= */}
      <motion.div
        animate={
          isTransitioningToMenu
            ? {
                scale: 1.06,
                y: -28,
              }
            : {
                scale: 1,
                y: 0,
              }
        }
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-auto"
      >
        <div className="relative w-full h-[390px] xs:h-[420px] sm:h-[470px] flex items-center justify-center">
          {/* =============================================================
              2. AHMED — FIXED BACK LEFT (Enters at 0.8s, Opens Left at 2.3s)
             ============================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -165, y: 12, scale: 0.88 }}
            animate={
              !showAhmed
                ? { opacity: 0, x: -165, y: 12, scale: 0.88 }
                : isRetreated
                ? {
                    opacity: 0.76,
                    x: 'clamp(-270px, -33vw, -118px)',
                    y: -18,
                    scale: 0.82,
                  }
                : {
                    opacity: 1,
                    x: 'clamp(-185px, -24vw, -92px)',
                    y: -10,
                    scale: 0.92,
                  }
            }
            transition={{
              duration: isRetreated ? 0.85 : 0.68,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute z-10 flex flex-col items-center will-change-transform"
          >
            <ManagerFigure
              manager={MANAGERS.ahmed}
              showName={showManagerNames}
              isIdle={isIdlePhase}
              isRetreated={isRetreated}
              reducedMotion={reducedMotion}
              variant="hero"
            />
          </motion.div>

          {/* =============================================================
              3. MOHAMED — FIXED BACK RIGHT (Enters at 1.0s, Opens Right at 2.3s)
             ============================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 165, y: 12, scale: 0.88 }}
            animate={
              !showMohamed
                ? { opacity: 0, x: 165, y: 12, scale: 0.88 }
                : isRetreated
                ? {
                    opacity: 0.76,
                    x: 'clamp(118px, 33vw, 270px)',
                    y: -18,
                    scale: 0.82,
                  }
                : {
                    opacity: 1,
                    x: 'clamp(92px, 24vw, 185px)',
                    y: -10,
                    scale: 0.92,
                  }
            }
            transition={{
              duration: isRetreated ? 0.85 : 0.68,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute z-10 flex flex-col items-center will-change-transform"
          >
            <ManagerFigure
              manager={MANAGERS.mohamed}
              showName={showManagerNames}
              isIdle={isIdlePhase}
              isRetreated={isRetreated}
              reducedMotion={reducedMotion}
              variant="hero"
            />
          </motion.div>

          {/* =============================================================
              1. MAHMOUD — FIXED CENTER FOREGROUND (Enters at 0.6s, Steps Back at 2.3s)
             ============================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 0, y: 24, scale: 0.95 }}
            animate={
              !showMahmoud
                ? { opacity: 0, x: 0, y: 24, scale: 0.95 }
                : isRetreated
                ? {
                    opacity: 0.68,
                    x: 0,
                    y: -96,
                    scale: 0.76,
                  }
                : {
                    opacity: 1,
                    x: 0,
                    y: 8,
                    scale: 1.04,
                  }
            }
            transition={{
              duration: isRetreated ? 0.88 : 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute z-20 flex flex-col items-center will-change-transform"
          >
            <ManagerFigure
              manager={MANAGERS.mahmoud}
              showName={showManagerNames}
              isIdle={isIdlePhase}
              isRetreated={isRetreated}
              reducedMotion={reducedMotion}
              variant="hero"
            />
          </motion.div>

          {/* =============================================================
              2.3s+: FOREGROUND DARK STAGE PEDESTAL SEPARATOR
              Ensures the revealed burger sits in a crisp unobstructed center space
              while the three managers remain visible behind/beside it
             ============================================================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isRetreated ? 1 : 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="absolute inset-x-0 bottom-0 h-[250px] sm:h-[280px] z-25 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 52% 68% at 50% 62%, rgba(8, 8, 11, 0.94) 25%, rgba(8, 8, 11, 0.68) 58%, transparent 88%)',
            }}
          />

          {/* =============================================================
              2.5s -> 4.3s: CENTER HERO POLD BURGER ASSEMBLY
             ============================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 46 }}
            animate={
              isTransitioningToMenu
                ? {
                    opacity: 1,
                    scale: 0.82,
                    y: -30,
                  }
                : isBurgerVisible
                ? {
                    opacity: 1,
                    scale: 1,
                    y: 42,
                  }
                : {
                    opacity: 0,
                    scale: 0.88,
                    y: 58,
                  }
            }
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-30 flex items-center justify-center"
          >
            <BurgerAssembly
              elapsedMs={elapsedMs}
              reducedMotion={reducedMotion}
              size="hero"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* =================================================================
          BOTTOM HERO FOOTER:
          4.8s: POLD — POLD BURGER Eat Pold Think Pold
          5.2s: EXPLORE MENU CTA
         ================================================================= */}
      <div className="relative z-30 w-full max-w-md mx-auto min-h-[132px] sm:min-h-[146px] flex flex-col items-center justify-end pb-1 sm:pb-2 text-center">
        {/* 4.8s Brand Statement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: showBrandStatement ? 1 : 0,
            y: showBrandStatement ? 0 : 10,
          }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-[0.14em] uppercase text-white leading-none">
            POLD
          </h1>
          <p className="mt-1.5 font-display text-xs sm:text-sm font-semibold tracking-[0.26em] text-[#F4F1EE]/85">
            <span>POLD BURGER</span>{' '}
            <span className="text-[#E50909]">Eat Pold Think Pold</span>
          </p>
        </motion.div>

        {/* 5.2s EXPLORE MENU Main Interactive CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{
            opacity: showExploreCta ? 1 : 0,
            y: showExploreCta ? 0 : 10,
            scale: showExploreCta ? 1 : 0.96,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 w-full flex justify-center"
        >
          <button
            type="button"
            onClick={handleExploreMenu}
            disabled={!showExploreCta}
            className="group relative min-h-[48px] px-8 py-3 rounded-xl bg-[#E50909] hover:bg-[#F21212] text-white font-display text-sm sm:text-base font-bold tracking-[0.2em] uppercase flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] cursor-pointer shadow-[0_0_28px_rgba(229,9,9,0.45)] hover:shadow-[0_0_38px_rgba(229,9,9,0.7)] border border-white/15"
          >
            <span>EXPLORE MENU</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};
