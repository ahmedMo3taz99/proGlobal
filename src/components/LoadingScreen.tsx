import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Props { onComplete: () => void; }

type Phase = 'loading' | 'splitting' | 'done';

const LINES = [
  { text: '> Initializing Pro Traders Global...', ok: false },
  { text: '> Connecting to market feeds...',      ok: false },
  { text: '> Loading AI engine...',               ok: true },
  { text: '> Verifying license...',               ok: true },
  { text: '> System ready.',                      ok: false },
];

const TYPE_START = 300;
const CHAR_MS = 12;
const LINE_GAP_MS = 180;
const BAR_START = 400;
const BAR_MS = 1400;
const MIN_DURATION = 2200;
const SPLIT_S = 0.65;

const halfTransition = { duration: SPLIT_S, ease: [0.76, 0, 0.24, 1] as const };

export default function LoadingScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('loading');
  // typed[i] = number of characters of LINES[i] shown so far
  const [typed, setTyped] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  // Terminal typing, then the split once both the typing and the minimum duration are over
  useEffect(() => {
    if (sessionStorage.getItem('ptg-loaded')) { setPhase('done'); return; }

    const began = performance.now();
    const timers: number[] = [];
    let at = TYPE_START;

    LINES.forEach((line, li) => {
      for (let c = 1; c <= line.text.length; c++) {
        at += CHAR_MS;
        timers.push(window.setTimeout(() => {
          setTyped(prev => { const next = prev.slice(0, li + 1); next[li] = c; return next; });
        }, at));
      }
      at += LINE_GAP_MS;
    });

    timers.push(window.setTimeout(() => {
      const wait = Math.max(150, MIN_DURATION - (performance.now() - began));
      timers.push(window.setTimeout(() => {
        sessionStorage.setItem('ptg-loaded', '1');
        setPhase('splitting');
      }, wait));
    }, at - LINE_GAP_MS));

    return () => timers.forEach(clearTimeout);
  }, []);

  // Progress bar + counter, driven together so they stay in sync
  useEffect(() => {
    let frameId = 0;
    const timer = window.setTimeout(() => {
      const began = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - began) / BAR_MS);
        const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        setProgress(eased * 100);
        if (t < 1) frameId = requestAnimationFrame(tick);
      };
      frameId = requestAnimationFrame(tick);
    }, BAR_START);
    return () => { clearTimeout(timer); cancelAnimationFrame(frameId); };
  }, []);

  useEffect(() => {
    if (phase !== 'splitting') return;
    const timer = window.setTimeout(() => setPhase('done'), SPLIT_S * 1000);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === 'done') onComplete();
    // onComplete is an inline callback in App; only the phase change should fire it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === 'done') return null;

  const splitting = phase === 'splitting';

  return (
    // Forced LTR: terminal output and the chart read left to right in both languages
    <div dir="ltr" className="fixed inset-0 z-[200] overflow-hidden pointer-events-none" role="status" aria-label="Loading">
      {/* Top half — logo + terminal */}
      <motion.div
        className="scanlines absolute inset-x-0 top-0 h-1/2 bg-[#030303] flex flex-col items-center justify-end pb-4"
        animate={{ y: splitting ? '-100%' : 0 }}
        transition={halfTransition}
      >
        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm px-6 sm:px-8">
          <motion.div
            className="font-display font-extrabold text-xl sm:text-2xl text-[#F0F0FF] tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Pro<span style={{ color: '#9333EA' }}>Traders</span>
          </motion.div>

          {/* Fixed height for all five lines so the logo doesn't shift while typing */}
          <div className="font-mono text-[10px] sm:text-[11px] text-[#9333EA]/70 self-start w-full leading-relaxed h-[90px]">
            {typed.map((count, i) => (
              <div key={i} className="whitespace-nowrap">
                {LINES[i].text.slice(0, count)}
                {LINES[i].ok && count === LINES[i].text.length && <span className="text-[#00E5FF]"> [OK]</span>}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom half — chart + progress */}
      <motion.div
        className="scanlines absolute inset-x-0 bottom-0 h-1/2 bg-[#030303] flex flex-col items-center justify-start pt-4"
        animate={{ y: splitting ? '100%' : 0 }}
        transition={halfTransition}
      >
        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm px-6 sm:px-8">
          <svg viewBox="0 0 300 48" className="w-full h-8 sm:h-12" style={{ overflow: 'visible' }} aria-hidden="true">
            <defs>
              <linearGradient id="load-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9333EA"/>
                <stop offset="100%" stopColor="#00E5FF"/>
              </linearGradient>
            </defs>
            <line x1="0" y1="40" x2="300" y2="40" stroke="#1A1A2E" strokeWidth="1" strokeDasharray="4,4"/>
            <path d="M 0 40 L 30 38 L 60 35 L 90 30 L 120 32 L 150 22 L 180 25 L 210 15 L 240 18 L 270 8 L 300 5"
              fill="none" stroke="url(#load-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ strokeDasharray: 600, strokeDashoffset: 600, animation: 'draw-load 0.9s ease-out 0.9s forwards' }}/>
            {/* Dot shows up once the line has reached it */}
            <circle cx="300" cy="5" r="2.5" fill="#00E5FF"
              style={{ opacity: 0, animation: 'blink-dot 1.2s ease-in-out 1.8s infinite' }}/>
          </svg>

          <div className="w-full flex flex-col items-center gap-3">
            <div className="w-full h-px bg-[#1A1A2E] relative">
              <div className="absolute inset-y-0 start-0 bg-gradient-to-r from-[#9333EA] to-[#00E5FF]"
                style={{ width: `${progress}%` }} />
            </div>
            <span className="font-mono text-[10px] text-[#9333EA]/60">{Math.round(progress)}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
