import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Dynamic transforms based on scroll
  const headerPadding = useTransform(scrollY, [0, 100], ['1.5rem 0', '0.75rem 0']);
  const navPadding = useTransform(scrollY, [0, 100], ['1rem 2rem', '0.6rem 1.5rem']);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
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
          className="glass flex items-center justify-between rounded-2xl relative"
        >
          <NavLink to="/" className="flex items-center gap-4 group">
            <motion.img 
              style={{ scale: logoScale }}
              whileHover={{ rotate: 5 }}
              src="/assets/images/madhuban_logo (2) (1).png" 
              alt="Logo" 
              className="w-12 h-12 object-contain rounded-full bg-transparent" 
            />
            <motion.span 
               style={{ scale: logoScale }}
               className="text-primary font-bold text-lg tracking-widest uppercase hidden sm:block"
            >
               Madhuban
            </motion.span>
          </NavLink>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-12 ml-auto mr-10 lg:mr-16">
            {navLinks.map((link) => (
              <li key={link.name} className="list-none">
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => 
                    `text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-all hover:text-primary relative group flex items-center ${isActive ? 'text-primary' : 'text-text-muted'}`
                  }
                >
                  {link.name}
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full"
                    layoutId={link.name === 'Home' ? 'underline' : ''}
                  ></motion.span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:block ml-8 lg:ml-12">
            <NavLink to="/donate">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary shadow-lg"
              >
                Support Us
              </motion.button>
            </NavLink>
          </div>
          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <NavLink to="/donate">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary text-[10px] px-4 py-2"
              >
                Support
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
            className="md:hidden fixed top-24 left-4 right-4 glass p-6 sm:p-8 flex flex-col gap-4 sm:gap-6 rounded-2xl z-50"
          >
            {navLinks.map((link) => (
              <NavLink 
                key={link.name}
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-xs sm:text-sm font-bold uppercase tracking-widest text-text-muted hover:text-primary transition-colors text-center py-2"
              >
                {link.name}
              </NavLink>
            ))}
            <div className="border-t border-primary/20 my-2"></div>
            <NavLink 
              to="/donate"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              <button className="btn btn-primary w-full py-3 sm:py-4 text-[10px] sm:text-xs uppercase tracking-widest">Support Us</button>
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
