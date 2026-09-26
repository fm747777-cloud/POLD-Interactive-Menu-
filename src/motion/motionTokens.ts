/**
 * Unified POLD Product Motion Tokens
 * Consistent timing, easing, and spring physics across all POLD menu products.
 */

export const MOTION_TOKENS = {
  /** --motion-fast: 180ms */
  fast: 0.18,
  /** --motion-medium: 350ms */
  medium: 0.35,
  /** --motion-slow: 600ms */
  slow: 0.6,
  /** Signature POLD cubic-bezier easing */
  easing: [0.22, 1, 0.36, 1] as const,
  /** Deconstruction / separation easing */
  deconstructEasing: [0.16, 1, 0.3, 1] as const,
};

export const POLD_SPRINGS = {
  /** Unified ingredient layer assembly spring */
  layerAssembly: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 21,
    mass: 0.95,
  },
  /** Top crown / final layer drop spring */
  topCrown: {
    type: 'spring' as const,
    stiffness: 290,
    damping: 19,
    mass: 1.05,
  },
  /** Product navigation slide transition */
  productNav: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 28,
    mass: 0.9,
  },
};
