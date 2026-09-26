export type BurgerLayerId =
  | 'bottom-bun'
  | 'lettuce'
  | 'tomato'
  | 'beef-patty'
  | 'cheese'
  | 'sauce-toppings'
  | 'top-bun';

export interface BurgerLayerConfig {
  id: BurgerLayerId;
  step: number;
  nameEn: string;
  nameAr: string;
  /** Optional external transparent WebP/PNG asset URL (replaceable per layer) */
  imageSrc?: string;
  /** Vertical offset in pixels when disassembled (floating state) */
  disassembledY: number;
  /** Vertical offset in pixels when fully assembled (stacked burger state) */
  assembledY: number;
  /** Stacking z-index so upper layers naturally overlap lower layers */
  zIndex: number;
  /** Delay in seconds before this specific layer begins assembling */
  assemblyDelay: number;
  /** Duration / spring feel customization */
  weight: 'light' | 'medium' | 'heavy' | 'crown';
}

/**
 * Modular 7-layer POLD Burger configuration.
 * Order matches the sequence:
 * 1. Bottom bun -> 2. Lettuce -> 3. Tomato -> 4. Beef patty -> 5. Cheese -> 6. Sauce / toppings -> 7. Top bun
 */
export const BURGER_LAYERS: BurgerLayerConfig[] = [
  {
    id: 'bottom-bun',
    step: 1,
    nameEn: 'Golden Toasted Brioche Base',
    nameAr: 'خبز بريوش محمص',
    disassembledY: 118,
    assembledY: 64,
    zIndex: 10,
    assemblyDelay: 0.65,
    weight: 'medium',
  },
  {
    id: 'lettuce',
    step: 2,
    nameEn: 'Crisp Iceberg Lettuce',
    nameAr: 'خس فريش مقرمش',
    disassembledY: 78,
    assembledY: 44,
    zIndex: 20,
    assemblyDelay: 0.95,
    weight: 'light',
  },
  {
    id: 'tomato',
    step: 3,
    nameEn: 'Fresh Ruby Tomato Slices',
    nameAr: 'شرائح طماطم فريش',
    disassembledY: 36,
    assembledY: 28,
    zIndex: 30,
    assemblyDelay: 1.22,
    weight: 'medium',
  },
  {
    id: 'beef-patty',
    step: 4,
    nameEn: 'Flame-Grilled POLD Beef Patty',
    nameAr: 'برجر بيف مشوي على اللهب',
    disassembledY: -12,
    assembledY: 8,
    zIndex: 40,
    assemblyDelay: 1.52,
    weight: 'heavy',
  },
  {
    id: 'cheese',
    step: 5,
    nameEn: 'Melted Cheddar Cheese',
    nameAr: 'جبنة شيدر ذائبة',
    disassembledY: -56,
    assembledY: -4,
    zIndex: 50,
    assemblyDelay: 1.85,
    weight: 'light',
  },
  {
    id: 'sauce-toppings',
    step: 6,
    nameEn: 'Signature POLD Sauce & Pickles',
    nameAr: 'صوص بولد المميز ومخلل وبصل',
    disassembledY: -96,
    assembledY: -16,
    zIndex: 60,
    assemblyDelay: 2.12,
    weight: 'light',
  },
  {
    id: 'top-bun',
    step: 7,
    nameEn: 'Sesame Brioche Crown Bun',
    nameAr: 'خبز بريوش بالسمسم',
    disassembledY: -148,
    assembledY: -52,
    zIndex: 70,
    assemblyDelay: 2.42,
    weight: 'crown',
  },
];
