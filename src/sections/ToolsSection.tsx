import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { motion } from 'motion/react';
import SectionHeader from '../components/SectionHeader';

const COLOR = '#9333EA';
const features = ['robot_f1', 'robot_f2', 'robot_f3', 'robot_f4', 'robot_f5', 'robot_f6'];

function RobotChart() {
  return (
    <svg viewBox="0 0 240 100" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="robot-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLOR} stopOpacity="0.2"/>
          <stop offset="100%" stopColor={COLOR} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[25, 50, 75].map(y => (
        <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#1A1A2E" strokeWidth="1" strokeDasharray="4,6"/>
      ))}
      <path d="M 0 80 L 25 72 L 50 76 L 75 58 L 100 64 L 125 44 L 150 50 L 175 30 L 200 36 L 225 18 L 240 12 L 240 100 L 0 100 Z" fill="url(#robot-area)"/>
      <path d="M 0 80 L 25 72 L 50 76 L 75 58 L 100 64 L 125 44 L 150 50 L 175 30 L 200 36 L 225 18 L 240 12"
        fill="none" stroke={COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 800, strokeDashoffset: 800, animation: 'draw-chart 2s ease-out 0.5s forwards' }}/>
      <circle cx="240" cy="12" r="3.5" fill={COLOR} className="blink-dot"/>
    </svg>
  );
}

export default function ToolsSection() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isRtl = i18n.language === 'ar';

  const [isMobile] = useState(() => window.innerWidth < 768);

  useLayoutEffect(() => {
    if (isMobile) return; // Skip pin on mobile — the card fades in on its own

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=150%',
        }
      });

      // Content enters from the inline-end edge: right in LTR, left in RTL
      const x = isRtl ? -120 : 120;

      tl.from('.tools-header', { y: 40, opacity: 0, duration: 0.3 }, 0)
        .from('.tool-card', { y: 60, opacity: 0, duration: 0.4 }, 0.1)
        .from('.tool-feature', { x, opacity: 0, duration: 0.3, stagger: 0.08 }, 0.4);
    }, sectionRef);
    return () => ctx.revert();
  }, [isRtl, isMobile]);

  const Card = isMobile ? motion.div : 'div';
  const motionProps = isMobile ? {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: 'easeOut' as const },
  } : {};

  return (
    <section id="tools" ref={sectionRef} className="bg-[#0D0D0D] relative overflow-hidden">
      <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 py-14 sm:py-20">
        <SectionHeader
          className="tools-header"
          label={t('tools.label')}
          heading={t('tools.heading')}
          sub={t('tools.sub')}
        />

        <Card {...motionProps}
          className="tool-card max-w-6xl w-full mx-auto mt-10 sm:mt-16 bg-gradient-to-br from-[#030303] to-[#0D0D0D] border border-[#9333EA]/20 hover:border-[#9333EA]/50
            rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 transition-[border-color] duration-500">
          <div className="md:col-span-3 flex flex-col">
            <div className="flex items-center justify-between gap-3 mb-6">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F0F0FF]">{t('services.robot_name')}</h3>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[10px] font-medium tracking-wider uppercase whitespace-nowrap border"
                style={{ color: COLOR, borderColor: `${COLOR}40`, backgroundColor: `${COLOR}1A` }}
              >
                <span className="blink-dot w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLOR }} />
                {t('tools.robot_tag')}
              </span>
            </div>
            <div className="rounded-2xl border border-[#1A1A2E] bg-[#030303]/70 p-4 sm:p-6 flex-1 flex items-center">
              <RobotChart />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col justify-center">
            <p className="font-body text-[#F0F0FF]/55 text-sm sm:text-base leading-relaxed">{t('tools.robot_desc')}</p>
            <ul className="flex flex-col gap-3 mt-6">
              {features.map(k => (
                <li key={k} className="tool-feature flex items-center gap-3 font-body text-xs sm:text-sm text-[#F0F0FF]/70">
                  <span className="w-6 h-6 rounded-lg bg-[#9333EA]/10 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </span>
                  {t(`tools.${k}`)}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
}
