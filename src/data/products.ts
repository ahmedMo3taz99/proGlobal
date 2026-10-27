export type BotTheme = 'aura' | 'falcon' | 'royal';

export interface Product {
  id: number;
  slug: string;
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  descEn: string;
  descAr: string;
  pair: string;
  platform: string;
  timeframe: string;
  strategyEn: string;
  strategyAr: string;
  theme: BotTheme;
  accentColor: string;
  secondaryColor: string;
  plans: { labelKey: string; price: number; badge?: 'popular' | 'best' }[];
  features: { en: string; ar: string }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1, slug: 'aura-scalping',
    nameEn: 'Aura Scalping', nameAr: 'Aura Scalping',
    taglineEn: 'Gold scalping with a glow of precision', taglineAr: 'سكالبينج الذهب بدقة لامعة',
    descEn: 'A fast gold (XAU/USD) scalping bot that reads every micro-move in the market and takes quick, precise entries and exits throughout the day.',
    descAr: 'بوت سكالبينج سريع للذهب (XAU/USD) بيقرأ كل حركة صغيرة في السوق وبياخد صفقات دخول وخروج سريعة ودقيقة طول اليوم.',
    pair: 'XAU/USD', platform: 'MT4 / MT5', timeframe: 'M1 / M5',
    strategyEn: 'Scalping', strategyAr: 'سكالبينج',
    theme: 'aura', accentColor: '#F5C542', secondaryColor: '#F59E0B',
    plans: [
      { labelKey: 'monthly', price: 300 },
      { labelKey: 'semi', price: 750, badge: 'popular' },
      { labelKey: 'annual', price: 1200, badge: 'best' },
    ],
    features: [
      { en: 'Lightning-fast entries on gold micro-moves', ar: 'دخول سريع جداً على حركات الذهب الصغيرة' },
      { en: 'Smart news filter — pauses during high-impact events', ar: 'فلتر أخبار ذكي — بيوقف التداول وقت الأخبار القوية' },
      { en: 'Tight stop-loss on every trade', ar: 'وقف خسارة محكم على كل صفقة' },
      { en: 'Adjustable risk per trade', ar: 'مخاطرة قابلة للتعديل لكل صفقة' },
      { en: 'Fully automated 24/5', ar: 'تشغيل آلي بالكامل 24/5' },
    ],
  },
  {
    id: 2, slug: 'currency-falcon',
    nameEn: 'Currency Falcon', nameAr: 'Currency Falcon',
    taglineEn: 'Spots the move, strikes with precision', taglineAr: 'بيرصد الحركة ويضرب بدقة',
    descEn: 'A forex bot that watches the major currency pairs like a falcon — waiting for the right setup, then striking with a sharp, well-timed entry.',
    descAr: 'بوت عملات بيراقب أزواج العملات الرئيسية زي الصقر — بيستنى الفرصة الصح وبعدين يدخل بدقة وفي التوقيت المناسب.',
    pair: 'EUR/USD · GBP/USD · USD/JPY', platform: 'MT4 / MT5', timeframe: 'M15 / H1',
    strategyEn: 'Precision Entries', strategyAr: 'دخول دقيق',
    theme: 'falcon', accentColor: '#38BDF8', secondaryColor: '#6366F1',
    plans: [
      { labelKey: 'monthly', price: 199 },
      { labelKey: 'semi', price: 499, badge: 'popular' },
      { labelKey: 'annual', price: 750, badge: 'best' },
    ],
    features: [
      { en: 'Scans the major currency pairs at once', ar: 'بيراقب أزواج العملات الرئيسية في نفس الوقت' },
      { en: 'Waits for high-probability setups only', ar: 'بيدخل بس على الفرص عالية الاحتمالية' },
      { en: 'Trend & momentum confirmation', ar: 'تأكيد بالاتجاه والزخم' },
      { en: 'Built-in risk management', ar: 'إدارة مخاطر مدمجة' },
      { en: 'Fully automated 24/5', ar: 'تشغيل آلي بالكامل 24/5' },
    ],
  },
  {
    id: 3, slug: 'royal-golden-hedge',
    nameEn: 'Royal Golden Hedge', nameAr: 'Royal Golden Hedge',
    taglineEn: 'The premium gold hedge strategy', taglineAr: 'استراتيجية الهيدج الملكية للذهب',
    descEn: 'Our premium gold bot. It opens hedged buy & sell positions on XAU/USD to manage volatility and capture profit whichever way the market moves.',
    descAr: 'البوت الأقوى عندنا للذهب. بيفتح مراكز شراء وبيع (هيدج) على XAU/USD عشان يدير التقلبات ويحقق ربح في أي اتجاه يمشي فيه السوق.',
    pair: 'XAU/USD', platform: 'MT4 / MT5', timeframe: 'M15 / M30',
    strategyEn: 'Hedging', strategyAr: 'هيدج',
    theme: 'royal', accentColor: '#D4AF37', secondaryColor: '#7C3AED',
    plans: [
      { labelKey: 'monthly', price: 499 },
      { labelKey: 'semi', price: 1200, badge: 'popular' },
      { labelKey: 'annual', price: 2500, badge: 'best' },
    ],
    features: [
      { en: 'Simultaneous buy & sell hedge positions', ar: 'مراكز شراء وبيع في نفس الوقت' },
      { en: 'Profits in both market directions', ar: 'ربح في الاتجاهين' },
      { en: 'Intelligent volatility management', ar: 'إدارة ذكية للتقلبات' },
      { en: 'Built-in news filter', ar: 'فلتر أخبار مدمج' },
      { en: 'Flexible risk configuration', ar: 'إعدادات مخاطرة مرنة' },
    ],
  },
];
