import { Link } from 'react-router-dom';

interface Props { onClick?: () => void; }

export default function Logo({ onClick }: Props) {
  return (
    <Link to="/" onClick={onClick} className="flex flex-col leading-none">
      <span className="font-display font-bold text-base sm:text-lg text-[#F0F0FF] tracking-tight">
        Pro<span className="text-[#9333EA]">Global</span>
      </span>
      <span className="hidden sm:block font-body text-[9px] text-[#F0F0FF]/25 tracking-[0.2em] uppercase">
Solutions      </span>
    </Link>
  );
}
