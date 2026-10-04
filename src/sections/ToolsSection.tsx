import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { motion } from 'motion/react';
import SectionHeader from '../components/SectionHeader';

function Features({ keys, color }: { keys: string[]; color: string }) {
  const { t } = useTranslation();
  return (
    <ul className="flex flex-col gap-2.5 mt-5">
      {keys.map(k => (
        <li key={k} className="flex items-center gap-2.5 font-body text-[11px] sm:text-xs text-[#F0F0FF]/60">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          {t(`tools.${k}`)}
        </li>
      ))}
    </ul>
  );
}

interface CardProps {
  index: number;
  color: string;
  border: string;
  title: string;
  tag: string;
  desc: string;
  features: string[];
  children: ReactNode;
  isMobile: boolean;
  mobileIcon?: ReactNode;
}

function ToolCard({ index, color, border, title, tag, desc, features, children, isMobile, mobileIcon }: CardProps) {
  const className = `tool-card-${index} bg-gradient-to-br from-[#030303] to-[#0D0D0D] border ${border} rounded-2xl p-5 sm:rounded-3xl sm:p-8 flex flex-col transition-[border-color] duration-500`;
  const content = (
    <>
      <div className="flex items-center justify-between gap-3 mb-6">
        <h3 className="font-display font-bold text-xl text-[#F0F0FF]">{title}</h3>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[10px] font-medium tracking-wider uppercase whitespace-nowrap border"
          style={{ color, borderColor: `${color}40`, backgroundColor: `${color}1A` }}
        >
          <span className="blink-dot w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
          {tag}
        </span>
      </div>
      {/* Mini charts are too small to read on phones, so those cards show an icon strip instead */}
      {mobileIcon && (
        <div className="sm:hidden mb-5 w-full h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}1A` }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {mobileIcon}
          </svg>
        </div>
      )}
      <div className={`mb-5 sm:mb-6 sm:min-h-[120px] flex-col justify-center ${mobileIcon ? 'hidden sm:flex' : 'flex'}`}>{children}</div>
      <p className="font-body text-[#F0F0FF]/50 text-sm leading-relaxed">{desc}</p>
      <Features keys={features} color={color} />
    </>
  );

  // Mobile has no pinned GSAP timeline, so the cards fade in with a stagger instead
  if (isMobile) {
    return (
      <motion.div className={className}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}>
        {content}
      </motion.div>
    );
  }
  return <div className={className}>{content}</div>;
}

export default function ToolsSection() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isRtl = i18n.language === 'ar';

  const [isMobile] = useState(() => window.innerWidth < 768);

  useLayoutEffect(() => {
    if (isMobile) return; // Skip pin on mobile — cards show in normal vertical stack

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=250%',
        }
      });

      // Cards enter from the inline-end edge: right in LTR, left in RTL
      const x = isRtl ? -120 : 120;

      tl.from('.tools-header', { y: 40, opacity: 0, duration: 0.3 }, 0)
        .from('.tool-card-0', { x, opacity: 0, duration: 0.4 }, 0.1)
        .from('.tool-card-1', { x, opacity: 0, duration: 0.4 }, 0.4)
        .from('.tool-card-2', { x, opacity: 0, duration: 0.4 }, 0.7);
    }, sectionRef);
    return () => ctx.revert();
  }, [isRtl, isMobile]);

  return (
    <section id="tools" ref={sectionRef} className="bg-[#0D0D0D] relative overflow-hidden">
      <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 py-14 sm:py-20">
        <SectionHeader
          className="tools-header"
          label={t('tools.label')}
          heading={t('tools.heading')}
          sub={t('tools.sub')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-10 sm:mt-16">
          <ToolCard isMobile={isMobile} index={0} color="#9333EA" border="border-[#9333EA]/20 hover:border-[#9333EA]/50"
            title={t('services.robot_name')} tag={t('tools.robot_tag')} desc={t('tools.robot_desc')}
            features={['robot_f1', 'robot_f2', 'robot_f3']}
            mobileIcon={<path d="M3 17l6-6 4 4 8-8M15 7h6v6" />}>
            <svg viewBox="0 0 240 100" className="w-full" aria-hidden="true">
              <defs>
                <linearGradient id="robot-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9333EA" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#9333EA" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {[25, 50, 75].map(y => (
                <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#1A1A2E" strokeWidth="1" strokeDasharray="4,6"/>
              ))}
              <path d="M 0 80 L 25 72 L 50 76 L 75 58 L 100 64 L 125 44 L 150 50 L 175 30 L 200 36 L 225 18 L 240 12 L 240 100 L 0 100 Z" fill="url(#robot-area)"/>
              <path d="M 0 80 L 25 72 L 50 76 L 75 58 L 100 64 L 125 44 L 150 50 L 175 30 L 200 36 L 225 18 L 240 12"
                fill="none" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ strokeDasharray: 800, strokeDashoffset: 800, animation: 'draw-chart 2s ease-out 0.5s forwards' }}/>
              <circle cx="240" cy="12" r="3.5" fill="#9333EA" className="blink-dot"/>
            </svg>
          </ToolCard>

          <ToolCard isMobile={isMobile} index={1} color="#00E5FF" border="border-[#00E5FF]/20 hover:border-[#00E5FF]/50"
            title={t('modal.int_indicator')} tag={t('tools.indicator_tag')} desc={t('tools.indicator_desc')}
            features={['indicator_f1', 'indicator_f2', 'indicator_f3']}
            mobileIcon={<path d="M4 20V14M10 20V9M16 20V12M22 20V4M2 20h21" />}>
            <svg viewBox="0 0 240 100" className="w-full" aria-hidden="true">
              {[25, 50, 75].map(y => (
                <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#1A1A2E" strokeWidth="1" strokeDasharray="4,6"/>
              ))}
              <path d="M 0 60 L 30 70 L 60 50 L 90 40 L 120 28 L 150 46 L 180 66 L 210 48 L 240 30"
                fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              {/* BUY arrows sit under local lows */}
              <path d="M 30 78 L 36 88 L 24 88 Z" fill="#9333EA"/>
              <path d="M 180 74 L 186 84 L 174 84 Z" fill="#9333EA"/>
              {/* SELL arrow sits over the local high */}
              <path d="M 120 20 L 126 10 L 114 10 Z" fill="#FF4D6D"/>
              <text x="30" y="98" textAnchor="middle" fill="#9333EA" style={{ fontFamily: 'Inter', fontSize: '8px', fontWeight: 700 }}>BUY</text>
              <text x="180" y="94" textAnchor="middle" fill="#9333EA" style={{ fontFamily: 'Inter', fontSize: '8px', fontWeight: 700 }}>BUY</text>
              <text x="142" y="16" textAnchor="middle" fill="#FF4D6D" style={{ fontFamily: 'Inter', fontSize: '8px', fontWeight: 700 }}>SELL</text>
            </svg>
          </ToolCard>

          <ToolCard isMobile={isMobile} index={2} color="#7C3AED" border="border-[#7C3AED]/20 hover:border-[#7C3AED]/50"
            title={t('modal.int_toby')} tag={t('tools.toby_tag')} desc={t('tools.toby_desc')}
            features={['toby_f1', 'toby_f2', 'toby_f3']}>
            <div className="flex flex-col gap-2 font-body">
              <div className="bg-[#1A1A2E] rounded-2xl rounded-ee-sm px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs text-[#F0F0FF]/80 max-w-[75%] ms-auto">
                {t('tools.chat_q1')}
              </div>
              <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-2xl rounded-ss-sm px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs text-[#F0F0FF]/70 max-w-[85%]">
                {t('tools.chat_a1')}
              </div>
              <div className="bg-[#1A1A2E] rounded-2xl rounded-ee-sm px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs text-[#F0F0FF]/80 max-w-[75%] ms-auto">
                {t('tools.chat_q2')}
              </div>
              <p className="font-body text-[9px] text-[#7C3AED] mt-2">Toby · AI</p>
            </div>
          </ToolCard>
        </div>
      </div>
    </section>
  );
}
