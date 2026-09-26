import React from 'react';
import { Language } from '../types/menu';

interface LanguageSwitcherProps {
  lang: Language;
  onChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  lang,
  onChange,
}) => {
  return (
    <div
      role="group"
      aria-label="Language Switcher"
      className="inline-flex items-center bg-[#16161C] p-1 rounded-lg border border-white/10 shrink-0"
    >
      <button
        type="button"
        onClick={() => onChange('ar')}
        aria-pressed={lang === 'ar'}
        className={`min-h-[34px] min-w-[38px] px-2.5 py-1 text-xs font-bold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
          lang === 'ar'
            ? 'bg-[#E50909] text-white shadow-xs'
            : 'text-white/70 hover:text-white'
        }`}
      >
        AR
      </button>
      <span
        className="text-white/20 text-xs select-none px-0.5"
        aria-hidden="true"
      >
        |
      </span>
      <button
        type="button"
        onClick={() => onChange('en')}
        aria-pressed={lang === 'en'}
        className={`min-h-[34px] min-w-[38px] px-2.5 py-1 text-xs font-bold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
          lang === 'en'
            ? 'bg-[#E50909] text-white shadow-xs'
            : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
};
