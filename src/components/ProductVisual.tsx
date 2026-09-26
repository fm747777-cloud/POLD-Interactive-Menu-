import React, { useState } from 'react';
import { Language, Product } from '../types/menu';

interface ProductVisualProps {
  product: Product;
  lang: Language;
  size?: 'card' | 'detail' | 'compact';
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  lang,
  size = 'card',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const hasValidImage = Boolean(product.image && !imgError);
  const altText =
    lang === 'ar'
      ? `${product.nameAr} - ${product.nameEn}`
      : `${product.nameEn} - ${product.nameAr}`;

  if (hasValidImage) {
    return (
      <div
        className={`relative overflow-visible bg-transparent flex items-center justify-center select-none ${className}`}
      >
        <img
          src={product.image}
          alt={altText}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain p-2 sm:p-2.5 transition-transform duration-300 ease-out group-hover:scale-[1.06] drop-shadow-[0_14px_22px_rgba(0,0,0,0.55)]"
        />
      </div>
    );
  }

  const renderIllustration = () => {
    const type = product.visualType;
    const isDetail = size === 'detail';
    const svgSize = isDetail
      ? 'w-44 h-44 sm:w-52 sm:h-52'
      : size === 'compact'
      ? 'w-16 h-16 sm:w-20 sm:h-20'
      : 'w-28 h-28 sm:w-32 sm:h-32';

    const uid = product.id;

    // 1. BEEF BURGER ARCHETYPES
    if (type.includes('burger')) {
      const hasMozzarella = type === 'mozzarella-burger';
      const hasChicken = type === 'chicken-mix-burger';
      const hasMushroom = type === 'mushroom-burger';
      const hasBacon = type === 'bacon-burger' || type === 'smoked-burger';
      const hasCaramelized = type === 'caramelized-burger';
      const isSpicy = type === 'spicy-burger' || product.isSpicy;

      return (
        <svg
          viewBox="0 0 200 165"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${svgSize} transition-transform duration-300 ease-out group-hover:scale-[1.06] drop-shadow-[0_10px_14px_rgba(17,17,17,0.14)]`}
          aria-hidden="true"
        >
          <defs>
            <radialGradient
              id={`bun-${uid}`}
              cx="45%"
              cy="25%"
              r="70%"
              fx="40%"
              fy="20%"
            >
              <stop offset="0%" stopColor="#F6B86B" />
              <stop offset="48%" stopColor="#DF872F" />
              <stop offset="100%" stopColor="#8F430A" />
            </radialGradient>
            <linearGradient
              id={`patty-${uid}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#693620" />
              <stop offset="50%" stopColor="#462010" />
              <stop offset="100%" stopColor="#260E05" />
            </linearGradient>
            <linearGradient
              id={`cheese-${uid}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={isSpicy ? '#FF4D38' : '#FFD147'}
              />
              <stop
                offset="100%"
                stopColor={isSpicy ? '#C80808' : '#E8830C'}
              />
            </linearGradient>
          </defs>

          <ellipse
            cx="100"
            cy="148"
            rx="68"
            ry="9"
            fill="#111111"
            fillOpacity="0.12"
          />

          <path
            d="M36 68C36 36 62 18 100 18C138 18 164 36 164 68C164 73 136 76 100 76C64 76 36 73 36 68Z"
            fill={`url(#bun-${uid})`}
          />
          <path
            d="M56 44C68 29 88 24 112 25"
            stroke="#FFF2DC"
            strokeOpacity="0.55"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <ellipse
            cx="76"
            cy="38"
            rx="3.5"
            ry="1.8"
            transform="rotate(-15 76 38)"
            fill="#FFF7E8"
          />
          <ellipse cx="98" cy="33" rx="3.5" ry="1.8" fill="#FFF7E8" />
          <ellipse
            cx="122"
            cy="38"
            rx="3.5"
            ry="1.8"
            transform="rotate(16 122 38)"
            fill="#FFF7E8"
          />
          <ellipse
            cx="64"
            cy="52"
            rx="3.2"
            ry="1.6"
            transform="rotate(-22 64 52)"
            fill="#FFF7E8"
          />
          <ellipse
            cx="88"
            cy="49"
            rx="3.2"
            ry="1.6"
            transform="rotate(8 88 49)"
            fill="#FFF7E8"
          />
          <ellipse
            cx="112"
            cy="50"
            rx="3.2"
            ry="1.6"
            transform="rotate(-10 112 50)"
            fill="#FFF7E8"
          />
          <ellipse
            cx="136"
            cy="53"
            rx="3.2"
            ry="1.6"
            transform="rotate(20 136 53)"
            fill="#FFF7E8"
          />

          {hasMozzarella && (
            <g>
              <rect
                x="48"
                y="69"
                width="46"
                height="11"
                rx="5"
                fill="#F2A32C"
                stroke="#9C5708"
                strokeWidth="1.5"
              />
              <rect
                x="104"
                y="69"
                width="46"
                height="11"
                rx="5"
                fill="#F2A32C"
                stroke="#9C5708"
                strokeWidth="1.5"
              />
            </g>
          )}
          {hasMushroom && (
            <path
              d="M40 74C56 67 74 79 94 72C114 66 134 79 160 73"
              stroke="#DFD3C3"
              strokeWidth="8"
              strokeLinecap="round"
            />
          )}
          {hasCaramelized && (
            <path
              d="M42 74C60 68 78 78 100 72C122 66 140 78 158 73"
              stroke="#9C4A1A"
              strokeWidth="7"
              strokeLinecap="round"
            />
          )}
          {hasBacon && (
            <path
              d="M36 74C54 66 70 81 88 73C106 65 122 81 140 73C150 69 158 73 164 76"
              stroke="#A81313"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
          )}

          <path
            d="M30 82C40 75 50 89 60 82C70 75 80 89 90 82C100 75 110 89 120 82C130 75 140 89 150 82C158 76 165 80 170 83"
            stroke="#52B029"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <rect x="44" y="86" width="50" height="8" rx="4" fill="#E50909" />
          <rect x="106" y="86" width="50" height="8" rx="4" fill="#E50909" />

          {hasChicken && (
            <path
              d="M34 96C42 91 54 94 64 91C76 88 88 94 100 91C112 88 124 94 136 91C148 89 158 92 164 98C166 103 158 108 148 108H52C42 108 32 103 34 96Z"
              fill="#DF8525"
            />
          )}

          <path
            d="M36 102H164L154 115L138 104L120 119L100 104L80 118L62 104L46 114L36 102Z"
            fill={`url(#cheese-${uid})`}
          />

          <rect
            x="32"
            y="107"
            width="136"
            height="22"
            rx="11"
            fill={`url(#patty-${uid})`}
          />
          <line
            x1="62"
            y1="111"
            x2="56"
            y2="125"
            stroke="#1C0903"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="86"
            y1="111"
            x2="80"
            y2="125"
            stroke="#1C0903"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="110"
            y1="111"
            x2="104"
            y2="125"
            stroke="#1C0903"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="134"
            y1="111"
            x2="128"
            y2="125"
            stroke="#1C0903"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          <path
            d="M40 129H160C160 140 148 147 134 147H66C52 147 40 140 40 129Z"
            fill={`url(#bun-${uid})`}
          />
        </svg>
      );
    }

    // 2. FRIED CHICKEN SANDWICH ARCHETYPES (12 ITEMS)
    if (type.startsWith('chicken-')) {
      const isSpicy = type === 'chicken-spicy' || product.isSpicy;
      const isSlaw = type === 'chicken-slaw';
      const isSmoked = type === 'chicken-smoked';
      const isCrunch = type === 'chicken-crunch';

      return (
        <svg
          viewBox="0 0 200 165"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${svgSize} transition-transform duration-300 ease-out group-hover:scale-[1.06] drop-shadow-[0_10px_14px_rgba(17,17,17,0.14)]`}
          aria-hidden="true"
        >
          <defs>
            <radialGradient
              id={`chkbun-${uid}`}
              cx="45%"
              cy="25%"
              r="70%"
              fx="40%"
              fy="20%"
            >
              <stop offset="0%" stopColor="#F8BE74" />
              <stop offset="48%" stopColor="#DF872F" />
              <stop offset="100%" stopColor="#8F430A" />
            </radialGradient>
            <linearGradient
              id={`chkfillet-${uid}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FBB040" />
              <stop offset="52%" stopColor="#E07D16" />
              <stop offset="100%" stopColor="#9C4D06" />
            </linearGradient>
          </defs>

          <ellipse
            cx="100"
            cy="148"
            rx="68"
            ry="9"
            fill="#111111"
            fillOpacity="0.12"
          />

          {/* Top Sesame Bun */}
          <path
            d="M36 66C36 34 62 16 100 16C138 16 164 34 164 66C164 71 136 74 100 74C64 74 36 71 36 66Z"
            fill={`url(#chkbun-${uid})`}
          />
          <path
            d="M56 42C68 27 88 22 112 23"
            stroke="#FFF2DC"
            strokeOpacity="0.55"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <ellipse
            cx="76"
            cy="36"
            rx="3.5"
            ry="1.8"
            transform="rotate(-15 76 36)"
            fill="#FFF7E8"
          />
          <ellipse cx="98" cy="31" rx="3.5" ry="1.8" fill="#FFF7E8" />
          <ellipse
            cx="122"
            cy="36"
            rx="3.5"
            ry="1.8"
            transform="rotate(16 122 36)"
            fill="#FFF7E8"
          />
          <ellipse
            cx="88"
            cy="47"
            rx="3.2"
            ry="1.6"
            transform="rotate(8 88 47)"
            fill="#FFF7E8"
          />
          <ellipse
            cx="114"
            cy="48"
            rx="3.2"
            ry="1.6"
            transform="rotate(-10 114 48)"
            fill="#FFF7E8"
          />

          {/* Toppings depending on Chicken Sandwich variant */}
          {isSlaw && (
            <path
              d="M40 74C60 66 80 80 100 72C120 66 140 80 160 73"
              stroke="#FEF3C7"
              strokeWidth="9"
              strokeLinecap="round"
            />
          )}
          {isSmoked && (
            <path
              d="M38 74C56 66 74 80 94 72C114 66 134 80 162 73"
              stroke="#B91C1C"
              strokeWidth="7"
              strokeLinecap="round"
            />
          )}
          {isCrunch && (
            <g>
              <polygon points="56,68 72,82 46,80" fill="#F97316" />
              <polygon points="96,66 114,82 84,80" fill="#FB923C" />
              <polygon points="134,68 152,82 124,80" fill="#EA580C" />
            </g>
          )}

          {/* Sauce & Melted Cheese Drip */}
          <path
            d="M38 78H162L152 90L136 80L118 93L100 80L82 92L64 80L48 89L38 78Z"
            fill={isSpicy ? '#E50909' : '#FCA311'}
          />

          {/* Crispy Golden Fried Chicken Fillet */}
          <path
            d="M28 96C32 82 48 80 64 85C80 76 104 78 122 84C140 76 164 80 172 96C174 108 160 116 142 114C122 120 98 118 78 114C56 118 26 110 28 96Z"
            fill={`url(#chkfillet-${uid})`}
          />
          <path
            d="M50 95C66 88 84 98 102 91M118 93C134 86 150 96 160 91"
            stroke="#FEF08A"
            strokeOpacity="0.7"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Lettuce & Tomato */}
          <path
            d="M32 118C42 112 52 124 64 118C76 112 88 124 100 118C112 112 124 124 136 118C148 112 158 122 168 118"
            stroke="#52B029"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          {!isSlaw && (
            <>
              <rect
                x="46"
                y="121"
                width="46"
                height="6.5"
                rx="3"
                fill="#E50909"
              />
              <rect
                x="108"
                y="121"
                width="46"
                height="6.5"
                rx="3"
                fill="#E50909"
              />
            </>
          )}

          {/* Bottom Brioche Bun */}
          <path
            d="M40 128H160C160 139 148 146 134 146H66C52 146 40 139 40 128Z"
            fill={`url(#chkbun-${uid})`}
          />
        </svg>
      );
    }

    // 3. LOADED FRIES ARCHETYPES (4 ITEMS: CHEESE, CHICKEN, BEEF, MIX FRIES)
    if (type.startsWith('fries-')) {
      const hasChicken = type === 'fries-chicken' || type === 'fries-mix';
      const hasBeef = type === 'fries-beef' || type === 'fries-mix';

      return (
        <svg
          viewBox="0 0 200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${svgSize} transition-transform duration-300 ease-out group-hover:scale-[1.06] drop-shadow-[0_10px_14px_rgba(17,17,17,0.14)]`}
          aria-hidden="true"
        >
          <ellipse
            cx="100"
            cy="144"
            rx="64"
            ry="8"
            fill="#111111"
            fillOpacity="0.12"
          />

          {/* Golden Crispy Fries Fan */}
          {[
            { x: 50, y: 34, w: 13, h: 66, r: -18, c: '#F59E0B' },
            { x: 66, y: 26, w: 13, h: 72, r: -10, c: '#FBBF24' },
            { x: 82, y: 22, w: 14, h: 76, r: -4, c: '#FCD34D' },
            { x: 100, y: 20, w: 14, h: 78, r: 3, c: '#FBBF24' },
            { x: 118, y: 24, w: 13, h: 74, r: 9, c: '#F59E0B' },
            { x: 134, y: 32, w: 13, h: 68, r: 16, c: '#D97706' },
          ].map((f, i) => (
            <rect
              key={i}
              x={f.x}
              y={f.y}
              width={f.w}
              height={f.h}
              rx="4"
              transform={`rotate(${f.r} ${f.x + f.w / 2} ${f.y + f.h})`}
              fill={f.c}
            />
          ))}

          {/* Loaded Beef / Chicken Chunks */}
          {hasBeef && (
            <g>
              <rect
                x="54"
                y="62"
                width="26"
                height="16"
                rx="6"
                fill="#4A2111"
              />
              <rect
                x="92"
                y="58"
                width="28"
                height="16"
                rx="6"
                fill="#5C2814"
              />
            </g>
          )}
          {hasChicken && (
            <g>
              <rect
                x="74"
                y="56"
                width="28"
                height="16"
                rx="6"
                fill="#E07D16"
              />
              <rect
                x="116"
                y="62"
                width="26"
                height="16"
                rx="6"
                fill="#F59E0B"
              />
            </g>
          )}

          {/* Melted Cheddar Cheese Sauce Drizzle */}
          <path
            d="M46 72C64 64 82 82 100 70C118 60 136 80 154 72L146 86L126 76L108 90L90 76L72 88L54 76L46 72Z"
            fill="#FCA311"
          />

          {/* POLD Red Serving Tray */}
          <path
            d="M38 82H162L148 136C146 140 141 142 136 142H64C59 142 54 140 52 136L38 82Z"
            fill="#E50909"
          />
          <rect
            x="76"
            y="102"
            width="48"
            height="16"
            rx="4"
            fill="#FFFFFF"
            fillOpacity="0.92"
          />
        </svg>
      );
    }

    // 4. SAUCE ARCHETYPES
    if (type.startsWith('sauce-')) {
      const sauceColor =
        type === 'sauce-spicy'
          ? '#E50909'
          : type === 'sauce-bbq'
          ? '#52190B'
          : type === 'sauce-cheddar'
          ? '#F59E0B'
          : '#F2DEC2';

      return (
        <svg
          viewBox="0 0 150 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${svgSize} transition-transform duration-300 ease-out group-hover:scale-[1.06] drop-shadow-[0_8px_12px_rgba(17,17,17,0.12)]`}
          aria-hidden="true"
        >
          <ellipse
            cx="75"
            cy="112"
            rx="44"
            ry="6"
            fill="#111111"
            fillOpacity="0.1"
          />
          <path
            d="M34 52H116L104 98C102 104 96 108 89 108H61C54 108 48 104 46 98L34 52Z"
            fill="#1F1F1F"
          />
          <ellipse cx="75" cy="52" rx="41" ry="12" fill={sauceColor} />
          <path
            d="M52 51C62 45 74 55 86 49C92 46 98 49 102 52"
            stroke="#FFFFFF"
            strokeOpacity="0.55"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <rect x="55" y="72" width="40" height="13" rx="3.5" fill="#E50909" />
        </svg>
      );
    }

    // 5. ADD-ON ARCHETYPES
    return (
      <svg
        viewBox="0 0 150 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${svgSize} transition-transform duration-300 ease-out group-hover:scale-[1.06] drop-shadow-[0_8px_12px_rgba(17,17,17,0.12)]`}
        aria-hidden="true"
      >
        <ellipse
          cx="75"
          cy="112"
          rx="44"
          ry="6"
          fill="#111111"
          fillOpacity="0.1"
        />
        {type === 'addon-fries' ? (
          <g>
            <rect
              x="48"
              y="22"
              width="11"
              height="50"
              rx="4"
              transform="rotate(-8 48 22)"
              fill="#F59E0B"
            />
            <rect
              x="63"
              y="18"
              width="11"
              height="54"
              rx="4"
              fill="#FBBF24"
            />
            <rect
              x="78"
              y="20"
              width="11"
              height="52"
              rx="4"
              transform="rotate(6 78 20)"
              fill="#F59E0B"
            />
            <rect
              x="91"
              y="26"
              width="11"
              height="48"
              rx="4"
              transform="rotate(14 91 26)"
              fill="#FBBF24"
            />
            <path
              d="M40 58H110L100 104H50L40 58Z"
              fill="#E50909"
            />
          </g>
        ) : type === 'addon-rings' ? (
          <g>
            <circle cx="62" cy="70" r="21" stroke="#D97706" strokeWidth="11" />
            <circle cx="90" cy="58" r="21" stroke="#F59E0B" strokeWidth="11" />
          </g>
        ) : type === 'addon-mozzarella' ? (
          <g>
            <rect
              x="38"
              y="58"
              width="72"
              height="18"
              rx="9"
              transform="rotate(-14 38 58)"
              fill="#D97706"
            />
            <rect
              x="44"
              y="74"
              width="72"
              height="18"
              rx="9"
              transform="rotate(6 44 74)"
              fill="#F59E0B"
            />
          </g>
        ) : type === 'addon-meat' ? (
          <g>
            <path
              d="M32 62C48 52 68 72 88 60C104 50 116 62 122 66"
              stroke="#9E1B1B"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M36 80C52 70 72 90 92 78C108 68 118 80 124 84"
              stroke="#B80606"
              strokeWidth="12"
              strokeLinecap="round"
            />
          </g>
        ) : type === 'addon-mushroom' ? (
          <g>
            <path
              d="M48 64C48 44 102 44 102 64H48Z"
              fill="#C8B6A6"
            />
            <rect x="65" y="62" width="20" height="28" rx="6" fill="#E3D5CA" />
          </g>
        ) : type === 'addon-crunch' ? (
          <g>
            <polygon points="55,42 82,84 34,84" fill="#EA580C" />
            <polygon points="85,38 114,82 66,86" fill="#F97316" />
          </g>
        ) : (
          <g>
            <path
              d="M36 66H114L104 98H46L36 66Z"
              fill="#FFFFFF"
              stroke="#111111"
              strokeWidth="2.5"
            />
            <path
              d="M42 64C54 52 70 54 78 60C88 52 102 56 108 64"
              fill="#E9F5DB"
              stroke="#65A30D"
              strokeWidth="3"
            />
          </g>
        )}
      </svg>
    );
  };

  return (
    <div
      className={`relative overflow-visible bg-transparent flex flex-col items-center justify-center select-none ${className}`}
    >
      <div className="relative z-10 flex items-center justify-center">
        {renderIllustration()}
      </div>

      {size === 'detail' && (
        <div className="relative z-10 mt-1 text-[11px] font-display tracking-widest uppercase text-white/55">
          POLD • BURGER & FRIED CHICKEN
        </div>
      )}
    </div>
  );
};
