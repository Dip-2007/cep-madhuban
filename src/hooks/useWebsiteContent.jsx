import { useState, useEffect } from 'react';
import { safeJSONParse, isValidContentStructure } from '../utils/security';
import { STORAGE_KEYS, ERROR_MESSAGES } from '../constants';

export const useWebsiteContent = () => {
  const [content, setContent] = useState({});
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = () => {
      try {
        setIsLoading(true);
        const savedContent = safeJSONParse(STORAGE_KEYS.WEBSITE_CONTENT, {});
        const savedImages = safeJSONParse(STORAGE_KEYS.WEBSITE_IMAGES, []);
        const savedVideos = safeJSONParse(STORAGE_KEYS.WEBSITE_VIDEOS, []);

        // Validate content structure
        if (savedContent && isValidContentStructure(savedContent)) {
          setContent(savedContent);
        } else if (savedContent && typeof savedContent === 'object') {
          // Try to use content even if structure doesn't fully match
          setContent(savedContent);
        }

        if (Array.isArray(savedImages)) {
          setImages(savedImages);
        }

        if (Array.isArray(savedVideos)) {
          setVideos(savedVideos);
        }
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const getImageByUrl = (url) => {
    return images.find(img => img.url === url);
  };

  const getVideoByUrl = (url) => {
    return videos.find(video => video.url === url);
  };

  const getAllImages = () => images;
  const getAllVideos = () => videos;

  return {
    content,
    images,
    videos,
    isLoading,
    getImageByUrl,
    getVideoByUrl,
    getAllImages,
    getAllVideos
  };
};
