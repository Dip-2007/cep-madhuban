import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Sparkles, Shield, Compass, Loader2 } from 'lucide-react';
import { useWebsiteContent } from '../hooks/useWebsiteContent';

const Home = () => {
  const { content, isLoading } = useWebsiteContent();
  
  // Show loading state while content is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading content...</p>
        </div>
      </div>
    );
  }
  
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 }
    }
  };

  const itemVars = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="home-v2">
      {/* Immersive Hero */}
      <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-32 overflow-hidden bg-background">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div 
              variants={containerVars}
              initial="hidden"
              animate="visible"
              className="max-w-2xl text-center lg:text-left"
            >
              <motion.span variants={itemVars} className="inline-block text-tiny font-bold tracking-widest-md uppercase text-primary mb-4 sm:mb-6 bg-primary-soft px-4 sm:px-6 py-2 rounded-full">
                २०११ पासून कार्यरत
              </motion.span>
              
              <motion.h1 variants={itemVars} className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl mb-6 font-light text-text leading-tightest">
                {content?.home?.hero?.title || 'प्रत्येक व्यक्तीला सक्षम करणे'}
              </motion.h1>

              <motion.p variants={itemVars} className="text-base sm:text-lg md:text-xl text-muted mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                {content?.home?.hero?.description || 'आम्ही पुणे येथील दिव्यांगांसाठी समर्पित शिक्षण, पुनर्वसन आणि करुणामय कल्याणाद्वारे समावेशकता निर्माण करत आहोत.'}
              </motion.p>

              <motion.div variants={itemVars} className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
                <Link to="/contact" className="btn btn-primary group px-6 sm:px-8 text-tiny sm:text-xs-plus">
                  आमच्या कार्यात सहभागी व्हा
                  <motion.span 
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight size={12} className="ml-2 sm:ml-3" />
                  </motion.span>
                </Link>
                <Link to="/about" className="btn btn-outline px-6 sm:px-8 text-tiny sm:text-xs-plus border-slate-300 text-slate-700 hover:border-primary hover:text-white">
                  आमची कथा वाचा
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column: Hero Image */}
            <motion.div 
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[75vh]"
            >
              {/* Subtle design blob underneath the image */}
              <div className="absolute -inset-4 bg-primary-soft rounded-3xl md:rounded-[3rem] blur-xl opacity-70"></div>
              
              <div className="w-full h-full rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                 <img 
                   src="/assets/images/img-5.png" 
                   alt="Madhuban Impact" 
                   className="w-full h-full object-cover rounded-3xl md:rounded-[2.5rem]"
                 />
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding relative bg-white">
        <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {[
              { icon: Sparkles, title: 'शुद्ध हेतू', desc: 'आमची प्रत्येक कृती बिनशर्त प्रेमाने आणि मानवी प्रतिष्ठेच्या शोधाने प्रेरित आहे.' },
              { icon: Shield, title: 'सुरक्षित आश्रयस्थान', desc: 'प्रत्येक व्यक्तीला सुरक्षित आणि मौल्यवान वाटेल असे पोषक वातावरण प्रदान करणे.' },
              { icon: Compass, title: 'मार्गदर्शक पथ', desc: 'व्यावसायिक तज्ञांच्या मदतीने आणि सहानुभूतीने पुनर्वसनाचे कार्य करणे.' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="text-center group p-4 sm:p-8 rounded-2xl transition-all"
              >
                <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto flex items-center justify-center bg-background rounded-full mb-4 sm:mb-8 group-hover:bg-primary/5 transition-colors">
                  <item.icon className="text-primary" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 font-medium uppercase tracking-wider">{item.title}</h3>
                <p className="text-sm sm:text-base text-muted font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Impact - Bento Layout */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-bold text-[10px] tracking-widest uppercase mb-3 md:mb-4 block">आमचा प्रभाव</span>
              <h2 className="text-xl sm:text-4xl md:text-5xl font-light leading-tight">परिवर्तनाची <span className="text-primary italic">रूपरेषा</span></h2>
            </div>
            <Link to="/programs" className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 md:gap-3 group mt-4 md:mt-0">
              सर्व कार्यक्रम पहा <div className="w-8 md:w-10 h-px bg-primary transition-all group-hover:w-12 md:group-hover:w-16"></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
             <div className="glass py-8 sm:py-10 px-6 sm:px-16 flex flex-col justify-center items-center bg-primary text-white rounded-2xl">
                <h4 className="text-3xl sm:text-4xl md:text-5xl font-light mb-2">12+</h4>
                <p className="text-white/60 uppercase text-tiny sm:text-xs-plus tracking-widest-xs sm:tracking-widest-sm">वर्षांचे समर्पण</p>
             </div>
             <div className="glass py-8 sm:py-10 px-6 sm:px-16 flex flex-col justify-center items-center bg-primary text-white rounded-2xl">
                <h4 className="text-3xl sm:text-4xl md:text-5xl font-light mb-2">500+</h4>
                <p className="text-white/60 uppercase text-tiny sm:text-xs-plus tracking-widest-xs sm:tracking-widest-sm">बदललेले जीवन</p>
             </div>
             <div className="glass py-8 sm:py-10 px-6 sm:px-16 flex flex-col justify-center items-center bg-primary text-white rounded-2xl">
                <h4 className="text-3xl sm:text-4xl md:text-5xl font-light mb-2">50+</h4>
                <p className="text-white/60 uppercase text-tiny sm:text-xs-plus tracking-widest-xs sm:tracking-widest-sm">मदत केलेली कुटुंबे</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
