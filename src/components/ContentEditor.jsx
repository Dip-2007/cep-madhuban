import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Save, Eye, Edit3, HelpCircle, RefreshCw } from 'lucide-react';
import {
  setSelectedPage,
  updateContent,
  toggleEdit,
  saveContent,
  resetToDefault,
  clearSaveMessage,
  loadContent,
  selectContent,
  selectSelectedPage,
  selectIsEditing,
  selectIsSaving,
  selectSaveMessage,
  selectHasUnsavedChanges,
  defaultContent,
} from '../store/slices/contentSlice';
import { ERROR_MESSAGES } from '../constants';

const ContentEditor = () => {
  const dispatch = useDispatch();
  const content = useSelector(selectContent);
  const selectedPage = useSelector(selectSelectedPage);
  const isEditing = useSelector(selectIsEditing);
  const isSaving = useSelector(selectIsSaving);
  const saveMessage = useSelector(selectSaveMessage);
  const hasUnsavedChanges = useSelector(selectHasUnsavedChanges);

  const pages = [
    { id: 'home', name: 'Home Page', sections: ['hero', 'about', 'mission'], icon: '🏠' },
    { id: 'about', name: 'About Page', sections: ['intro', 'history', 'team'], icon: '📖' },
    { id: 'programs', name: 'Programs Page', sections: ['overview', 'initiatives'], icon: '🎯' },
    { id: 'gallery', name: 'Gallery Page', sections: ['intro'], icon: '🖼️' },
    { id: 'contact', name: 'Contact Page', sections: ['info', 'form'], icon: '📞' },
    { id: 'donate', name: 'Donate Page', sections: ['intro', 'options'], icon: '❤️' }
  ];

  useEffect(() => {
    dispatch(loadContent());
  }, [dispatch]);

  useEffect(() => {
    if (saveMessage) {
      const timer = setTimeout(() => {
        dispatch(clearSaveMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveMessage, dispatch]);

  const handleContentChange = (page, section, field, value) => {
    dispatch(updateContent({ page, section, field, value }));
  };

  const handleToggleEdit = (page, section, field) => {
    dispatch(toggleEdit({ page, section, field }));
  };

  const handleSaveContent = () => {
    dispatch(saveContent(content));
  };

  const handleResetToDefault = () => {
    if (window.confirm('⚠️ Are you sure you want to reset all content to default values? This cannot be undone.')) {
      dispatch(resetToDefault(defaultContent));
    }
  };

  const currentPageData = pages.find(p => p.id === selectedPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Content Editor</h3>
            <p className="text-gray-600">Edit text content for your website pages</p>
          </div>
          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-xl font-medium text-sm">
                You have unsaved changes
              </div>
            )}
            <button
              onClick={handleResetToDefault}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-200 font-medium"
            >
              <RefreshCw size={18} />
              <span>Reset Default</span>
            </button>
            <button
              onClick={handleSaveContent}
              disabled={isSaving || !hasUnsavedChanges}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
        
        {/* Page Selector */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <p className="text-sm font-semibold text-gray-700 mb-4">Select Page to Edit:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => dispatch(setSelectedPage(page.id))}
                className={`p-4 rounded-2xl font-medium transition-all duration-200 border-2 ${
                  selectedPage === page.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-600 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                <div className="text-2xl mb-1">{page.icon}</div>
                <div className="text-sm">{page.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-2xl font-medium border-2 ${
          saveMessage.includes('✅') 
            ? 'bg-green-50 border-green-200 text-green-700' 
            : saveMessage.includes('⚠️')
            ? 'bg-amber-50 border-amber-200 text-amber-700'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <div className="flex items-center gap-2">
            {saveMessage.includes('✅') && <span>✅</span>}
            {saveMessage.includes('⚠️') && <span>⚠️</span>}
            {saveMessage.includes('❌') && <span>❌</span>}
            <span>{saveMessage}</span>
          </div>
        </div>
      )}

      {/* Content Editor */}
      <div className="space-y-6">
        {currentPageData?.sections.map((section) => (
          <div key={section} className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-gray-800 capitalize">
                {section} Section
              </h4>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <HelpCircle size={16} />
                <span>Click Edit to modify content</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {content[selectedPage]?.[section] && Object.entries(content[selectedPage][section]).map(([field, value]) => (
                <div key={field} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-base font-semibold text-gray-700 capitalize">
                      {field === 'title' ? '📝 Title' : field === 'subtitle' ? '📋 Subtitle' : '📄 Content'}
                    </label>
                    <button
                      onClick={() => handleToggleEdit(selectedPage, section, field)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                        isEditing[`${selectedPage}-${section}-${field}`]
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      }`}
                    >
                      {isEditing[`${selectedPage}-${section}-${field}`] ? (
                        <><Eye size={16} /><span>Preview</span></>
                      ) : (
                        <><Edit3 size={16} /><span>Edit</span></>
                      )}
                    </button>
                  </div>
                  
                  {isEditing[`${selectedPage}-${section}-${field}`] ? (
                    field === 'title' || field === 'subtitle' ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleContentChange(selectedPage, section, field, e.target.value)}
                        className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200"
                        placeholder={`Enter ${field}...`}
                      />
                    ) : (
                      <textarea
                        value={value}
                        onChange={(e) => handleContentChange(selectedPage, section, field, e.target.value)}
                        rows={6}
                        className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200 resize-none"
                        placeholder={`Enter ${field}...`}
                      />
                    )
                  ) : (
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
                      {field === 'title' || field === 'subtitle' ? (
                        <h3 className="text-xl font-semibold text-gray-800">
                          {value || `No ${field} added yet...`}
                        </h3>
                      ) : (
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {value || `No content added yet... Click Edit to add content.`}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          <h4 className="font-bold text-blue-800">Quick Tips</h4>
        </div>
        <ul className="text-sm text-blue-700 space-y-2 list-disc list-inside">
          <li>Click "Edit" to modify any text content</li>
          <li>Click "Preview" to see how the content will appear on the website</li>
          <li>Remember to save your changes using the "Save Changes" button</li>
          <li>Use "Reset Default" to restore original content (use with caution)</li>
          <li>Changes appear immediately on the website after saving</li>
        </ul>
      </div>
    </div>
  );
};

export default ContentEditor;
