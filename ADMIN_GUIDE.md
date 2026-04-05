# Madhuban NGO - Admin Content Management Guide

## Overview
This guide explains how to use the admin content management system for the Madhuban NGO website. The system allows authorized administrators to edit website content, manage images and videos without requiring technical knowledge.

## Accessing the Admin Panel

### Login Credentials
- **URL**: `http://localhost:5173/admin/login` (for development)
- **Username**: `admin`
- **Password**: `madhuban123`

### Security Note
In production, these credentials should be changed to secure values. The current implementation uses localStorage for authentication, which is suitable for demonstration purposes.

## Admin Dashboard Features

### 1. Dashboard Overview
- View statistics about pages, images, and videos
- See last update information
- Quick access to all management tools

### 2. Content Editor
The Content Editor allows you to modify text content across all website pages:

#### Available Pages:
- **Home Page**: Hero section, about section, mission statement
- **About Page**: Story, history, team information
- **Programs Page**: Overview and initiatives
- **Gallery Page**: Introduction text
- **Contact Page**: Information and form details
- **Donate Page**: Introduction and donation options

#### How to Edit Content:
1. Select the page you want to edit from the page selector
2. Click the "Edit" button next to any text field
3. Make your changes in the text input field
4. Click "Preview" to see how it will look
5. Click "Save All Changes" to persist your edits
6. Use "Reset to Default" to restore original content

#### Features:
- **Live Preview**: See changes before saving
- **Auto-save**: Content is saved to browser storage
- **Reset Function**: Restore default content if needed

### 3. Media Manager (Images)
Upload and manage website images:

#### Features:
- **Drag & Drop Upload**: Simply drag images into the upload area
- **Multiple File Support**: Upload multiple images at once
- **Image Information**: Add alt text and descriptions for SEO
- **Preview**: Click the eye icon to preview images
- **Delete**: Remove unwanted images with the trash icon
- **File Size Display**: See image dimensions and file sizes

#### Supported Formats:
- PNG, JPG, GIF, WebP
- Maximum file size: 10MB per image

#### Best Practices:
- Use descriptive alt text for accessibility
- Compress images before uploading for better performance
- Use appropriate image dimensions for web display

### 4. Video Manager
Manage video content including YouTube embeds:

#### Features:
- **Video Upload**: Upload local video files
- **YouTube Integration**: Add YouTube videos by URL
- **Video Information**: Add titles and descriptions
- **Preview**: Play videos directly in the admin panel
- **Thumbnail Generation**: Automatic thumbnails for YouTube videos

#### Supported Formats:
- MP4, WebM, OGG for local uploads
- Any YouTube video URL

#### Adding YouTube Videos:
1. Click "Add YouTube Video" button
2. Paste the YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
3. Click "Add Video"
4. The video will be added with automatic thumbnail

### 5. Settings Panel
Configure website settings (placeholder for future features):
- Site configuration
- SEO settings
- Backup and restore
- User management

## Content Storage

### Where Content is Stored
- **Text Content**: Browser localStorage under key `websiteContent`
- **Images**: Browser localStorage under key `websiteImages`
- **Videos**: Browser localStorage under key `websiteVideos`

### Data Persistence
- Content persists across browser sessions
- No database required for basic functionality
- Can be exported/imported for backup

## Website Integration

### How Admin Changes Appear on Website
The website automatically uses the latest content from localStorage:
- Text content is dynamically loaded
- Images and videos are referenced from the media library
- Changes appear immediately after saving

### Content Loading Hook
The `useWebsiteContent` hook provides access to all managed content:
```javascript
const { content, images, videos } = useWebsiteContent();
```

## Best Practices

### Content Management
1. **Regular Backups**: Periodically export your content
2. **Image Optimization**: Compress images before upload
3. **SEO Optimization**: Use descriptive alt text and titles
4. **Content Review**: Preview changes before publishing

### Security Considerations
1. **Change Passwords**: Update default credentials in production
2. **Access Control**: Limit admin access to authorized personnel
3. **Regular Updates**: Keep the system updated for security

### Performance Tips
1. **Image Sizing**: Use appropriately sized images
2. **Video Compression**: Optimize video files for web
3. **Content Cleanup**: Remove unused media files

## Troubleshooting

### Common Issues

#### Content Not Appearing
- Check browser localStorage is enabled
- Verify content was saved successfully
- Refresh the browser cache

#### Upload Issues
- Check file format compatibility
- Verify file size limits
- Ensure stable internet connection

#### Login Problems
- Verify correct credentials
- Clear browser cache and cookies
- Check localStorage is enabled

### Getting Help
- Check browser console for error messages
- Verify all files are properly uploaded
- Test with different browsers if needed

## Future Enhancements

### Planned Features
- User role management
- Content scheduling
- Advanced SEO tools
- Analytics integration
- Multi-language support
- Cloud storage integration

### Production Considerations
- Backend API integration
- Database storage
- Enhanced security
- Content versioning
- Backup automation

## Technical Details

### File Structure
```
src/
├── contexts/
│   └── AuthContext.jsx          # Authentication logic
├── components/
│   ├── ProtectedRoute.jsx      # Route protection
│   ├── ContentEditor.jsx        # Text content editor
│   └── MediaManager.jsx        # Media upload/management
├── pages/
│   ├── AdminLogin.jsx          # Admin login page
│   └── AdminDashboard.jsx      # Main admin interface
├── hooks/
│   └── useWebsiteContent.jsx   # Content loading hook
└── App.jsx                     # Updated with admin routes
```

### Dependencies
- React Router for navigation
- Framer Motion for animations
- Lucide React for icons
- Browser localStorage for data persistence

This admin system provides a complete content management solution that empowers NGO administrators to maintain their website content efficiently without technical expertise.
