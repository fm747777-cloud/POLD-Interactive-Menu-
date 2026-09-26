import React from 'react';
import { motion } from 'motion/react';
import { MOTION_TOKENS } from '../motion/motionTokens';
import { Language, Product } from '../types/menu';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onSelect,
}) => {
  const isCompactItem =
    product.category === 'sauces' || product.category === 'addons';
  const description =
    lang === 'ar' ? product.descriptionAr : product.descriptionEn;

  return (
    <motion.button
      id={`card-${product.id}`}
      type="button"
      layoutId={`product-card-${product.id}`}
      transition={{
        duration: MOTION_TOKENS.medium,
        ease: MOTION_TOKENS.easing,
      }}
      onClick={() => onSelect(product)}
      className="group w-full text-start bg-[#121216] rounded-2xl border border-white/10 hover:border-[#E50909]/60 hover:-translate-y-1 hover:shadow-[0_14px_30px_-8px_rgba(229,9,9,0.22)] transition-all duration-200 ease-out active:scale-[0.985] overflow-hidden flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50909]"
    >
      {/* Top / Main Content */}
      <div className="w-full">
        {/* Shared-Element Product Visual Header */}
        <motion.div
          layoutId={`product-visual-${product.id}`}
          transition={{
            duration: MOTION_TOKENS.medium,
            ease: MOTION_TOKENS.easing,
          }}
          className="relative w-full overflow-hidden border-b border-white/6"
        >
          <ProductVisual
            product={product}
            lang={lang}
            size={isCompactItem ? 'compact' : 'card'}
            className={isCompactItem ? 'h-28 sm:h-32' : 'h-44 sm:h-48'}
          />

          {/* NEW Badge when applicable */}
          {product.badge === 'NEW' && (
            <span
              className={`absolute top-3 ${
                lang === 'ar' ? 'right-3' : 'left-3'
              } bg-[#E50909] text-[#FFFFFF] font-display text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md shadow-xs`}
            >
              NEW
            </span>
          )}
        </motion.div>

        {/* Product Titles, Prominent Price & Subordinate Description */}
        <div className="p-4 pb-2.5">
          {/* Header Row: Names + Strong Price Hierarchy */}
          <div className="flex items-start justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#E50909] transition-colors uppercase leading-tight truncate">
                {product.nameEn}
              </h3>
              <p className="font-arabic text-base sm:text-[17px] font-bold text-white/85 leading-snug mt-0.5 truncate">
                {product.nameAr}
              </p>
            </div>

            {/* Price Highlight right next to Product Title */}
            <div className="shrink-0 text-end bg-[#1B1B22] px-2.5 py-1 rounded-lg border border-white/10">
              <span className="block font-display text-[10px] font-bold uppercase text-white/55 leading-none">
                EGP
              </span>
              <span className="font-mono-num text-base sm:text-lg font-bold text-[#E50909] leading-tight">
                {product.price}
              </span>
            </div>
          </div>

          {/* Subordinate Description (shown for Burgers, Chicken, and Fries) */}
          {!isCompactItem && (
            <p className="mt-2 text-xs text-white/60 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Subtle Action Footer */}
      <div className="w-full px-4 pt-2 pb-3.5 mt-1 flex items-center justify-between gap-2 border-t border-white/8">
        <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">
          {product.ingredients.length > 1
            ? lang === 'ar'
              ? `${product.ingredients.length} مكونات`
              : `${product.ingredients.length} Ingredients`
            : lang === 'ar'
            ? product.category === 'sauces'
              ? 'صوص'
              : 'إضافة'
            : product.category === 'sauces'
            ? 'Sauce'
            : 'Add-on'}
        </span>

        <span className="text-xs font-bold text-white group-hover:text-[#E50909] transition-colors whitespace-nowrap">
          {lang === 'ar' ? 'التفاصيل ←' : 'Details →'}
        </span>
      </div>
    </motion.button>
  );
};
