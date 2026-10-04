import { useTranslation } from 'react-i18next';

export default function LangToggle() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <button
      onClick={() => i18n.changeLanguage(isAr ? 'en' : 'ar')}
      aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
      className="flex items-center gap-1.5 border border-[#1A1A2E] rounded-full px-3 py-1.5 hover:border-[#9333EA]/40 transition-colors duration-300 cursor-pointer"
    >
      {/* Globe SVG icon */}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F0F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      <span className="font-body text-[11px] text-[#F0F0FF]/60 font-medium tracking-wider">
        {isAr ? 'EN' : 'عربي'}
      </span>
    </button>
  );
}
