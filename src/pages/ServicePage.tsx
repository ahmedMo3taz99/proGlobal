import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

/* ─── pricing plans per service ──────────────────────────── */
interface Plan {
  labelAr: string;
  labelEn: string;
  price: number;
  badge?: string;
  desc?: string;
}

const servicePlans: Record<string, Plan[]> = {
  indicator: [
    { labelAr: 'اشتراك شهري',    labelEn: '1 Month',   price: 299,  desc: 'جرّب المؤشر واختبر نتائجه' },
    { labelAr: 'اشتراك 6 أشهر',  labelEn: '6 Months',  price: 750,  badge: 'الأكثر مبيعاً', desc: 'للمتداولين الجادين الباحثين عن نتائج مستقرة' },
    { labelAr: 'اشتراك 12 شهر',  labelEn: '12 Months', price: 1000, desc: 'امتلك المؤشر للأبد بدون تجديد' },
  ],
  liquidity: [
    { labelAr: 'اشتراك شهري',    labelEn: '1 Month',   price: 299,  desc: 'جرّب النظام واختبر قوته' },
    { labelAr: 'اشتراك 6 أشهر',  labelEn: '6 Months',  price: 750,  badge: 'الأكثر مبيعاً', desc: 'للمتداولين الجادين الباحثين عن نتائج مستقرة' },
    { labelAr: 'اشتراك 12 شهر',  labelEn: '12 Months', price: 1000, desc: 'امتلك النظام للأبد بدون تجديد' },
  ],
  capital: [
    { labelAr: 'اشتراك شهري',    labelEn: '1 Month',   price: 199,  desc: 'أفضل بداية لاختبار قوة التوصيات' },
    { labelAr: 'اشتراك 6 أشهر',  labelEn: '6 Months',  price: 499,  badge: 'الأكثر مبيعاً', desc: 'للمتداولين الجادين الباحثين عن أرباح مستقرة' },
    { labelAr: 'اشتراك 12 شهر',  labelEn: '12 Months', price: 749,  desc: 'امتلك الخدمة للأبد بدون أي تجديدات مستقبلية' },
  ],
  toby: [
    { labelAr: '25 سؤال',        labelEn: '25 Questions',  price: 25,  desc: 'جرّب توبي بعدد محدود من الأسئلة' },
    { labelAr: '350 سؤال',       labelEn: '350 Questions', price: 350, badge: 'الأكثر مبيعاً', desc: 'للمتداولين الباحثين عن نتائج ثابتة ومستقرة' },
    { labelAr: '750 سؤال',       labelEn: '750 Questions', price: 750, desc: 'امتلك توبي للأبد بدون أي تجديد' },
  ],
  smc: [
    { labelAr: 'النسخة مدى الحياة', labelEn: 'Lifetime Access', price: 750, badge: 'الأكثر طلباً', desc: 'ادفع مرة واحدة فقط واستفد مدى الحياة' },
  ],
};

/* ─── service meta (colors, features, icons) ─────────────── */
const serviceMeta: Record<string, {
  color: string;
  featureKeys: string[];
  icon: React.ReactNode;
}> = {
  indicator: {
    color: '#00E5FF',
    featureKeys: ['indicator_f1', 'indicator_f2', 'indicator_f3', 'indicator_f4', 'indicator_f5'],
    icon: <path d="M4 20V14M10 20V9M16 20V12M22 20V4M2 20h21"/>,
  },
  toby: {
    color: '#8B5CF6',
    featureKeys: ['toby_f1', 'toby_f2', 'toby_f3', 'toby_f4', 'toby_f5'],
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M8 9h8M8 13h5"/>
      </>
    ),
  },
  liquidity: {
    color: '#06B6D4',
    featureKeys: ['liquidity_f1', 'liquidity_f2', 'liquidity_f3', 'liquidity_f4', 'liquidity_f5'],
    icon: <path d="M2 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>,
  },
  smc: {
    color: '#F59E0B',
    featureKeys: ['smc_f1', 'smc_f2', 'smc_f3', 'smc_f4', 'smc_f5'],
    icon: <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>,
  },
  capital: {
    color: '#10B981',
    featureKeys: ['capital_f1', 'capital_f2', 'capital_f3', 'capital_f4', 'capital_f5'],
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </>
    ),
  },
};

/* ─── SMC extra features (shown on its card) ─────────────── */
const smcCardFeatures = {
  ar: ['دخول كامل للكورس', 'دخول لقروب VIP لمدة شهر', 'دعم يومي عملي', 'تطبيق مباشر على السوق'],
  en: ['Full course access', 'VIP group access for 1 month', 'Daily hands-on support', 'Live market application'],
};

interface Props { onOpenModal: () => void; }

export default function ServicePage({ onOpenModal }: Props) {
  const { serviceKey = '' } = useParams<{ serviceKey: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAr = i18n.language === 'ar';

  const meta = serviceMeta[serviceKey];
  const plans = servicePlans[serviceKey];

  useEffect(() => {
    if (!meta) navigate('/', { replace: true });
    window.scrollTo({ top: 0 });
  }, [serviceKey, meta, navigate]);

  if (!meta || !plans) return null;

  const { color, featureKeys } = meta;

  return (
    <div className="min-h-screen bg-[#030303]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute w-[600px] h-[600px] rounded-full -top-60 -start-40 blur-[80px]"
          style={{ background: `radial-gradient(circle, ${color}10 0%, transparent 70%)` }}/>
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(240,240,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(240,240,255,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}/>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-12 pt-28 sm:pt-36 pb-20">

        {/* Back */}
        <motion.button onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 font-body text-xs text-[#F0F0FF]/35 hover:text-[#F0F0FF]/70 transition-colors mb-10 sm:mb-14 cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          {isAr ? 'العودة للخدمات' : 'Back to Services'}
        </motion.button>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color}
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {meta.icon}
              </svg>
            </div>
            <span className="font-body text-[10px] uppercase tracking-[0.2em] rtl:tracking-normal" style={{ color }}>
              {t('services.label')}
            </span>
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-tight text-[#F0F0FF] mb-4">
            {t(`services.${serviceKey}_name`)}
          </h1>
          <p className="font-body text-[#F0F0FF]/50 text-sm sm:text-base leading-relaxed max-w-2xl">
            {t(`services.${serviceKey}_desc`)}
          </p>
        </motion.div>

        {/* Features */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#0D0D0D] border border-[#1A1A2E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8">
          <p className="font-body text-[10px] uppercase tracking-[0.2em] rtl:tracking-normal mb-6" style={{ color }}>
            {isAr ? 'المميزات الرئيسية' : 'Key Features'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featureKeys.map(k => (
              <div key={k} className="flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0"
                  stroke={color} strokeWidth="2.5" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span className="font-body text-sm text-[#F0F0FF]/60 leading-snug">
                  {t(`services.${k}`)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pricing plans */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <p className="font-body text-[10px] uppercase tracking-[0.2em] rtl:tracking-normal text-[#F0F0FF]/30 mb-5">
            {isAr ? 'اختر الباقة المناسبة لك' : 'Choose Your Plan'}
          </p>

          <div className={`grid gap-4 ${plans.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 sm:grid-cols-3'}`}>
            {plans.map((plan, i) => {
              const isFeatured = !!plan.badge;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                  className="relative bg-[#0D0D0D] rounded-2xl sm:rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300"
                  style={{
                    border: isFeatured ? `1px solid ${color}50` : '1px solid #1A1A2E',
                    boxShadow: isFeatured ? `0 0 30px ${color}10` : 'none',
                  }}>

                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                      <span className="font-body text-[10px] font-bold px-3 py-1 rounded-full"
                        style={{ background: color, color: '#030303' }}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Label */}
                  <p className="font-body text-xs text-[#F0F0FF]/40 mt-1">
                    {isAr ? plan.labelAr : plan.labelEn}
                  </p>

                  {/* Price */}
                  <div className="flex items-end gap-1">
                    <span className="font-display font-extrabold text-4xl text-[#F0F0FF]">${plan.price}</span>
                  </div>

                  {/* Description */}
                  {plan.desc && (
                    <p className="font-body text-xs text-[#F0F0FF]/40 leading-snug min-h-[2.5rem]">
                      {isAr ? plan.desc : plan.desc}
                    </p>
                  )}

                  {/* SMC extra features */}
                  {serviceKey === 'smc' && (
                    <ul className="flex flex-col gap-2 mt-1">
                      {(isAr ? smcCardFeatures.ar : smcCardFeatures.en).map(f => (
                        <li key={f} className="flex items-center gap-2 font-body text-xs text-[#F0F0FF]/55">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                            stroke={color} strokeWidth="2.5" strokeLinecap="round">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <button onClick={onOpenModal}
                    className="mt-auto w-full py-3 rounded-xl font-body font-bold text-sm transition-all duration-300 cursor-pointer"
                    style={isFeatured
                      ? { background: color, color: '#030303' }
                      : { background: 'transparent', color, border: `1px solid ${color}40` }}>
                    {isAr ? 'اشترك الآن' : 'Subscribe Now'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Back to home */}
        <div className="mt-10 text-center">
          <button onClick={() => navigate('/')}
            className="font-body text-xs text-[#F0F0FF]/25 hover:text-[#F0F0FF]/50 transition-colors cursor-pointer">
            {isAr ? '← العودة للصفحة الرئيسية' : '← Back to Home'}
          </button>
        </div>
      </div>
    </div>
  );
}
