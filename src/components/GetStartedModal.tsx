import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface Props { isOpen: boolean; onClose: () => void; }

interface FormErrors { name?: string; email?: string; phone?: string; country?: string; }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d\s\-(). ]{8,20}$/;

// No trim here: this runs on every keystroke, and trimming would swallow the space in "John Smith".
function sanitize(s: string) { return s.replace(/[<>"'`]/g, '').slice(0, 300); }

const emptyForm = { name: '', email: '', phone: '', country: '', experience: '', interests: [] as string[] };

export default function GetStartedModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const interests = ['int_robot'];

  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    setForm(emptyForm);
    setErrors({});
    setTouched({});
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  const validate = (f: typeof emptyForm): FormErrors => {
    const e: FormErrors = {};
    if (f.name.trim().length < 2) e.name = t('modal.err_name');
    if (!EMAIL_RE.test(f.email.trim())) e.email = t('modal.err_email');
    if (f.phone.trim() && !PHONE_RE.test(f.phone.trim())) e.phone = t('modal.err_phone');
    if (!f.country.trim()) e.country = t('modal.err_country');
    return e;
  };

  const setField = (field: string, value: string) => {
    const next = { ...form, [field]: sanitize(value) };
    setForm(next);
    if (touched[field]) setErrors(validate(next));
  };

  const handleBlur = (field: string) => {
    setTouched(p => ({ ...p, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, country: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
  };

  const toggleInterest = (key: string) => setForm(f => ({
    ...f, interests: f.interests.includes(key) ? f.interests.filter(i => i !== key) : [...f.interests, key]
  }));

  const base = 'bg-[#030303] border rounded-xl px-4 py-3 text-[#F0F0FF] font-body text-base sm:text-sm placeholder:text-[#F0F0FF]/25 focus:outline-none transition-colors w-full';
  const ok  = 'border-[#1A1A2E] focus:border-[#9333EA]/50';
  const err = 'border-[#FF4D6D]/60 focus:border-[#FF4D6D]';

  const fieldClass = (f: string) => `${base} ${touched[f] && errors[f as keyof FormErrors] ? err : ok}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center px-3 sm:px-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}/>
          <motion.div role="dialog" aria-modal="true"
            className="relative z-10 bg-[#0D0D0D] border border-[#1A1A2E] rounded-2xl p-6 sm:rounded-3xl sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>

            <button onClick={onClose} aria-label={t('modal.close')}
              className="absolute top-5 end-5 w-8 h-8 rounded-full bg-[#1A1A2E] flex items-center justify-center hover:bg-[#9333EA]/20 transition-colors cursor-pointer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F0F0FF" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {!submitted ? (
              <>
                <div className="mb-7">
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-[#F0F0FF] mb-2">{t('modal.title')}</h2>
                  <p className="font-body text-[#F0F0FF]/50 text-sm">{t('modal.sub')}</p>
                </div>
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

                  <div>
                    <input required type="text" placeholder={t('modal.name')}
                      value={form.name} onChange={e => setField('name', e.target.value)}
                      onBlur={() => handleBlur('name')} className={fieldClass('name')}/>
                    {touched.name && errors.name && <p className="mt-1 font-body text-[11px] text-[#FF4D6D]">{errors.name}</p>}
                  </div>

                  <div>
                    <input required type="email" placeholder={t('modal.email')}
                      value={form.email} onChange={e => setField('email', e.target.value)}
                      onBlur={() => handleBlur('email')} className={fieldClass('email')}/>
                    {touched.email && errors.email && <p className="mt-1 font-body text-[11px] text-[#FF4D6D]">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input type="tel" placeholder={t('modal.phone')}
                        value={form.phone} onChange={e => setField('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')} className={fieldClass('phone')}/>
                      {touched.phone && errors.phone && <p className="mt-1 font-body text-[11px] text-[#FF4D6D]">{errors.phone}</p>}
                    </div>
                    <div>
                      <input required type="text" placeholder={t('modal.country')}
                        value={form.country} onChange={e => setField('country', e.target.value)}
                        onBlur={() => handleBlur('country')} className={fieldClass('country')}/>
                      {touched.country && errors.country && <p className="mt-1 font-body text-[11px] text-[#FF4D6D]">{errors.country}</p>}
                    </div>
                  </div>

                  <select value={form.experience} onChange={e => setForm(f => ({...f, experience: e.target.value}))}
                    className={`${base} ${ok} appearance-none cursor-pointer`}>
                    <option value="">{t('modal.experience')}</option>
                    {['beginner','intermediate','advanced','professional'].map(k => (
                      <option key={k} value={k}>{t(`modal.exp_${k}`)}</option>
                    ))}
                  </select>

                  <div>
                    <p className="font-body text-[10px] text-[#F0F0FF]/40 uppercase tracking-wider mb-3">{t('modal.interest')}</p>
                    <div className="flex flex-wrap gap-2">
                      {interests.map(key => (
                        <button type="button" key={key} aria-pressed={form.interests.includes(key)}
                          onClick={() => toggleInterest(key)}
                          className={`font-body text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                            form.interests.includes(key)
                              ? 'bg-[#9333EA]/15 border-[#9333EA]/50 text-[#9333EA]'
                              : 'border-[#1A1A2E] text-[#F0F0FF]/40 hover:border-[#9333EA]/30'
                          }`}>
                          {t(`modal.${key}`)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit"
                    className="bg-[#9333EA] text-[#030303] font-body font-bold text-sm py-3.5 sm:py-4 rounded-xl hover:bg-[#F0F0FF] transition-all duration-300 tracking-wide mt-2 cursor-pointer">
                    {t('modal.submit')}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#9333EA]/15 border border-[#9333EA]/30 flex items-center justify-center mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-[#F0F0FF] mb-3">{t('modal.success_title')}</h3>
                <p className="font-body text-[#F0F0FF]/50 text-sm leading-relaxed max-w-xs">{t('modal.success_sub')}</p>
                <button onClick={onClose}
                  className="mt-8 border border-[#1A1A2E] text-[#F0F0FF]/50 font-body text-sm px-6 py-2.5 rounded-full hover:border-[#9333EA]/40 transition-colors cursor-pointer">
                  {t('modal.close')}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
