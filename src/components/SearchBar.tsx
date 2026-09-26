import React from 'react';
import { Search, X } from 'lucide-react';
import { Language } from '../types/menu';

interface SearchBarProps {
  lang: Language;
  query: string;
  onChange: (value: string) => void;
  totalResults: number;
  totalMenuCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  lang,
  query,
  onChange,
  totalResults,
  totalMenuCount,
}) => {
  const placeholder =
    lang === 'ar'
      ? 'ابحث في المنيو الكامل (برجر، فرايد تشيكن، فرايز، صوصات، إضافات...)'
      : 'Search full menu (burgers, chicken, fries, sauces, add-ons...)';

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex-1">
        <Search
          className={`w-4 h-4 text-white/50 absolute top-1/2 -translate-y-1/2 pointer-events-none ${
            lang === 'ar' ? 'right-3.5' : 'left-3.5'
          }`}
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className={`w-full min-h-[44px] bg-[#141419] border border-white/12 rounded-xl text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-[#E50909] focus:ring-2 focus:ring-[#E50909]/25 transition-all ${
            lang === 'ar' ? 'pr-10 pl-10' : 'pl-10 pr-10'
          }`}
        />
        {query.trim().length > 0 && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label={lang === 'ar' ? 'مسح البحث' : 'Clear search'}
            className={`min-h-[36px] min-w-[36px] flex items-center justify-center text-white/55 hover:text-white absolute top-1/2 -translate-y-1/2 cursor-pointer ${
              lang === 'ar' ? 'left-1.5' : 'right-1.5'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Live Menu Count Indicator */}
      <div className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#141419] border border-white/10 flex items-center gap-1.5 text-xs font-bold text-white whitespace-nowrap shrink-0">
        <span className="font-mono-num text-[#E50909] text-sm">
          {totalResults}
        </span>
        <span className="text-white/60">
          {query.trim().length > 0
            ? lang === 'ar'
              ? `/ ${totalMenuCount} صنف`
              : `/ ${totalMenuCount} items`
            : lang === 'ar'
            ? 'صنف بالمنيو'
            : 'Menu Items'}
        </span>
      </div>
    </div>
  );
};
