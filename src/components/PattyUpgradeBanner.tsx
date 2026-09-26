import React from 'react';
import { PATTY_UPGRADES } from '../data/menuData';
import { CategoryId, Language } from '../types/menu';

interface PattyUpgradeBannerProps {
  lang: Language;
  activeCategory: CategoryId;
}

export const PattyUpgradeBanner: React.FC<PattyUpgradeBannerProps> = ({
  lang,
  activeCategory,
}) => {
  const isChickenOnly = activeCategory === 'chicken';
  const isBeefOnly = activeCategory === 'burgers';

  return (
    <section
      aria-label={
        lang === 'ar'
          ? 'إضافات دابل وترابل للبرجر والفرايد تشيكن'
          : 'Double and Triple Upgrades for Burgers and Fried Chicken'
      }
      className="bg-[#242424] text-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-black/10"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h2 className="text-sm sm:text-base font-bold tracking-tight text-white">
            {lang === 'ar'
              ? isChickenOnly
                ? 'دابل أو ترابل — إضافات شرائح الفراخ'
                : isBeefOnly
                ? 'دابل أو ترابل — إضافات شرائح البيف'
                : 'دابل أو ترابل — إضافات شرائح البيف أو الفراخ'
              : isChickenOnly
              ? 'Double or Triple — Extra Fried Chicken Slices'
              : isBeefOnly
              ? 'Double or Triple — Extra Beef Slices'
              : 'Double or Triple — Extra Beef or Chicken Slices'}
          </h2>
          <p className="text-xs text-[#F4F1EE]/75 mt-0.5">
            {lang === 'ar'
              ? 'متاح لأي ساندوتش برجر بيف أو فرايد تشيكن (يمكنك تجربته داخل تفاصيل الصنف)'
              : 'Available for any Beef Burger or Fried Chicken sandwich (preview live inside product details)'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {PATTY_UPGRADES.map((upgrade) => {
          const subtitleAr = isChickenOnly
            ? upgrade.subtitleChickenAr
            : isBeefOnly
            ? upgrade.subtitleBeefAr
            : `${upgrade.subtitleBeefAr} / ${upgrade.subtitleChickenAr}`;

          const subtitleEn = isChickenOnly
            ? upgrade.subtitleChickenEn
            : isBeefOnly
            ? upgrade.subtitleBeefEn
            : `${upgrade.subtitleBeefEn} / ${upgrade.subtitleChickenEn}`;

          return (
            <div
              key={upgrade.id}
              className="min-h-[54px] w-full flex items-center justify-between gap-3 bg-[#111111] px-4 py-2.5 rounded-xl border border-white/10"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm sm:text-base text-white">
                    {upgrade.nameAr}
                  </span>
                  <span className="text-white/40" aria-hidden="true">
                    ·
                  </span>
                  <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wide text-[#F4F1EE]">
                    {upgrade.nameEn}
                  </span>
                </div>
                <p className="text-xs text-[#F4F1EE]/75 mt-0.5 truncate">
                  {lang === 'ar' ? subtitleAr : subtitleEn}
                </p>
              </div>

              <div className="shrink-0 text-end">
                <span className="font-mono-num text-sm sm:text-base font-bold text-[#E50909] whitespace-nowrap">
                  EGP {upgrade.priceAdd}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
