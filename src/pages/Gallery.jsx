import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, ExternalLink, PlayCircle } from 'lucide-react';

const Gallery = () => {
  const images = [
    'img-5.png', 'WhatsApp Image 2025-09-22 at 08.08.46.jpeg',
    'WhatsApp Image 2025-09-22 at 08.08.50.jpeg', 'WhatsApp Image 2025-09-22 at 08.08.58.jpeg',
    'WhatsApp Image 2025-09-22 at 08.09.39.jpeg', 'WhatsApp Image 2025-09-22 at 08.09.52.jpeg',
    'WhatsApp Image 2025-09-22 at 08.09.53.jpeg', 'WhatsApp Image 2025-09-22 at 08.09.54.jpeg',
    'WhatsApp Image 2025-09-22 at 08.09.56.jpeg', 'WhatsApp Image 2025-09-22 at 08.09.57 (1).jpeg',
    'WhatsApp Image 2025-09-22 at 08.09.57.jpeg',
    'IMG-20250818-WA0013.jpg', 'IMG-20250818-WA0051.jpg',
    'IMG-20250818-WA0045.jpg', 'IMG-20250818-WA0009.jpg',
    'IMG-20250818-WA0044.jpg', 'IMG-20250818-WA0029.jpg',
    'IMG-20250818-WA0012.jpg', 'IMG-20250818-WA0046.jpg',
    'IMG-20250818-WA0026.jpg', 'IMG-20250818-WA0088.jpg',
    'IMG-20250818-WA0091.jpg', 'IMG-20250818-WA0100.jpg',
    'IMG-20250818-WA0080.jpg', 'IMG-20250818-WA0099.jpg',
    'IMG-20250818-WA0076.jpg', 'IMG-20250818-WA0075.jpg',
    'IMG-20250818-WA0056.jpg'
  ];

  const videos = [
    { title: 'Sangeet Khurchi 2021', url: 'https://youtu.be/xvOslK88j6o' },
    { title: 'World Disability Day', url: 'https://youtu.be/18yI90jXFB4' },
    { title: 'Rakshabandhan Celebration', url: 'https://youtu.be/f5GngTVkpS4' },
    { title: 'Independence Day', url: 'https://youtu.be/Jzph-vpzHRU' },
    { title: 'Dhankwadi Sanstha Overview', url: 'https://youtube.com/watch?v=te5dykBPdMo' },
    { title: 'Rakhi Preparation', url: 'https://youtu.be/-nz2ShD1V2Q' }
  ];

  return (
    <div className="gallery-v2 pt-40 pb-32">
      <div className="container">
        <div className="max-w-4xl mb-32">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-10 block"
          >
            Visual Chronicles
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-7xl font-light text-text leading-tight mb-12"
          >
            Moments of <br />
            <span className="italic font-normal text-primary">Pure Vitality</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl text-muted font-light max-w-2xl"
          >
            A collection of stories told through the lens of those who experience life differently, yet beautifully.
          </motion.p>
        </div>

        {/* Video Highlights */}
        <div className="mb-40">
           <div className="flex items-center gap-6 mb-16">
              <Youtube className="text-red-600" size={32} strokeWidth={1} />
              <h2 className="text-2xl font-light uppercase tracking-widest">Video Highlights</h2>
              <div className="h-px bg-slate-200 flex-grow"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((vid, i) => (
                <motion.a 
                  key={i}
                  href={vid.url}
                  target="_blank"
                  whileHover={{ y: -5 }}
                  className="glass p-8 rounded-2xl group flex flex-col justify-between min-h-[160px] hover:bg-white transition-all duration-500 hover:shadow-premium"
                >
                   <PlayCircle size={32} className="text-primary/20 group-hover:text-primary transition-colors mb-6" strokeWidth={1} />
                   <div className="flex justify-between items-end">
                      <span className="text-lg font-light group-hover:text-primary transition-colors">{vid.title}</span>
                      <ExternalLink size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                   </div>
                </motion.a>
              ))}
           </div>
        </div>

        {/* Masonry-style Grid */}
        <div className="flex items-center gap-6 mb-16">
           <h2 className="text-2xl font-light uppercase tracking-widest">Photo Archive</h2>
           <div className="h-px bg-slate-200 flex-grow"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i % 4 * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl overflow-hidden glass group cursor-pointer ${i % 7 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img 
                src={`/assets/images/${img}`} 
                alt="Gallery" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
