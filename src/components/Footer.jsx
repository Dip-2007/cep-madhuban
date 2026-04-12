import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Heart, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useTranslation();
  
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
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.programs'), path: '/programs' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.contact'), path: '/contact' },
    { name: t('nav.support'), path: '/donate' },
  ];

  return (
    <footer className="bg-primary text-white-80 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white-20 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-light-20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-10 blur-3xl rounded-full"></div>
      
      <div className="container relative z-10">
        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20"
        >
          {/* Brand Section */}
          <motion.div variants={itemVars} className="md:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-2 bg-white rounded-full shadow-lg">
                <img 
                  src="/assets/images/madhuban_logo (2) (1).png" 
                  alt="Madhuban Logo" 
                  className="w-12 h-12 object-contain" 
                />
              </div>
              <div>
                <h3 className="text-white text-xl font-bold tracking-tight uppercase leading-none mb-1">
                  {t('nav.madhuban')}
                </h3>
                <span className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase opacity-90">
                  {t('footer.brand.location')}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-8 max-w-sm text-white-70 font-light">
               {t('footer.brand.desc')}
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: "https://facebook.com" },
                { Icon: Instagram, href: "https://instagram.com" },
                { Icon: Youtube, href: "https://youtube.com" }
              ].map(({ Icon, href }, i) => (
                <motion.a 
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, color: '#d4af37', borderColor: '#d4af37' }}
                  className="p-2.5 rounded-xl border border-white-10 hover:bg-white-5 transition-all duration-300"
                >
                   <Icon size={18} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVars} className="md:col-span-1 lg:col-span-2">
             <h4 className="text-white text-sm font-bold uppercase tracking-widest-md mb-8">
               {t('footer.links.title')}
             </h4>
             <ul className="space-y-4">
                {footerLinks.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.path} 
                      className="text-sm font-light hover:text-accent transition-all flex items-center group"
                    >
                      <span className="w-0 group-hover:w-4 h-px bg-accent mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
             </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVars} className="md:col-span-1 lg:col-span-3">
             <h4 className="text-white text-sm font-bold uppercase tracking-widest-md mb-8">
               {t('contact.header.badge')}
             </h4>
             <ul className="space-y-5">
                <li className="flex items-start gap-4 text-sm font-light">
                  <div className="p-2 bg-white-5 rounded-lg text-accent">
                    <MapPin size={16} />
                  </div>
                  <span className="leading-relaxed">
                    Santosh Nagar, Katraj,<br />Pune, Maharashtra 411046
                  </span>
                </li>
                <li className="flex items-center gap-4 text-sm font-light">
                  <div className="p-2 bg-white-5 rounded-lg text-accent">
                    <Phone size={16} />
                  </div>
                  <a href="tel:+919822000000" className="hover:text-accent transition-colors">+91 98220 00000</a>
                </li>
                <li className="flex items-center gap-4 text-sm font-light">
                  <div className="p-2 bg-white-5 rounded-lg text-accent">
                    <Mail size={16} />
                  </div>
                  <a href="mailto:info@madhuban.org" className="hover:text-accent transition-colors">info@madhuban.org</a>
                </li>
             </ul>
          </motion.div>

          {/* Impact CTA */}
          <motion.div variants={itemVars} className="md:col-span-2 lg:col-span-3">
             <div className="bg-white-5 p-8 rounded-3xl border border-white-10 relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-10 blur-2xl rounded-full group-hover:bg-accent-20 transition-all duration-700"></div>
                <h4 className="text-white text-xl font-medium mb-4 relative z-10">
                  {t('footer.cta.titlePart1')} <span className="text-accent italic">{t('footer.cta.titlePart2')}</span>
                </h4>
                <p className="text-xs font-light mb-8 relative z-10 leading-relaxed text-white-600">
                  {t('footer.cta.desc')}
                </p>
                <Link to="/donate" className="inline-flex items-center justify-center w-full py-4 px-6 bg-accent hover:bg-accent-light text-primary font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-accent-10">
                   {t('footer.cta.btn')}
                </Link>
             </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white-10 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-white-400 text-center md:text-left">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6 text-[10px] md:text-xs font-bold tracking-widest uppercase">
             <span className="flex items-center gap-2 text-white-400">
               {t('footer.madeWith')} <Heart size={12} className="text-accent fill-accent" />
             </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
