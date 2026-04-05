import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import contentReducer from './slices/contentSlice';
import mediaReducer from './slices/mediaSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    media: mediaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setSessionExpiry'],
        ignoredPaths: ['auth.sessionExpiry'],
      },
    }),
});

export default store;
