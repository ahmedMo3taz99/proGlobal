import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Props {
  type: 'bullish' | 'bearish';
  accentColor: string;
  height?: number;
  animated?: boolean;
}

export default function FVGChart({ type, accentColor, height = 140, animated = true }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  const bullish = [
    { x: 10,  o: 108, c: 92,  h: 110, l: 90  },
    { x: 34,  o: 91,  c: 75,  h: 93,  l: 73  },
    { x: 58,  o: 74,  c: 58,  h: 76,  l: 56  },
    { x: 82,  o: 57,  c: 38,  h: 59,  l: 36  },
    { x: 106, o: 36,  c: 18,  h: 38,  l: 16  },
    { x: 130, o: 20,  c: 42,  h: 44,  l: 18  },
    { x: 154, o: 43,  c: 60,  h: 62,  l: 41  },
    { x: 178, o: 61,  c: 76,  h: 78,  l: 59  },
  ];
  const bearish = [
    { x: 10,  o: 28,  c: 44,  h: 46,  l: 26  },
    { x: 34,  o: 45,  c: 58,  h: 60,  l: 43  },
    { x: 58,  o: 59,  c: 72,  h: 74,  l: 57  },
    { x: 82,  o: 73,  c: 88,  h: 90,  l: 71  },
    { x: 106, o: 89,  c: 108, h: 112, l: 87  },
    { x: 130, o: 106, c: 90,  h: 108, l: 88  },
    { x: 154, o: 89,  c: 75,  h: 91,  l: 73  },
    { x: 178, o: 74,  c: 62,  h: 76,  l: 60  },
  ];

  const candles = type === 'bullish' ? bullish : bearish;
  const fvgX = 94;
  const fvgW = 56;
  const fvgY1 = type === 'bullish' ? candles[4].l - 2 : candles[4].o - 2;
  const fvgY2 = type === 'bullish' ? candles[3].h + 2 : candles[3].c + 2;
  const fvgTop = Math.min(fvgY1, fvgY2);
  const fvgH   = Math.abs(fvgY2 - fvgY1);

  useEffect(() => {
    if (!animated || !svgRef.current) return;
    const els   = svgRef.current.querySelectorAll('.fvc');
    const zone  = svgRef.current.querySelector('.fvz');
    const label = svgRef.current.querySelector('.fvl');
    gsap.set(els, { opacity: 0 });
    gsap.set([zone, label], { opacity: 0 });
    gsap.to(els, { opacity: 1, duration: 0.35, stagger: 0.07, delay: 0.15 });
    gsap.to([zone, label], { opacity: 1, duration: 0.5, delay: 0.75 });
  }, [animated, type]);

  return (
    <svg ref={svgRef} viewBox={`0 0 210 ${height}`} width="100%" height={height}>
      <defs>
        <linearGradient id={`fg-${type}-${accentColor.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.03"/>
        </linearGradient>
      </defs>
      {[0.25,0.5,0.75].map((f,i) => (
        <line key={i} x1="0" y1={height*f} x2="210" y2={height*f} stroke="#1A1A2E" strokeWidth="0.8" strokeDasharray="3,4"/>
      ))}
      <rect className="fvz" x={fvgX} y={fvgTop} width={fvgW} height={fvgH}
        fill={`url(#fg-${type}-${accentColor.replace('#','')})`}
        stroke={accentColor} strokeWidth="0.6" strokeDasharray="3,2" rx="1"/>
      <text className="fvl" x={fvgX + fvgW - 2} y={fvgTop + fvgH / 2 + 4}
        fill={accentColor} fontSize="7" fontFamily="monospace" textAnchor="end">FVG</text>
      {candles.map((c, i) => {
        const up = c.c > c.o;
        const col = up ? '#4ADE80' : '#FF4D6D';
        return (
          <g key={i} className="fvc">
            <line x1={c.x+8} y1={c.h} x2={c.x+8} y2={c.l} stroke={col} strokeWidth="1.2" opacity="0.6"/>
            <rect x={c.x} y={Math.min(c.o,c.c)} width="16" height={Math.max(Math.abs(c.o-c.c),2)}
              fill={col} rx="1.5"/>
          </g>
        );
      })}
    </svg>
  );
}
