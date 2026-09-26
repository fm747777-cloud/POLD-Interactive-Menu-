import React from 'react';
import { motion } from 'motion/react';
import { LayerCutoutGraphic } from '../motion/LayerCutoutGraphic';
import { IngredientLayerType } from '../types/menu';

export interface HeroBurgerStep {
  id: string;
  nameEn: string;
  nameAr: string;
  type: IngredientLayerType;
  /** Exact timeline appearance in milliseconds from hero start */
  enterAtMs: number;
  /** Initial Y offset before settling into assembled position */
  initialY: number;
  /** Final vertical position in assembled stack */
  assembledY: number;
  /** Z-index for proper bottom-to-top food stacking */
  zIndex: number;
}

/**
 * Exact ingredients of the signature POLD BURGER (id: 'pold-burger' in menuData.ts):
 * - Bottom Bun (2.6s)
 * - Smoked BBQ & Big Tasty Sauce (2.8s)
 * - Flame-Grilled Beef Patty (3.1s)
 * - Cheddar Cheese (3.4s)
 * - Fresh Lettuce, Tomatoes, Pickles & Onion Rings (3.7s)
 * - Top Bun (4.0s)
 */
export const POLD_HERO_BURGER_STEPS: HeroBurgerStep[] = [
  {
    id: 'hero-bun-bottom',
    nameEn: 'Toasted Brioche Bottom Bun',
    nameAr: 'الخبز السفلي المحمص',
    type: 'bun-bottom',
    enterAtMs: 2600,
    initialY: 92,
    assembledY: 56,
    zIndex: 10,
  },
  {
    id: 'hero-sauce',
    nameEn: 'Smoked BBQ & Big Tasty Sauce',
    nameAr: 'صوص الباربكيو المدخن والبيج تيستي',
    type: 'sauce-signature',
    enterAtMs: 2800,
    initialY: 16,
    assembledY: 40,
    zIndex: 20,
  },
  {
    id: 'hero-patty',
    nameEn: 'Flame-Grilled Beef Patty',
    nameAr: 'البرجر المشوي على اللهب',
    type: 'beef',
    enterAtMs: 3100,
    initialY: -28,
    assembledY: 20,
    zIndex: 30,
  },
  {
    id: 'hero-cheese',
    nameEn: 'Melted Cheddar Sauce',
    nameAr: 'صوص الشيدر الذائب',
    type: 'cheese',
    enterAtMs: 3400,
    initialY: -44,
    assembledY: 4,
    zIndex: 40,
  },
  {
    id: 'hero-lettuce',
    nameEn: 'Fresh Lettuce & Pickles',
    nameAr: 'الخس والخيار المخلل',
    type: 'lettuce',
    enterAtMs: 3700,
    initialY: -58,
    assembledY: -10,
    zIndex: 50,
  },
  {
    id: 'hero-tomato',
    nameEn: 'Fresh Tomatoes',
    nameAr: 'الطماطم الفريش',
    type: 'tomato',
    enterAtMs: 3760,
    initialY: -68,
    assembledY: -22,
    zIndex: 55,
  },
  {
    id: 'hero-onion-rings',
    nameEn: 'Crispy Onion Rings',
    nameAr: 'حلقات البصل الفريش',
    type: 'onion-rings',
    enterAtMs: 3830,
    initialY: -78,
    assembledY: -34,
    zIndex: 60,
  },
  {
    id: 'hero-bun-top',
    nameEn: 'Artisan Sesame Top Bun',
    nameAr: 'الخبز العلوي بالسمسم',
    type: 'bun-top',
    enterAtMs: 4000,
    initialY: -115,
    assembledY: -54,
    zIndex: 70,
  },
];

interface BurgerAssemblyProps {
  /** Elapsed timeline milliseconds (0 -> 5500+) */
  elapsedMs: number;
  /** Respect device prefers-reduced-motion */
  reducedMotion?: boolean;
  /** Compact size when rendered inside the menu top banner */
  size?: 'hero' | 'banner';
}

export const BurgerAssembly: React.FC<BurgerAssemblyProps> = ({
  elapsedMs,
  reducedMotion = false,
  size = 'hero',
}) => {
  const isStageVisible = reducedMotion || elapsedMs >= 2500;
  const isCompleteHero = reducedMotion || elapsedMs >= 4300;

  const containerSizeClasses =
    size === 'banner'
      ? 'w-[180px] sm:w-[210px] h-[155px] sm:h-[175px]'
      : 'w-[240px] xs:w-[265px] sm:w-[300px] h-[215px] xs:h-[235px] sm:h-[260px]';

  const layerWidthClasses =
    size === 'banner'
      ? 'w-[165px] sm:w-[195px]'
      : 'w-[215px] xs:w-[240px] sm:w-[270px]';

  const yScale = size === 'banner' ? 0.72 : 1;

  return (
    <div
      className={`relative ${containerSizeClasses} mx-auto flex items-center justify-center select-none pointer-events-none`}
    >
      {/* 2.5s: Studio Pedestal Rim Glow emerging naturally from the center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{
          opacity: isCompleteHero ? 0.95 : isStageVisible ? 0.65 : 0,
          scale: isCompleteHero ? 1.12 : isStageVisible ? 0.96 : 0.75,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 54%, rgba(229, 9, 9, 0.34) 0%, rgba(255, 140, 60, 0.12) 42%, rgba(10, 10, 12, 0) 72%)',
        }}
      />

      {/* Ground Studio Shadow that tightens as the burger completes */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={{
          opacity: isCompleteHero ? 0.85 : isStageVisible ? 0.5 : 0,
          scaleX: isCompleteHero ? 1.04 : isStageVisible ? 0.84 : 0.5,
          y: (size === 'banner' ? 66 : 88) * 1,
        }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="absolute w-48 sm:w-56 h-6 rounded-full bg-black/90 blur-md pointer-events-none"
      />

      {/* 4.3s: Subtle Cinematic Camera Push-In on the Completed Burger */}
      <motion.div
        animate={
          reducedMotion
            ? { scale: 1, y: 0 }
            : isCompleteHero
            ? {
                scale: 1.055,
                y: -3,
              }
            : {
                scale: isStageVisible ? 1 : 0.92,
                y: 0,
              }
        }
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {POLD_HERO_BURGER_STEPS.map((step, index) => {
          const isLayerEntered = reducedMotion || elapsedMs >= step.enterAtMs;

          return (
            <motion.div
              key={step.id}
              style={{ zIndex: step.zIndex }}
              initial={
                reducedMotion
                  ? {
                      opacity: 1,
                      y: step.assembledY * yScale,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      y: step.initialY * yScale,
                      scale: 0.94,
                    }
              }
              animate={
                isLayerEntered
                  ? {
                      opacity: 1,
                      y: step.assembledY * yScale,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      y: step.initialY * yScale,
                      scale: 0.94,
                    }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      type: 'spring',
                      stiffness: step.id === 'hero-patty' ? 250 : 210,
                      damping: step.id === 'hero-cheese' ? 24 : 21,
                      mass: step.id === 'hero-patty' ? 1.05 : 0.9,
                    }
              }
              className={`absolute ${layerWidthClasses} flex items-center justify-center will-change-transform`}
            >
              <LayerCutoutGraphic
                layer={{
                  id: step.id,
                  name: step.nameEn,
                  nameAr: step.nameAr,
                  type: step.type,
                  layer: index + 1,
                  origin: 'top',
                  assembledY: step.assembledY,
                }}
                uid={`hero-${size}-${step.id}`}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
