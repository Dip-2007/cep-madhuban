import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Heart, Languages, Moon, Sun } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const { t, language, toggleLanguage } = useTranslation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Dynamic transforms based on scroll
  const headerPadding = useTransform(scrollY, [0, 100], ['1.5rem 0', '0.75rem 0']);
  const navPadding = useTransform(scrollY, [0, 100], ['1rem 2rem', '0.6rem 1.5rem']);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.programs'), path: '/programs' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <motion.header 
      style={{ padding: headerPadding }}
      className="fixed w-full z-50 transition-all duration-500"
    >
      <div className="container px-4 sm:px-6">
        <motion.nav 
          style={{ 
            padding: navPadding,
            backgroundColor: `rgba(255, 255, 255, ${scrolled ? 0.8 : 0.4})`,
            boxShadow: `0 20px 40px rgba(0, 0, 0, ${scrolled ? 0.06 : 0})`
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass flex items-center justify-between rounded-2xl md:rounded-3xl relative border border-white/40"
        >
          <NavLink to="/" className="flex items-center gap-4 group">
            <motion.img 
              style={{ scale: logoScale }}
              whileHover={{ rotate: 5 }}
              src="/assets/images/madhuban_logo (2) (1).png" 
              alt="Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm" 
            />
            <motion.span 
               style={{ scale: logoScale }}
               className="text-primary font-bold text-xl tracking-widest ml-1"
            >
               {t('nav.madhuban')}
            </motion.span>
          </NavLink>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 ml-8 xl:ml-12 h-full">
            {navLinks.map((link) => {
              const isActive = link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path);
              return (
                <motion.li 
                  key={link.name} 
                  className="list-none relative flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={link.path} 
                    className={`relative px-6 py-3 lg:px-8 lg:py-4 text-sm font-extrabold uppercase tracking-[0.2em] transition-colors rounded-full ${isActive ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary shadow-lg rounded-full -z-10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? 'text-white' : ''}`}>{link.name}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center ml-auto gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDark(!isDark)}
              className="flex items-center justify-center w-10 h-10 bg-white/50 hover:bg-white text-slate-700 transition-all rounded-full shadow-sm border border-slate-200"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl transition-all font-bold text-xs tracking-widest rounded-full shadow-md border border-white/20"
            >
              <Languages size={14} className="opacity-90" />
              <span>{language === 'en' ? 'मराठी' : 'ENG'}</span>
            </motion.button>
            <NavLink to="/donate">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary shadow-lg ml-2"
              >
                {t('nav.support')}
              </motion.button>
            </NavLink>
          </div>
          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-4 lg:hidden">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-slate-600 bg-black/5 rounded-full"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button 
              onClick={toggleLanguage}
              className="flex items-center p-2 text-white bg-gradient-to-r from-primary to-primary-light rounded-full shadow-md"
            >
              <Languages size={16} />
            </button>
            <NavLink to="/donate">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary text-[10px] px-4 py-2"
              >
                {t('nav.support')}
              </motion.button>
            </NavLink>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl hover:bg-white/20 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
              </motion.div>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed top-24 left-4 right-4 glass p-6 sm:p-8 flex flex-col gap-4 sm:gap-6 rounded-3xl z-50 shadow-2xl border border-white/50"
          >
            {navLinks.map((link) => {
              const isActive = link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path);
              return (
                <Link 
                  key={link.name}
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="relative text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors text-center py-3 px-4 rounded-xl overflow-hidden"
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-pill"
                      className="absolute inset-0 bg-primary rounded-xl -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors ${isActive ? 'text-white' : 'text-slate-500 hover:text-primary'}`}>{link.name}</span>
                </Link>
              );
            })}
            <div className="border-t border-primary/20 my-2"></div>
            <NavLink 
              to="/donate"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              <button className="btn btn-primary w-full py-3 sm:py-4 text-[10px] sm:text-xs uppercase tracking-widest">{t('nav.support')}</button>
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
