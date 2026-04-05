import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Heart } from 'lucide-react';

const Donate = () => {
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
    accountName: 'Madhuban M.R. AND C.P. Sonatha, Pune',
    accountType: 'Current Account',
    bankName: 'State Bank of India',
    accountNumber: '39153359164',
    ifscCode: 'SBIN0000454',
    gpayNumber: '90289094787'
  };

  return (
    <div className="donate-page pt-40 pb-32">
      <div className="container">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mb-16 sm:mb-24 md:mb-32 text-center"
        >
          <motion.span 
            variants={fadeInUp} 
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-6 sm:mb-10 block"
          >
            Support Our Mission
          </motion.span>
          <motion.h1 
            variants={fadeInUp} 
            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-text leading-tight mb-6 sm:mb-12"
          >
            Donate<br />
            <span className="italic font-normal text-primary">Make a Difference</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp} 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted font-light leading-relaxed max-w-3xl mx-auto"
          >
            Your generous contribution helps us continue our mission and provide essential services to the differently-abled community.
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
              Your generous contribution helps us continue our mission and provide essential services. You can donate via G Pay or Bank Transfer.
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
                <Heart className="w-6 h-6 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-bold text-primary">G Pay</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-widest mb-3">
                    G Pay Number
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
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Bank Account</h2>
              
              <div className="space-y-8 md:space-y-10">
                {/* Account Name */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-widest mb-3 sm:mb-4">
                    Account Name
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
                    Account Type
                  </p>
                  <p className="text-sm sm:text-base text-text font-medium bg-primary/5 rounded-lg p-3 sm:p-4 border border-primary/10">
                    {bankDetails.accountType}
                  </p>
                </div>

                {/* Bank Name */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-widest mb-3 sm:mb-4">
                    Bank Name
                  </p>
                  <p className="text-sm sm:text-base text-text font-medium bg-primary/5 rounded-lg p-3 sm:p-4 border border-primary/10">
                    {bankDetails.bankName}
                  </p>
                </div>

                {/* Account Number */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-widest mb-3 sm:mb-4">
                    Account Number
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
                    IFSC Code
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
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">Thank You for Your Support!</h3>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Your generous contribution helps us continue our mission and provide essential services to the differently-abled community. Every donation makes a meaningful impact on the lives of those we serve.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
