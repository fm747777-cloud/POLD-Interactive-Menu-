/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LayoutGroup } from 'motion/react';
import { CategoryTabs } from './components/CategoryTabs';
import { Footer } from './components/Footer';
import { ManagerFigure } from './components/ManagerFigure';
import { MenuHeader } from './components/MenuHeader';
import { MenuTransition } from './components/MenuTransition';
import { PattyUpgradeBanner } from './components/PattyUpgradeBanner';
import { ProductDetails } from './components/ProductDetails';
import { ProductGrid } from './components/ProductGrid';
import { SearchBar } from './components/SearchBar';
import { MANAGERS } from './data/managers';
import { CATEGORIES, PRODUCTS, RESTAURANT_INFO } from './data/menuData';
import { CategoryId, Language, Product } from './types/menu';

/** Normalize Arabic and English strings for forgiving, instant search */
function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u065F]/g, '');
}

export default function App() {
  // Continuous cinematic hero experience state (0.0s -> 5.2s+)
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Menu & filtering state
  const [lang, setLang] = useState<Language>('ar');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync HTML dir (RTL / LTR) and lang attributes whenever language switches
  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const handleCloseIntro = useCallback(() => {
    setShowIntro(false);
  }, []);

  const handleReplayIntro = useCallback(() => {
    setSelectedProduct(null);
    setShowIntro(true);
  }, []);

  // Compute item counts per category tab strictly from verified product categories
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      all: PRODUCTS.length,
      burgers: 0,
      chicken: 0,
      fries: 0,
      sauces: 0,
      addons: 0,
    };

    for (const product of PRODUCTS) {
      counts[product.category] += 1;
    }

    return counts;
  }, []);

  // Filter products by category and bilingual search query across the entire menu
  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeSearchText(searchQuery);

    return PRODUCTS.filter((product) => {
      if (product.isAvailable === false) return false;

      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const catObj = CATEGORIES.find((c) => c.id === product.category);
      const searchableFields = [
        product.nameEn,
        product.nameAr,
        product.descriptionEn,
        product.descriptionAr,
        ...product.ingredientsEn,
        ...product.ingredientsAr,
        ...(product.searchKeywords ?? []),
        catObj?.nameEn ?? '',
        catObj?.nameAr ?? '',
        product.badge ?? '',
        String(product.price),
      ];

      const combined = normalizeSearchText(searchableFields.join(' '));
      return combined.includes(normalizedQuery);
    });
  }, [activeCategory, searchQuery]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };

  return (
    <div
      id="top"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-dvh flex flex-col bg-[#0A0A0D] text-[#FFFFFF]"
    >
      <MenuTransition
        showIntro={showIntro}
        lang={lang}
        onIntroComplete={handleCloseIntro}
        onSkipIntro={handleCloseIntro}
      >
        <div className="min-h-dvh flex flex-col">
          {/* Top Bar Menu Header with Replay Hero Control & Language Switcher */}
          <MenuHeader
            lang={lang}
            onLanguageChange={setLang}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onReplayIntro={handleReplayIntro}
          />

          {/* ===============================================================
              BURGER HERO & SEARCH SECTION (Seamless Continuation from Hero)
             =============================================================== */}
          <section className="relative bg-[#0E0E13] border-b border-white/10 pt-5 pb-5 overflow-hidden">
            {/* Subtle Red Atmospheric Glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 50% 35%, rgba(229, 9, 9, 0.14) 0%, transparent 65%)',
              }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
              {/* Burger Hero Banner Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-white/85">
                    <span
                      className="w-2 h-2 rounded-full bg-emerald-500 inline-block"
                      aria-hidden="true"
                    />
                    <span>{lang === 'ar' ? 'مفتوح الآن' : 'OPEN NOW'}</span>
                    <span className="text-white/30" aria-hidden="true">
                      ·
                    </span>
                    <span className="font-display tracking-[0.22em] uppercase text-[#E50909]">
                      POLD DIGITAL MENU
                    </span>
                  </div>

                  <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-[0.08em] text-white leading-none">
                    <span>POLD BURGER</span>{' '}
                    <span className="text-[#E50909]">Eat Pold Think Pold</span>
                  </h1>

                  <p className="text-xs sm:text-sm text-white/65 max-w-xl">
                    {lang === 'ar'
                      ? `${RESTAURANT_INFO.taglineAr} — برجر مشوي على اللهب • ساندوتشات فرايد تشيكن • فرايز • صوصات • إضافات`
                      : 'Flame-Grilled Beef Burgers • Crispy Fried Chicken • Loaded Fries • Signature Sauces & Add-ons'}
                  </p>
                </div>

                {/* Cohesive Three-Manager Group Composition:
                    AHMED (Back-Left) + MAHMOUD (Center/Front) + MOHAMED (Back-Right) */}
                <div
                  dir="ltr"
                  aria-label="POLD Management Team: Ahmed, Mahmoud, and Mohamed"
                  className="relative self-center sm:self-auto shrink-0 flex items-end justify-center px-2 pt-1 select-none"
                >
                  {/* AHMED — BACK LEFT */}
                  <div className="relative z-10 -mr-7 xs:-mr-8 sm:-mr-9 pb-1.5 opacity-95">
                    <ManagerFigure
                      manager={MANAGERS.ahmed}
                      showName={false}
                      isIdle={true}
                      variant="banner"
                    />
                  </div>

                  {/* MAHMOUD — CENTER / FRONT (Main Prominent Character) */}
                  <div className="relative z-20">
                    <ManagerFigure
                      manager={MANAGERS.mahmoud}
                      showName={false}
                      isIdle={true}
                      variant="banner"
                    />
                  </div>

                  {/* MOHAMED — BACK RIGHT */}
                  <div className="relative z-10 -ml-7 xs:-ml-8 sm:-ml-9 pb-1.5 opacity-95">
                    <ManagerFigure
                      manager={MANAGERS.mohamed}
                      showName={false}
                      isIdle={true}
                      variant="banner"
                    />
                  </div>
                </div>
              </div>

              {/* Instant Bilingual Search Bar */}
              <SearchBar
                lang={lang}
                query={searchQuery}
                onChange={setSearchQuery}
                totalResults={filteredProducts.length}
                totalMenuCount={PRODUCTS.length}
              />
            </div>
          </section>

          {/* Sticky Horizontally Scrollable Category Navigation */}
          <CategoryTabs
            lang={lang}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            categoryCounts={categoryCounts}
          />

          {/* Shared-Element LayoutGroup linking ProductCard <-> ProductDetails */}
          <LayoutGroup>
            {/* Main Menu Container */}
            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 pb-8 space-y-6">
              {/* Double & Triple Upgrade Callout (Shown on Burgers or Chicken view) */}
              {(activeCategory === 'burgers' ||
                activeCategory === 'chicken') &&
                !searchQuery.trim() && (
                  <PattyUpgradeBanner
                    lang={lang}
                    activeCategory={activeCategory}
                  />
                )}

              {/* Product Cards Grid */}
              <ProductGrid
                products={filteredProducts}
                activeCategory={activeCategory}
                searchQuery={searchQuery}
                lang={lang}
                onSelectProduct={setSelectedProduct}
                onResetFilters={handleResetFilters}
              />
            </main>

            {/* Product Details Modal / Mobile Bottom Sheet */}
            <ProductDetails
              product={selectedProduct}
              products={filteredProducts}
              lang={lang}
              onSelectProduct={setSelectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          </LayoutGroup>

          {/* Restaurant Management Team & Branch Contact Footer */}
          <Footer lang={lang} onReplayHero={handleReplayIntro} />
        </div>
      </MenuTransition>
    </div>
  );
}
