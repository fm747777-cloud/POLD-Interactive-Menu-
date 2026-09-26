import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ManagerCharacter } from '../data/managers';
import { Language } from '../types/menu';
import { ManagerFigure } from './ManagerFigure';

interface ManagerCameoBadgeProps {
  manager: ManagerCharacter;
  lang: Language;
  /** Unique trigger key (e.g. category id or product id) to replay the brief moment */
  triggerKey?: string;
  variant?: 'section' | 'modal';
}

/**
 * Intentional, transient "Character Moment" (Sections 4–12):
 * - Appears briefly beside a category heading or at the start of a product detail view.
 * - Uses subtle fade + slight slide + subtle posture movement.
 * - Automatically exits after a short moment so the character is NEVER permanently
 *   parked on screen and NEVER covers food, prices, or navigation.
 */
export const ManagerCameoBadge: React.FC<ManagerCameoBadgeProps> = ({
  manager,
  triggerKey,
  variant = 'section',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState<boolean>(
    variant === 'modal'
  );
  const [visible, setVisible] = useState<boolean>(false);

  // For category sections, trigger when the category header scrolls into view
  useEffect(() => {
    if (variant === 'modal') {
      setHasEnteredView(true);
      return;
    }

    setHasEnteredView(false);
    setVisible(false);

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [variant, triggerKey, manager.id]);

  // Brief appearance timer: enter -> subtle presence -> natural exit
  useEffect(() => {
    if (!hasEnteredView) return;

    setVisible(true);
    const durationMs = variant === 'modal' ? 1250 : 2200;

    const exitTimer = window.setTimeout(() => {
      setVisible(false);
    }, durationMs);

    return () => window.clearTimeout(exitTimer);
  }, [hasEnteredView, triggerKey, manager.id, variant]);

  return (
    <div
      ref={containerRef}
      dir="ltr"
      aria-hidden={!visible}
      className={
        variant === 'modal'
          ? 'pointer-events-none select-none flex items-end'
          : 'pointer-events-none select-none min-h-[24px] flex items-end justify-end overflow-visible'
      }
    >
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={`${variant}-${manager.id}-${triggerKey ?? 'moment'}`}
            initial={{
              opacity: 0,
              x: variant === 'modal' ? -22 : 18,
              y: 6,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: variant === 'modal' ? -18 : 14,
              y: 4,
              scale: 0.96,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center gap-2.5"
          >
            <ManagerFigure
              manager={manager}
              showName={true}
              isIdle={true}
              variant={variant === 'modal' ? 'product' : 'category'}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
