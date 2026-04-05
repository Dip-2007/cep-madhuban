import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  safeJSONParse,
  safeJSONStringify,
  validateFile,
  formatFileSize,
  isValidYoutubeUrl,
  extractYoutubeId,
  sanitizeInput,
} from '../../utils/security';
import { UPLOAD_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES, STORAGE_KEYS } from '../../constants';

// Async thunk for saving media
export const saveMedia = createAsyncThunk(
  'media/saveMedia',
  async ({ storageKey, items }, { rejectWithValue }) => {
    try {
      const success = safeJSONStringify(storageKey, items);
      if (!success) {
        return rejectWithValue(ERROR_MESSAGES.STORAGE.SAVE_ERROR);
      }
      return true;
    } catch (error) {
      return rejectWithValue(ERROR_MESSAGES.STORAGE.SAVE_ERROR);
    }
  }
);

// Load initial media from localStorage
const loadInitialMedia = (storageKey) => {
  const savedMedia = safeJSONParse(storageKey, []);
  if (Array.isArray(savedMedia)) {
    return savedMedia.filter(
      (item) =>
        item &&
        typeof item === 'object' &&
        item.id &&
        item.url &&
        (item.type || item.name)
    );
  }
  return [];
};

const initialState = {
  images: loadInitialMedia(STORAGE_KEYS.WEBSITE_IMAGES),
  videos: loadInitialMedia(STORAGE_KEYS.WEBSITE_VIDEOS),
  isUploading: false,
  uploadProgress: 0,
  selectedItem: null,
  showPreview: false,
  message: { text: '', type: '' },
  dragActive: false,
  isLoading: true,
  youtubeUrl: '',
  showYoutubeModal: false,
  error: null,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setDragActive: (state, action) => {
      state.dragActive = action.payload;
    },
    setIsUploading: (state, action) => {
      state.isUploading = action.payload;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setShowPreview: (state, action) => {
      state.showPreview = action.payload;
    },
    setYoutubeUrl: (state, action) => {
      state.youtubeUrl = action.payload;
    },
    setShowYoutubeModal: (state, action) => {
      state.showYoutubeModal = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = { text: '', type: '' };
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addImages: (state, action) => {
      const newImages = action.payload;
      state.images.push(...newImages);
    },
    addVideos: (state, action) => {
      const newVideos = action.payload;
      state.videos.push(...newVideos);
    },
    addVideo: (state, action) => {
      const newVideo = action.payload;
      state.videos.push(newVideo);
    },
    addYoutubeVideo: (state, action) => {
      const url = action.payload;
      const sanitizedUrl = sanitizeInput(url);

      if (!sanitizedUrl || !isValidYoutubeUrl(sanitizedUrl)) {
        state.message = { text: ERROR_MESSAGES.VALIDATION.INVALID_URL, type: 'error' };
        return;
      }

      const videoId = extractYoutubeId(sanitizedUrl);
      if (!videoId) {
        state.message = { text: ERROR_MESSAGES.VALIDATION.INVALID_URL, type: 'error' };
        return;
      }

      const youtubeItem = {
        id: `youtube-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        name: `YouTube Video - ${videoId}`,
        type: 'youtube',
        url: `https://www.youtube.com/embed/${videoId}`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        videoId: videoId,
        uploadedAt: new Date().toISOString(),
        alt: 'YouTube Video',
        description: '',
      };

      state.videos.push(youtubeItem);
      state.youtubeUrl = '';
      state.showYoutubeModal = false;
      state.message = { text: SUCCESS_MESSAGES.UPLOAD_SUCCESS, type: 'success' };
    },
    deleteImage: (state, action) => {
      const id = action.payload;
      state.images = state.images.filter((item) => item.id !== id);
      state.message = { text: SUCCESS_MESSAGES.DELETE_SUCCESS, type: 'success' };
    },
    deleteVideo: (state, action) => {
      const id = action.payload;
      state.videos = state.videos.filter((item) => item.id !== id);
      state.message = { text: SUCCESS_MESSAGES.DELETE_SUCCESS, type: 'success' };
    },
    updateImageInfo: (state, action) => {
      const { id, field, value } = action.payload;
      const sanitizedValue = sanitizeInput(value);
      const image = state.images.find((item) => item.id === id);
      if (image) {
        image[field] = sanitizedValue;
      }
    },
    updateVideoInfo: (state, action) => {
      const { id, field, value } = action.payload;
      const sanitizedValue = sanitizeInput(value);
      const video = state.videos.find((item) => item.id === id);
      if (video) {
        video[field] = sanitizedValue;
      }
    },
    loadMedia: (state) => {
      const savedImages = safeJSONParse(STORAGE_KEYS.WEBSITE_IMAGES, []);
      const savedVideos = safeJSONParse(STORAGE_KEYS.WEBSITE_VIDEOS, []);

      if (Array.isArray(savedImages)) {
        state.images = savedImages.filter(
          (item) =>
            item &&
            typeof item === 'object' &&
            item.id &&
            item.url &&
            (item.type || item.name)
        );
      }

      if (Array.isArray(savedVideos)) {
        state.videos = savedVideos.filter(
          (item) =>
            item &&
            typeof item === 'object' &&
            item.id &&
            item.url &&
            (item.type || item.name)
        );
      }

      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveMedia.pending, (state) => {
        state.isUploading = true;
      })
      .addCase(saveMedia.fulfilled, (state) => {
        state.isUploading = false;
        state.error = null;
      })
      .addCase(saveMedia.rejected, (state, action) => {
        state.isUploading = false;
        state.message = { text: action.payload, type: 'error' };
        state.error = action.payload;
      });
  },
});

export const {
  setDragActive,
  setIsUploading,
  setUploadProgress,
  setSelectedItem,
  setShowPreview,
  setYoutubeUrl,
  setShowYoutubeModal,
  setMessage,
  clearMessage,
  setIsLoading,
  clearError,
  addImages,
  addVideos,
  addYoutubeVideo,
  deleteImage,
  deleteVideo,
  updateImageInfo,
  updateVideoInfo,
  loadMedia,
} = mediaSlice.actions;

// Selectors
export const selectImages = (state) => state.media.images;
export const selectVideos = (state) => state.media.videos;
export const selectIsUploading = (state) => state.media.isUploading;
export const selectUploadProgress = (state) => state.media.uploadProgress;
export const selectSelectedItem = (state) => state.media.selectedItem;
export const selectShowPreview = (state) => state.media.showPreview;
export const selectMessage = (state) => state.media.message;
export const selectDragActive = (state) => state.media.dragActive;
export const selectIsLoading = (state) => state.media.isLoading;
export const selectYoutubeUrl = (state) => state.media.youtubeUrl;
export const selectShowYoutubeModal = (state) => state.media.showYoutubeModal;
export const selectMediaError = (state) => state.media.error;
export const selectTotalStorageUsed = (state) => {
  const imagesSize = state.media.images.reduce((acc, item) => acc + (item.size || 0), 0);
  const videosSize = state.media.videos.reduce((acc, item) => acc + (item.size || 0), 0);
  return formatFileSize(imagesSize + videosSize);
};

export default mediaSlice.reducer;
