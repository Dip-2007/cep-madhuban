import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  logout,
  clearError,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError,
  selectCSRFToken,
  selectSessionExpiry,
} from '../store/slices/authSlice';
import { ERROR_MESSAGES } from '../constants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const csrfToken = useSelector(selectCSRFToken);
  const sessionExpiry = useSelector(selectSessionExpiry);

  // Session expiry check interval
  useEffect(() => {
    if (!sessionExpiry) return;

    const interval = setInterval(() => {
      const now = Date.now();
      // Check expiry directly using current time
      if (now >= sessionExpiry) {
        dispatch(logout());
        // Use a non-blocking notification instead of alert
        console.warn(ERROR_MESSAGES.AUTH.SESSION_EXPIRED);
        // Dispatch custom event for UI notification
        window.dispatchEvent(
          new CustomEvent('sessionExpired', {
            detail: { message: ERROR_MESSAGES.AUTH.SESSION_EXPIRED },
          })
        );
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [sessionExpiry, dispatch]);

  const handleLogin = async (username, password) => {
    const result = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(result)) {
      return { success: true };
    } else {
      return { success: false, error: result.payload };
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const value = {
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    csrfToken,
    sessionExpiry,
    error,
    clearError: handleClearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
