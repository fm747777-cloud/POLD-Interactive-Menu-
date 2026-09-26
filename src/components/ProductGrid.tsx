import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { getManagerForCategory, MANAGERS } from '../data/managers';
import { CATEGORIES } from '../data/menuData';
import { CategoryId, Language, Product } from '../types/menu';
import { ManagerCameoBadge } from './ManagerCameoBadge';
import { ManagerFigure } from './ManagerFigure';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  activeCategory: CategoryId;
  searchQuery: string;
  lang: Language;
  onSelectProduct: (product: Product) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  searchQuery,
  lang,
  onSelectProduct,
  onResetFilters,
}) => {
  const animationKey = `${activeCategory}-${
    searchQuery.trim() ? 'search' : 'browse'
  }`;

  // EMPTY / SEARCH STATE CHARACTER MOMENT (Section 9)
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#121216] rounded-2xl border border-white/10 p-8 sm:p-12 text-center my-4 flex flex-col items-center"
      >
        {/* Friendly Manager Character Moment (Mahmoud) */}
        <div className="mb-3">
          <ManagerFigure
            manager={MANAGERS.mahmoud}
            showName={true}
            isIdle={true}
            variant="footer"
          />
        </div>

        <p className="text-lg font-bold text-white mt-2">
          {lang === 'ar' ? 'لا توجد منتجات مطابقة' : 'No products found'}
        </p>
        <p className="text-sm text-white/60 mt-1 max-w-md mx-auto">
          {lang === 'ar'
            ? 'جرب البحث بكلمة أخرى مثل "بولد"، "جاجور"، "تشيكن فاير"، "تشيز فرايز"، أو "رانش".'
            : 'Try searching for another item such as "Pold", "Jaguar", "Chicken Fire", "Cheese Fries", or "Ranch".'}
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-5 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#E50909] hover:bg-[#F21212] active:scale-95 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
        >
          {lang === 'ar' ? 'عرض كل المنيو' : 'Reset & Show All Menu'}
        </button>
      </motion.div>
    );
  }

  // If searching or filtering a single category, render a clean unified grid with Category Intro Character Moment
  const isFilteredView =
    activeCategory !== 'all' || searchQuery.trim().length > 0;

  if (isFilteredView) {
    const activeCatObj = CATEGORIES.find((c) => c.id === activeCategory);
    const isCompactCategory =
      activeCategory === 'sauces' || activeCategory === 'addons';
    const categoryManager = getManagerForCategory(activeCategory);

    const sectionTitle =
      searchQuery.trim().length > 0
        ? lang === 'ar'
          ? `نتائج البحث (${products.length})`
          : `Search Results (${products.length})`
        : lang === 'ar'
        ? activeCatObj?.nameAr
        : activeCatObj?.nameEn;

    return (
      <AnimatePresence mode="wait">
        <motion.section
          key={animationKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {sectionTitle}
              </h2>
              <span className="text-xs font-mono-num text-white/55">
                ({products.length} {lang === 'ar' ? 'صنف' : 'items'})
              </span>
            </div>

            {/* CATEGORY INTRO CHARACTER MOMENT (Sections 5, 6, 7, 8) */}
            <ManagerCameoBadge
              manager={categoryManager}
              lang={lang}
              triggerKey={`${activeCategory}-${searchQuery}`}
              variant="section"
            />
          </div>

          <div
            className={
              isCompactCategory
                ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'
            }
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </motion.section>
      </AnimatePresence>
    );
  }

  // Grouped editorial view when browsing "All Menu" (shows 100% of PRODUCTS across all 5 categories)
  const sectionOrder: Exclude<CategoryId, 'all'>[] = [
    'burgers',
    'chicken',
    'fries',
    'sauces',
    'addons',
  ];

  const sectionLabels: Record<
    Exclude<CategoryId, 'all'>,
    {
      titleAr: string;
      titleEn: string;
      shortAr: string;
      shortEn: string;
      subAr: string;
      subEn: string;
    }
  > = {
    burgers: {
      titleAr: 'برجر بيف — المشوي على اللهب',
      titleEn: 'Flame-Grilled Beef Burgers',
      shortAr: 'برجر بيف',
      shortEn: 'Burgers',
      subAr: 'دابل (اضافة شريحتين بيف EGP 40) · ترابل (اضافة 3 شرائح بيف EGP 80)',
      subEn: 'Double (+2 Beef Slices EGP 40) · Triple (+3 Beef Slices EGP 80)',
    },
    chicken: {
      titleAr: 'فرايد تشيكن — ساندوتشات الدجاج المقلي',
      titleEn: 'Fried Chicken Sandwiches',
      shortAr: 'فرايد تشيكن',
      shortEn: 'Chicken',
      subAr: 'دابل (اضافة شريحتين فراخ EGP 40) · ترابل (اضافة 3 شرائح فراخ EGP 80)',
      subEn: 'Double (+2 Chicken Slices EGP 40) · Triple (+3 Chicken Slices EGP 80)',
    },
    fries: {
      titleAr: 'الفرايز (NEW)',
      titleEn: 'Fries (NEW)',
      shortAr: 'الفرايز',
      shortEn: 'Fries',
      subAr: 'تشيز فرايز · تشيكن فرايز · بيف فرايز · ميكس فرايز',
      subEn: 'Cheese Fries · Chicken Fries · Beef Fries · Mix Fries',
    },
    sauces: {
      titleAr: 'الصوصات',
      titleEn: 'Sauces',
      shortAr: 'الصوصات',
      shortEn: 'Sauces',
      subAr: 'جميع الصوصات بسعر 15 ج.م',
      subEn: 'All sauces EGP 15',
    },
    addons: {
      titleAr: 'إضافات (Add-ons & Upgrades)',
      titleEn: 'Add-ons & Upgrades',
      shortAr: 'إضافات',
      shortEn: 'Add-ons',
      subAr: 'إضافات الساندوتشات ودابل / ترابل البيف والفراخ',
      subEn: 'Sandwich extras and Double / Triple Beef & Chicken upgrades',
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        {/* Quick Section Jump Bar showing all 5 categories and item counts */}
        <div className="bg-[#121216] rounded-2xl border border-white/10 p-3 sm:p-3.5 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-white/65 px-1">
            {lang === 'ar'
              ? `أقسام المنيو الكامل (${products.length} صنف):`
              : `Full Menu Sections (${products.length} items):`}
          </span>

          <div className="flex flex-wrap items-center gap-1.5">
            {sectionOrder.map((secId) => {
              const count = products.filter((p) => p.category === secId).length;
              const meta = sectionLabels[secId];
              return (
                <a
                  key={secId}
                  href={`#section-${secId}`}
                  className="px-2.5 py-1 rounded-lg bg-[#1A1A22] hover:bg-[#E50909] text-white border border-white/10 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <span>{lang === 'ar' ? meta.shortAr : meta.shortEn}</span>
                  <span className="font-mono-num text-[11px] text-white/70">
                    ({count})
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {sectionOrder.map((secId) => {
          const sectionProducts = products.filter((p) => p.category === secId);
          if (sectionProducts.length === 0) return null;

          const meta = sectionLabels[secId];
          const isCompactSection = secId === 'sauces' || secId === 'addons';
          const sectionManager = getManagerForCategory(secId);

          return (
            <section
              key={secId}
              id={`section-${secId}`}
              className="space-y-4 scroll-mt-24"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {lang === 'ar' ? meta.titleAr : meta.titleEn}
                    </h2>
                    <span className="text-xs font-mono-num text-white/50">
                      ({sectionProducts.length}{' '}
                      {lang === 'ar' ? 'صنف' : 'items'})
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 mt-0.5">
                    {lang === 'ar' ? meta.subAr : meta.subEn}
                  </p>
                </div>

                {/* CATEGORY INTRO CHARACTER MOMENT (Sections 5, 6, 7, 8) */}
                <ManagerCameoBadge
                  manager={sectionManager}
                  lang={lang}
                  triggerKey={`section-${secId}`}
                  variant="section"
                />
              </div>

              <div
                className={
                  isCompactSection
                    ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'
                    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'
                }
              >
                {sectionProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    lang={lang}
                    onSelect={onSelectProduct}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
