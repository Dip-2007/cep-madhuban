import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Award, Users } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useTranslation();
  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="about-v2 pt-40 pb-32">
      <div className="container">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mb-16 sm:mb-24 md:mb-32"
        >
          <motion.span variants={fadeInUp} className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-6 sm:mb-10 block">{t('about.header.badge')}</motion.span>
          <motion.h1 variants={fadeInUp} className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-text leading-tight mb-6 sm:mb-12">
            {t('about.header.titlePart1')} <br />
            <span className="italic font-normal text-primary">{t('about.header.titlePart2')}</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted font-light leading-relaxed max-w-3xl">
            {t('about.header.description')}
          </motion.p>
        </motion.div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-16 md:gap-24 items-start mb-24 md:mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-700"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-premium">
                <img 
                  src="/assets/images/founder-president.jpg" 
                  alt={t('about.narrative.founderName')} 
                  className="w-full h-auto min-h-[400px] sm:min-h-[500px] object-cover hover:scale-105 transition-transform duration-1000" 
                />
              </div>
            </div>

            <div className="mt-8 bg-white p-8 md:p-10 shadow-premium rounded-2xl border-l-[6px] border-primary relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                <span className="text-primary font-bold text-[10px] uppercase tracking-widest-lg opacity-80">{t('about.narrative.founderTitle')}</span>
              </div>
              <h4 className="text-3xl sm:text-4xl font-light text-slate-900 mb-2 leading-tight tracking-tight">{t('about.narrative.founderName')}</h4>
              <p className="text-primary/70 text-sm font-medium italic tracking-wide">{t('about.narrative.founderRole')}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="md:col-span-7 space-y-8 sm:space-y-12"
          >
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl font-light text-primary italic">{t('about.narrative.missionTitle')}</h3>
              <p className="text-sm sm:text-base md:text-lg text-muted leading-relaxed font-light">
                {t('about.narrative.missionP1')}
              </p>
              <p className="text-sm sm:text-base text-muted leading-relaxed font-light">
                {t('about.narrative.missionP2')}
              </p>
            </div>

            <div className="mt-12 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-light text-primary italic">{t('about.narrative.featuresTitle')}</h3>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted leading-relaxed font-light list-disc pl-5">
                {t('about.narrative.features').map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Vision Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="text-center bg-primary text-white p-8 sm:p-12 md:p-20 rounded-2xl sm:rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-light mb-10 leading-tight">{t('about.vision.titlePart1')} <span className="italic">{t('about.vision.titlePart2')}</span></h2>
            <p className="text-xl md:text-3xl font-light italic leading-relaxed max-w-4xl mx-auto opacity-80">
              {t('about.vision.desc')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
