import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Heart } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const Donate = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = React.useState(null);

  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const bankDetails = {
    accountName: 'Madhuban M.R. And C.P.Sanstha, Pune',
    accountType: 'Current Account',
    bankName: 'State Bank of India',
    accountNumber: '39153659164',
    ifscCode: 'SBIN0000454',
    gpayNumber: '9028904787'
  };

  return (
    <div className="donate-page pt-24 md:pt-40 pb-16 md:pb-32">
      <div className="container">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mb-16 md:mb-32 text-center mx-auto"
        >
          <motion.span 
            variants={fadeInUp} 
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-6 md:mb-10 block"
          >
            {t('donate.header.badge')}
          </motion.span>
          <motion.h1 
            variants={fadeInUp} 
            className="text-5xl md:text-7xl font-light text-text leading-tight mb-8 md:mb-12"
          >
            {t('donate.header.titlePart1')}<br />
            <span className="italic font-normal text-primary">{t('donate.header.titlePart2')}</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp} 
            className="text-xl md:text-2xl lg:text-3xl text-muted font-light leading-relaxed max-w-3xl mx-auto"
          >
            {t('donate.header.description')}
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          {/* Description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 sm:mb-16 text-center"
          >
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              {t('donate.description')}
            </p>
          </motion.div>

          {/* Payment Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* G Pay Option */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 sm:p-12 shadow-lg hover:shadow-xl transition-shadow duration-500 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <svg style={{ width: '24px', height: '24px', flexShrink: 0 }} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.2-.4-4.8H24v9h12.4c-.5 2.9-2.2 5.4-4.7 7.1v5.9h7.6c4.5-4.1 7.1-10.2 7.1-17.2z" />
                  <path fill="#34A853" d="M24 47c6.2 0 11.4-2.1 15.2-5.6l-7.6-5.9c-2 1.3-4.7 2.1-7.6 2.1-5.9 0-10.9-4-12.7-9.4H3.4v6C7.3 41.9 15 47 24 47z" />
                  <path fill="#FBBC05" d="M11.3 28.2c-.4-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2v-6H3.4A23.9 23.9 0 0 0 0 24c0 3.8.9 7.4 2.5 10.7l8.8-6.5z" />
                  <path fill="#EA4335" d="M24 9.6c3.4 0 6.4 1.2 8.8 3.5l6.6-6.6a23.4 23.4 0 0 0-15.4-6.5C15 0 7.3 5.1 3.4 12.8l7.9 6.2c1.8-5.4 6.8-9.4 12.7-9.4z" />
                </svg>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary">{t('donate.gpay.title')}</h2>
              </div>

              
              <div className="space-y-4">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-widest mb-3">
                    {t('donate.gpay.label')}
                  </p>
                  <div className="flex items-center justify-between bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <code className="font-mono text-sm sm:text-base font-bold text-text">
                      {bankDetails.gpayNumber}
                    </code>
                    <button
                      onClick={() => copyToClipboard(bankDetails.gpayNumber, 'gpay')}
                      className="ml-3 p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
                      title="Copy to clipboard"
                    >
                      <Copy 
                        className={`w-4 h-4 transition-colors duration-300 ${
                          copied === 'gpay' ? 'text-green-500' : 'text-primary'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                
                {/* QR Code Section */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
                  <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-widest mb-4">
                    Scan to Pay
                  </p>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 w-48 h-48 sm:w-56 sm:h-56 transition-transform duration-300 hover:scale-105">
                    <img 
                      src="/assets/images/payment-qr.jpg" 
                      alt="UPI Payment QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bank Account Option */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 sm:p-12 shadow-lg hover:shadow-xl transition-shadow duration-500 border border-gray-100"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">{t('donate.bank.title')}</h2>
              
              <div className="space-y-8 md:space-y-10">
                {/* Account Name */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-widest mb-3 sm:mb-4">
                    {t('donate.bank.nameLabel')}
                  </p>
                  <div className="flex items-center justify-between bg-primary/5 rounded-lg p-3 sm:p-4 border border-primary/10">
                    <span className="text-sm sm:text-base font-medium text-text">
                      {bankDetails.accountName}
                    </span>
                    <button
                      onClick={() => copyToClipboard(bankDetails.accountName, 'name')}
                      className="ml-3 sm:ml-4 p-2 sm:p-2.5 hover:bg-primary/10 rounded-lg transition-colors duration-300"
                      title="Copy to clipboard"
                    >
                      <Copy 
                        className={`w-4 h-4 transition-colors duration-300 ${
                          copied === 'name' ? 'text-green-600' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Account Type */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-widest mb-3 sm:mb-4">
                    {t('donate.bank.typeLabel')}
                  </p>
                  <p className="text-sm sm:text-base text-text font-medium bg-primary/5 rounded-lg p-3 sm:p-4 border border-primary/10">
                    {bankDetails.accountType}
                  </p>
                </div>

                {/* Bank Name */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-widest mb-3 sm:mb-4">
                    {t('donate.bank.bankLabel')}
                  </p>
                  <p className="text-sm sm:text-base text-text font-medium bg-primary/5 rounded-lg p-3 sm:p-4 border border-primary/10">
                    {bankDetails.bankName}
                  </p>
                </div>

                {/* Account Number */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-widest mb-3 sm:mb-4">
                    {t('donate.bank.numLabel')}
                  </p>
                  <div className="flex items-center justify-between bg-primary/5 rounded-lg p-3 sm:p-4 border border-primary/10">
                    <code className="font-mono text-sm sm:text-base font-bold text-text">
                      {bankDetails.accountNumber}
                    </code>
                    <button
                      onClick={() => copyToClipboard(bankDetails.accountNumber, 'account')}
                      className="ml-3 sm:ml-4 p-2 sm:p-2.5 hover:bg-primary/10 rounded-lg transition-colors duration-300"
                      title="Copy to clipboard"
                    >
                      <Copy 
                        className={`w-4 h-4 transition-colors duration-300 ${
                          copied === 'account' ? 'text-green-600' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* IFSC Code */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-widest mb-3 sm:mb-4">
                    {t('donate.bank.ifscLabel')}
                  </p>
                  <div className="flex items-center justify-between bg-primary/5 rounded-lg p-3 sm:p-4 border border-primary/10">
                    <code className="font-mono text-sm sm:text-base font-bold text-text">
                      {bankDetails.ifscCode}
                    </code>
                    <button
                      onClick={() => copyToClipboard(bankDetails.ifscCode, 'ifsc')}
                      className="ml-3 sm:ml-4 p-2 sm:p-2.5 hover:bg-primary/10 rounded-lg transition-colors duration-300"
                      title="Copy to clipboard"
                    >
                      <Copy 
                        className={`w-4 h-4 transition-colors duration-300 ${
                          copied === 'ifsc' ? 'text-green-600' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 sm:mt-20 p-8 sm:p-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl border border-primary/20"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">{t('donate.thankyou.title')}</h3>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              {t('donate.thankyou.desc')}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
