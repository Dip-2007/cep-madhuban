import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, X, Link2, Trash2, Eye, HelpCircle, Image as ImageIcon, Video as VideoIcon, AlertCircle, Loader2 } from 'lucide-react';
import {
  validateFile,
  formatFileSize,
  sanitizeInput,
} from '../utils/security';
import { UPLOAD_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES, STORAGE_KEYS } from '../constants';
import {
  setDragActive,
  setIsUploading,
  setUploadProgress,
  setSelectedItem,
  setShowPreview,
  setYoutubeUrl,
  setShowYoutubeModal,
  setMessage,
  clearMessage,
  addImages,
  addVideos,
  addYoutubeVideo,
  deleteImage,
  deleteVideo,
  updateImageInfo,
  updateVideoInfo,
  loadMedia,
  saveMedia,
  selectImages,
  selectVideos,
  selectIsUploading,
  selectUploadProgress,
  selectSelectedItem,
  selectShowPreview,
  selectMessage,
  selectDragActive,
  selectIsLoading,
  selectYoutubeUrl,
  selectShowYoutubeModal,
  selectTotalStorageUsed,
} from '../store/slices/mediaSlice';

const MediaManager = ({ type }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const isImage = type === 'image';
  const storageKey = isImage ? STORAGE_KEYS.WEBSITE_IMAGES : STORAGE_KEYS.WEBSITE_VIDEOS;
  const maxFileSize = isImage ? UPLOAD_CONFIG.MAX_IMAGE_SIZE : UPLOAD_CONFIG.MAX_VIDEO_SIZE;
  const allowedTypes = isImage ? UPLOAD_CONFIG.ALLOWED_IMAGE_TYPES : UPLOAD_CONFIG.ALLOWED_VIDEO_TYPES;

  // Redux selectors
  const images = useSelector(selectImages);
  const videos = useSelector(selectVideos);
  const isUploading = useSelector(selectIsUploading);
  const uploadProgress = useSelector(selectUploadProgress);
  const selectedItem = useSelector(selectSelectedItem);
  const showPreview = useSelector(selectShowPreview);
  const message = useSelector(selectMessage);
  const dragActive = useSelector(selectDragActive);
  const isLoading = useSelector(selectIsLoading);
  const youtubeUrl = useSelector(selectYoutubeUrl);
  const showYoutubeModal = useSelector(selectShowYoutubeModal);
  const totalStorageUsed = useSelector(selectTotalStorageUsed);

  const mediaItems = isImage ? images : videos;
  const [hasInitialLoaded, setHasInitialLoaded] = useState(false);

  // Load media items from Redux store on mount
  useEffect(() => {
    dispatch(loadMedia());
    // Mark loading as complete after initial load
    const timer = setTimeout(() => {
      setHasInitialLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Auto-clear messages
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message.text, dispatch]);

  // Save to localStorage whenever media items change (but only after initial load)
  useEffect(() => {
    if (!isLoading && hasInitialLoaded) {
      dispatch(saveMedia({ storageKey, items: mediaItems }));
    }
  }, [mediaItems, isLoading, storageKey, dispatch, hasInitialLoaded]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      dispatch(setDragActive(true));
    } else if (e.type === 'dragleave') {
      dispatch(setDragActive(false));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setDragActive(false));
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileUpload = async (files) => {
    // Validate files array
    if (!files || files.length === 0) {
      dispatch(setMessage({ text: ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD, type: 'warning' }));
      return;
    }

    // Check max files limit
    if (files.length > UPLOAD_CONFIG.MAX_FILES_PER_UPLOAD) {
      dispatch(setMessage({
        text: `Maximum ${UPLOAD_CONFIG.MAX_FILES_PER_UPLOAD} files allowed per upload.`,
        type: 'warning'
      }));
      return;
    }

    dispatch(setIsUploading(true));
    dispatch(setUploadProgress(0));
    dispatch(setMessage({ text: '', type: '' }));

    const newItems = [];
    let processedCount = 0;
    let validFilesCount = 0;

    // First pass: validate all files
    const validFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validation = validateFile(file, allowedTypes, maxFileSize);

      if (!validation.valid) {
        console.warn(`Skipping invalid file ${file.name}: ${validation.error}`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) {
      dispatch(setMessage({
        text: `${ERROR_MESSAGES.UPLOAD.INVALID_TYPE} Allowed: ${allowedTypes.join(', ')}`,
        type: 'error'
      }));
      dispatch(setIsUploading(false));
      return;
    }

    validFilesCount = validFiles.length;

    // Process valid files
    const processFile = (file, index) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const mediaItem = {
              id: `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 11)}`,
              name: sanitizeInput(file.name),
              type: file.type,
              size: file.size,
              url: e.target.result,
              uploadedAt: new Date().toISOString(),
              alt: sanitizeInput(file.name.split('.')[0]),
              description: ''
            };

            newItems.push(mediaItem);
            processedCount++;

            // Update progress
            const progress = (processedCount / validFilesCount) * 100;
            dispatch(setUploadProgress(progress));

            resolve(mediaItem);
          } catch (error) {
            console.error('Error processing file:', error);
            processedCount++;
            resolve(null);
          }
        };

        reader.onerror = () => {
          console.error('FileReader error for:', file.name);
          processedCount++;
          resolve(null);
        };

        reader.readAsDataURL(file);
      });
    };

    // Process all files concurrently
    const results = await Promise.all(validFiles.map((file, index) => processFile(file, index)));

    const successfulItems = results.filter((item) => item !== null);

    if (successfulItems.length > 0) {
      if (isImage) {
        dispatch(addImages(successfulItems));
      } else {
        dispatch(addVideos(successfulItems));
      }
      dispatch(setMessage({
        text: `${SUCCESS_MESSAGES.UPLOAD_SUCCESS} (${successfulItems.length} files)`,
        type: 'success'
      }));
    } else {
      dispatch(setMessage({ text: ERROR_MESSAGES.UPLOAD.UPLOAD_FAILED, type: 'error' }));
    }

    dispatch(setIsUploading(false));
    dispatch(setUploadProgress(0));

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleYoutubeAdd = () => {
    dispatch(addYoutubeVideo(youtubeUrl));
  };

  const handleDeleteMedia = (id) => {
    if (window.confirm('⚠️ Are you sure you want to delete this item? This action cannot be undone.')) {
      if (isImage) {
        dispatch(deleteImage(id));
      } else {
        dispatch(deleteVideo(id));
      }
    }
  };

  const handleUpdateMediaInfo = (id, field, value) => {
    if (isImage) {
      dispatch(updateImageInfo({ id, field, value }));
    } else {
      dispatch(updateVideoInfo({ id, field, value }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {isImage ? '📸 Image Manager' : '🎥 Video Manager'}
            </h3>
            <p className="text-gray-600">
              {isImage ? 'Upload and manage website images' : 'Upload and manage video content'}
            </p>
          </div>
          {!isImage && (
            <button
              onClick={() => dispatch(setShowYoutubeModal(true))}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #ef4444, #be123c)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                transition: 'all 0.2s',
              }}
              className="btn-yt-hover"
            >
              <Link2 size={16} />
              <span>Add YouTube Video</span>
            </button>
          )}
        </div>

        {/* Upload Area */}
        <div 
          className={`relative border-3 rounded-2xl p-12 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-emerald-500 bg-emerald-50' 
              : 'border-dashed border-gray-300 hover:border-emerald-400 bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            {isImage ? (
              <ImageIcon className="w-10 h-10 text-emerald-600" />
            ) : (
              <VideoIcon className="w-10 h-10 text-emerald-600" />
            )}
          </div>
          
          <h4 className="text-xl font-bold text-gray-800 mb-3">
            {dragActive ? 'Drop files here' : `Upload ${isImage ? 'Images' : 'Videos'}`}
          </h4>
          
          <p className="text-gray-600 mb-6">
            Drag and drop {isImage ? 'images' : 'videos'} here, or click to browse
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle size={16} />
              <span>{isImage ? 'PNG, JPG, GIF, WebP' : 'MP4, WebM, OGG'}</span>
            </div>
            <div>•</div>
            <div>Max {isImage ? '10MB' : '50MB'} per file</div>
          </div>

          <input
            type="file"
            multiple
            accept={isImage ? 'image/*' : 'video/*'}
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            id="file-upload"
            ref={fileInputRef}
          />
          <label
            htmlFor="file-upload"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #10b981, #0d9488)',
              color: '#fff',
              border: 'none',
              borderRadius: '16px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.2s',
            }}
            className="btn-upload-hover"
          >
            <Upload size={20} />
            <span>Choose Files</span>
          </label>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="font-medium text-blue-800">Uploading files...</span>
              </div>
              <span className="text-sm font-medium text-blue-600">{Math.round(uploadProgress)}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-600 to-emerald-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Status Messages */}
        {message.text && (
          <div className={`mt-6 p-4 rounded-2xl font-medium border-2 ${
            message.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-700'
              : message.type === 'warning'
              ? 'bg-amber-50 border-amber-200 text-amber-700'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <div className="flex items-center gap-2">
              {message.type === 'success' && <span>✅</span>}
              {message.type === 'warning' && <span>⚠️</span>}
              {message.type === 'error' && <span>❌</span>}
              <span>{message.text}</span>
            </div>
          </div>
        )}
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-bold text-gray-800">
            {isImage ? '📁 Image Library' : '📁 Video Library'} ({mediaItems.length} items)
          </h4>
          {mediaItems.length > 0 && (
            <div className="text-sm text-gray-500">
              Total storage: {totalStorageUsed}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading media library...</p>
          </div>
        ) : mediaItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              {isImage ? (
                <ImageIcon className="w-12 h-12 text-gray-400" />
              ) : (
                <VideoIcon className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <h5 className="text-xl font-semibold text-gray-700 mb-2">No {isImage ? 'images' : 'videos'} yet</h5>
            <p className="text-gray-500">Upload your first {isImage ? 'image' : 'video'} to get started</p>
          </div>
        ) : (
          <>
            <style>{`
              .btn-yt-hover:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4); }
              .btn-upload-hover:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4); }
              .media-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.08); border-color: #10b981 !important; }
            `}</style>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}>
              {mediaItems.map((item) => (
                <div key={item.id} className="media-card" style={{
                  background: '#fff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Media Preview */}
                  <div style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    background: '#f1f5f9',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    {item.type === 'youtube' ? (
                      <img src={item.thumbnailUrl} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : isImage ? (
                      <img src={item.url} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                    )}

                    {/* Overlay Badges */}
                    <div style={{
                      position: 'absolute', top: '10px', left: '10px',
                      background: item.type === 'youtube' ? '#ef4444' : (isImage ? '#3b82f6' : '#8b5cf6'),
                      color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px',
                      textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    }}>
                      {item.type === 'youtube' ? 'YouTube' : isImage ? 'Image' : 'Video'}
                    </div>

                    {/* Actions Overlay */}
                    <div style={{
                      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                      opacity: 0, transition: 'opacity 0.2s', className: 'hover-overlay'
                    }} className="hover-overlay-visible">
                      <button onClick={() => { dispatch(setSelectedItem(item)); dispatch(setShowPreview(true)); }}
                        style={{ padding: '0.6rem', background: '#fff', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
                        <Eye size={18} color="#10b981" />
                      </button>
                      <button onClick={() => handleDeleteMedia(item.id)}
                        style={{ padding: '0.6rem', background: '#fff', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
                        <Trash2 size={18} color="#ef4444" />
                      </button>
                    </div>
                    <style>{`.media-card:hover .hover-overlay-visible { opacity: 1 !important; }`}</style>
                  </div>

                  {/* Info Section */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Title / Alt Text</p>
                      <input
                        type="text"
                        value={item.alt}
                        onChange={(e) => handleUpdateMediaInfo(item.id, 'alt', e.target.value)}
                        style={{ width: '100%', border: 'none', borderBottom: '1px solid #f1f5f9', padding: '0 0 6px', fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', outline: 'none' }}
                        onFocus={(e) => e.target.style.borderBottom = '1px solid #10b981'}
                        onBlur={(e) => e.target.style.borderBottom = '1px solid #f1f5f9'}
                      />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Description</p>
                      <textarea
                        value={item.description}
                        onChange={(e) => handleUpdateMediaInfo(item.id, 'description', e.target.value)}
                        style={{ width: '100%', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '10px', padding: '8px', fontSize: '0.8rem', color: '#64748b', resize: 'none' }}
                        rows={2}
                        placeholder="Add description..."
                      />
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #f8fafc' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <div style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, color: '#64748b' }}>
                          {item.size ? formatFileSize(item.size) : 'External'}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          <h4 className="font-bold text-blue-800">Quick Guide</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <p className="font-semibold mb-2">📤 Uploading Files:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Drag & drop files or click to browse</li>
              <li>Upload multiple files at once</li>
              <li>Supported formats: {isImage ? 'PNG, JPG, GIF, WebP' : 'MP4, WebM, OGG'}</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">✏️ Managing Files:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Click on alt text to edit (for SEO)</li>
              <li>Add descriptions for better accessibility</li>
              <li>Use preview to check before publishing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* YouTube Modal */}
      {showYoutubeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Add YouTube Video</h3>
              <button
                onClick={() => dispatch(setShowYoutubeModal(false))}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  YouTube Video URL
                </label>
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => dispatch(setYoutubeUrl(e.target.value))}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200"
                />
              </div>
              
              <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                <p className="text-sm text-amber-800">
                  💡 Paste any YouTube video URL and we'll automatically extract the video ID for embedding.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => dispatch(setShowYoutubeModal(false))}
                className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleYoutubeAdd}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium"
              >
                Add Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-6xl max-h-[90vh] p-4">
            <button
              onClick={() => dispatch(setShowPreview(false))}
              className="absolute top-6 right-6 p-3 bg-white rounded-full shadow-2xl hover:bg-gray-100 z-10 transition-colors"
            >
              <X size={24} className="text-gray-700" />
            </button>
            
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              {selectedItem.type === 'youtube' ? (
                <iframe
                  src={selectedItem.url}
                  title={selectedItem.alt || 'YouTube video player'}
                  className="w-full aspect-video rounded-t-3xl"
                  allowFullScreen
                />
              ) : isImage ? (
                <img 
                  src={selectedItem.url} 
                  alt={selectedItem.alt}
                  className="max-w-full max-h-[70vh] object-contain rounded-t-3xl"
                />
              ) : (
                <video 
                  src={selectedItem.url}
                  className="w-full aspect-video rounded-t-3xl"
                  controls
                />
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedItem.alt}</h3>
                <p className="text-gray-600 mb-4">{selectedItem.description || 'No description provided'}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{selectedItem.size && formatFileSize(selectedItem.size)}</span>
                  <span>Uploaded: {new Date(selectedItem.uploadedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;
