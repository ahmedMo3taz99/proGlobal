interface Props {
  label: string;
  heading: string;
  sub: string;
  color?: string;
  className?: string;
  hideSubOnMobile?: boolean;
}

export default function SectionHeader({ label, heading, sub, color = '#9333EA', className = '', hideSubOnMobile = false }: Props) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <span
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 font-body text-[11px] tracking-[0.15em] uppercase border"
        style={{ color, borderColor: `${color}40`, backgroundColor: `${color}1A` }}
      >
        {label}
      </span>
      <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-[#F0F0FF] tracking-[-0.02em] leading-[1.05] max-w-3xl">
        {heading}
      </h2>
      <p className={`font-body text-[#F0F0FF]/50 text-sm md:text-base mt-5 max-w-xl leading-relaxed ${hideSubOnMobile ? 'hidden sm:block' : ''}`}>{sub}</p>
    </div>
  );
}
