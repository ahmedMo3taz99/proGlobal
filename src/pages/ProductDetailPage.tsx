import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { motion } from 'motion/react';
import { PRODUCTS } from '../data/products';
import FVGChart from '../components/FVGChart';

interface Props { onOpenModal: () => void; }

export default function ProductDetailPage({ onOpenModal }: Props) {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAr = i18n.language === 'ar';
  const heroRef = useRef<HTMLDivElement>(null);

  const product = PRODUCTS.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!product) { navigate('/products', { replace: true }); return; }
    const ctx = gsap.context(() => {
      gsap.from('.pd-hero > *', { y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.1 });
    }, heroRef);
    return () => ctx.revert();
  }, [slug, product, navigate]);

  if (!product) return null;

  const others = PRODUCTS.filter(p => p.slug !== slug).slice(0, 3);
  const whatsapp = import.meta.env.VITE_WHATSAPP as string;

  return (
    <div className="bg-[#030303] min-h-screen">
      {/* Hero */}
      <div ref={heroRef} className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        {/* Back */}
        <button onClick={() => navigate('/products')}
          className="font-body text-xs text-[#F0F0FF]/40 hover:text-[#9333EA] transition-colors mb-8 cursor-pointer flex items-center gap-1">
          {t('products.back')}
        </button>

        <div className="pd-hero grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-md border"
                style={{color:product.accentColor, borderColor:product.accentColor+'40', background:product.accentColor+'10'}}>
                {product.platform}
              </span>
              <span className="font-mono text-[10px] text-[#F0F0FF]/40 px-2.5 py-1 rounded-md border border-[#1A1A2E]">
                {product.pair}
              </span>
              <span className="font-mono text-[10px] text-[#F0F0FF]/40 px-2.5 py-1 rounded-md border border-[#1A1A2E]">
                {product.timeframe}
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#F0F0FF] tracking-[-0.03em] rtl:tracking-normal leading-tight mb-4">
              {isAr ? product.nameAr : product.nameEn}
            </h1>

            <p className="font-body text-[#F0F0FF]/55 text-sm sm:text-base leading-relaxed mb-8">
              {isAr ? product.descAr : product.descEn}
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Min Capital', value: product.minCapital },
                { label: 'Daily Profit', value: product.dailyProfit },
                { label: 'Monthly Avg', value: product.monthlyProfit },
                { label: 'Timeframe', value: product.timeframe },
              ].map(s => (
                <div key={s.label} className="bg-[#0D0D0D] border border-[#1A1A2E] rounded-xl px-3 py-3 text-center">
                  <p className="font-body text-[9px] text-[#F0F0FF]/30 uppercase tracking-wider mb-1">{s.label}</p>
                  <p className="font-display font-bold text-sm" style={{color:product.accentColor}}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3 mb-8">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0"
                    stroke={product.accentColor} strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span className="font-body text-sm text-[#F0F0FF]/65">{isAr ? f.ar : f.en}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={onOpenModal}
                className="font-body font-bold text-sm px-7 py-3.5 rounded-full w-full sm:w-auto text-center transition-all duration-300 cursor-pointer"
                style={{background:product.accentColor, color:'#030303'}}>
                {t('products.subscribe')}
              </button>
              <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g,'')}`}
                target="_blank" rel="noopener noreferrer"
                className="border border-[#1A1A2E] text-[#F0F0FF]/60 font-body text-sm px-7 py-3.5 rounded-full w-full sm:w-auto text-center hover:border-[#9333EA]/50 hover:text-[#F0F0FF] transition-all duration-300">
                Free Demo
              </a>
            </div>
          </div>

          {/* Right — FVG Chart */}
          <div className="relative" dir="ltr">
            <div className="bg-[#0D0D0D] border border-[#1A1A2E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{background:`radial-gradient(circle at 60% 40%, ${product.accentColor}30 0%, transparent 65%)`}}/>
              <FVGChart type={product.fvgType} accentColor={product.accentColor} height={220} animated={true}/>
              <p className="font-mono text-[9px] text-[#F0F0FF]/25 text-center mt-4">
                Fair Value Gap — {product.pair}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <section className="bg-[#0D0D0D] border-y border-[#1A1A2E] py-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F0F0FF] text-center mb-10">Choose Your Plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {product.plans.map((plan, i) => {
              const isHL = plan.badge === 'popular';
              return (
                <motion.div key={i}
                  initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative rounded-2xl p-5 sm:p-6 flex flex-col gap-4 border transition-all duration-300"
                  style={isHL ? {borderColor:product.accentColor+'60', background:product.accentColor+'08'} : {borderColor:'#1A1A2E'}}>

                  {plan.badge && (
                    <span className="absolute -top-3 left-0 right-0 mx-auto w-fit font-body text-[10px] px-3 py-1 rounded-full"
                      style={{background:product.accentColor, color:'#030303', fontWeight:700}}>
                      {t(`pricing.${plan.badge}`)}
                    </span>
                  )}

                  <div className="pt-2">
                    <p className="font-body text-[10px] text-[#F0F0FF]/40 uppercase tracking-[0.2em] rtl:tracking-normal mb-1">{t(`pricing.${plan.labelKey}`)}</p>
                    <p className="font-display font-extrabold text-3xl text-[#F0F0FF]">${plan.price.toLocaleString()}</p>
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    {['pricing.f1','pricing.f2','pricing.f3','pricing.f4'].map(f => (
                      <div key={f} className="flex items-start gap-2">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0"
                          stroke={product.accentColor} strokeWidth="2.5" strokeLinecap="round">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        <span className="font-body text-[11px] text-[#F0F0FF]/45">{t(f)}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={onOpenModal}
                    className="w-full py-3 rounded-xl font-body font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer"
                    style={isHL ? {background:product.accentColor, color:'#030303'} : {border:`1px solid ${product.accentColor}40`, color:product.accentColor}}>
                    {t('products.subscribe')}
                  </button>
                </motion.div>
              );
            })}
          </div>
          <p className="font-body text-[9px] text-[#F0F0FF]/20 text-center mt-6">{t('pricing.disclaimer')}</p>
        </div>
      </section>

      {/* Other bots */}
      <section className="py-14 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <h3 className="font-display font-bold text-xl text-[#F0F0FF] mb-8">You may also like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {others.map(p => {
            const lowest = Math.min(...p.plans.map(pl => pl.price));
            return (
              <div key={p.id} onClick={() => navigate(`/products/${p.slug}`)}
                className="bg-[#0D0D0D] border border-[#1A1A2E] rounded-2xl overflow-hidden cursor-pointer hover:border-[#9333EA]/30 transition-all duration-300 group">
                <div className="h-28 bg-[#030303] p-3 relative overflow-hidden" dir="ltr">
                  <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{background:`radial-gradient(circle at 60% 50%, ${p.accentColor}25 0%, transparent 70%)`}}/>
                  <FVGChart type={p.fvgType} accentColor={p.accentColor} height={90} animated={false}/>
                </div>
                <div className="p-4">
                  <h4 className="font-display font-bold text-sm text-[#F0F0FF] mb-1">{isAr ? p.nameAr : p.nameEn}</h4>
                  <p className="font-display font-bold text-base" style={{color:p.accentColor}}>
                    ${lowest}<span className="font-body text-xs text-[#F0F0FF]/30">{t('products.month')}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
