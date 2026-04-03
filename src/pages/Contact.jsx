import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Globe } from 'lucide-react';

const Contact = () => {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="contact-v2 pt-40 pb-32">
      <div className="container">
        <div className="max-w-4xl mb-32">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-10 block"
          >
            Engagement
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-7xl font-light text-text leading-tight mb-12"
          >
            Initiate a <br />
            <span className="italic font-normal text-primary">Meaningful Dialogue</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl text-muted font-light max-w-2xl"
          >
            We believe every connection is a step towards a more inclusive tomorrow. Reach out to our dedicated team.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Details Column */}
          <motion.div 
             variants={containerVars}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="lg:col-span-5 space-y-12"
          >
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                {[
                   { icon: MapPin, label: 'Headquarters', detail: 'House No. 82, Jai Shankar Colony, Lane 03, Katraj, Pune - 411046' },
                   { icon: Phone, label: 'Direct Line', detail: '9028904787' },
                   { icon: Mail, label: 'Digital Mail', detail: 'madhuban02020@gmail.com' },
                   { icon: Clock, label: 'Engagement Hours', detail: 'Mon - Sat: 9:00 AM - 6:00 PM' }
                ].map((item, i) => (
                   <motion.div key={i} variants={itemVars} className="flex gap-8 group">
                      <div className="w-14 h-14 rounded-full bg-white border border-slate-100 shadow-subtle flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                         <item.icon size={22} strokeWidth={1} />
                      </div>
                      <div>
                         <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{item.label}</h4>
                         <p className="text-text font-light leading-relaxed">{item.detail}</p>
                      </div>
                   </motion.div>
                ))}
             </div>
          </motion.div>

          {/* Map Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="glass rounded-3xl overflow-hidden h-[500px] shadow-premium relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.123456789!2d73.858276!3d18.4441143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ebeee0ddc91b%3A0xb4f4a6a625dccb3f!2sHouse%20No.%2082%2C%20Jai%20Shankar%20Colony%2C%20Katraj%2C%20Pune%2C%20Maharashtra%20411046!5e0!3m2!1sen!2sin!4v1695900000000" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Madhuban NGO Location"
                className="grayscale group-hover:grayscale-0 transition-all duration-1000"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
