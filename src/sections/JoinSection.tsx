import { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import SocialLinks from '../components/SocialLinks';

interface Props { onOpenModal: () => void; }


export default function JoinSection({ onOpenModal }: Props) {
  const { t } = useTranslation();
  const email = import.meta.env.VITE_EMAIL as string;
  const reg = import.meta.env.VITE_COMPANY_REG as string;
  const trustItems = ['UK Registered', reg, 'Partner: Tickmill (FCA)', email];
  const joinRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.join-content > *', {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: joinRef.current, start: 'top 70%', once: true }
      });
    }, joinRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="join" ref={joinRef} className="bg-[#0D0D0D] py-16 px-5 sm:py-24 sm:px-6 md:py-32 md:px-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
        <span className="font-display font-extrabold text-[40vw] leading-none text-[#9333EA]/[0.02] select-none">PGS</span>
        <span className="absolute top-0 bottom-0 end-12 w-px bg-gradient-to-b from-transparent via-[#9333EA]/30 to-transparent" />
      </div>

      <div className="join-content relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        <span className="inline-flex items-center gap-2 bg-[#9333EA]/10 border border-[#9333EA]/25 rounded-full px-4 py-1.5 mb-8 font-body text-[11px] text-[#9333EA] tracking-[0.15em] uppercase">
          <span className="blink-dot w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
          {t('join.label')}
        </span>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#F0F0FF] tracking-[-0.03em] rtl:tracking-normal leading-[1] rtl:leading-[1.3]">
          {t('join.heading')}
        </h2>

        <p className="font-body text-[#F0F0FF]/50 text-sm md:text-base mt-6 max-w-full sm:max-w-xl leading-relaxed">{t('join.sub')}</p>

        <div className="flex flex-col sm:flex-row gap-3 mt-10 items-stretch sm:items-center w-full sm:w-auto">
          <button onClick={onOpenModal}
            className="bg-[#9333EA] text-[#030303] font-body font-semibold text-sm px-7 py-3.5 w-full sm:w-auto rounded-full hover:bg-[#F0F0FF] transition-all duration-300 tracking-wide cursor-pointer">
            {t('join.cta_primary')}
          </button>
          <a href={`mailto:${email}`}
            className="border border-[#1A1A2E] text-[#F0F0FF]/60 font-body text-sm px-7 py-3.5 w-full sm:w-auto text-center rounded-full hover:border-[#9333EA]/50 hover:text-[#F0F0FF] transition-all duration-300">
            {t('join.cta_secondary')}
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 mt-10">
          <span className="font-body text-[10px] text-[#F0F0FF]/30 uppercase tracking-wider me-1">{t('join.follow')}</span>
          <SocialLinks />
        </div>

        {/* Stacked on mobile, one dotted line from sm up */}
        <p className="font-body text-[9px] sm:text-[10px] text-[#F0F0FF]/25 tracking-wider mt-8 flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center" dir="ltr">
          {trustItems.map((item, i) => (
            <Fragment key={item}>
              {i > 0 && <span className="hidden sm:inline">·</span>}
              <span>{item}</span>
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
