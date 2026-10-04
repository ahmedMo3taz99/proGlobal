import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import SocialLinks from '../components/SocialLinks';
import { scrollTo } from '../utils/scrollTo';

const serviceKeys = ['robot', 'indicator', 'toby', 'liquidity', 'smc'];
const platforms = ['MT4', 'MT5', 'TradingView', 'Tickmill', 'FCA Regulated'];

const headingClass = 'font-body text-[9px] sm:text-[10px] text-[#F0F0FF]/30 uppercase tracking-[0.2em] rtl:tracking-normal mb-5';
const itemClass = 'font-body text-xs sm:text-sm text-[#F0F0FF]/50';

export default function Footer() {
  const { t } = useTranslation();
  const email = import.meta.env.VITE_EMAIL as string;
  const phone = import.meta.env.VITE_WHATSAPP as string;
  const reg   = import.meta.env.VITE_COMPANY_REG as string;

  return (
    <footer className="bg-[#030303] border-t border-[#1A1A2E] px-6 md:px-12 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        <div>
          <Logo />
          <p className="font-body text-[#F0F0FF]/40 text-sm leading-relaxed max-w-[200px] mt-5">{t('footer.tagline')}</p>
          <p className="font-body text-[9px] text-[#F0F0FF]/20 mt-4">Reg. No: {reg} (Companies House)</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-5">
            <SocialLinks size="sm" />
          </div>
        </div>

        <div>
          <h4 className={headingClass}>{t('footer.services')}</h4>
          <ul className="flex flex-col gap-2 sm:gap-3">
            {serviceKeys.map(key => (
              <li key={key}>
                <span onClick={() => scrollTo('services')}
                  className={`${itemClass} hover:text-[#9333EA] transition-colors duration-300 cursor-pointer`}>
                  {t(`services.${key}_name`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={headingClass}>{t('footer.platforms_col')}</h4>
          <ul className="flex flex-col gap-2 sm:gap-3">
            {platforms.map(p => (
              <li key={p} className={itemClass}>{p}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={headingClass}>{t('footer.contact')}</h4>
          <ul className="flex flex-col gap-2 sm:gap-3">
            <li className={itemClass}>London, United Kingdom</li>
            <li>
              <a href={`tel:${phone}`} dir="ltr" className="font-body text-xs sm:text-sm text-[#9333EA]/70 hover:text-[#9333EA] transition-colors duration-300">
                {phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className={`${itemClass} hover:text-[#9333EA] transition-colors duration-300 break-all`}>
                {email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#1A1A2E] mt-12 pt-8 flex flex-col gap-4 text-center sm:text-start">
        <p className="font-body text-[11px] text-[#F0F0FF]/30">{t('footer.rights')}</p>
        <p className="font-body text-[9px] sm:text-[10px] text-[#F0F0FF]/20 leading-relaxed max-w-3xl">{t('footer.disclaimer')}</p>
      </div>
    </footer>
  );
}
