import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import ParticleGlobe from '../components/ParticleGlobe';
import LangToggle from '../components/LangToggle';
import Logo from '../components/Logo';
import { scrollTo } from '../utils/scrollTo';

interface Props { onOpenModal: () => void; }

const navLinks = [
  { key: 'services', id: 'services' },
  { key: 'tools', id: 'tools' },
  { key: 'platforms', id: 'platforms' },
  { key: 'join', id: 'join' },
];

const dots = [
  { top: '18%', start: '8%',  opacity: 0.5,  dur: 5,   delay: 0 },
  { top: '32%', start: '42%', opacity: 0.25, dur: 6.5, delay: 0.8 },
  { top: '64%', start: '14%', opacity: 0.35, dur: 4.5, delay: 1.6 },
  { top: '78%', start: '36%', opacity: 0.2,  dur: 7,   delay: 0.4 },
  { top: '14%', start: '68%', opacity: 0.3,  dur: 5.5, delay: 2.1 },
  { top: '46%', start: '88%', opacity: 0.45, dur: 6,   delay: 1.2 },
  { top: '70%', start: '74%', opacity: 0.25, dur: 4,   delay: 2.6 },
  { top: '86%', start: '56%', opacity: 0.4,  dur: 6.8, delay: 1.9 },
];

const tickerItems = [
  { pair: 'XAU/USD', price: '2,342.50', change: '+1.23%', up: true },
  { pair: 'EUR/USD', price: '1.0891',   change: '+0.34%', up: true },
  { pair: 'BTC/USD', price: '67,450',   change: '-0.87%', up: false },
  { pair: 'GBP/USD', price: '1.2654',   change: '+0.21%', up: true },
  { pair: 'USD/JPY', price: '149.82',   change: '-0.15%', up: false },
  { pair: 'SPX500',  price: '5,218',    change: '+0.56%', up: true },
];

const accentWords = ['Smarter', 'أذكى'];

export default function HeroSection({ onOpenModal }: Props) {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-badge',    { y: -20, opacity: 0, duration: 0.6 }, 0.2)
        .from('.hero-line-1',   { y: 60,  opacity: 0, duration: 0.8 }, 0.4)
        .from('.hero-line-2',   { y: 60,  opacity: 0, duration: 0.8 }, 0.55)
        .from('.hero-sub',      { y: 30,  opacity: 0, duration: 0.7 }, 0.75)
        .from('.hero-cta',      { y: 20,  opacity: 0, duration: 0.6 }, 0.9)
        .from('.hero-trust',    { y: 15,  opacity: 0, duration: 0.5 }, 1.0)
        .from('.hero-chart',    { x: 60,  opacity: 0, duration: 1.0 }, 0.5)
        .from('.float-card-1',  { y: 30,  opacity: 0, duration: 0.6 }, 1.1)
        .from('.float-card-2',  { y: 30,  opacity: 0, duration: 0.6 }, 1.25)
        .from('.float-card-3',  { scale: 0.8, opacity: 0, duration: 0.6 }, 1.35);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={heroRef} className="h-screen min-h-[600px] relative overflow-hidden bg-[#030303] flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(147,51,234,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute w-[700px] h-[700px] rounded-full -top-60 -start-40 bg-[radial-gradient(circle,rgba(147,51,234,0.08)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 -end-20 bg-[radial-gradient(circle,rgba(0,229,255,0.07)_0%,transparent_70%)] blur-[80px]" />
        {dots.map((d, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#9333EA]"
            style={{
              top: d.top,
              insetInlineStart: d.start,
              opacity: d.opacity,
              animation: `float-up ${d.dur}s ease-in-out ${d.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 start-0 end-0 z-50 px-4 sm:px-6 md:px-12 py-5 flex items-center justify-between gap-3">
        <Logo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ key, id }) => (
            <span key={key} onClick={() => scrollTo(id)}
              className="font-body text-xs text-[#F0F0FF]/50 hover:text-[#9333EA] tracking-wider uppercase transition-colors duration-300 cursor-pointer">
              {t(`nav.${key}`)}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangToggle />
          <button onClick={onOpenModal}
            className="hidden sm:block bg-[#9333EA] text-[#030303] font-body font-semibold text-[10px] sm:text-xs px-3 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-[#F0F0FF] transition-all duration-300 tracking-wider uppercase cursor-pointer whitespace-nowrap">
            {t('nav.cta')}
          </button>
          {/* Hamburger */}
          <button onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu" aria-expanded={menuOpen}
            className="md:hidden w-9 h-9 rounded-full border border-[#1A1A2E] flex flex-col items-center justify-center gap-[5px] hover:border-[#9333EA]/40 transition-colors cursor-pointer">
            <span className={`block w-4 h-px bg-[#F0F0FF]/70 origin-center transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}/>
            <span className={`block w-4 h-px bg-[#F0F0FF]/70 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}/>
            <span className={`block w-4 h-px bg-[#F0F0FF]/70 origin-center transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}/>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#030303]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            {navLinks.map(({ key, id }, i) => (
              <motion.span key={key} onClick={() => { scrollTo(id); setMenuOpen(false); }}
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="font-display font-bold text-2xl text-[#F0F0FF]/70 hover:text-[#9333EA] transition-colors cursor-pointer">
                {t(`nav.${key}`)}
              </motion.span>
            ))}
            <motion.button onClick={() => { onOpenModal(); setMenuOpen(false); }}
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}
              className="bg-[#9333EA] text-[#030303] font-body font-bold text-sm px-8 py-3.5 rounded-full hover:bg-[#F0F0FF] transition-all duration-300 cursor-pointer">
              {t('nav.cta')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start lg:items-center px-4 sm:px-6 md:px-12 pt-20 pb-10 sm:pt-28 sm:pb-16">
        <div>
          <div className="hero-badge inline-flex items-center gap-2 bg-[#9333EA]/10 border border-[#9333EA]/25 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-8 max-w-full">
            <span className="blink-dot w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
            <span className="font-body text-[9px] sm:text-[11px] text-[#9333EA] tracking-[0.15em] uppercase truncate max-w-[280px] sm:max-w-none">{t('hero.badge')}</span>
          </div>

          <h1>
            <span className="hero-line-1 block font-display font-extrabold text-[12vw] min-[480px]:text-[10vw] sm:text-[7vw] lg:text-[5vw] leading-[0.92] rtl:leading-[1.25] tracking-[-0.03em] rtl:tracking-normal text-[#F0F0FF]">
              {t('hero.headline1')}
            </span>
            <span className="hero-line-2 block font-display font-extrabold text-[12vw] min-[480px]:text-[10vw] sm:text-[7vw] lg:text-[5vw] leading-[0.92] rtl:leading-[1.25] tracking-[-0.03em] rtl:tracking-normal text-[#F0F0FF]">
              {t('hero.headline2').split(' ').map((word, i) => (
                <span key={i} className={accentWords.some(a => word.startsWith(a)) ? 'text-[#9333EA]' : undefined}>
                  {i > 0 && ' '}{word}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-sub font-body text-[#F0F0FF]/50 text-xs sm:text-sm md:text-base mt-6 max-w-full sm:max-w-md leading-relaxed">
            {t('hero.sub')}
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-3 mt-8 items-stretch sm:items-center">
            <button onClick={onOpenModal}
              className="bg-[#9333EA] text-[#030303] font-body font-semibold text-xs px-5 py-3 sm:text-sm sm:px-7 sm:py-3.5 w-full sm:w-auto rounded-full hover:bg-[#F0F0FF] transition-all duration-300 tracking-wide cursor-pointer">
              {t('hero.cta_primary')}
            </button>
            <button onClick={() => scrollTo('tools')}
              className="border border-[#1A1A2E] text-[#F0F0FF]/60 font-body text-xs px-5 py-3 sm:text-sm sm:px-7 sm:py-3.5 w-full sm:w-auto rounded-full hover:border-[#9333EA]/50 hover:text-[#F0F0FF] transition-all duration-300 cursor-pointer">
              {t('hero.cta_secondary')}
            </button>
          </div>

          <div className="hero-trust flex items-center gap-2 sm:gap-4 mt-8 flex-wrap">
            <span className="hidden sm:inline font-body text-[10px] text-[#F0F0FF]/25 uppercase tracking-wider">{t('hero.trust')}</span>
            {['MT4', 'MT5', 'TradingView'].map(tag => (
              <span key={tag} className="font-body text-[10px] font-medium text-[#F0F0FF]/40 border border-[#1A1A2E] rounded-md px-2.5 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right column — desktop only */}
        <div className="hidden lg:flex items-center justify-center">
          {/* Constrained container: float cards anchor to the globe, not the full grid row */}
          <div className="hero-chart relative mx-auto" style={{ width: 'min(100%, 460px)', aspectRatio: '1 / 1' }}>
            <ParticleGlobe />
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(147,51,234,0.15) 0%, transparent 65%)',
                filter: 'blur(20px)',
              }} />

            <div className="float-card-1 absolute top-6 start-0 bg-[#0D0D0D] border border-[#1A1A2E] rounded-2xl px-4 py-3 flex items-center gap-3 z-10">
              <span className="blink-dot w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
              <div>
                <p className="font-body text-[10px] text-[#F0F0FF]/40 uppercase tracking-wider">XAU/USD</p>
                <p className="font-display font-bold text-base text-[#9333EA]" dir="ltr">+2.34%</p>
              </div>
            </div>

            <div className="float-card-2 absolute bottom-8 end-0 bg-[#0D0D0D] border border-[#1A1A2E] rounded-2xl px-4 py-3 z-10">
              <p className="font-body text-[9px] text-[#F0F0FF]/35 uppercase tracking-wider mb-1">Active Signal</p>
              <p className="font-display font-bold text-sm text-[#F0F0FF]">EUR/USD</p>
              <p className="font-body text-[10px] text-[#00E5FF]" dir="ltr">Buy · TP 1.0952</p>
            </div>

            {/* Outer element takes the GSAP entrance, inner one the CSS float — keep separate to avoid transform conflict */}
            <div className="float-card-3 absolute top-2 end-4 z-10">
              <div className="bg-[#9333EA]/10 border border-[#9333EA]/30 rounded-xl px-3 py-2"
                style={{ animation: 'float-up 4s ease-in-out infinite' }}>
                <p className="font-body text-[9px] text-[#9333EA] uppercase tracking-wider">Robot Active</p>
                <p className="font-display font-bold text-sm text-[#F0F0FF]">24/7 ✓</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker tape — forced LTR so the -50% loop works in both directions */}
      <div dir="ltr" className="absolute bottom-0 start-0 end-0 overflow-hidden bg-[#0D0D0D]/80 border-t border-[#1A1A2E] py-2 sm:py-2.5" aria-hidden="true">
        <div className="ticker-track">
          {Array.from({ length: 4 }).flatMap((_, rep) =>
            tickerItems.map(item => (
              <div key={`${rep}-${item.pair}`} className="flex items-center gap-1.5 mx-3 sm:mx-6 shrink-0">
                <span className="font-body text-[9px] sm:text-[10px] text-[#F0F0FF]/50 font-medium tracking-wider">{item.pair}</span>
                <span className="font-body text-[9px] sm:text-[10px] text-[#F0F0FF] font-semibold">{item.price}</span>
                <span className={`font-body text-[9px] sm:text-[10px] font-semibold ${item.up ? 'text-[#9333EA]' : 'text-[#FF4D6D]'}`}>{item.change}</span>
                <span className="text-[#1A1A2E] mx-3">·</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
