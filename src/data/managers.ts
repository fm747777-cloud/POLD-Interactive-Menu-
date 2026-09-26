import NEW_AHMED_IMAGE from '../assets/images/ahmed_transparent.png';
import NEW_MAHMOUD_IMAGE from '../assets/images/mahmoud_transparent.png';
import NEW_MOHAMED_IMAGE from '../assets/images/mohamed_transparent.png';
import { CategoryId } from '../types/menu';

export type ManagerId = 'mahmoud' | 'ahmed' | 'mohamed';

export type ManagerPosition = 'center-foreground' | 'back-left' | 'back-right';

export interface ManagerCharacter {
  id: ManagerId;
  /** Canonical character name */
  name: 'Mahmoud' | 'Ahmed' | 'Mohamed';
  /** Uppercase display name for UI labels */
  nameEn: 'MAHMOUD' | 'AHMED' | 'MOHAMED';
  nameAr: string;
  /** Role label */
  role: 'MANAGER';
  roleEn: 'MANAGER';
  roleAr: string;
  /** Fixed spatial position in the triangular composition */
  position: ManagerPosition;
  /** Single official transparent PNG character asset */
  image: string;
  /** Timeline entrance timestamp in seconds during Hero sequence */
  enterAtSeconds: number;
}

/**
 * SINGLE REUSABLE MANAGER DATA STRUCTURE (SOURCE OF TRUTH)
 * Uses ONLY the newly uploaded, background-removed transparent character assets:
 * - Mahmoud -> CENTER FRONT (NEW_MAHMOUD_IMAGE)
 * - Ahmed   -> BACK LEFT    (NEW_AHMED_IMAGE)
 * - Mohamed -> BACK RIGHT   (NEW_MOHAMED_IMAGE)
 */
export const MANAGERS: Record<ManagerId, ManagerCharacter> = {
  mahmoud: {
    id: 'mahmoud',
    name: 'Mahmoud',
    nameEn: 'MAHMOUD',
    nameAr: 'محمود',
    role: 'MANAGER',
    roleEn: 'MANAGER',
    roleAr: 'مدير المطعم',
    position: 'center-foreground',
    image: NEW_MAHMOUD_IMAGE,
    enterAtSeconds: 0.6,
  },
  ahmed: {
    id: 'ahmed',
    name: 'Ahmed',
    nameEn: 'AHMED',
    nameAr: 'أحمد',
    role: 'MANAGER',
    roleEn: 'MANAGER',
    roleAr: 'مدير المطعم',
    position: 'back-left',
    image: NEW_AHMED_IMAGE,
    enterAtSeconds: 0.8,
  },
  mohamed: {
    id: 'mohamed',
    name: 'Mohamed',
    nameEn: 'MOHAMED',
    nameAr: 'محمد',
    role: 'MANAGER',
    roleEn: 'MANAGER',
    roleAr: 'مدير المطعم',
    position: 'back-right',
    image: NEW_MOHAMED_IMAGE,
    enterAtSeconds: 1.0,
  },
};

/**
 * Maps each menu category to its single designated Manager for Character Moments:
 * - Burgers -> Mahmoud
 * - Fries / Sides / Chicken -> Ahmed
 * - Sauces / Add-ons -> Mohamed
 */
export function getManagerForCategory(category: CategoryId): ManagerCharacter {
  switch (category) {
    case 'burgers':
    case 'all':
      return MANAGERS.mahmoud;
    case 'fries':
    case 'chicken':
      return MANAGERS.ahmed;
    case 'sauces':
    case 'addons':
      return MANAGERS.mohamed;
  }
}
