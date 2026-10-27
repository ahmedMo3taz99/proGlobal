import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';

const COLOR = '#9333EA';

const highlights = ['robot_h1', 'robot_h2', 'robot_h3', 'robot_h4'];

// Sample trade log shown in the visual panel; numbers are illustrative only
const trades = [
  { pair: 'XAU/USD', side: 'BUY',  pnl: '+1.24%' },
  { pair: 'EUR/USD', side: 'SELL', pnl: '+0.86%' },
  { pair: 'XAU/USD', side: 'BUY',  pnl: '+0.52%' },
  { pair: 'GBP/USD', side: 'BUY',  pnl: '+1.07%' },
];

interface Props { onOpenModal: () => void; }

export default function ServicesSection({ onOpenModal }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-feature', {
        y: 80, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.service-feature', start: 'top 80%', once: true },
      });
      gsap.from('.trade-row', {
        x: 30, opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.12, delay: 0.4,
        scrollTrigger: { trigger: '.service-feature', start: 'top 80%', once: true },
      });
    }, servicesRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={servicesRef} className="bg-[#030303] py-14 px-4 sm:py-20 sm:px-6 md:py-28 md:px-12">
      <SectionHeader
        label={t('services.label')}
        heading={t('services.heading')}
        sub={t('services.sub')}
        className="mb-10 sm:mb-14"
        hideSubOnMobile
      />

      <div className="service-feature relative max-w-6xl mx-auto overflow-hidden rounded-3xl border border-[#9333EA]/20
        bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#9333EA]/[0.06]
        grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-6 sm:p-10 md:p-12
        transition-[border-color] duration-500 hover:border-[#9333EA]/40">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -end-32 w-80 h-80 rounded-full bg-[#9333EA]/10 blur-3xl" />

        <div className="relative flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-[#9333EA]/10 flex items-center justify-center mb-6">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={COLOR}
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>
              <circle cx="12" cy="12" r="7"/>
            </svg>
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F0F0FF] mb-3">
            {t('services.robot_name')}
          </h3>
          <p className="font-body text-[#F0F0FF]/55 text-sm sm:text-base leading-relaxed">
            {t('services.robot_desc')}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7">
            {highlights.map(k => (
              <li key={k} className="flex items-center gap-2.5 rounded-xl border border-[#1A1A2E] bg-[#030303]/60 px-3.5 py-3 font-body text-xs sm:text-sm text-[#F0F0FF]/70">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                {t(`services.${k}`)}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 md:mt-auto md:pt-8">
            <button onClick={() => navigate('/products')}
              className="font-body font-semibold text-sm rounded-full px-6 py-3 bg-[#9333EA] text-white cursor-pointer
                transition-all duration-300 hover:bg-[#A855F7] hover:shadow-[0_0_30px_rgba(147,51,234,0.4)]">
              {t('services.view_all_bots')}
            </button>
            <button onClick={onOpenModal}
              className="font-body text-sm rounded-full px-6 py-3 border border-[#F0F0FF]/15 text-[#F0F0FF]/80 cursor-pointer
                transition-colors duration-300 hover:border-[#9333EA]/50 hover:text-[#F0F0FF]">
              {t('nav.cta')}
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl border border-[#1A1A2E] bg-[#030303]/80 p-5 sm:p-6 flex flex-col" aria-hidden="true">
          <div className="flex items-center justify-between mb-5">
            <span className="font-body text-[10px] sm:text-xs text-[#F0F0FF]/40 uppercase tracking-[0.2em] rtl:tracking-normal">
              {t('services.panel_title')}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[10px] font-medium uppercase border"
              style={{ color: COLOR, borderColor: `${COLOR}40`, backgroundColor: `${COLOR}1A` }}>
              <span className="blink-dot w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLOR }} />
              {t('tools.robot_tag')}
            </span>
          </div>

          <div className="flex flex-col gap-2.5" dir="ltr">
            {trades.map((tr, i) => (
              <div key={i} className="trade-row flex items-center justify-between rounded-xl bg-[#0D0D0D] border border-[#1A1A2E] px-4 py-3 font-body text-xs sm:text-sm">
                <span className="text-[#F0F0FF]/80 font-medium">{tr.pair}</span>
                <span className={`text-[10px] font-bold rounded-md px-2 py-0.5 ${tr.side === 'BUY' ? 'text-[#10B981] bg-[#10B981]/10' : 'text-[#FF4D6D] bg-[#FF4D6D]/10'}`}>
                  {tr.side}
                </span>
                <span className="text-[#10B981] font-semibold">{tr.pnl}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2.5 mt-5">
            {[
              { v: '24/7', k: 'panel_uptime' },
              { v: '3', k: 'panel_bots' },
              { v: 'MT4/5', k: 'panel_platforms' },
            ].map(({ v, k }) => (
              <div key={k} className="rounded-xl bg-[#9333EA]/[0.07] border border-[#9333EA]/15 py-3 text-center">
                <div className="font-display font-extrabold text-base sm:text-lg text-[#F0F0FF]" dir="ltr">{v}</div>
                <div className="font-body text-[9px] sm:text-[10px] text-[#F0F0FF]/40 mt-0.5">{t(`services.${k}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
