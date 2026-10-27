const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/proglobalsolution1/',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
      </>
    ),
  },
];

interface Props { size?: 'md' | 'sm'; }

export default function SocialLinks({ size = 'md' }: Props) {
  const box = size === 'md' ? 'w-9 h-9' : 'w-7 h-7';
  const px = size === 'md' ? 16 : 13;

  return (
    <>
      {socials.map(({ name, href, icon }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name}
          className={`${box} rounded-full border border-[#1A1A2E] flex items-center justify-center hover:border-[#9333EA]/40 hover:bg-[#9333EA]/5 transition-all duration-300`}>
          <svg width={px} height={px} viewBox="0 0 24 24" fill="none" stroke="#F0F0FF" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {icon}
          </svg>
        </a>
      ))}
    </>
  );
}
