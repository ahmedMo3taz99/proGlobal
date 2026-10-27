import './i18n';
import { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from './components/LoadingScreen';
import GetStartedModal from './components/GetStartedModal';
import LangToggle from './components/LangToggle';
import Logo from './components/Logo';
import HeroSection from './sections/HeroSection';
import StatsSection from './sections/StatsSection';
import ServicesSection from './sections/ServicesSection';
import ToolsSection from './sections/ToolsSection';
import PlatformsSection from './sections/PlatformsSection';
import JoinSection from './sections/JoinSection';
import Footer from './sections/Footer';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';

gsap.registerPlugin(ScrollTrigger);

function HomePage({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <>
      <HeroSection onOpenModal={onOpenModal} />
      <StatsSection />
      <ServicesSection onOpenModal={onOpenModal} />
      <ToolsSection />
      <PlatformsSection />
      <JoinSection onOpenModal={onOpenModal} />
    </>
  );
}

// The home page has its own nav inside the hero; other routes get this slim bar.
function SubpageHeader() {
  const { t } = useTranslation();
  return (
    <header className="absolute top-0 start-0 end-0 z-50 px-4 sm:px-6 md:px-12 py-5 flex items-center justify-between gap-3">
      <Logo />
      <div className="flex items-center gap-4">
        <Link to="/" className="hidden sm:block font-body text-xs text-[#F0F0FF]/50 hover:text-[#9333EA] tracking-wider uppercase transition-colors duration-300">
          {t('nav.home', { defaultValue: 'Home' })}
        </Link>
        <LangToggle />
      </div>
    </header>
  );
}

function Shell() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(() => !!sessionStorage.getItem('ptg-loaded'));
  const openModal = () => setModalOpen(true);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    // Text lengths change with the language, so pinned positions must be re-measured
    ScrollTrigger.refresh();
  }, [i18n.language]);

  // Synchronously revert GSAP pins before React's commit phase to prevent removeChild DOM errors
  useLayoutEffect(() => {
    return () => { ScrollTrigger.getAll().forEach(st => st.kill()); };
  }, [pathname]);

  // After new route renders, re-measure any new ScrollTriggers
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div className="bg-[#030303] relative">
      {!loaded && (
        <LoadingScreen onComplete={() => {
          sessionStorage.setItem('ptg-loaded', '1');
          setLoaded(true);
        }} />
      )}
      <GetStartedModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      {pathname !== '/' && <SubpageHeader />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage onOpenModal={openModal} />} />
          <Route path="/products" element={<ProductsPage onOpenModal={openModal} />} />
          <Route path="/products/:slug" element={<ProductDetailPage onOpenModal={openModal} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
