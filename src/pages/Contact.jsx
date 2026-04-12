import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Globe } from 'lucide-react';
import { sanitizeInput } from '../utils/security';
import { useTranslation } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      // For now, this will just log the data
      // When backend is ready, uncomment the API call below
      console.log('Contact form submission:', formData);

      // Uncomment this when backend is ready:
      /*
      const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setSubmitStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: data.error });
      }
      */

      // Temporary success message
      setSubmitStatus({ 
        type: 'success', 
        message: t('contact.form.success')
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: t('contact.form.error')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-v2 pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32">
      <div className="container">
        <div className="max-w-4xl mb-12 sm:mb-24 md:mb-32">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-6 sm:mb-10 block"
          >
            {t('contact.header.badge')}
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-text leading-tight mb-6 sm:mb-12"
          >
            {t('contact.header.titlePart1')} <br />
            <span className="italic font-normal text-primary">{t('contact.header.titlePart2')}</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted font-light max-w-2xl"
          >
            {t('contact.header.description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-start">
          {/* Contact Form Column */}
          <motion.div 
             variants={containerVars}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="lg:col-span-5"
          >
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Name Field */}
              <motion.div variants={itemVars} className="flex flex-col">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3 sm:mb-4">{t('contact.form.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-white border border-slate-300 px-4 sm:px-6 py-4 sm:py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base text-text placeholder:text-slate-400 min-h-[54px]"
                  placeholder={t('contact.form.namePlaceholder')}
                  autoComplete="name"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVars} className="flex flex-col">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3 sm:mb-4">{t('contact.form.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white border border-slate-300 px-4 sm:px-6 py-4 sm:py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base text-text placeholder:text-slate-400 min-h-[54px]"
                  placeholder="john@example.com"
                  autoComplete="email"
                />
              </motion.div>

              {/* Phone Field */}
              <motion.div variants={itemVars} className="flex flex-col">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3 sm:mb-4">{t('contact.form.phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-white border border-slate-300 px-4 sm:px-6 py-4 sm:py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base text-text placeholder:text-slate-400 min-h-[54px]"
                  placeholder="9876543210"
                  autoComplete="tel"
                />
              </motion.div>

              {/* Subject Field */}
              <motion.div variants={itemVars} className="flex flex-col">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3 sm:mb-4">{t('contact.form.subject')}</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-white border border-slate-300 px-4 sm:px-6 py-4 sm:py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base text-text placeholder:text-slate-400 min-h-[54px]"
                  placeholder={t('contact.form.subjectPlaceholder')}
                  autoComplete="off"
                />
              </motion.div>

              {/* Message Field */}
              <motion.div variants={itemVars} className="flex flex-col">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3 sm:mb-4">{t('contact.form.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="bg-white border border-slate-300 px-4 sm:px-6 py-3 sm:py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base sm:text-base text-text placeholder:text-slate-400 resize-vertical min-h-32"
                  placeholder={t('contact.form.messagePlaceholder')}
                  autoComplete="off"
                />
              </motion.div>

              {/* Submit Status Messages */}
              {submitStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-sm ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                variants={itemVars}
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('contact.form.sending') : t('contact.form.sendBtn')}
                <Send size={14} className="ml-2" />
              </motion.button>
            </form>
          </motion.div>

          {/* Details & Map Column */}
          <motion.div 
             variants={containerVars}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="lg:col-span-7 space-y-8 sm:space-y-12"
          >
            {/* Contact Details */}
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-8">
                {[
                   { icon: MapPin, label: t('contact.details.hq'), detail: 'House No. 82, Jai Shankar Colony, Lane 03, Survey No. 67/3, Near Old Water Tank, Santosh Nagar, Katraj, Pune - 411046' },
                   { icon: Phone, label: t('contact.details.tel'), detail: '9028904787' },
                   { icon: Mail, label: t('contact.details.mail'), detail: 'madhuban02020@gmail.com' },
                   { icon: Clock, label: t('contact.details.hours'), detail: t('contact.details.hoursTime') }
                ].map((item, i) => (
                   <motion.div key={i} variants={itemVars} className="flex gap-4 sm:gap-6 md:gap-8 group">
                      <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white border border-slate-100 shadow-subtle flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                         <item.icon size={20} strokeWidth={1} />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary mb-1 sm:mb-2">{item.label}</h4>
                         <p className="text-xs sm:text-sm md:text-base text-text font-light leading-relaxed">{item.detail}</p>
                      </div>
                   </motion.div>
                ))}
              </div>
            </div>

            {/* Map */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="glass rounded-2xl sm:rounded-3xl overflow-hidden h-64 sm:h-80 md:h-[350px] shadow-premium relative group">
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
