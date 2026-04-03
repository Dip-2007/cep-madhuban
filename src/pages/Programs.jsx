import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Home, Activity, Stethoscope, BookOpen, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Programs = () => {
  const programs = [
    { 
      title: 'Special Care Sanctuary', 
      desc: 'Nurturing daycare environment tailored for the unique developmental paths of intellectually disabled children.',
      icon: Sun,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    { 
      title: 'Residential Living', 
      desc: 'Architecturally designed separate hostels for boys and girls, providing a safe and dignified 24/7 home.',
      icon: Home,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    { 
      title: 'Rehabilitation Journey', 
      desc: 'Expert physiotherapy, speech therapy, and psychological counseling to empower physical and mental wellness.',
      icon: Activity,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    { 
      title: 'Medical Assistance', 
      desc: 'Direct access to specialized medical support and regular health monitoring for our residents.',
      icon: Stethoscope,
      color: 'text-rose-600',
      bg: 'bg-rose-50'
    },
    { 
      title: 'Adaptive Education', 
      desc: 'Tailored learning programs that recognize diverse learning styles and celebrate every milestone.',
      icon: BookOpen,
      color: 'text-violet-600',
      bg: 'bg-violet-50'
    },
    { 
      title: 'Economic Empowerment', 
      desc: 'Vocational training and workshops designed to equip adults with skills for independent living.',
      icon: Users,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    }
  ];

  return (
    <div className="programs-v2 pt-40 pb-32">
      <div className="container">
        <div className="max-w-4xl mb-32">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-10 block"
          >
            Our Methodology
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-7xl font-light text-text leading-tight mb-12"
          >
            Dedicated to <br />
            <span className="italic font-normal text-primary">Harmonious Growth</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl text-muted font-light max-w-2xl"
          >
            A comprehensive suite of programs designed to nurture every dimension of the human experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((prog, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="glass p-12 rounded-2xl group transition-all duration-500 hover:shadow-premium"
            >
              <div className={`w-16 h-16 rounded-xl ${prog.bg} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                <prog.icon className={prog.color} size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-light mb-6 group-hover:text-primary transition-colors">{prog.title}</h3>
              <p className="text-muted leading-relaxed font-light mb-10">
                {prog.desc}
              </p>
              <div className="flex items-center justify-between">
                <div className="w-12 h-px bg-primary/20 group-hover:w-full transition-all duration-700"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-32 glass p-20 bg-primary rounded-3xl text-white text-center"
        >
          <h2 className="text-4xl font-light mb-8">Begin the Collaboration</h2>
          <p className="text-white/60 mb-12 max-w-xl mx-auto font-light text-lg">
            Whether you seek care for a loved one or wish to join our mission as a volunteer, we welcome you.
          </p>
          <Link to="/contact" className="btn bg-white text-primary hover:bg-slate-50 border-none px-12">
            Speak with our team
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Programs;
