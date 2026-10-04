export interface Product {
  id: number;
  slug: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  pair: string;
  platform: string;
  timeframe: string;
  minCapital: string;
  dailyProfit: string;
  monthlyProfit: string;
  fvgType: 'bullish' | 'bearish';
  accentColor: string;
  plans: { labelKey: string; price: number; badge?: 'popular' | 'best' }[];
  features: { en: string; ar: string }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 11, slug: 'gold-scalping-tp-mt4',
    nameEn: 'Gold Scalping TP – MT4', nameAr: 'بوت Gold Scalping TP – MT4',
    descEn: 'Automated Expert Advisor for gold (XAU/USD) using intelligent scalping algorithms and smart news filters. Executes 1–5 precision trades daily.',
    descAr: 'بوت خبير آلي للذهب يستخدم خوارزميات سكالبينج ذكية مع فلاتر أخبار متطورة. ينفذ 1–5 صفقات دقيقة يومياً.',
    pair: 'XAU/USD', platform: 'MT4', timeframe: 'M15 / M30',
    minCapital: '$100', dailyProfit: '1–5%', monthlyProfit: '50–100%',
    fvgType: 'bullish', accentColor: '#9333EA',
    plans: [
      { labelKey: 'monthly', price: 399 },
      { labelKey: 'semi', price: 1500, badge: 'popular' },
      { labelKey: 'lifetime', price: 12000, badge: 'best' },
    ],
    features: [
      { en: 'Smart news filter — halts during high-impact events', ar: 'فلتر الأخبار الذكي — يوقف التداول أثناء الأحداث الكبرى' },
      { en: 'Adaptive stop-loss & take-profit', ar: 'وقف خسارة وجني أرباح تكيفي' },
      { en: 'Multi-risk levels (0.01 lot → 10% per trade)', ar: 'مستويات مخاطرة متعددة' },
      { en: 'Compatible with all MT4 brokers', ar: 'متوافق مع جميع وسطاء MT4' },
      { en: 'Suitable for beginners & professionals', ar: 'مناسب للمبتدئين والمحترفين' },
    ],
  },
  {
    id: 12, slug: 'gold-trend-mt5',
    nameEn: 'Gold Trend Bot – MT5', nameAr: 'بوت Gold Trend – MT5',
    descEn: 'Trend-following Expert Advisor for MT5 with smart accumulative strategy. Ideal for funded accounts and investors seeking stable returns.',
    descAr: 'بوت خبير يتبع الاتجاه لـ MT5 باستراتيجية تراكمية ذكية. مثالي للحسابات الممولة.',
    pair: 'XAU/USD', platform: 'MT5', timeframe: 'M15 / M30',
    minCapital: '$100', dailyProfit: '1–5%', monthlyProfit: '50–100%',
    fvgType: 'bullish', accentColor: '#00E5FF',
    plans: [
      { labelKey: 'monthly', price: 299 },
      { labelKey: 'semi', price: 1000, badge: 'popular' },
      { labelKey: 'annual', price: 1500, badge: 'best' },
    ],
    features: [
      { en: 'Smart accumulative strategy', ar: 'استراتيجية تراكمية ذكية' },
      { en: 'News filter protection', ar: 'حماية فلتر الأخبار' },
      { en: 'Suitable for funded accounts', ar: 'مناسب للحسابات الممولة' },
      { en: 'MT5 optimized', ar: 'محسّن لـ MT5' },
      { en: '24/7 automated', ar: 'تشغيل آلي 24/7' },
    ],
  },
  {
    id: 13, slug: 'gold-mt5-scalping',
    nameEn: 'Gold Bot – MT5 Scalping', nameAr: 'بوت Gold – MT5 سكالبينج',
    descEn: 'High-performance MT5 scalping bot for XAU/USD. Proprietary AI algorithms deliver 1–5 precision trades daily with intelligent risk management.',
    descAr: 'بوت سكالبينج عالي الأداء لـ MT5 على XAU/USD. خوارزميات ذكاء اصطناعي خاصة يقدم 1–5 صفقات دقيقة يومياً.',
    pair: 'XAU/USD', platform: 'MT5', timeframe: 'M15 / M30',
    minCapital: '$100', dailyProfit: '1–5%', monthlyProfit: '50–100%',
    fvgType: 'bearish', accentColor: '#7C3AED',
    plans: [
      { labelKey: 'monthly', price: 499 },
      { labelKey: 'semi', price: 2699, badge: 'popular' },
      { labelKey: 'lifetime', price: 4999, badge: 'best' },
    ],
    features: [
      { en: 'Proprietary AI price analysis engine', ar: 'محرك تحليل أسعار بالذكاء الاصطناعي' },
      { en: '1–5 high-precision trades daily', ar: '1–5 صفقات يومياً' },
      { en: 'Smart news filter', ar: 'فلتر الأخبار الذكي' },
      { en: 'Optimized for MT5 speed', ar: 'محسّن لسرعة MT5' },
      { en: 'Continuous AI model updates', ar: 'تحديثات مستمرة للنموذج' },
    ],
  },
  {
    id: 14, slug: 'gold-mega-profit-mt4',
    nameEn: 'Gold Mega Profit – MT4', nameAr: 'بوت Gold Mega Profit – MT4',
    descEn: 'Dual-direction pending orders bot for MT4. Uses simultaneous buy & sell pending orders to capture gold price swings throughout the day.',
    descAr: 'بوت أوامر معلقة ثنائي الاتجاه لـ MT4. يستخدم أوامر شراء وبيع معلقة في آنٍ واحد.',
    pair: 'XAU/USD', platform: 'MT4', timeframe: 'All Timeframes',
    minCapital: '$500', dailyProfit: '10–50%', monthlyProfit: 'Variable',
    fvgType: 'bullish', accentColor: '#F59E0B',
    plans: [
      { labelKey: 'monthly', price: 299 },
      { labelKey: 'semi', price: 750, badge: 'popular' },
      { labelKey: 'annual', price: 1199, badge: 'best' },
    ],
    features: [
      { en: 'Dual pending orders in both directions', ar: 'أوامر معلقة مزدوجة في الاتجاهين' },
      { en: 'Quick close at profit targets', ar: 'إغلاق سريع عند الهدف' },
      { en: 'Works on all timeframes', ar: 'يعمل على جميع الأطر' },
      { en: 'Smart capital management', ar: 'إدارة ذكية لرأس المال' },
      { en: 'Minimum capital $500', ar: 'رأس مال أدنى 500$' },
    ],
  },
  {
    id: 15, slug: 'gold-cent-mt4',
    nameEn: 'Gold Cent – MT4', nameAr: 'بوت Gold Cent – MT4',
    descEn: 'Designed for cent accounts with small capital. Trend-following strategy with continuous positions for steady low-risk growth. Perfect for beginners.',
    descAr: 'مصمم للحسابات السنتية برأس مال صغير. استراتيجية اتباع الاتجاه مع مراكز مستمرة.',
    pair: 'XAU/USD', platform: 'MT4', timeframe: 'H1 / H4',
    minCapital: '$100 (cent)', dailyProfit: 'Stable', monthlyProfit: 'Steady Growth',
    fvgType: 'bullish', accentColor: '#10B981',
    plans: [
      { labelKey: 'monthly', price: 149 },
      { labelKey: 'semi', price: 399, badge: 'popular' },
      { labelKey: 'annual', price: 599, badge: 'best' },
    ],
    features: [
      { en: 'Cent account — start from $100', ar: 'حساب سنتي — ابدأ من 100$' },
      { en: 'Low drawdown strategy', ar: 'استراتيجية منخفضة التراجع' },
      { en: 'Continuous trend-following positions', ar: 'مراكز مستمرة تتبع الاتجاه' },
      { en: 'Ideal for beginners', ar: 'مثالي للمبتدئين' },
      { en: 'H1–H4 stable timeframes', ar: 'أطر زمنية مستقرة H1–H4' },
    ],
  },
  {
    id: 16, slug: 'btc-bot-mt4-mt5',
    nameEn: 'BTC Bot – MT4 / MT5', nameAr: 'بوت BTC – MT4 / MT5',
    descEn: 'AI-powered scalping bot for Bitcoin (BTC/USD) and gold. Cross-platform MT4 & MT5 support with intelligent news filtering.',
    descAr: 'بوت سكالبينج بالذكاء الاصطناعي للبيتكوين والذهب. يدعم MT4 وMT5 مع فلترة الأخبار.',
    pair: 'BTC/USD + XAU/USD', platform: 'MT4 / MT5', timeframe: 'M15 / M30',
    minCapital: '$100', dailyProfit: '1–5%', monthlyProfit: '50–100%',
    fvgType: 'bearish', accentColor: '#F97316',
    plans: [
      { labelKey: 'monthly', price: 200 },
      { labelKey: 'semi', price: 750, badge: 'popular' },
      { labelKey: 'annual', price: 1200, badge: 'best' },
    ],
    features: [
      { en: 'Bitcoin & Gold dual-market', ar: 'تغطية البيتكوين والذهب' },
      { en: 'MT4 and MT5 compatible', ar: 'متوافق مع MT4 وMT5' },
      { en: 'Smart crypto volatility filter', ar: 'فلتر ذكي لتقلبات الكريبتو' },
      { en: 'Official resale licensing', ar: 'ترخيص بيع رسمي' },
      { en: '24/7 automated execution', ar: 'تنفيذ آلي 24/7' },
    ],
  },
  {
    id: 17, slug: 'gold-hedge-mt4',
    nameEn: 'Gold Hedge – MT4', nameAr: 'بوت هيدج الذهب – MT4',
    descEn: 'Premium hedge strategy for XAU/USD. Opens simultaneous buy & sell positions to manage volatility and capture profits in any market direction.',
    descAr: 'استراتيجية هيدج متميزة لـ XAU/USD. يفتح مراكز شراء وبيع في آنٍ واحد لإدارة التقلبات.',
    pair: 'XAU/USD', platform: 'MT4', timeframe: 'M15 / M30',
    minCapital: '$1,000', dailyProfit: 'Variable', monthlyProfit: '30–120%',
    fvgType: 'bearish', accentColor: '#EC4899',
    plans: [
      { labelKey: 'monthly', price: 600 },
      { labelKey: 'semi', price: 2500, badge: 'popular' },
      { labelKey: 'lifetime', price: 12000, badge: 'best' },
    ],
    features: [
      { en: 'Simultaneous buy & sell hedge', ar: 'هيدج شراء وبيع في آنٍ واحد' },
      { en: 'Intelligent volatility management', ar: 'إدارة ذكية للتقلبات' },
      { en: 'Built-in news filter', ar: 'فلتر أخبار مدمج' },
      { en: 'Flexible risk configuration', ar: 'إعدادات مخاطرة مرنة' },
      { en: 'All experience levels', ar: 'جميع مستويات الخبرة' },
    ],
  },
];
