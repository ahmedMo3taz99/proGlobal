import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import BotVisual from '../components/BotVisual';
import { PRODUCTS } from '../data/products';

interface Props { onOpenModal: () => void; }

export default function ProductsPage({ onOpenModal }: Props) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.pg-hero > *', { y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.1 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#030303] min-h-screen">
      {/* Hero */}
      <div ref={heroRef} className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="pg-hero">
          <span className="inline-flex items-center gap-2 bg-[#9333EA]/10 border border-[#9333EA]/25 rounded-full px-4 py-1.5 mb-6 font-body text-[11px] text-[#9333EA] tracking-[0.15em] uppercase">
            <span className="blink-dot w-1.5 h-1.5 rounded-full bg-[#9333EA]"/>
            {t('products.label')}
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#F0F0FF] tracking-[-0.03em] rtl:tracking-normal leading-tight mb-4">
            {t('products.heading')}
          </h1>
          <p className="font-body text-[#F0F0FF]/50 text-sm sm:text-base max-w-xl leading-relaxed">
            {t('products.sub')}
          </p>

        </div>
      </div>

      {/* Grid */}
      <div className="px-4 sm:px-6 md:px-12 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                      {PRODUCTS.map((product, i) => {
              const lowest = Math.min(...product.plans.map(p => p.price));
              return (
                <motion.div key={product.id}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  onClick={() => navigate(`/products/${product.slug}`)}
                  className="group bg-[#0D0D0D] border rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1"
                  style={{ borderColor: product.accentColor + '25', background: `linear-gradient(160deg, ${product.accentColor}0D 0%, #0D0D0D 45%)` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = product.accentColor + '50')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = product.accentColor + '25')}>

                  {/* Chart area */}
                  <div className="relative h-44 sm:h-48 bg-[#030303] p-3 overflow-hidden" dir="ltr">
                    <div className="absolute inset-0 opacity-30 pointer-events-none"
                      style={{background:`radial-gradient(circle at 60% 50%, ${product.accentColor}25 0%, transparent 70%)`}}/>
                    <BotVisual product={product} height={160} />
                    <span className="absolute top-3 start-3 font-mono text-[9px] px-2 py-1 rounded-md border"
                      style={{color:product.accentColor, borderColor:product.accentColor+'40', background:product.accentColor+'12'}}>
                      {product.platform}
                    </span>
                    <span className="absolute top-3 end-3 font-mono text-[9px] text-[#F0F0FF]/40 px-2 py-1 rounded-md border border-[#1A1A2E]">
                      {product.pair.split('+')[0].trim()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex flex-col gap-2.5">
                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#F0F0FF] leading-tight">
                      {isAr ? product.nameAr : product.nameEn}
                    </h3>
                    <p className="font-body text-xs font-medium" style={{ color: product.accentColor }}>
                      {isAr ? product.taglineAr : product.taglineEn}
                    </p>
                    <p className="font-body text-[#F0F0FF]/40 text-xs leading-relaxed line-clamp-2">
                      {isAr ? product.descAr : product.descEn}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <p className="font-body text-[9px] text-[#F0F0FF]/30 uppercase tracking-wider">{t('products.from')}</p>
                        <p className="font-display font-bold text-lg" style={{color:product.accentColor}}>
                          ${lowest}<span className="text-xs font-normal text-[#F0F0FF]/30">{t('products.month')}</span>
                        </p>
                      </div>
                      <span className="font-body text-xs text-[#F0F0FF]/40 group-hover:text-[#9333EA] transition-colors rtl:-scale-x-100">→</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="font-body text-[#F0F0FF]/40 text-sm mb-4">{t('products.cant_decide')}</p>
          <button onClick={onOpenModal}
            className="bg-[#9333EA] text-[#030303] font-body font-bold text-sm px-8 py-3.5 rounded-full hover:bg-[#F0F0FF] transition-all duration-300 cursor-pointer">
            {t('nav.cta')}
          </button>
        </div>
      </div>
    </div>
  );
}
