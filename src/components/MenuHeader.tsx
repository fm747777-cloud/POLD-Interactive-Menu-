import React from 'react';
import { Play } from 'lucide-react';
import { CategoryId, Language } from '../types/menu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { PoldBrandLogo } from './PoldBrandLogo';

export interface MenuHeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  activeCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  onReplayIntro: () => void;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({
  lang,
  onLanguageChange,
  activeCategory,
  onSelectCategory,
  onReplayIntro,
}) => {
  const navItems: { id: CategoryId; labelAr: string; labelEn: string }[] = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'burgers', labelAr: 'البرجر', labelEn: 'Burgers' },
    { id: 'chicken', labelAr: 'فرايد تشيكن', labelEn: 'Chicken' },
    { id: 'fries', labelAr: 'الفرايز', labelEn: 'Fries' },
    { id: 'sauces', labelAr: 'الصوصات', labelEn: 'Sauces' },
    { id: 'addons', labelAr: 'إضافات', labelEn: 'Add-ons' },
  ];

  return (
    <header className="bg-[#0B0B0E] text-[#FFFFFF] border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Authentic POLD Brand Logo Lockup */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group focus-visible:outline-none"
        >
          <PoldBrandLogo size="sm" />
          <span
            className="hidden sm:inline-block h-4 w-[1.5px] bg-[#E50909]"
            aria-hidden="true"
          />
          <span className="hidden sm:inline-block font-display text-[11px] font-semibold tracking-[0.22em] text-white/70">
            POLD BURGER <span className="text-[#E50909]">Eat Pold Think Pold</span>
          </span>
        </a>

        {/* Desktop Quick Category Links */}
        <nav
          aria-label={lang === 'ar' ? 'أقسام المنيو' : 'Menu sections'}
          className="hidden lg:flex items-center gap-5 text-xs font-bold tracking-wider uppercase"
        >
          {navItems.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectCategory(item.id)}
                className={`py-1 transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-[#E50909]'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {lang === 'ar' ? item.labelAr : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Actions: Replay Cinematic Hero + AR/EN Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={onReplayIntro}
            aria-label={
              lang === 'ar' ? 'مشاهدة العرض السينمائي' : 'Replay Cinematic Hero'
            }
            className="min-h-[36px] px-3 py-1.5 rounded-lg bg-[#16161C] hover:bg-[#E50909] active:scale-95 border border-white/10 text-xs font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <Play className="w-3 h-3 fill-current text-[#E50909] group-hover:text-white" />
            <span>{lang === 'ar' ? 'العرض' : 'Hero'}</span>
          </button>

          <LanguageSwitcher lang={lang} onChange={onLanguageChange} />
        </div>
      </div>
    </header>
  );
};
