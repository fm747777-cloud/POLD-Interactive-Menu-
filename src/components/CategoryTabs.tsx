import React from 'react';
import {
  Beef,
  Drumstick,
  Flame,
  PlusCircle,
  Soup,
  Utensils,
} from 'lucide-react';
import { CATEGORIES } from '../data/menuData';
import { CategoryId, Language } from '../types/menu';

interface CategoryTabsProps {
  lang: Language;
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  categoryCounts: Record<CategoryId, number>;
}

const getCategoryIcon = (id: CategoryId) => {
  switch (id) {
    case 'all':
      return Utensils;
    case 'burgers':
      return Beef;
    case 'chicken':
      return Drumstick;
    case 'fries':
      return Flame;
    case 'sauces':
      return Soup;
    case 'addons':
      return PlusCircle;
  }
};

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  lang,
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="sticky top-0 z-30 bg-[#0B0B0E]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5">
        <div
          role="tablist"
          aria-label={lang === 'ar' ? 'تصنيفات المنيو' : 'Menu categories'}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            const Icon = getCategoryIcon(category.id);
            const count = categoryCounts[category.id] ?? 0;

            return (
              <button
                key={category.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => onSelectCategory(category.id)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 ease-out active:scale-95 whitespace-nowrap shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-[#E50909] text-[#FFFFFF] border-[#E50909] shadow-[0_0_20px_rgba(229,9,9,0.35)] scale-[1.02]'
                    : 'bg-[#141419] text-white/85 border-white/10 hover:bg-[#1C1C23] hover:text-white hover:border-white/20'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isActive ? 'text-[#FFFFFF] scale-105' : 'text-[#E50909]'
                  }`}
                  aria-hidden="true"
                />
                <span>
                  {lang === 'ar' ? category.nameAr : category.nameEn}
                </span>
                <span
                  className={`font-mono-num text-[11px] ${
                    isActive ? 'text-white/90' : 'text-white/50'
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
