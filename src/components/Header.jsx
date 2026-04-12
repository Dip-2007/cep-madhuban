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
               className="text-primary font-bold text-xl tracking-widest ml-1 hidden sm:block"
            >
               {t('nav.madhuban')}
            </motion.span>
          </NavLink>

          {/* Desktop Menu */}
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

          <div className="flex items-center ml-auto gap-2 sm:gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDark(!isDark)}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/50 hover:bg-white text-slate-700 transition-all rounded-full shadow-sm border border-slate-200"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl transition-all font-bold text-[10px] sm:text-xs tracking-widest rounded-full shadow-md border border-white/20"
            >
              <Languages size={14} className="opacity-90" />
              <span>{language === 'en' ? 'मराठी' : 'ENG'}</span>
            </motion.button>
            <NavLink to="/donate" className="hidden sm:block">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary shadow-lg ml-2 py-2 px-5 text-xs sm:text-sm"
              >
                {t('nav.support')}
              </motion.button>
            </NavLink>
            <button 
              className="lg:hidden p-2 text-slate-700 bg-white/50 hover:bg-white rounded-full transition-colors focus:outline-none border border-slate-200 shadow-sm ml-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden absolute top-full left-4 right-4 mt-4 glass bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 shadow-premium border border-white/40 flex flex-col gap-2 z-50 origin-top"
            >
              {navLinks.map((link) => {
                const isActive = link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path);
                return (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    onClick={() => setIsOpen(false)} 
                    className={`px-6 py-4 text-base font-bold tracking-[0.1em] uppercase rounded-2xl transition-all flex items-center ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="w-full h-px bg-slate-200 dark:bg-slate-700/50 my-4"></div>
              <Link to="/donate" onClick={() => setIsOpen(false)} className="btn btn-primary w-full justify-center py-4 rounded-2xl shadow-lg">
                {t('nav.support')}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.header>
  );
};

export default Header;
