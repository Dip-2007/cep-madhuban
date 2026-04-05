/**
 * Utility Functions for Security and Validation
 */

import { VALIDATION, ERROR_MESSAGES, STORAGE_KEYS } from '../constants';

/**
 * Safely parse JSON from localStorage with validation
 * @param {string} key - localStorage key
 * @param {any} defaultValue - Default value if parsing fails
 * @returns {any} Parsed data or default value
 */
export const safeJSONParse = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    
    // Check for valid JSON format
    const parsed = JSON.parse(item);
    
    // Validate it's not null/undefined after parsing
    if (parsed === null || parsed === undefined) {
      return defaultValue;
    }
    
    return parsed;
  } catch (error) {
    console.error(`Error parsing JSON from ${key}:`, error);
    // Clear corrupted data
    localStorage.removeItem(key);
    return defaultValue;
  }
};

/**
 * Safely save data to localStorage
 * @param {string} key - localStorage key
 * @param {any} data - Data to save
 * @returns {boolean} Success status
 */
export const safeJSONStringify = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving data to ${key}:`, error);
    
    // Handle quota exceeded
    if (error.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded');
    }
    return false;
  }
};

/**
 * Validate file before upload
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Array of allowed MIME types
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {Object} Validation result { valid: boolean, error?: string }
 */
export const validateFile = (file, allowedTypes, maxSize) => {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: ERROR_MESSAGES.UPLOAD.INVALID_TYPE 
    };
  }
  
  // Check file size
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: ERROR_MESSAGES.UPLOAD.FILE_TOO_LARGE 
    };
  }
  
  return { valid: true };
};

/**
 * Sanitize string input to prevent XSS
 * @param {string} input - Raw input string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers (onclick=, onerror=, etc.)
    .replace(/&(?:#(?:x[0-9a-f]+|[0-9]+)|[a-z]+);/gi, '') // Remove HTML entities
    .trim();
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  return VALIDATION.ALLOWED_EMAIL_REGEX.test(email);
};

/**
 * Validate YouTube URL format
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid YouTube URL
 */
export const isValidYoutubeUrl = (url) => {
  return VALIDATION.YOUTUBE_URL_REGEX.test(url);
};

/**
 * Extract YouTube video ID from URL
 * @param {string} url - YouTube URL
 * @returns {string|null} Video ID or null
 */
export const extractYoutubeId = (url) => {
  if (!isValidYoutubeUrl(url)) return null;
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Check rate limiting for login attempts
 * @returns {Object} Rate limit status { allowed: boolean, remainingTime?: number }
 */
export const checkRateLimit = () => {
  const attempts = safeJSONParse(STORAGE_KEYS.LOGIN_ATTEMPTS, { count: 0, timestamp: 0 });
  const now = Date.now();
  
  // Reset if window has passed
  if (now - attempts.timestamp > 15 * 60 * 1000) {
    safeJSONStringify(STORAGE_KEYS.LOGIN_ATTEMPTS, { count: 0, timestamp: now });
    return { allowed: true };
  }
  
  // Check if exceeded max attempts
  if (attempts.count >= 5) {
    const remainingTime = 15 * 60 * 1000 - (now - attempts.timestamp);
    return { allowed: false, remainingTime };
  }
  
  return { allowed: true };
};

/**
 * Record failed login attempt
 */
export const recordFailedLogin = () => {
  const attempts = safeJSONParse(STORAGE_KEYS.LOGIN_ATTEMPTS, { count: 0, timestamp: Date.now() });
  attempts.count += 1;
  attempts.timestamp = Date.now();
  safeJSONStringify(STORAGE_KEYS.LOGIN_ATTEMPTS, attempts);
};

/**
 * Clear login attempts (on successful login)
 */
export const clearLoginAttempts = () => {
  localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
};

/**
 * Generate CSRF token
 * @returns {string} CSRF token
 */
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size string
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0 || bytes === undefined || bytes === null) return '0 Bytes';
  if (isNaN(bytes)) return 'Unknown Size';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Ensure i is within bounds
  const safeIndex = Math.min(i, sizes.length - 1);
  return parseFloat((bytes / Math.pow(k, safeIndex)).toFixed(2)) + ' ' + sizes[safeIndex];
};

/**
 * Debounce function for performance
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Validate content data structure
 * @param {Object} content - Content object to validate
 * @returns {boolean} Is valid content structure
 */
export const isValidContentStructure = (content) => {
  if (!content || typeof content !== 'object') return false;
  
  // Check for required structure
  const requiredPages = ['home', 'about', 'programs', 'contact', 'donate'];
  return requiredPages.every(page => {
    if (!content[page]) return true; // Optional pages are OK
    return typeof content[page] === 'object';
  });
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
