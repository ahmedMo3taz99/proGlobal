const socials = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/Pro0Traders0Group',
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/protradersarabia/',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
      </>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/pro-traders-group/',
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@AmirNady',
    icon: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" />
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
