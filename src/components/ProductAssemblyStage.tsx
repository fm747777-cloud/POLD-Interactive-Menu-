import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { LayerCutoutGraphic } from '../motion/LayerCutoutGraphic';
import { MOTION_TOKENS, POLD_SPRINGS } from '../motion/motionTokens';
import { Language, Product, ProductIngredientLayer } from '../types/menu';

export type UnifiedAssemblyPhase = 'hero' | 'deconstruct' | 'assemble' | 'final';

interface ProductAssemblyStageProps {
  product: Product;
  lang: Language;
  replayTrigger: number;
  reducedMotion: boolean;
  extraPatties?: number;
}

/**
 * Computes the deconstructed (exploded) vertical/horizontal offset for each
 * verified ingredient layer based strictly on the product's structured ingredients.
 */
function getDeconstructedVector(
  layer: ProductIngredientLayer,
  index: number,
  total: number
): { x: number; y: number; rotate: number; scale: number } {
  if (total === 1) {
    return { x: 0, y: -12, rotate: -2, scale: 1.08 };
  }

  // Spread layers vertically from bottom (+) to top (-) around center
  const progress = index / Math.max(total - 1, 1);
  const spreadSpan = Math.min(185, Math.max(95, total * 25));
  const y = Math.round((0.5 - progress) * spreadSpan);

  const horizontalMap: Record<ProductIngredientLayer['origin'], number> = {
    bottom: 0,
    top: 0,
    left: -26,
    right: 26,
    'upper-left': -22,
    'upper-right': 22,
    'lower-left': -20,
    'lower-right': 20,
    'scale-fade': index % 2 === 0 ? -14 : 14,
  };

  const rotateMap: Record<ProductIngredientLayer['origin'], number> = {
    bottom: -2,
    top: 3,
    left: -6,
    right: 6,
    'upper-left': -5,
    'upper-right': 5,
    'lower-left': -4,
    'lower-right': 4,
    'scale-fade': index % 2 === 0 ? -3 : 3,
  };

  return {
    x: horizontalMap[layer.origin] ?? 0,
    y,
    rotate: rotateMap[layer.origin] ?? 0,
    scale: 1.04,
  };
}

export const ProductAssemblyStage: React.FC<ProductAssemblyStageProps> = ({
  product,
  lang,
  replayTrigger,
  reducedMotion,
  extraPatties = 0,
}) => {
  const [phase, setPhase] = useState<UnifiedAssemblyPhase>(
    reducedMotion ? 'final' : 'hero'
  );

  // Build the exact verified ingredient layers for the selected product
  const activeLayers = useMemo<ProductIngredientLayer[]>(() => {
    const base = [...product.ingredients].sort((a, b) => a.layer - b.layer);

    if (
      extraPatties <= 0 ||
      (product.category !== 'burgers' && product.category !== 'chicken')
    ) {
      return base;
    }

    const isChicken = product.category === 'chicken';
    const targetType = isChicken ? 'chicken-crispy' : 'beef';
    const targetIdx = base.findIndex((l) => l.type === targetType);
    if (targetIdx === -1) return base;

    const result: ProductIngredientLayer[] = [];
    base.forEach((item, idx) => {
      result.push({ ...item });
      if (idx === targetIdx) {
        for (let p = 1; p <= extraPatties; p++) {
          result.push({
            id: `${product.id}-extra-${targetType}-${p}`,
            name: isChicken
              ? `Extra Chicken Slice #${p}`
              : `Extra Beef Slice #${p}`,
            nameAr: isChicken
              ? `شريحة فراخ إضافية #${p}`
              : `شريحة بيف إضافية #${p}`,
            type: targetType,
            layer: item.layer + p * 0.1,
            origin: p % 2 === 1 ? 'left' : 'right',
            assembledY: item.assembledY,
          });
        }
      }
    });

    const total = result.length;
    const maxSpan = Math.min(126, Math.max(68, total * 13));
    return result.map((layer, idx) => {
      const progress = total > 1 ? idx / (total - 1) : 0.5;
      const computedY = Math.round((0.5 - progress) * maxSpan);
      return {
        ...layer,
        layer: idx + 1,
        assembledY: computedY,
      };
    });
  }, [product, extraPatties]);

  // Unified POLD sequence: hero -> deconstruct -> assemble -> final
  useEffect(() => {
    if (reducedMotion) {
      setPhase('final');
      return;
    }

    setPhase('hero');

    const tDeconstruct = window.setTimeout(() => {
      setPhase('deconstruct');
    }, 280);

    const tAssemble = window.setTimeout(() => {
      setPhase('assemble');
    }, 1020);

    const tFinal = window.setTimeout(() => {
      setPhase('final');
    }, 1780);

    return () => {
      window.clearTimeout(tDeconstruct);
      window.clearTimeout(tAssemble);
      window.clearTimeout(tFinal);
    };
  }, [product.id, replayTrigger, extraPatties, reducedMotion]);

  const totalLayers = activeLayers.length;

  return (
    <div className="relative w-full h-60 sm:h-68 flex items-center justify-center overflow-hidden select-none px-4">
      {/* Studio Spotlight Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 52%, rgba(229, 9, 9, 0.24) 0%, rgba(184, 6, 6, 0.08) 44%, rgba(17, 17, 17, 0) 74%)',
        }}
      />

      {/* Quiet Stage Status Indicator */}
      <div className="absolute top-2 inset-x-5 flex items-center justify-between pointer-events-none z-20">
        <span className="text-[11px] font-mono-num tracking-wider uppercase text-white/60">
          {totalLayers > 1 ? (
            <>
              {phase === 'hero' &&
                (lang === 'ar' ? 'العرض الكامل' : 'Hero View')}
              {phase === 'deconstruct' &&
                (lang === 'ar' ? 'تفكيك المكونات' : 'Ingredients Separated')}
              {phase === 'assemble' &&
                (lang === 'ar' ? 'تجميع المكونات' : 'Assembling Ingredients')}
              {phase === 'final' &&
                (lang === 'ar'
                  ? `${totalLayers} مكونات`
                  : `${totalLayers} Ingredients`)}
            </>
          ) : lang === 'ar' ? (
            product.nameAr
          ) : (
            product.nameEn
          )}
        </span>
      </div>

      {/* Floor Shadow under the Product Stack */}
      <motion.div
        animate={
          phase === 'deconstruct'
            ? { scaleX: 0.78, opacity: 0.35 }
            : phase === 'final'
            ? { scaleX: [1, 1.08, 1], opacity: 0.65 }
            : { scaleX: 0.95, opacity: 0.55 }
        }
        transition={{ duration: MOTION_TOKENS.medium }}
        className="absolute bottom-5 w-44 h-5 rounded-full bg-black/80 blur-md pointer-events-none"
      />

      {/* Unified Product Stack Container */}
      <motion.div
        animate={
          phase === 'final' && !reducedMotion
            ? {
                scaleX: [1, 1.04, 1],
                scaleY: [1, 0.96, 1],
                y: [0, -3, 0],
              }
            : { scaleX: 1, scaleY: 1, y: 0 }
        }
        transition={
          phase === 'final' && !reducedMotion
            ? {
                scaleX: { duration: 0.36, ease: 'easeOut' },
                scaleY: { duration: 0.36, ease: 'easeOut' },
                y: {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.36,
                },
              }
            : { duration: MOTION_TOKENS.fast }
        }
        className="relative w-full max-w-[250px] sm:max-w-[270px] h-full flex items-center justify-center"
      >
        {/* Authentic Transparent Product Image (shown in hero & final states when product.image exists) */}
        {product.image && (
          <motion.img
            src={product.image}
            alt={
              lang === 'ar'
                ? `${product.nameAr} - ${product.nameEn}`
                : `${product.nameEn} - ${product.nameAr}`
            }
            referrerPolicy="no-referrer"
            initial={false}
            animate={
              phase === 'deconstruct' || phase === 'assemble'
                ? { opacity: 0, scale: 0.92 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.26, ease: 'easeOut' }}
            style={{ zIndex: totalLayers + 2 }}
            className="absolute inset-0 w-full h-full object-contain p-3 sm:p-4 drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)] pointer-events-none select-none"
          />
        )}

        {activeLayers.map((layer, idx) => {
          const deconstructed = getDeconstructedVector(layer, idx, totalLayers);
          const isTopCrown = idx === totalLayers - 1 && totalLayers > 1;
          const hideForProductPhoto =
            Boolean(product.image) && (phase === 'hero' || phase === 'final');

          const targetState =
            phase === 'deconstruct'
              ? {
                  x: deconstructed.x,
                  y: deconstructed.y,
                  rotate: deconstructed.rotate,
                  scale: deconstructed.scale,
                  opacity: 1,
                }
              : {
                  x: 0,
                  y: layer.assembledY,
                  rotate: 0,
                  scale: 1,
                  opacity: hideForProductPhoto ? 0 : 1,
                };

          const layerDelay =
            phase === 'deconstruct'
              ? idx * 0.025
              : phase === 'assemble'
              ? idx * 0.055
              : 0;

          const labelOnLeft = idx % 2 === 0;

          return (
            <motion.div
              key={layer.id}
              initial={
                reducedMotion
                  ? {
                      x: 0,
                      y: layer.assembledY,
                      rotate: 0,
                      scale: 1,
                      opacity: 1,
                    }
                  : {
                      x: 0,
                      y: layer.assembledY,
                      rotate: 0,
                      scale: 0.94,
                      opacity: 0.95,
                    }
              }
              animate={targetState}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : phase === 'deconstruct'
                  ? {
                      duration: 0.48,
                      delay: layerDelay,
                      ease: MOTION_TOKENS.deconstructEasing,
                    }
                  : isTopCrown
                  ? {
                      ...POLD_SPRINGS.topCrown,
                      delay: layerDelay,
                    }
                  : {
                      ...POLD_SPRINGS.layerAssembly,
                      delay: layerDelay,
                    }
              }
              style={{ zIndex: idx + 1 }}
              className="absolute w-[195px] sm:w-[215px] flex items-center justify-center pointer-events-none"
            >
              <div className="w-full">
                <LayerCutoutGraphic layer={layer} uid={product.id} />
              </div>

              {/* Floating Ingredient Label Callout during Deconstruct & Assemble */}
              {!reducedMotion && totalLayers > 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    phase === 'deconstruct' || phase === 'assemble'
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.92 }
                  }
                  transition={{ duration: 0.22 }}
                  className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none ${
                    labelOnLeft
                      ? 'right-[86%] sm:right-[90%] flex-row-reverse'
                      : 'left-[86%] sm:left-[90%] flex-row'
                  }`}
                >
                  <span className="w-4 sm:w-6 h-[1.5px] bg-[#E50909]/80 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-white/95 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    {lang === 'ar' ? layer.nameAr : layer.name}
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
