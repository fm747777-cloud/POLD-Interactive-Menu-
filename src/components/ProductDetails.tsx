import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { getManagerForCategory } from '../data/managers';
import { CATEGORIES, PATTY_UPGRADES } from '../data/menuData';
import { MOTION_TOKENS, POLD_SPRINGS } from '../motion/motionTokens';
import { Language, Product } from '../types/menu';
import { ManagerCameoBadge } from './ManagerCameoBadge';
import { ProductAssemblyStage } from './ProductAssemblyStage';

interface ProductDetailsProps {
  product: Product | null;
  products: Product[];
  lang: Language;
  onSelectProduct: (product: Product) => void;
  onClose: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  products,
  lang,
  onSelectProduct,
  onClose,
}) => {
  const [selectedSize, setSelectedSize] = useState<
    'single' | 'double' | 'triple'
  >('single');
  const [replayCount, setReplayCount] = useState<number>(0);
  const [navDirection, setNavDirection] = useState<-1 | 0 | 1>(0);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    setSelectedSize('single');
    setReplayCount(0);

    if (product?.id && typeof document !== 'undefined') {
      const cardEl = document.getElementById(`card-${product.id}`);
      if (cardEl) {
        cardEl.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      }
    }
  }, [product?.id]);

  useEffect(() => {
    if (!product) {
      setNavDirection(0);
    }
  }, [product]);

  const currentIndex = product
    ? products.findIndex((p) => p.id === product.id)
    : -1;
  const hasMultipleProducts = products.length > 1 && currentIndex !== -1;

  const prevProduct = hasMultipleProducts
    ? products[(currentIndex - 1 + products.length) % products.length]
    : null;
  const nextProduct = hasMultipleProducts
    ? products[(currentIndex + 1) % products.length]
    : null;

  const handlePrevProduct = useCallback(() => {
    if (!prevProduct) return;
    setNavDirection(-1);
    onSelectProduct(prevProduct);
  }, [prevProduct, onSelectProduct]);

  const handleNextProduct = useCallback(() => {
    if (!nextProduct) return;
    setNavDirection(1);
    onSelectProduct(nextProduct);
  }, [nextProduct, onSelectProduct]);

  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasMultipleProducts) {
        e.preventDefault();
        handlePrevProduct();
      } else if (e.key === 'ArrowRight' && hasMultipleProducts) {
        e.preventDefault();
        handleNextProduct();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [
    product,
    hasMultipleProducts,
    handlePrevProduct,
    handleNextProduct,
    onClose,
  ]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (
      touchStartXRef.current === null ||
      touchStartYRef.current === null ||
      !hasMultipleProducts
    ) {
      return;
    }

    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        handleNextProduct();
      } else {
        handlePrevProduct();
      }
    }
  };

  const supportsUpgrades =
    product?.category === 'burgers' || product?.category === 'chicken';
  const isChickenProduct = product?.category === 'chicken';

  const extraPatties =
    supportsUpgrades && selectedSize === 'double'
      ? 2
      : supportsUpgrades && selectedSize === 'triple'
      ? 3
      : 0;
  const extraPrice =
    supportsUpgrades && selectedSize === 'double'
      ? 40
      : supportsUpgrades && selectedSize === 'triple'
      ? 80
      : 0;

  const categoryObj = product
    ? CATEGORIES.find((c) => c.id === product.category)
    : null;
  const productManager = product
    ? getManagerForCategory(product.category)
    : null;

  return (
    <AnimatePresence>
      {product && (
        <div
          key="product-details-modal-wrapper"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title-en"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: MOTION_TOKENS.fast,
              ease: 'easeOut',
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Shared-Element Product Card <-> Product Detail Container */}
          <motion.div
            layoutId={reducedMotion ? undefined : `product-card-${product.id}`}
            transition={{
              duration: MOTION_TOKENS.medium,
              ease: MOTION_TOKENS.easing,
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative z-10 w-full sm:max-w-xl bg-[#0F0F14] text-white rounded-t-3xl sm:rounded-3xl border border-white/15 overflow-hidden max-h-[94dvh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* =========================================================
                TOP STAGE: SHARED-ELEMENT HERO + UNIFIED POLD MOTION
               ========================================================= */}
            <motion.div
              layoutId={
                reducedMotion ? undefined : `product-visual-${product.id}`
              }
              transition={{
                duration: MOTION_TOKENS.medium,
                ease: MOTION_TOKENS.easing,
              }}
              className="relative bg-[#08080B] text-[#FFFFFF] border-b border-white/10 shrink-0"
            >
              {/* Mobile Drag Handle */}
              <div className="sm:hidden pt-2 pb-0.5 flex justify-center">
                <div className="w-10 h-1 rounded-full bg-white/25" />
              </div>

              {/* Stage Header Bar: Category + Replay & Close */}
              <div className="relative z-30 px-4 sm:px-5 pt-2.5 pb-1 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs text-white/70 truncate">
                    {product.badge === 'NEW' && (
                      <>
                        <span className="font-display font-bold tracking-wider uppercase text-[#E50909] shrink-0">
                          NEW
                        </span>
                        <span className="text-white/30" aria-hidden="true">
                          ·
                        </span>
                      </>
                    )}
                    <span className="font-display tracking-widest uppercase truncate">
                      {lang === 'ar'
                        ? categoryObj?.nameAr
                        : categoryObj?.nameEn}
                    </span>
                    {currentIndex !== -1 && (
                      <>
                        <span className="text-white/30" aria-hidden="true">
                          ·
                        </span>
                        <span className="font-mono-num text-[11px] text-white/75 shrink-0">
                          {currentIndex + 1} / {products.length}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* User Controls: ↻ Replay & Close */}
                <div className="flex items-center gap-2 shrink-0">
                  {!reducedMotion && product.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setReplayCount((c) => c + 1)}
                      aria-label={
                        lang === 'ar'
                          ? 'إعادة تجميع المكونات'
                          : 'Replay ingredient assembly'
                      }
                      className="min-h-[38px] px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 text-xs font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#E50909]" />
                      <span>{lang === 'ar' ? 'إعادة' : 'Replay'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={lang === 'ar' ? 'إغلاق' : 'Close details'}
                    className="min-h-[38px] min-w-[38px] rounded-lg bg-white/10 hover:bg-[#E50909] active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* SECTION 9 PRODUCT DETAIL CHARACTER MOMENT:
                  One manager appears briefly from the side at the start of the interaction, then exits */}
              {productManager && !reducedMotion && (
                <div className="absolute left-3 bottom-3 z-25 pointer-events-none">
                  <ManagerCameoBadge
                    manager={productManager}
                    lang={lang}
                    triggerKey={`${product.id}-${replayCount}`}
                    variant="modal"
                  />
                </div>
              )}

              {/* Subtle Left / Right Stage Navigation Arrows */}
              {hasMultipleProducts && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevProduct}
                    aria-label={
                      lang === 'ar' ? 'الصنف السابق' : 'Previous product'
                    }
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-[#E50909] active:scale-95 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextProduct}
                    aria-label={lang === 'ar' ? 'الصنف التالي' : 'Next product'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-[#E50909] active:scale-95 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Animated Product Stage Wrapper */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={product.id}
                  initial={
                    reducedMotion || navDirection === 0
                      ? { opacity: 1, x: 0 }
                      : {
                          opacity: 0,
                          x: navDirection > 0 ? 44 : -44,
                          scale: 0.96,
                        }
                  }
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          x: navDirection > 0 ? -44 : 44,
                          scale: 0.96,
                        }
                  }
                  transition={
                    reducedMotion
                      ? { duration: 0.1 }
                      : POLD_SPRINGS.productNav
                  }
                >
                  <ProductAssemblyStage
                    product={product}
                    lang={lang}
                    replayTrigger={replayCount}
                    reducedMotion={reducedMotion}
                    extraPatties={extraPatties}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* =========================================================
                BOTTOM PANEL: PRODUCT TITLE, VERIFIED INGREDIENTS & NAV
               ========================================================= */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`info-${product.id}`}
                initial={
                  reducedMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        x: navDirection === 0 ? 0 : navDirection > 0 ? 20 : -20,
                        y: navDirection === 0 ? 6 : 0,
                      }
                }
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={
                  reducedMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: navDirection > 0 ? -20 : 20,
                      }
                }
                transition={{
                  duration: 0.2,
                  ease: MOTION_TOKENS.easing,
                }}
                className="p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#0F0F14]"
              >
                {/* Product Name (EN + AR) & Price Highlight */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2
                      id="modal-product-title-en"
                      className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight leading-none"
                    >
                      {product.nameEn}
                    </h2>
                    <p className="font-arabic text-lg sm:text-xl font-bold text-white/85 mt-1 leading-snug">
                      {product.nameAr}
                    </p>
                  </div>

                  <div className="shrink-0 text-end bg-[#17171F] px-3.5 py-2 rounded-xl border border-white/10">
                    <span className="block font-display text-[10px] font-bold uppercase text-white/55 leading-none">
                      {lang === 'ar' ? 'السعر' : 'Price'}
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-display text-xs font-bold text-white/80">
                        EGP
                      </span>
                      <span className="font-mono-num text-2xl font-bold text-[#E50909] leading-none">
                        {product.price + extraPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verified Product Ingredients & Menu Description */}
                <div className="bg-[#15151C] p-3.5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/55">
                      {lang === 'ar' ? 'المكونات' : 'Ingredients'}
                    </h3>
                    <span className="text-[11px] font-mono-num text-white/55">
                      {product.ingredientsEn.length + (extraPatties > 0 ? 1 : 0)}{' '}
                      {lang === 'ar'
                        ? product.ingredientsEn.length === 1 && extraPatties === 0
                          ? 'مكون'
                          : 'مكونات'
                        : product.ingredientsEn.length === 1 && extraPatties === 0
                        ? 'item'
                        : 'items'}
                    </span>
                  </div>

                  {/* Clean Unboxed Ingredient Sequence */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-bold text-white">
                    {(lang === 'ar'
                      ? product.ingredientsAr
                      : product.ingredientsEn
                    ).map((ing, idx, arr) => (
                      <React.Fragment key={idx}>
                        <span>{ing}</span>
                        {idx < arr.length - 1 && (
                          <span
                            className="text-[#E50909] font-bold"
                            aria-hidden="true"
                          >
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                    {extraPatties > 0 && (
                      <>
                        <span
                          className="text-[#E50909] font-bold"
                          aria-hidden="true"
                        >
                          ·
                        </span>
                        <span className="text-[#E50909]">
                          {lang === 'ar'
                            ? isChickenProduct
                              ? `+اضافة ${extraPatties === 2 ? 'شريحتين' : '3 شرائح'} فراخ`
                              : `+اضافة ${extraPatties === 2 ? 'شريحتين' : '3 شرائح'} بيف`
                            : isChickenProduct
                            ? `+Add ${extraPatties} Chicken Slices`
                            : `+Add ${extraPatties} Beef Slices`}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Printed Menu Description (shown when distinct from title) */}
                  {product.category !== 'sauces' &&
                    product.category !== 'addons' && (
                      <p className="text-xs text-white/60 leading-relaxed pt-2 border-t border-white/8">
                        {lang === 'ar'
                          ? product.descriptionAr
                          : product.descriptionEn}
                      </p>
                    )}
                </div>

                {/* Interactive Single / Double (+40) / Triple (+80) Upgrade Selector for Burgers & Chicken */}
                {supportsUpgrades && (
                  <div className="bg-[#15151C] p-3 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        {lang === 'ar'
                          ? isChickenProduct
                            ? 'دابل / ترابل (إضافة شرائح فراخ)'
                            : 'دابل / ترابل (إضافة شرائح بيف)'
                          : isChickenProduct
                          ? 'Double / Triple (Add Chicken Slices)'
                          : 'Double / Triple (Add Beef Slices)'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedSize('single')}
                        className={`min-h-[46px] px-2 py-1.5 rounded-xl text-center transition-all active:scale-95 cursor-pointer border whitespace-nowrap ${
                          selectedSize === 'single'
                            ? 'bg-[#E50909] text-white border-[#E50909]'
                            : 'bg-[#1D1D26] text-white border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="text-xs font-bold">
                          {lang === 'ar' ? 'عادي' : 'Single'}
                        </div>
                        <div
                          className={`font-mono-num text-[11px] ${
                            selectedSize === 'single'
                              ? 'text-white/90'
                              : 'text-white/60'
                          }`}
                        >
                          EGP {product.price}
                        </div>
                      </button>

                      {PATTY_UPGRADES.map((up) => {
                        const sizeKey = up.id;
                        const isSelected = selectedSize === sizeKey;
                        const subText =
                          lang === 'ar'
                            ? isChickenProduct
                              ? up.subtitleChickenAr
                              : up.subtitleBeefAr
                            : isChickenProduct
                            ? up.subtitleChickenEn
                            : up.subtitleBeefEn;

                        return (
                          <button
                            key={up.id}
                            type="button"
                            onClick={() => setSelectedSize(sizeKey)}
                            title={subText}
                            className={`min-h-[46px] px-2 py-1.5 rounded-xl text-center transition-all active:scale-95 cursor-pointer border whitespace-nowrap ${
                              isSelected
                                ? 'bg-[#E50909] text-white border-[#E50909]'
                                : 'bg-[#1D1D26] text-white border-white/10 hover:border-white/25'
                            }`}
                          >
                            <div className="text-xs font-bold">
                              {lang === 'ar' ? up.nameAr : up.nameEn}
                            </div>
                            <div
                              className={`font-mono-num text-[11px] ${
                                isSelected ? 'text-white/90' : 'text-white/60'
                              }`}
                            >
                              EGP {product.price + up.priceAdd} (+{up.priceAdd})
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Available Add-ons / Extras Reference from Menu (إضافات) */}
                {product.extras && product.extras.length > 0 && (
                  <div className="bg-[#15151C] p-3.5 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/55">
                        {lang === 'ar'
                          ? 'إضافات متاحة (Add-ons)'
                          : 'Available Add-ons (إضافات)'}
                      </h3>
                      <span className="text-[11px] font-mono-num text-white/55">
                        {product.extras.length}{' '}
                        {lang === 'ar' ? 'إضافات' : 'extras'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                      {product.extras.map((extra) => (
                        <div
                          key={extra.id}
                          className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#1D1D26] border border-white/8 text-xs"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {extra.image && (
                              <img
                                src={extra.image}
                                alt={lang === 'ar' ? extra.nameAr : extra.nameEn}
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                                className="w-6 h-6 object-contain shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                              />
                            )}
                            <span className="font-bold text-white/90 truncate">
                              {lang === 'ar' ? extra.nameAr : extra.nameEn}
                            </span>
                          </div>
                          <span className="font-mono-num font-bold text-[#E50909] shrink-0">
                            +{extra.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* =========================================================
                    INTERACTIVE FOOD SHOWCASE NAVIGATION (PREVIOUS / NEXT)
                   ========================================================= */}
                {hasMultipleProducts && prevProduct && nextProduct && (
                  <div
                    dir="ltr"
                    className="grid grid-cols-2 gap-2.5 pt-1 border-t border-white/10"
                  >
                    <button
                      type="button"
                      onClick={handlePrevProduct}
                      className="min-h-[48px] px-3.5 py-2 rounded-xl bg-[#17171F] hover:bg-[#22222D] active:scale-[0.98] border border-white/10 text-left flex items-center gap-2.5 transition-all cursor-pointer group"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#E50909] shrink-0 group-hover:-translate-x-0.5 transition-transform" />
                      <div className="min-w-0 flex-1">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-white/55">
                          {lang === 'ar' ? 'السابق' : 'Previous'}
                        </span>
                        <span className="block text-xs font-bold text-white truncate">
                          {lang === 'ar'
                            ? prevProduct.nameAr
                            : prevProduct.nameEn}
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextProduct}
                      className="min-h-[48px] px-3.5 py-2 rounded-xl bg-[#17171F] hover:bg-[#22222D] active:scale-[0.98] border border-white/10 text-right flex items-center justify-end gap-2.5 transition-all cursor-pointer group"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-white/55">
                          {lang === 'ar' ? 'التالي' : 'Next'}
                        </span>
                        <span className="block text-xs font-bold text-white truncate">
                          {lang === 'ar'
                            ? nextProduct.nameAr
                            : nextProduct.nameEn}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#E50909] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
