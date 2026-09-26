import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { MANAGERS } from '../data/managers';
import { RESTAURANT_INFO } from '../data/menuData';
import { Language } from '../types/menu';
import { ManagerFigure } from './ManagerFigure';
import { PoldBrandLogo } from './PoldBrandLogo';

interface FooterProps {
  lang: Language;
  onReplayHero?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onReplayHero }) => {
  return (
    <footer className="bg-[#070709] text-[#FFFFFF] border-t border-white/10 mt-16 overflow-hidden">
      {/* =================================================================
          SECTION 9 CHARACTER MOMENT:
          THE POLD MANAGEMENT TEAM TRIANGULAR SHOWCASE
          Fixed Identity Order: Ahmed (Back-Left), Mahmoud (Center Foreground), Mohamed (Back-Right)
         ================================================================= */}
      <div className="relative border-b border-white/8 py-10 sm:py-12 px-4 sm:px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 60%, rgba(229, 9, 9, 0.16) 0%, transparent 65%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50909]" />
            <span className="font-display text-[11px] font-semibold tracking-[0.28em] uppercase text-white/70">
              POLD MANAGEMENT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50909]" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.12em] uppercase text-white text-center">
            {lang === 'ar'
              ? 'إدارة مطعم بولد — POLD MANAGERS'
              : 'THE PEOPLE BEHIND POLD'}
          </h2>

          {/* Fixed Triangular Composition: Ahmed (Back-Left), Mahmoud (Center Foreground), Mohamed (Back-Right) */}
          <div
            dir="ltr"
            className="mt-6 grid grid-cols-3 items-end gap-2 sm:gap-8 max-w-2xl w-full justify-items-center"
          >
            {/* 2. AHMED — BACK LEFT */}
            <div className="pb-2">
              <ManagerFigure
                manager={MANAGERS.ahmed}
                showName={true}
                isIdle={true}
                variant="footer"
              />
            </div>

            {/* 1. MAHMOUD — CENTER FOREGROUND */}
            <div className="z-10">
              <ManagerFigure
                manager={MANAGERS.mahmoud}
                showName={true}
                isIdle={true}
                variant="footer"
              />
            </div>

            {/* 3. MOHAMED — BACK RIGHT */}
            <div className="pb-2">
              <ManagerFigure
                manager={MANAGERS.mohamed}
                showName={true}
                isIdle={true}
                variant="footer"
              />
            </div>
          </div>

          {onReplayHero && (
            <button
              type="button"
              onClick={onReplayHero}
              className="mt-6 min-h-[40px] px-5 py-2 rounded-xl bg-white/6 hover:bg-[#E50909] border border-white/12 text-xs font-display font-bold tracking-[0.18em] uppercase text-white transition-all cursor-pointer"
            >
              {lang === 'ar'
                ? 'إعادة العرض السينمائي • REPLAY HERO'
                : 'REPLAY CINEMATIC INTRO'}
            </button>
          )}
        </div>
      </div>

      {/* =================================================================
          RESTAURANT BRANCH & CONTACT FOOTER
         ================================================================= */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-9">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Brand Lockup */}
          <div className="flex flex-col items-start">
            <PoldBrandLogo size="md" />
            <p className="font-display text-xs tracking-[0.24em] text-white/75 mt-2">
              POLD BURGER <span className="text-[#E50909]">Eat Pold Think Pold</span>
            </p>
            <p className="text-xs text-white/55 mt-1.5">
              {lang === 'ar'
                ? 'المنيو الرقمي الرسمي — جميع الأسعار بالجنيه المصري (EGP)'
                : 'Official Digital QR Menu — All prices in EGP'}
            </p>
          </div>

          {/* Branch Address, Direct Click-to-Call Phone & Official Facebook Link */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin
                className="w-4 h-4 text-[#E50909] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-white/55">
                  {lang === 'ar' ? 'العنوان' : 'Branch Location'}
                </div>
                <p className="font-semibold text-white mt-0.5">
                  {lang === 'ar'
                    ? RESTAURANT_INFO.addressAr
                    : RESTAURANT_INFO.addressEn}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                aria-label={`Call ${RESTAURANT_INFO.phone}`}
                className="group flex items-start gap-2.5 text-white hover:text-[#E50909] transition-colors"
              >
                <Phone
                  className="w-4 h-4 text-[#E50909] shrink-0 mt-1 transition-transform group-hover:scale-110"
                  aria-hidden="true"
                />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white/55">
                    {lang === 'ar' ? 'رقم التواصل' : 'Contact Number'}
                  </div>
                  <div className="mt-0.5 font-mono-num font-bold text-white group-hover:text-[#E50909] transition-colors underline-offset-4 group-hover:underline">
                    {RESTAURANT_INFO.phone}
                  </div>
                </div>
              </a>
            </div>

            <div className="flex items-start gap-2.5">
              <a
                href={RESTAURANT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group flex items-start gap-2.5 text-white hover:text-[#E50909] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-[#E50909] shrink-0 mt-1 transition-transform group-hover:scale-110"
                  aria-hidden="true"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white/55">
                    {lang === 'ar' ? 'فيسبوك' : 'Facebook'}
                  </div>
                  <div className="mt-0.5 font-semibold text-white group-hover:text-[#E50909] transition-colors underline-offset-4 group-hover:underline">
                    Facebook
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
