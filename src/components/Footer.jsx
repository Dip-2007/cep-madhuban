import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Heart, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-cream text-slate-500 pt-32 pb-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container">
        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-16 lg:gap-20 mb-20 md:mb-32"
        >
          {/* Brand Concept */}
          <motion.div variants={itemVars} className="md:col-span-1 lg:col-span-5">
            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-10">
              <img src="/assets/images/madhuban_logo (2) (1).png" alt="Logo" className="w-12 md:w-16 h-12 md:h-16 brightness-200 rounded-full" />
              <div>
                <h3 className="text-slate-900 text-xl md:text-2xl font-light tracking-widest-sm uppercase">Madhuban</h3>
                <span className="text-sm font-bold text-primary tracking-widest-lg uppercase">Sanstha Pune</span>
              </div>
            </div>
            <p className="text-sm md:text-base lg:text-lg font-light leading-relaxed mb-8 md:mb-12 max-w-md text-slate-400">
               Architecturing a legacy of inclusion and profound care <br /> for the extraordinary souls of Pune since 2011.
            </p>
            <div className="flex gap-6 md:gap-8">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, color: '#d4af37' }}
                  className="p-2 md:p-3 rounded-full border border-white-faded hover:border-primary/30 transition-all duration-500"
                >
                   <Icon size={16} strokeWidth={1} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Intelligent Links */}
          <motion.div variants={itemVars} className="md:col-span-1 lg:col-span-3">
             <h4 className="text-slate-900 text-sm font-bold uppercase tracking-widest-lg mb-6 md:mb-12 opacity-80">Discovery</h4>
             <ul className="space-y-4 md:space-y-6">
                {footerLinks.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.path} 
                      className="text-xs md:text-sm font-light hover:text-white transition-all flex items-center justify-between group"
                    >
                      {item.name}
                      <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
             </ul>
          </motion.div>

          {/* Social Impact CTA */}
          <motion.div variants={itemVars} className="md:col-span-1 lg:col-span-4">
             <div className="glass p-6 md:p-8 lg:p-10 rounded-2xl lg:rounded-3xl border-white-faded relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-primary-muted blur-3xl group-hover:bg-primary/40 transition-all duration-700"></div>
                <h4 className="text-slate-900 text-lg md:text-2xl font-light mb-4 md:mb-6 relative z-10">Ready to <span className="italic text-primary">Collaborate?</span></h4>
                <p className="text-xs md:text-sm font-light mb-6 md:mb-10 relative z-10 leading-relaxed text-slate-400">
                  Whether you wish to volunteer or offer support, every contribution fuels our mission of transformation.
                </p>
                <Link to="/contact" className="btn bg-white text-black w-full hover:bg-slate-200 text-tiny md:text-xs-plus tracking-widest relative z-10 transition-all duration-500">
                   Support the Mission
                </Link>
             </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 md:pt-12 border-t border-white-faded text-xs-plus md:text-sm font-bold tracking-widest-md md:tracking-widest-lg uppercase gap-4"
        >
          <p className="text-slate-600">© {new Date().getFullYear()} Madhuban. Built with Purpose.</p>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
             <span className="flex items-center gap-2 md:gap-3 text-slate-600">
               In Service of Others <Heart size={10} className="text-primary fill-primary" />
             </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
