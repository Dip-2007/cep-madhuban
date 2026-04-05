import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { safeJSONParse, safeJSONStringify, sanitizeInput } from '../../utils/security';
import { VALIDATION, ERROR_MESSAGES, SUCCESS_MESSAGES, STORAGE_KEYS } from '../../constants';

// Async thunk for saving content
export const saveContent = createAsyncThunk(
  'content/saveContent',
  async (content, { rejectWithValue }) => {
    try {
      const success = safeJSONStringify(STORAGE_KEYS.WEBSITE_CONTENT, content);
      if (!success) {
        return rejectWithValue(ERROR_MESSAGES.STORAGE.SAVE_ERROR);
      }
      return SUCCESS_MESSAGES.SAVE_SUCCESS;
    } catch (error) {
      return rejectWithValue(ERROR_MESSAGES.STORAGE.SAVE_ERROR);
    }
  }
);

// Async thunk for resetting to default
export const resetToDefault = createAsyncThunk(
  'content/resetToDefault',
  async (defaultContent, { rejectWithValue }) => {
    try {
      const success = safeJSONStringify(STORAGE_KEYS.WEBSITE_CONTENT, defaultContent);
      if (!success) {
        return rejectWithValue(ERROR_MESSAGES.STORAGE.SAVE_ERROR);
      }
      return defaultContent;
    } catch (error) {
      return rejectWithValue(ERROR_MESSAGES.STORAGE.SAVE_ERROR);
    }
  }
);

// Load initial content from localStorage
const loadInitialContent = () => {
  const savedContent = safeJSONParse(STORAGE_KEYS.WEBSITE_CONTENT, null);
  return savedContent && typeof savedContent === 'object' ? savedContent : null;
};

export const defaultContent = {
  home: {
    hero: {
      title: 'Welcome to Madhuban NGO',
      subtitle: 'Empowering Every Ability, Enriching Every Life',
      description: 'Join us in our mission to create an inclusive society where individuals with diverse abilities can thrive, grow, and achieve their full potential.'
    },
    about: {
      title: 'About Madhuban',
      content: 'Madhuban is a dedicated non-profit organization working towards the empowerment and inclusion of individuals with special needs. Founded with a vision to create a barrier-free society, we provide comprehensive support services, education, and vocational training to help individuals lead independent and fulfilling lives.'
    },
    mission: {
      title: 'Our Mission',
      content: 'To empower individuals with diverse abilities through education, skill development, and community integration, fostering an inclusive environment where everyone can realize their full potential and contribute meaningfully to society.'
    }
  },
  about: {
    intro: {
      title: 'Our Story',
      content: 'Madhuban began its journey in 2010 with a small group of passionate individuals committed to making a difference in the lives of people with special needs. Over the years, we have grown into a comprehensive support system serving hundreds of families across the region.'
    },
    history: {
      title: 'Our History',
      content: 'From humble beginnings in a small rented space to our current state-of-the-art facility, Madhuban has consistently expanded its services and reach. Each milestone in our journey represents a step towards greater inclusivity and empowerment.'
    },
    team: {
      title: 'Our Team',
      content: 'Our dedicated team comprises special educators, therapists, counselors, and support staff who work tirelessly to create a nurturing environment for our beneficiaries. Together, we bring decades of experience and a shared commitment to excellence.'
    }
  },
  programs: {
    overview: {
      title: 'Our Programs',
      content: 'We offer a comprehensive range of programs designed to meet the diverse needs of individuals with special abilities. From early intervention to vocational training, our services are tailored to empower each participant.'
    },
    initiatives: {
      title: 'Key Initiatives',
      content: 'Education Support: Specialized learning programs adapted to individual needs. Vocational Training: Skill development for employment and independence. Therapy Services: Physical, occupational, and speech therapy. Community Integration: Social activities and community participation programs.'
    }
  },
  gallery: {
    intro: {
      title: 'Our Gallery',
      content: 'Explore moments from our journey. Our gallery showcases the achievements, celebrations, and daily activities that make Madhuban a special place for our community.'
    }
  },
  contact: {
    info: {
      title: 'Contact Information',
      content: 'We are here to help. Reach out to us for any inquiries about our programs, services, or how you can get involved with our mission.'
    },
    form: {
      title: 'Send Us a Message',
      content: 'Have a question or want to learn more? Fill out the form below and our team will get back to you as soon as possible.'
    }
  },
  donate: {
    intro: {
      title: 'Support Our Mission',
      content: 'Your generosity helps us continue our work of empowering individuals with special abilities. Every contribution, no matter the size, makes a meaningful difference in the lives of our beneficiaries.'
    },
    options: {
      title: 'Ways to Give',
      content: 'One-time Donation: Make an immediate impact with a single contribution. Monthly Giving: Provide sustained support through recurring donations. In-Kind Donations: Contribute goods or services that support our programs. Legacy Giving: Include Madhuban in your estate planning.'
    }
  }
};

const initialState = {
  data: loadInitialContent() || defaultContent,
  selectedPage: 'home',
  isEditing: {},
  isSaving: false,
  saveMessage: '',
  hasUnsavedChanges: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSelectedPage: (state, action) => {
      state.selectedPage = action.payload;
    },
    updateContent: (state, action) => {
      const { page, section, field, value } = action.payload;
      
      // Sanitize input
      const sanitizedValue = sanitizeInput(value);
      
      // Validate max length
      const maxLength = field === 'content' ? VALIDATION.MAX_CONTENT_LENGTH : VALIDATION.MAX_TITLE_LENGTH;
      if (sanitizedValue.length > maxLength) {
        state.saveMessage = `⚠️ Maximum ${maxLength} characters allowed`;
        return;
      }
      
      // Deep update content
      if (!state.data[page]) {
        state.data[page] = {};
      }
      if (!state.data[page][section]) {
        state.data[page][section] = {};
      }
      state.data[page][section][field] = sanitizedValue;
      state.hasUnsavedChanges = true;
      state.saveMessage = '';
    },
    toggleEdit: (state, action) => {
      const { page, section, field } = action.payload;
      const key = `${page}-${section}-${field}`;
      state.isEditing[key] = !state.isEditing[key];
    },
    clearSaveMessage: (state) => {
      state.saveMessage = '';
    },
    clearError: (state) => {
      state.error = null;
    },
    setHasUnsavedChanges: (state, action) => {
      state.hasUnsavedChanges = action.payload;
    },
    loadContent: (state) => {
      const savedContent = safeJSONParse(STORAGE_KEYS.WEBSITE_CONTENT, null);
      if (savedContent && typeof savedContent === 'object') {
        state.data = savedContent;
      } else {
        state.data = defaultContent;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveContent.pending, (state) => {
        state.isSaving = true;
        state.saveMessage = '';
      })
      .addCase(saveContent.fulfilled, (state, action) => {
        state.isSaving = false;
        state.saveMessage = action.payload;
        state.hasUnsavedChanges = false;
        state.error = null;
      })
      .addCase(saveContent.rejected, (state, action) => {
        state.isSaving = false;
        state.saveMessage = action.payload;
        state.error = action.payload;
      })
      .addCase(resetToDefault.fulfilled, (state, action) => {
        state.data = action.payload;
        state.saveMessage = '🔄 Content reset to default values!';
        state.hasUnsavedChanges = false;
        state.error = null;
      })
      .addCase(resetToDefault.rejected, (state, action) => {
        state.saveMessage = action.payload;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedPage,
  updateContent,
  toggleEdit,
  clearSaveMessage,
  clearError,
  setHasUnsavedChanges,
  loadContent,
} = contentSlice.actions;

// Selectors
export const selectContent = (state) => state.content.data;
export const selectSelectedPage = (state) => state.content.selectedPage;
export const selectIsEditing = (state) => state.content.isEditing;
export const selectIsSaving = (state) => state.content.isSaving;
export const selectSaveMessage = (state) => state.content.saveMessage;
export const selectHasUnsavedChanges = (state) => state.content.hasUnsavedChanges;
export const selectContentError = (state) => state.content.error;
export const selectCurrentPageData = (state) => state.content.data[state.content.selectedPage];

export default contentSlice.reducer;
