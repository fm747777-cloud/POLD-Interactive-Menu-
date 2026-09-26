import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ManagerCharacter } from '../data/managers';

interface ManagerFigureProps {
  manager: ManagerCharacter;
  /** Whether the synchronized UI name & role label is visible below the character */
  showName: boolean;
  /** Whether the character is in a subtle breathing/posture state */
  isIdle?: boolean;
  /** Whether the character has retreated/opened the center in the Hero stage */
  isRetreated?: boolean;
  /** Respect prefers-reduced-motion */
  reducedMotion?: boolean;
  /** Size preset for hero vs banner vs category cameo vs product cameo vs footer */
  variant?: 'hero' | 'banner' | 'category' | 'product' | 'footer';
  className?: string;
}

/**
 * Renders a full-body, background-removed transparent POLD Manager character
 * from head to toe with zero cropping, zero artificial backgrounds, and zero
 * added shadows, glows, or gradients around the character.
 */
export const ManagerFigure: React.FC<ManagerFigureProps> = ({
  manager,
  showName,
  isIdle = false,
  isRetreated = false,
  reducedMotion = false,
  variant = 'hero',
  className = '',
}) => {
  const [processedSrc, setProcessedSrc] = useState<string>(manager.image);

  // Ensure any loaded image is 100% transparent around the character silhouette
  useEffect(() => {
    setProcessedSrc(manager.image);

    let isCancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (isCancelled) return;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Check top-left corner alpha: if already transparent (alpha === 0), use directly
        if (data[3] === 0) {
          return;
        }

        // Otherwise, flood-fill remove checkerboard or solid background from all edges
        const w = canvas.width;
        const h = canvas.height;
        const visited = new Uint8Array(w * h);
        const queue = new Int32Array(w * h);
        let head = 0;
        let tail = 0;

        // Sample border palette (handles both 2-tone checkerboard & solid backgrounds)
        const samplePoints = [
          [2, 2],
          [18, 2],
          [2, 18],
          [18, 18],
          [w - 3, 2],
          [w - 19, 2],
          [2, h - 3],
          [w - 3, h - 3],
        ];
        const bgColors: [number, number, number][] = [];
        for (const [sx, sy] of samplePoints) {
          if (sx >= 0 && sx < w && sy >= 0 && sy < h) {
            const idx = (sy * w + sx) * 4;
            bgColors.push([data[idx], data[idx + 1], data[idx + 2]]);
          }
        }

        const isBgPixel = (r: number, g: number, b: number) => {
          // Green chromakey check
          if (g > 150 && g > r * 1.35 && g > b * 1.35) return true;
          // Match sampled border colors (checkerboard grey/black or solid backdrop)
          for (let i = 0; i < bgColors.length; i++) {
            const [br, bg, bb] = bgColors[i];
            const dist = Math.abs(r - br) + Math.abs(g - bg) + Math.abs(b - bb);
            if (dist < 42) return true;
          }
          return false;
        };

        const enqueue = (x: number, y: number) => {
          const pos = y * w + x;
          if (visited[pos]) return;
          const p4 = pos * 4;
          if (isBgPixel(data[p4], data[p4 + 1], data[p4 + 2])) {
            visited[pos] = 1;
            queue[tail++] = pos;
          }
        };

        for (let x = 0; x < w; x++) {
          enqueue(x, 0);
          enqueue(x, h - 1);
        }
        for (let y = 0; y < h; y++) {
          enqueue(0, y);
          enqueue(w - 1, y);
        }

        while (head < tail) {
          const pos = queue[head++];
          data[pos * 4 + 3] = 0;
          const x = pos % w;
          const y = (pos - x) / w;
          if (x > 0) enqueue(x - 1, y);
          if (x < w - 1) enqueue(x + 1, y);
          if (y > 0) enqueue(x, y - 1);
          if (y < h - 1) enqueue(x, y + 1);
        }

        ctx.putImageData(imageData, 0, 0);
        if (!isCancelled) {
          setProcessedSrc(canvas.toDataURL('image/png'));
        }
      } catch {
        // Keep original src if canvas processing is unavailable
      }
    };
    img.src = manager.image;

    return () => {
      isCancelled = true;
    };
  }, [manager.image]);

  const isForeground = manager.position === 'center-foreground';

  // Full-body proportions ensuring Head, Hands, Legs, and Shoes are 100% visible (Zero Cropping)
  const figureSizeClasses =
    variant === 'hero'
      ? isForeground
        ? 'h-[260px] xs:h-[290px] sm:h-[360px] md:h-[410px]'
        : 'h-[230px] xs:h-[255px] sm:h-[320px] md:h-[365px]'
      : variant === 'banner'
      ? isForeground
        ? 'h-[132px] xs:h-[144px] sm:h-[158px]'
        : 'h-[114px] xs:h-[124px] sm:h-[136px]'
      : variant === 'footer'
      ? isForeground
        ? 'h-[185px] sm:h-[225px]'
        : 'h-[165px] sm:h-[200px]'
      : variant === 'category'
      ? 'h-[115px] sm:h-[135px]'
      : 'h-[110px] sm:h-[128px]';

  return (
    <div
      dir="ltr"
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      {/* Subtle Living Idle Posture Micro-Movement (Breathing / Slight Body Movement) */}
      <motion.div
        animate={
          reducedMotion || !isIdle
            ? { y: 0, scaleY: 1 }
            : {
                y: [0, -2, 0],
                scaleY: [1, 1.006, 1],
              }
        }
        transition={
          reducedMotion || !isIdle
            ? { duration: 0.25 }
            : {
                duration: isForeground ? 3.4 : 3.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay:
                  manager.id === 'mahmoud'
                    ? 0
                    : manager.id === 'ahmed'
                    ? 0.4
                    : 0.8,
              }
        }
        className="relative flex flex-col items-center origin-bottom"
      >
        {/* Pure Transparent Full-Body Character Container — No Background, No Cropping, No Added Effects */}
        <div
          className={`relative ${figureSizeClasses} aspect-[3/4] flex items-end justify-center overflow-visible`}
        >
          <img
            src={processedSrc}
            alt={`${manager.nameEn} - POLD ${manager.roleEn}`}
            referrerPolicy="no-referrer"
            draggable={false}
            className={`w-full h-full object-contain object-bottom select-none pointer-events-none transition-opacity duration-500 ${
              isRetreated ? 'opacity-80' : 'opacity-100'
            }`}
          />
        </div>
      </motion.div>

      {/* Real UI Typography Beneath the Character (Synchronized Identity) */}
      {showName && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{
            duration: 0.38,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-1.5 text-center pointer-events-none z-20"
        >
          <div
            className={`font-display font-bold uppercase tracking-[0.18em] text-white leading-none ${
              variant === 'category' || variant === 'product'
                ? 'text-[10px] sm:text-[11px]'
                : isForeground
                ? 'text-xs sm:text-sm'
                : 'text-[11px] sm:text-xs text-white/90'
            }`}
          >
            {manager.nameEn}
          </div>
          <div
            className={`mt-0.5 font-display font-semibold uppercase tracking-[0.24em] text-[#E50909] ${
              variant === 'category' || variant === 'product'
                ? 'text-[8px] sm:text-[9px]'
                : 'text-[9px] sm:text-[10px]'
            }`}
          >
            {manager.roleEn}
          </div>
        </motion.div>
      )}
    </div>
  );
};
