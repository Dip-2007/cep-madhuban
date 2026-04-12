import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Sparkles, Shield, Compass, Loader2 } from 'lucide-react';
import { useWebsiteContent } from '../hooks/useWebsiteContent';
import { useTranslation } from '../contexts/LanguageContext';

/* ── Animated Counter Component ── */
const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  const startCounting = () => {
    if (started.current) return;
    started.current = true;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <motion.span
      onViewportEnter={startCounting}
      viewport={{ once: true, margin: '-50px' }}
    >
      {count}{suffix}
    </motion.span>
  );
};

/* ── Floating Particles ── */
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(6, 78, 59, ${0.08 + Math.random() * 0.12})`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const { content, isLoading } = useWebsiteContent();
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax values
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroBlobScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -30]);



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
      transition: { staggerChildren: 0.25, delayChildren: 0.3 },
    },
  };

  const itemVars = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cardVars = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <div className="home-v2">
      {/* ── Immersive Hero ── */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-32 overflow-hidden bg-background"
      >
        <FloatingParticles />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(6,78,59,0.06) 0%, transparent 70%)',
            top: '-10%',
            right: '-5%',
            scale: heroBlobScale,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 350,
            height: 350,
            background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
            bottom: '5%',
            left: '-3%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Column: Text Content */}
            <motion.div
              variants={containerVars}
              initial="hidden"
              animate="visible"
              style={{ y: heroTextY }}
              className="max-w-2xl text-center lg:text-left"
            >
              <motion.span
                variants={itemVars}
                className="inline-block text-lg font-bold tracking-widest-md uppercase text-primary mb-10 bg-primary-soft px-8 py-3 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                {content?.home?.hero?.badge || t('home.hero.badge')}
              </motion.span>

              <motion.h1
                variants={itemVars}
                className="hero-title text-5xl sm:text-6xl lg:text-7xl mb-8 lg:mb-12 font-light text-text leading-tightest"
              >
                {content?.home?.hero?.title || t('home.hero.title')}
              </motion.h1>

              <motion.p
                variants={itemVars}
                className="text-xl text-muted mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                {content?.home?.hero?.description || t('home.hero.description')}
              </motion.p>

              <motion.div
                variants={itemVars}
                className="flex justify-center lg:justify-start gap-6"
              >
                <Link
                  to="/contact"
                  className="btn btn-primary group"
                >
                  {t('home.hero.join')}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="inline-block ml-2"
                  >
                    <ArrowRight size={14} />
                  </motion.span>
                </Link>
                <Link
                  to="/about"
                  className="btn btn-outline"
                >
                  {t('home.hero.discover')}
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column: Hero Image with parallax */}
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[75vh]"
              style={{ y: heroImageY }}
            >
              {/* Animated blob underneath */}
              <motion.div
                className="absolute -inset-4 bg-primary-soft rounded-3xl md:rounded-[3rem] opacity-70"
                style={{ filter: 'blur(24px)' }}
                animate={{
                  scale: [1, 1.03, 1],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="w-full h-full rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <motion.img
                  src="/assets/images/img-5.png"
                  alt="Madhuban Impact"
                  className="w-full h-full object-cover rounded-3xl md:rounded-[2.5rem]"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Philosophy Section ── */}
      <section className="section-padding relative bg-white overflow-hidden">
        {/* Subtle decorative line */}
        <motion.div
          className="absolute top-0 left-1/2 w-px bg-slate-200"
          initial={{ height: 0, x: '-50%' }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ opacity: 0.5 }}
        />

        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {[
              {
                icon: Sparkles,
                title: t('home.philosophy.sparkles.title'),
                desc: t('home.philosophy.sparkles.desc'),
              },
              {
                icon: Shield,
                title: t('home.philosophy.shield.title'),
                desc: t('home.philosophy.shield.desc'),
              },
              {
                icon: Compass,
                title: t('home.philosophy.compass.title'),
                desc: t('home.philosophy.compass.desc'),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVars}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -12, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                className="text-center group p-8 rounded-2xl transition-all"
              >
                <motion.div
                  className="w-20 h-20 mx-auto flex items-center justify-center bg-background rounded-full mb-8 group-hover:bg-primary/5 transition-colors"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <item.icon className="text-primary" size={24} strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-xl mb-4 font-bold uppercase tracking-widest-sm">
                  {item.title}
                </h3>
                <p className="text-base text-muted font-light leading-relaxed max-w-sm mx-auto">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Impact - Bento Layout with Counting Animation ── */}
      <section className="section-padding bg-cream overflow-hidden">
        <div className="container">
          <div className="flex justify-between items-end mb-20">
            <motion.div
              className="max-w-2xl"
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-primary font-bold text-[10px] tracking-widest uppercase mb-4 block">
                {t('home.impact.label')}
              </span>
              <h2 className="text-5xl font-light leading-tight">
                {t('home.impact.titlePart1')}{' '}
                <span className="text-primary italic">{t('home.impact.titlePart2')}</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                to="/programs"
                className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-3 group"
              >
                {t('home.impact.explore')}{' '}
                <div className="w-16 h-px bg-primary transition-all group-hover:w-24"></div>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { end: 12, suffix: '+', label: t('home.impact.years'), duration: 2000 },
              { end: 500, suffix: '+', label: t('home.impact.lives'), duration: 2500 },
              { end: 50, suffix: '+', label: t('home.impact.families'), duration: 1800 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="glass py-12 px-12 flex flex-col justify-center items-center bg-primary text-white rounded-2xl cursor-default text-center"
              >
                <h4 className="text-5xl font-light mb-2">
                  <AnimatedCounter end={item.end} suffix={item.suffix} duration={item.duration} />
                </h4>
                <p className="text-white/70 uppercase text-xs tracking-widest-lg">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
