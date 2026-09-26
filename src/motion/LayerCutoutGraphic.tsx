import React, { useState } from 'react';
import { ProductIngredientLayer } from '../types/menu';

interface LayerCutoutGraphicProps {
  layer: ProductIngredientLayer;
  uid: string;
}

export const LayerCutoutGraphic: React.FC<LayerCutoutGraphicProps> = ({
  layer,
  uid,
}) => {
  const [imgErr, setImgErr] = useState(false);

  if (layer.assetUrl && !imgErr) {
    return (
      <img
        src={layer.assetUrl}
        alt={layer.name}
        onError={() => setImgErr(true)}
        className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)]"
      />
    );
  }

  const gradId = `${layer.type}-${uid}-${layer.layer}`;

  switch (layer.type) {
    case 'bun-top':
      return (
        <svg
          viewBox="0 0 300 115"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_12px_16px_rgba(0,0,0,0.45)]"
        >
          <defs>
            <radialGradient
              id={`topbun-${gradId}`}
              cx="44%"
              cy="26%"
              r="70%"
              fx="38%"
              fy="20%"
            >
              <stop offset="0%" stopColor="#F8BE74" />
              <stop offset="45%" stopColor="#DF872F" />
              <stop offset="85%" stopColor="#A64F10" />
              <stop offset="100%" stopColor="#753306" />
            </radialGradient>
          </defs>
          <ellipse cx="150" cy="94" rx="112" ry="14" fill="#D88A3B" />
          <path
            d="M38 92C36 38 82 10 150 10C218 10 264 38 262 92C262 100 214 106 150 106C86 106 38 100 38 92Z"
            fill={`url(#topbun-${gradId})`}
          />
          <path
            d="M64 42C82 24 114 18 154 20"
            stroke="#FFF3DF"
            strokeOpacity="0.48"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {[
            { x: 96, y: 38, r: -16 },
            { x: 128, y: 30, r: -5 },
            { x: 162, y: 29, r: 8 },
            { x: 196, y: 39, r: 19 },
            { x: 78, y: 58, r: -24 },
            { x: 114, y: 52, r: -10 },
            { x: 148, y: 49, r: 4 },
            { x: 182, y: 54, r: 14 },
            { x: 216, y: 60, r: 24 },
            { x: 94, y: 74, r: -12 },
            { x: 134, y: 70, r: -4 },
            { x: 168, y: 71, r: 9 },
            { x: 204, y: 75, r: 17 },
          ].map((s, i) => (
            <ellipse
              key={i}
              cx={s.x}
              cy={s.y}
              rx="4.8"
              ry="2.3"
              transform={`rotate(${s.r} ${s.x} ${s.y})`}
              fill="#FFF7E8"
            />
          ))}
        </svg>
      );

    case 'bun-bottom':
      return (
        <svg
          viewBox="0 0 300 68"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_14px_18px_rgba(0,0,0,0.5)]"
        >
          <defs>
            <linearGradient
              id={`botbun-${gradId}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F0A854" />
              <stop offset="50%" stopColor="#D67B24" />
              <stop offset="100%" stopColor="#8A3E06" />
            </linearGradient>
          </defs>
          <path
            d="M42 22H258C260 44 236 58 150 58C64 58 40 44 42 22Z"
            fill={`url(#botbun-${gradId})`}
          />
          <ellipse cx="150" cy="22" rx="108" ry="12" fill="#FCE5C2" />
          <ellipse
            cx="150"
            cy="22"
            rx="100"
            ry="8.5"
            stroke="#D98A3C"
            strokeOpacity="0.45"
            strokeWidth="2"
          />
        </svg>
      );

    case 'beef':
      return (
        <svg
          viewBox="0 0 300 68"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_14px_18px_rgba(0,0,0,0.55)]"
        >
          <defs>
            <linearGradient
              id={`beef-${gradId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6E3821" />
              <stop offset="45%" stopColor="#4A2111" />
              <stop offset="100%" stopColor="#240C04" />
            </linearGradient>
          </defs>
          <path
            d="M32 30C32 18 78 10 150 10C222 10 268 18 268 30C270 38 268 45 260 50C244 58 202 60 150 60C98 60 56 58 40 50C32 45 30 38 32 30Z"
            fill={`url(#beef-${gradId})`}
          />
          <ellipse cx="150" cy="25" rx="114" ry="13" fill="#7D432A" />
          {[70, 102, 134, 166, 198, 230].map((x, i) => (
            <path
              key={i}
              d={`M${x} 16L${x - 12} 52`}
              stroke="#170702"
              strokeOpacity="0.78"
              strokeWidth="5"
              strokeLinecap="round"
            />
          ))}
          <ellipse
            cx="148"
            cy="37"
            rx="22"
            ry="3.5"
            fill="#FBBF24"
            fillOpacity="0.35"
          />
        </svg>
      );

    case 'chicken-crispy':
      return (
        <svg
          viewBox="0 0 300 74"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_16px_20px_rgba(0,0,0,0.55)]"
        >
          <defs>
            <linearGradient
              id={`chk-${gradId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FBB040" />
              <stop offset="50%" stopColor="#E07D16" />
              <stop offset="100%" stopColor="#9C4D06" />
            </linearGradient>
          </defs>
          <path
            d="M28 36C32 20 50 18 66 23C84 12 112 14 134 21C156 12 186 12 208 23C228 16 258 20 270 36C274 50 256 60 236 58C214 66 184 64 160 58C134 66 102 64 78 58C54 62 26 52 28 36Z"
            fill={`url(#chk-${gradId})`}
          />
          {/* Crispy Golden Flake Ridges */}
          <path
            d="M52 34C68 25 88 38 108 29M138 31C158 22 182 38 204 29M218 40C234 33 248 42 256 36M72 46C94 38 118 50 142 42"
            stroke="#FEF08A"
            strokeOpacity="0.68"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'cheese':
      return (
        <svg
          viewBox="0 0 300 58"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_9px_12px_rgba(0,0,0,0.35)]"
        >
          <defs>
            <linearGradient
              id={`chz-${gradId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFD24C" />
              <stop offset="55%" stopColor="#FCA311" />
              <stop offset="100%" stopColor="#D96B06" />
            </linearGradient>
          </defs>
          <path
            d="M34 20C70 12 110 10 150 10C190 10 230 12 266 20L274 27C260 33 248 42 236 50C228 55 220 50 214 40C206 28 194 31 182 42C174 51 164 52 156 42C148 31 136 31 126 44C118 54 108 54 100 44C92 30 78 29 68 42C60 50 50 49 42 38C36 29 28 29 24 25L34 20Z"
            fill={`url(#chz-${gradId})`}
          />
          <path
            d="M56 22C102 16 162 16 238 22"
            stroke="#FFF3B0"
            strokeOpacity="0.7"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'lettuce':
      return (
        <svg
          viewBox="0 0 300 60"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_10px_12px_rgba(0,0,0,0.32)]"
        >
          <path
            d="M24 32C34 20 48 38 64 28C80 18 94 40 112 28C130 16 146 40 164 28C182 16 198 40 216 28C234 16 248 38 264 28C274 22 282 32 286 35C280 48 264 50 248 42C232 52 212 50 196 42C178 52 158 50 142 42C124 52 104 50 88 42C70 52 52 50 38 42C26 48 20 42 24 32Z"
            fill="#65C434"
          />
          <path
            d="M44 34C62 26 80 38 98 30M136 32C156 24 176 38 196 30"
            stroke="#ECFCCB"
            strokeOpacity="0.65"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'tomato':
      return (
        <svg
          viewBox="0 0 300 54"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_9px_12px_rgba(0,0,0,0.34)]"
        >
          <g transform="translate(8, 2)">
            <ellipse cx="105" cy="26" rx="68" ry="13" fill="#E50909" />
            <ellipse cx="105" cy="23" rx="64" ry="10" fill="#FF4B3A" />
            <circle cx="88" cy="23" r="2" fill="#FDE047" />
            <circle cx="122" cy="23" r="2" fill="#FDE047" />
          </g>
          <g transform="translate(84, 5)">
            <ellipse cx="105" cy="26" rx="68" ry="13" fill="#B80606" />
            <ellipse cx="105" cy="23" rx="64" ry="10" fill="#E51910" />
            <circle cx="88" cy="23" r="2" fill="#FDE047" />
            <circle cx="122" cy="23" r="2" fill="#FDE047" />
          </g>
        </svg>
      );

    case 'onion-rings':
    case 'onion-caramelized':
      return (
        <svg
          viewBox="0 0 300 56"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_8px_12px_rgba(0,0,0,0.36)]"
        >
          <ellipse
            cx="112"
            cy="28"
            rx="48"
            ry="13"
            stroke={
              layer.type === 'onion-caramelized' ? '#9C4A1A' : '#F59E0B'
            }
            strokeWidth="9"
          />
          <ellipse
            cx="188"
            cy="30"
            rx="48"
            ry="13"
            stroke={
              layer.type === 'onion-caramelized' ? '#7C360F' : '#D97706'
            }
            strokeWidth="9"
          />
        </svg>
      );

    case 'bacon':
    case 'smoked-beef':
    case 'smoked-turkey':
      return (
        <svg
          viewBox="0 0 300 56"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_9px_12px_rgba(0,0,0,0.38)]"
        >
          <path
            d="M42 28C66 16 90 40 116 26C142 12 168 40 194 26C218 14 240 34 258 28"
            stroke={
              layer.type === 'smoked-turkey' ? '#D97757' : '#9E1414'
            }
            strokeWidth="13"
            strokeLinecap="round"
          />
          <path
            d="M48 32C70 20 94 42 120 30C146 18 172 42 198 30C220 20 240 36 254 32"
            stroke={
              layer.type === 'smoked-turkey' ? '#F3B391' : '#E5383B'
            }
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'mozzarella-sticks':
      return (
        <svg
          viewBox="0 0 300 68"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_12px_16px_rgba(0,0,0,0.45)]"
        >
          <rect
            x="54"
            y="20"
            width="92"
            height="24"
            rx="11"
            transform="rotate(-7 54 20)"
            fill="#E88D1A"
            stroke="#8F4904"
            strokeWidth="2"
          />
          <path
            d="M68 27L132 19"
            stroke="#FDE68A"
            strokeOpacity="0.65"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect
            x="148"
            y="14"
            width="92"
            height="24"
            rx="11"
            transform="rotate(7 148 14)"
            fill="#F59E0B"
            stroke="#8F4904"
            strokeWidth="2"
          />
          <path
            d="M162 23L224 31"
            stroke="#FEF3C7"
            strokeOpacity="0.65"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'fries-golden':
    case 'fries-container':
      return (
        <svg
          viewBox="0 0 300 96"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_14px_18px_rgba(0,0,0,0.48)]"
        >
          {[
            { x: 74, y: 18, w: 14, h: 66, r: -18, c: '#F59E0B' },
            { x: 96, y: 10, w: 14, h: 72, r: -10, c: '#FBBF24' },
            { x: 118, y: 6, w: 15, h: 76, r: -4, c: '#FCD34D' },
            { x: 142, y: 4, w: 15, h: 78, r: 2, c: '#FBBF24' },
            { x: 166, y: 8, w: 15, h: 74, r: 8, c: '#F59E0B' },
            { x: 188, y: 12, w: 14, h: 70, r: 14, c: '#FBBF24' },
            { x: 210, y: 20, w: 14, h: 64, r: 20, c: '#D97706' },
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
              stroke="#B45309"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      );

    case 'coleslaw-fill':
    case 'coleslaw-cup':
      return (
        <svg
          viewBox="0 0 300 76"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_12px_16px_rgba(0,0,0,0.42)]"
        >
          <ellipse cx="150" cy="44" rx="88" ry="24" fill="#FFFBEB" />
          <path
            d="M78 42C98 24 126 22 150 26C176 20 204 24 222 42C212 56 184 62 150 62C116 62 88 56 78 42Z"
            fill="#FEF3C7"
          />
          {/* Shredded Cabbage & Carrot Ribbons */}
          <path
            d="M96 38C112 28 132 42 148 32M156 36C174 26 192 40 206 32M114 48C134 40 158 52 182 42"
            stroke="#84CC16"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M106 34C122 44 142 30 162 40M136 46C154 36 172 48 194 38"
            stroke="#F97316"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M120 32C136 24 154 36 172 28"
            stroke="#9333EA"
            strokeOpacity="0.65"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'crunch-chips':
      return (
        <svg
          viewBox="0 0 300 74"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_12px_16px_rgba(0,0,0,0.45)]"
        >
          <polygon
            points="92,14 134,56 64,52"
            fill="#F97316"
            stroke="#C2410C"
            strokeWidth="2"
          />
          <polygon
            points="152,10 194,54 122,50"
            fill="#FB923C"
            stroke="#C2410C"
            strokeWidth="2"
          />
          <polygon
            points="206,16 240,56 176,52"
            fill="#EA580C"
            stroke="#9A3412"
            strokeWidth="2"
          />
          <circle cx="102" cy="40" r="2" fill="#7C2D12" />
          <circle cx="156" cy="38" r="2" fill="#7C2D12" />
          <circle cx="206" cy="42" r="2" fill="#7C2D12" />
        </svg>
      );

    case 'sauce-signature':
    case 'sauce-bbq':
    case 'sauce-spicy':
    case 'sauce-ranch':
    case 'sauce-thousand':
    case 'sauce-mushroom':
    default: {
      const color =
        layer.type === 'sauce-bbq'
          ? '#4A1205'
          : layer.type === 'sauce-spicy'
          ? '#E50909'
          : layer.type === 'sauce-ranch'
          ? '#F5EFE6'
          : layer.type === 'sauce-mushroom'
          ? '#D6C7B2'
          : '#F48C36';
      return (
        <svg
          viewBox="0 0 300 54"
          fill="none"
          className="w-full h-auto overflow-visible drop-shadow-[0_8px_10px_rgba(0,0,0,0.32)]"
        >
          <path
            d="M54 24C74 14 94 34 118 24C142 14 162 36 186 24C210 12 228 32 246 24C242 36 228 40 214 36C200 32 188 46 174 44C160 42 150 32 136 34C122 36 112 46 98 44C84 42 64 36 54 24Z"
            fill={color}
          />
          <path
            d="M72 24C92 18 112 28 134 22M168 23C188 17 206 28 226 22"
            stroke="#FFFFFF"
            strokeOpacity="0.6"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );
    }
  }
};
