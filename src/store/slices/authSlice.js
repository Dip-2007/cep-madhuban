import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  safeJSONParse,
  safeJSONStringify,
  checkRateLimit,
  recordFailedLogin,
  clearLoginAttempts,
  generateCSRFToken,
  sanitizeInput,
} from '../../utils/security';
import { AUTH_CONFIG, ERROR_MESSAGES, STORAGE_KEYS } from '../../constants';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Check rate limiting
      const rateLimit = checkRateLimit();
      if (!rateLimit.allowed) {
        const minutes = Math.ceil(rateLimit.remainingTime / 60000);
        return rejectWithValue(
          `${ERROR_MESSAGES.AUTH.TOO_MANY_ATTEMPTS} Try again in ${minutes} minutes.`
        );
      }

      // Sanitize inputs
      const sanitizedUsername = sanitizeInput(username);
      const sanitizedPassword = sanitizeInput(password);

      // Validate inputs
      if (!sanitizedUsername || !sanitizedPassword) {
        return rejectWithValue(ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD);
      }

      // Get credentials from environment variables
      const validUsername = import.meta.env.VITE_ADMIN_USERNAME;
      const validPassword = import.meta.env.VITE_ADMIN_PASSWORD;

      // Validate environment configuration
      if (!validUsername || !validPassword) {
        console.error('Admin credentials not configured in environment variables');
        return rejectWithValue(
          'Authentication system not configured. Please contact administrator.'
        );
      }

      // Check username
      if (sanitizedUsername !== validUsername) {
        recordFailedLogin();
        return rejectWithValue(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
      }

      // Simple string comparison - constant-time not meaningful client-side
      if (sanitizedPassword !== validPassword) {
        recordFailedLogin();
        return rejectWithValue(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
      }

      // Create session
      const session = {
        token: generateCSRFToken(),
        expiresAt: Date.now() + AUTH_CONFIG.SESSION_DURATION,
        createdAt: Date.now(),
      };

      safeJSONStringify(STORAGE_KEYS.AUTH_TOKEN, session);
      clearLoginAttempts();

      return { token: session.token, expiresAt: session.expiresAt };
    } catch (error) {
      return rejectWithValue(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    }
  }
);

// Check auth status on init
const checkInitialAuth = () => {
  try {
    const session = safeJSONParse(STORAGE_KEYS.AUTH_TOKEN, null);
    if (session && session.token && session.expiresAt) {
      const now = Date.now();
      if (now < session.expiresAt) {
        return {
          isAuthenticated: true,
          token: session.token,
          expiresAt: session.expiresAt,
        };
      }
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }
  } catch (error) {
    console.error('Auth check error:', error);
  }
  return { isAuthenticated: false, token: null, expiresAt: null };
};

const initialAuth = checkInitialAuth();

const initialState = {
  isAuthenticated: initialAuth.isAuthenticated,
  token: initialAuth.token,
  sessionExpiry: initialAuth.expiresAt,
  csrfToken: generateCSRFToken(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.sessionExpiry = null;
      state.csrfToken = generateCSRFToken();
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    },
    clearError: (state) => {
      state.error = null;
    },
    updateCSRFToken: (state) => {
      state.csrfToken = generateCSRFToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.sessionExpiry = action.payload.expiresAt;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, updateCSRFToken } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectCSRFToken = (state) => state.auth.csrfToken;
export const selectSessionExpiry = (state) => state.auth.sessionExpiry;

export default authSlice.reducer;
