import { useId } from 'react';
import type { Product } from '../data/products';

interface Props {
  product: Product;
  height?: number;
  animated?: boolean;
}

// Each bot gets artwork that matches its name: a glowing aura, a diving falcon, a royal crown over a hedge.
export default function BotVisual({ product, height = 140, animated = true }: Props) {
  const uid = useId().replace(/:/g, '');
  const { theme, accentColor: a, secondaryColor: b } = product;
  const props = { uid, a, b, animated };

  return (
    <svg viewBox="0 0 240 140" width="100%" height={height} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {theme === 'aura' && <Aura {...props} />}
      {theme === 'falcon' && <Falcon {...props} />}
      {theme === 'royal' && <Royal {...props} />}
    </svg>
  );
}

interface ArtProps { uid: string; a: string; b: string; animated: boolean; }

function Pulse({ animated, from, to, dur, begin = '0s' }: { animated: boolean; from: number; to: number; dur: string; begin?: string }) {
  if (!animated) return null;
  return (
    <>
      <animate attributeName="r" values={`${from};${to}`} dur={dur} begin={begin} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.7;0" dur={dur} begin={begin} repeatCount="indefinite" />
    </>
  );
}

/* Aura Scalping — gold core radiating rings, with rapid scalping candles cutting through it */
function Aura({ uid, a, b, animated }: ArtProps) {
  const candles = [
    { x: 20, y: 66, h: 10, up: true }, { x: 34, y: 62, h: 8, up: false }, { x: 48, y: 64, h: 12, up: true },
    { x: 62, y: 58, h: 9, up: true }, { x: 76, y: 60, h: 7, up: false },
    { x: 164, y: 62, h: 9, up: true }, { x: 178, y: 56, h: 11, up: true }, { x: 192, y: 60, h: 7, up: false },
    { x: 206, y: 54, h: 10, up: true }, { x: 220, y: 50, h: 9, up: true },
  ];
  return (
    <>
      <defs>
        <radialGradient id={`aura-core-${uid}`}>
          <stop offset="0%" stopColor="#FFF4C2" />
          <stop offset="45%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </radialGradient>
        <radialGradient id={`aura-glow-${uid}`}>
          <stop offset="0%" stopColor={a} stopOpacity="0.45" />
          <stop offset="100%" stopColor={a} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="70" r="70" fill={`url(#aura-glow-${uid})`} />
      {[0, 1, 2].map(i => (
        <circle key={i} cx="120" cy="70" r={30 + i * 14} fill="none" stroke={a} strokeWidth="1" opacity={0.5 - i * 0.12}>
          <Pulse animated={animated} from={26} to={66} dur="3s" begin={`${i}s`} />
        </circle>
      ))}
      {candles.map((c, i) => (
        <g key={i} opacity={0.85}>
          <line x1={c.x} y1={c.y - 4} x2={c.x} y2={c.y + c.h + 4} stroke={c.up ? a : '#FF4D6D'} strokeWidth="1" />
          <rect x={c.x - 3} y={c.y} width="6" height={c.h} rx="1" fill={c.up ? a : '#FF4D6D'} />
        </g>
      ))}
      <circle cx="120" cy="70" r="22" fill={`url(#aura-core-${uid})`} />
      {/* Lightning bolt = speed of a scalp */}
      <path d="M124 54 L112 72 L120 72 L116 86 L129 66 L121 66 Z" fill="#1A1405" opacity="0.85" />
      <text x="120" y="126" textAnchor="middle" fill={a} opacity="0.6"
        style={{ fontFamily: 'Inter', fontSize: '8px', fontWeight: 700, letterSpacing: '0.3em' }}>XAU · SCALP</text>
    </>
  );
}

/* Currency Falcon — a falcon diving along its strike path onto a target, currency symbols below */
function Falcon({ uid, a, b, animated }: ArtProps) {
  const path = 'M 18 24 C 70 22, 110 40, 150 78 S 196 112, 206 108';
  return (
    <>
      <defs>
        <radialGradient id={`falcon-sky-${uid}`}>
          <stop offset="0%" stopColor={b} stopOpacity="0.3" />
          <stop offset="100%" stopColor={b} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`falcon-wing-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={b} />
          <stop offset="100%" stopColor={a} />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="65" rx="115" ry="70" fill={`url(#falcon-sky-${uid})`} />
      <path d={path} fill="none" stroke={a} strokeWidth="1.5" strokeDasharray="3,5" opacity="0.6">
        {animated && <animate attributeName="stroke-dashoffset" values="16;0" dur="0.8s" repeatCount="indefinite" />}
      </path>
      {/* Target */}
      <g stroke={a} fill="none">
        <circle cx="206" cy="108" r="12" strokeWidth="1" opacity="0.5" />
        <circle cx="206" cy="108" r="5" strokeWidth="1.5">
          <Pulse animated={animated} from={5} to={18} dur="1.8s" />
        </circle>
        <path d="M206 92v6M206 118v6M190 108h6M216 108h6" strokeWidth="1.2" />
      </g>
      {/* Falcon in a dive: swept-back wings, sharp head */}
      <g transform="translate(122 52) rotate(32) scale(1.25)">
        <path d="M0 0 C -14 -10, -34 -14, -50 -10 C -36 -6, -22 -2, -10 4 Z" fill={`url(#falcon-wing-${uid})`} />
        <path d="M0 0 C -12 8, -30 18, -46 20 C -32 12, -20 6, -10 4 Z" fill={`url(#falcon-wing-${uid})`} opacity="0.75" />
        <path d="M-10 4 L 14 0 L 4 6 Z" fill={a} />
        <path d="M-10 4 L -22 10 L -18 4 Z" fill={b} />
        <circle cx="8" cy="1.5" r="1.2" fill="#030303" />
      </g>
      {['$', '€', '£', '¥'].map((s, i) => (
        <text key={s} x={30 + i * 26} y={110 + (i % 2) * 10} fill={i % 2 ? b : a} opacity="0.45"
          style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700 }}>{s}</text>
      ))}
    </>
  );
}

/* Royal Golden Hedge — crown above mirrored buy & sell curves held inside a shield */
function Royal({ uid, a, b, animated }: ArtProps) {
  return (
    <>
      <defs>
        <linearGradient id={`royal-gold-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBE7A1" />
          <stop offset="100%" stopColor={a} />
        </linearGradient>
        <radialGradient id={`royal-bg-${uid}`} cx="50%" cy="40%">
          <stop offset="0%" stopColor={b} stopOpacity="0.35" />
          <stop offset="100%" stopColor={b} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy="70" rx="110" ry="70" fill={`url(#royal-bg-${uid})`} />
      {/* Shield */}
      <path d="M120 22 L172 36 L172 74 C172 102 148 118 120 128 C92 118 68 102 68 74 L68 36 Z"
        fill={b} fillOpacity="0.12" stroke={a} strokeOpacity="0.5" strokeWidth="1.2" />
      {/* Hedge: buy leg rises, sell leg falls, both from the same entry */}
      <path d="M80 70 L 100 70 C 112 70, 116 60, 128 56 S 150 46, 160 44" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 70 C 112 70, 116 80, 128 84 S 150 94, 160 96" fill="none" stroke="#FF4D6D" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="70" r="4" fill={`url(#royal-gold-${uid})`}>
        {animated && <animate attributeName="r" values="3.5;5;3.5" dur="2s" repeatCount="indefinite" />}
      </circle>
      <text x="178" y="47" fill="#10B981" style={{ fontFamily: 'Inter', fontSize: '8px', fontWeight: 700 }}>BUY</text>
      <text x="178" y="99" fill="#FF4D6D" style={{ fontFamily: 'Inter', fontSize: '8px', fontWeight: 700 }}>SELL</text>
      {/* Crown */}
      <g transform="translate(120 14)">
        <path d="M-20 8 L-20 -6 L-10 2 L0 -10 L10 2 L20 -6 L20 8 Z" fill={`url(#royal-gold-${uid})`} />
        <rect x="-20" y="8" width="40" height="4" rx="1" fill={a} />
        {[-20, 0, 20].map(x => (
          <circle key={x} cx={x} cy={x === 0 ? -10 : -6} r="2" fill="#FBE7A1" />
        ))}
      </g>
    </>
  );
}
