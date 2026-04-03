import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Award, Users } from 'lucide-react';

const About = () => {
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
          className="max-w-4xl mb-32"
        >
          <motion.span variants={fadeInUp} className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-10 block">Our Story</motion.span>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-7xl font-light text-text leading-tight mb-12">
            A Legacy of <br />
            <span className="italic font-normal text-primary">Unconditional Compassion</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted font-light leading-relaxed max-w-3xl">
            Established with a vision to redefine inclusion, Madhuban has evolved into a sanctuary of hope for the differently-abled community in Pune.
          </motion.p>
        </motion.div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-center mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="md:col-span-7"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-700"></div>
              <img 
                src="/assets/images/about-placeholder.jpg" 
                alt="Founder" 
                className="relative rounded-2xl shadow-premium grayscale hover:grayscale-0 transition-all duration-1000" 
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-10 shadow-premium rounded-xl hidden lg:block">
                <p className="text-primary font-bold text-[10px] uppercase tracking-widest mb-2">The Visionary</p>
                <h4 className="text-2xl font-light">Mrs. Madhuri Gaikwad</h4>
                <p className="text-muted text-sm italic">Founder President</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="md:col-span-5 space-y-12"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-light text-primary italic">The Mission</h3>
              <p className="text-muted leading-relaxed font-light text-lg">
                Madhuban Mentally and Physically Handicapped Social Organization works tirelessly for the education and rehabilitation of disabled children and adults. 
              </p>
              <p className="text-muted leading-relaxed font-light">
                From infancy to adulthood, we provide a structured support system for those with blindness, deafness, cerebral palsy, and multiple disabilities. Our registered trust is committed to dismantling social barriers.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
               {[
                 { icon: Heart, label: 'Dignified Care' },
                 { icon: Target, label: 'Structured Growth' },
                 { icon: Award, label: 'Professional Support' },
                 { icon: Users, label: 'Inclusive Community' }
               ].map((item, i) => (
                 <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 p-4 rounded-xl hover:bg-primary/5 transition-all text-primary"
                 >
                    <item.icon size={20} strokeWidth={1.5} />
                    <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                 </motion.div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* Vision Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="text-center bg-primary text-white p-20 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-light mb-10 leading-tight">Architecture of <span className="italic">Dignity</span></h2>
            <p className="text-xl md:text-3xl font-light italic leading-relaxed max-w-4xl mx-auto opacity-80">
              "To create a world where every individual, regardless of their path, is recognized for their infinite worth and potential for purpose."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
