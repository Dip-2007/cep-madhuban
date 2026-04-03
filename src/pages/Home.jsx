import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Sparkles, Shield, Compass } from 'lucide-react';

const Home = () => {
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
      <section className="relative h-screen flex items-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/assets/images/img-5.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="blob" style={{ top: '-10%', right: '-10%' }}></div>
        <div className="blob" style={{ bottom: '-10%', left: '-10%', background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}></div>

        <div className="container relative z-10">
          <motion.div 
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.span variants={itemVars} className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-8 bg-primary/5 px-6 py-2 rounded-full">
              Established since 2011
            </motion.span>
            
            <motion.h1 variants={itemVars} className="text-4xl md:text-7xl mb-8 font-light text-text leading-[1.05]">
              Empowering <br />
              <span className="italic font-normal text-primary">Every Ability</span> <br />
              with Pure Heart
            </motion.h1>

            <motion.p variants={itemVars} className="text-lg md:text-xl text-muted mb-12 max-w-xl leading-relaxed font-light">
              We architecturalizing inclusion through dedicated education, rehabilitation, and compassionate welfare for the differently-abled in Pune.
            </motion.p>

            <motion.div variants={itemVars} className="flex flex-wrap gap-6">
              <Link to="/contact" className="btn btn-primary group px-10">
                Join our mission
                <motion.span 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight size={14} className="ml-3" />
                </motion.span>
              </Link>
              <Link to="/about" className="btn btn-outline px-10">
                Discover Story
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-12 bg-primary/20"
          ></motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding relative bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: Sparkles, title: 'Pure Intention', desc: 'Every action we take is driven by unconditional love and the pursuit of human dignity.' },
              { icon: Shield, title: 'Safe Sanctuary', desc: 'Providing a nurturing environment where every individual feels protected and valued.' },
              { icon: Compass, title: 'Guiding Path', desc: 'Navigating the complexities of rehabilitation with professional expertise and empathy.' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="text-center group p-8 rounded-2xl transition-all"
              >
                <div className="w-20 h-20 mx-auto flex items-center justify-center bg-background rounded-full mb-8 group-hover:bg-primary/5 transition-colors">
                  <item.icon className="text-primary" size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl mb-4 font-medium uppercase tracking-wider">{item.title}</h3>
                <p className="text-muted font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Impact - Bento Layout */}
      <section className="section-padding bg-[#faf9f6]">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-bold text-[10px] tracking-widest uppercase mb-4 block">Our Impact</span>
              <h2 className="text-4xl md:text-5xl font-light leading-tight">Architecture of <span className="text-primary italic">Transformation</span></h2>
            </div>
            <Link to="/programs" className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-3 group">
              Explore All Programs <div className="w-10 h-px bg-primary transition-all group-hover:w-16"></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[600px]">
             <motion.div 
                whileHover={{ scale: 0.98 }}
                className="md:col-span-8 glass rounded-2xl overflow-hidden relative group"
             >
                <img src="/assets/images/img-1.jpg" alt="Impact" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-12">
                   <h3 className="text-white text-3xl font-light mb-2">Holistic Development</h3>
                   <p className="text-white/70 font-light">Nurturing the physical, emotional, and social growth of every child.</p>
                </div>
             </motion.div>
             <div className="md:col-span-4 grid grid-rows-2 gap-6">
                <div className="glass p-10 flex flex-col justify-center bg-primary text-white rounded-2xl">
                   <h4 className="text-5xl font-light mb-2">500+</h4>
                   <p className="text-white/60 uppercase text-[10px] tracking-[0.2em]">Lives Transformed</p>
                </div>
                <div className="glass p-10 flex flex-col justify-center border-primary/20 rounded-2xl">
                   <h4 className="text-5xl font-light text-primary mb-2">10+</h4>
                   <p className="text-muted uppercase text-[10px] tracking-[0.2em]">Years of Dedication</p>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
