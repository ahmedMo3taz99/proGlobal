import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const numberClass = 'font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#9333EA]';
const labelClass = 'font-body text-[#F0F0FF]/40 text-[9px] sm:text-xs uppercase tracking-[0.2em] rtl:tracking-normal mt-2';
const cellClass = 'bg-[#0D0D0D] flex flex-col items-center justify-center py-7 px-3 sm:py-10 sm:px-6 text-center';

export default function StatsSection() {
  const { t } = useTranslation();
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = [
        { el: '.stat-0', end: 6,  suffix: '+' },
        { el: '.stat-1', end: 24, suffix: '/7' },
        { el: '.stat-2', end: 7,  suffix: '' },
      ];
      counters.forEach(({ el, end, suffix }) => {
        const node = statsRef.current?.querySelector(el);
        if (!node) return;
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: node,
          start: 'top 85%',
          once: true,
          onEnter: () => gsap.to(obj, {
            val: end, duration: 2, ease: 'power2.out',
            onUpdate: () => { node.textContent = Math.round(obj.val) + suffix; }
          })
        });
      });
    }, statsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" ref={statsRef} className="bg-[#0D0D0D] border-y border-[#1A1A2E] py-14 px-6 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1A1A2E]">
        <div className={cellClass}>
          <span className={`stat-0 ${numberClass}`} dir="ltr">0</span>
          <span className={labelClass}>{t('stats.years')}</span>
        </div>
        <div className={cellClass}>
          <span className={`stat-1 ${numberClass}`} dir="ltr">0</span>
          <span className={labelClass}>{t('stats.uptime')}</span>
        </div>
        <div className={cellClass}>
          <span className={`stat-2 ${numberClass}`} dir="ltr">0</span>
          <span className={labelClass}>{t('stats.tools')}</span>
        </div>
        <div className={cellClass}>
          <span className={`stat-3 ${numberClass}`}>UK</span>
          <span className={labelClass}>{t('stats.partner')}</span>
        </div>
      </div>
    </section>
  );
}
