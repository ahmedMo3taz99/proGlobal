import { useTranslation } from 'react-i18next';

const row1 = ['MT4', '·', 'MetaTrader 4', '·', 'MT5', '·', 'MetaTrader 5', '·', 'TradingView', '·', 'Tickmill', '·'];
const row2 = ['FCA Regulated', '·', 'CySEC', '·', 'FSA', '·', 'Smart Money Concepts', '·', 'Gold Signals', '·', '24/7 Support', '·'];

function Row({ items, trackClass, itemClass, dotClass }: { items: string[]; trackClass: string; itemClass: string; dotClass: string }) {
  return (
    <div className={trackClass}>
      {Array.from({ length: 4 }).flatMap((_, rep) =>
        items.map((item, i) => (
          <span key={`${rep}-${i}`} className={`font-display font-bold mx-5 sm:mx-8 whitespace-nowrap ${item === '·' ? dotClass : itemClass}`}>
            {item}
          </span>
        ))
      )}
    </div>
  );
}

export default function PlatformsSection() {
  const { t } = useTranslation();

  return (
    <section id="platforms" className="bg-[#030303] py-16 border-y border-[#1A1A2E] overflow-hidden">
      <p className="font-body text-[9px] sm:text-[10px] text-[#F0F0FF]/30 tracking-[0.3em] rtl:tracking-normal uppercase text-center mb-10 px-4 sm:px-6">
        {t('platforms.label')}
      </p>

      {/* Forced LTR so the -50% marquee loop works in both directions */}
      <div dir="ltr" aria-hidden="true">
        <Row items={row1} trackClass="ticker-r1" itemClass="text-lg sm:text-2xl text-[#F0F0FF]/15" dotClass="text-lg sm:text-2xl text-[#9333EA]/25" />
        <Row items={row2} trackClass="ticker-r2" itemClass="text-base sm:text-xl text-[#00E5FF]/15" dotClass="text-base sm:text-xl text-[#00E5FF]/15" />
      </div>
    </section>
  );
}
