import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';

const services = [
  {
    key: 'robot', color: '#9333EA', bg: 'bg-[#9333EA]/10',
    icon: (
      <>
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>
        <circle cx="12" cy="12" r="7"/>
      </>
    ),
  },
  {
    key: 'indicator', color: '#00E5FF', bg: 'bg-[#00E5FF]/10',
    icon: <path d="M4 20V14M10 20V9M16 20V12M22 20V4M2 20h21"/>,
  },
  {
    key: 'toby', color: '#8B5CF6', bg: 'bg-[#8B5CF6]/10',
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M8 9h8M8 13h5"/>
      </>
    ),
  },
  {
    key: 'liquidity', color: '#06B6D4', bg: 'bg-[#06B6D4]/10',
    icon: (
      <path d="M2 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
    ),
  },
  {
    key: 'smc', color: '#F59E0B', bg: 'bg-[#F59E0B]/10',
    icon: (
      <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>
    ),
  },
  {
    key: 'capital', color: '#10B981', bg: 'bg-[#10B981]/10',
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </>
    ),
  },
];

interface Props { onOpenModal: () => void; }

export default function ServicesSection({ onOpenModal: _onOpenModal }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 80, opacity: 0, duration: 0.8, ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.services-grid', start: 'top 75%', once: true },
      });
    }, servicesRef);
    return () => ctx.revert();
  }, []);

  const handleLearnMore = (key: string) => {
    if (key === 'robot') navigate('/products');
    else navigate(`/services/${key}`);
  };

  return (
    <section id="services" ref={servicesRef} className="bg-[#030303] py-14 px-4 sm:py-20 sm:px-6 md:py-28 md:px-12">
      <SectionHeader
        label={t('services.label')}
        heading={t('services.heading')}
        sub={t('services.sub')}
        className="mb-10 sm:mb-14"
        hideSubOnMobile
      />

      <div className="services-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {services.map(({ key, color, bg, icon }) => (
          <div key={key} className="service-card">
            <div className="h-full bg-[#0D0D0D] border border-[#1A1A2E] rounded-2xl p-5 sm:p-7 flex flex-col
              transition-all duration-300 hover:-translate-y-1 hover:border-[#9333EA]/20"
              style={{ '--card-color': color } as React.CSSProperties}>
              <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-6`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color}
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {icon}
                </svg>
              </div>
              <h3 className="font-display font-bold text-lg text-[#F0F0FF] mb-2">
                {t(`services.${key}_name`)}
              </h3>
              <p className="font-body text-[#F0F0FF]/50 text-sm leading-relaxed flex-1">
                {t(`services.${key}_desc`)}
              </p>
              <button
                onClick={() => handleLearnMore(key)}
                className="font-body text-[9px] sm:text-xs mt-6 self-start cursor-pointer transition-colors duration-300 flex items-center gap-1"
                style={{ color: 'rgba(240,240,255,0.4)' }}
                onMouseEnter={e => (e.currentTarget.style.color = color)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,240,255,0.4)')}>
                {t('services.learn_more')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
