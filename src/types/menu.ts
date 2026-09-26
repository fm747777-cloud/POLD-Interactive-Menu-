export type Language = 'ar' | 'en';

export type CategoryId =
  | 'all'
  | 'burgers'
  | 'chicken'
  | 'fries'
  | 'sauces'
  | 'addons';

export type VisualArchetype =
  | 'classic-burger'
  | 'bacon-burger'
  | 'spicy-burger'
  | 'mushroom-burger'
  | 'mozzarella-burger'
  | 'caramelized-burger'
  | 'chicken-mix-burger'
  | 'smoked-burger'
  | 'chicken-classic'
  | 'chicken-spicy'
  | 'chicken-slaw'
  | 'chicken-smoked'
  | 'chicken-crunch'
  | 'fries-cheese'
  | 'fries-chicken'
  | 'fries-beef'
  | 'fries-mix'
  | 'double-upgrade'
  | 'triple-upgrade'
  | 'sauce-creamy'
  | 'sauce-spicy'
  | 'sauce-bbq'
  | 'sauce-cheddar'
  | 'addon-meat'
  | 'addon-fries'
  | 'addon-rings'
  | 'addon-mozzarella'
  | 'addon-coleslaw'
  | 'addon-crunch'
  | 'addon-mushroom';

export type IngredientLayerType =
  | 'bun-bottom'
  | 'bun-top'
  | 'lettuce'
  | 'tomato'
  | 'beef'
  | 'chicken-crispy'
  | 'cheese'
  | 'sauce-signature'
  | 'sauce-bbq'
  | 'sauce-spicy'
  | 'sauce-ranch'
  | 'sauce-thousand'
  | 'sauce-mushroom'
  | 'onion-rings'
  | 'onion-caramelized'
  | 'bacon'
  | 'smoked-beef'
  | 'smoked-turkey'
  | 'mozzarella-sticks'
  | 'fries-container'
  | 'fries-golden'
  | 'sauce-cup'
  | 'sauce-fill'
  | 'coleslaw-cup'
  | 'coleslaw-fill'
  | 'crunch-chips';

export type IngredientMotionOrigin =
  | 'bottom'
  | 'left'
  | 'right'
  | 'top'
  | 'upper-left'
  | 'upper-right'
  | 'lower-left'
  | 'lower-right'
  | 'scale-fade';

export interface ProductIngredientLayer {
  id: string;
  name: string;
  nameAr: string;
  type: IngredientLayerType;
  layer: number;
  assetUrl?: string;
  origin: IngredientMotionOrigin;
  assembledY: number;
}

export interface ProductVariant {
  id: 'single' | 'double' | 'triple';
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  priceAdd: number;
  totalPrice: number;
  extraSlices: number;
}

export interface ProductExtra {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  image?: string;
}

export interface Product {
  id: string;
  category: Exclude<CategoryId, 'all'>;
  name: string;
  nameEn: string;
  nameAr: string;
  price: number;
  description: string;
  descriptionEn: string;
  descriptionAr: string;
  ingredientsEn: string[];
  ingredientsAr: string[];
  ingredients: ProductIngredientLayer[];
  image?: string;
  badge?: 'NEW';
  isSpicy?: boolean;
  variants?: ProductVariant[];
  extras?: ProductExtra[];
  visualType: VisualArchetype;
  searchKeywords?: string[];
  isAvailable?: boolean;
}

export interface Category {
  id: CategoryId;
  nameEn: string;
  nameAr: string;
  count?: number;
}

export interface PattyUpgrade {
  id: 'double' | 'triple';
  nameEn: string;
  nameAr: string;
  subtitleBeefEn: string;
  subtitleBeefAr: string;
  subtitleChickenEn: string;
  subtitleChickenAr: string;
  extraPatties: number;
  priceAdd: number;
}

export interface RestaurantInfo {
  brandName: string;
  taglineEn: string;
  taglineAr: string;
  currencyEn: string;
  currencyAr: string;
  addressAr: string;
  addressEn: string;
  phone: string;
  facebookUrl: string;
  isOpen: boolean;
}
