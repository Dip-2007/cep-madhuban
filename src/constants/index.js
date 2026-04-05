/**
 * Application Constants
 * Centralized configuration for security and performance settings
 */

// Authentication Constants
export const AUTH_CONFIG = {
  STORAGE_KEY: 'madhuban_auth_token',
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
};

// File Upload Constants
export const UPLOAD_CONFIG = {
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_VIDEO_SIZE: 50 * 1024 * 1024, // 50MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
  MAX_FILES_PER_UPLOAD: 10,
};

// Validation Constants
export const VALIDATION = {
  MAX_TITLE_LENGTH: 200,
  MAX_CONTENT_LENGTH: 5000,
  MAX_ALT_TEXT_LENGTH: 125,
  MAX_DESCRIPTION_LENGTH: 500,
  ALLOWED_USERNAME_REGEX: /^[a-zA-Z0-9_-]{3,32}$/,
  ALLOWED_EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  YOUTUBE_URL_REGEX: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}|youtu\.be\/[a-zA-Z0-9_-]{11}|youtube\.com\/embed\/[a-zA-Z0-9_-]{11})([?&].*)?$/,
};

// Error Messages
export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid username or password. Please try again.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',
    TOO_MANY_ATTEMPTS: 'Too many failed attempts. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to access this resource.',
  },
  UPLOAD: {
    FILE_TOO_LARGE: 'File exceeds maximum size limit.',
    INVALID_TYPE: 'Invalid file type. Please upload allowed formats only.',
    UPLOAD_FAILED: 'Failed to upload file. Please try again.',
    STORAGE_FULL: 'Storage limit exceeded. Please delete some files first.',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_URL: 'Please enter a valid URL.',
    MAX_LENGTH_EXCEEDED: 'Content exceeds maximum length.',
  },
  STORAGE: {
    LOAD_ERROR: 'Failed to load saved data.',
    SAVE_ERROR: 'Failed to save changes. Please try again.',
    PARSE_ERROR: 'Invalid data format detected.',
  },
};

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: '✅ Changes saved successfully!',
  UPLOAD_SUCCESS: '✅ File uploaded successfully!',
  DELETE_SUCCESS: '✅ Item deleted successfully!',
  LOGIN_SUCCESS: '✅ Welcome back!',
  LOGOUT_SUCCESS: '✅ Logged out successfully.',
};

// localStorage Keys
export const STORAGE_KEYS = {
  WEBSITE_CONTENT: 'websiteContent',
  WEBSITE_IMAGES: 'websiteImages',
  WEBSITE_VIDEOS: 'websiteVideos',
  AUTH_TOKEN: 'madhuban_auth_token',
  LOGIN_ATTEMPTS: 'login_attempts',
  LAST_LOGIN_ATTEMPT: 'last_login_attempt',
};

// Rate Limiting Constants
export const RATE_LIMIT = {
  LOGIN_ATTEMPTS_KEY: 'login_attempts',
  MAX_ATTEMPTS: 5,
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
};

// Animation Constants
export const ANIMATION = {
  STAGGER_DELAY: 0.1,
  DURATION: 0.5,
  EASE: [0.16, 1, 0.3, 1],
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
};
