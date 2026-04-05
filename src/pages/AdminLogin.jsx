import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Lock, User, AlertCircle, Shield } from 'lucide-react';
import { sanitizeInput } from '../utils/security';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitError, setRateLimitError] = useState('');
  const [sessionExpired, setSessionExpired] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleSessionExpired = (e) => {
      setSessionExpired(true);
      setError(e.detail.message);
    };
    window.addEventListener('sessionExpired', handleSessionExpired);
    return () => window.removeEventListener('sessionExpired', handleSessionExpired);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setRateLimitError('');
    setIsLoading(true);

    const result = await login(credentials.username, credentials.password);

    if (result.success) {
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from);
    } else {
      setError(result.error);
      if (result.error.includes('Too many failed attempts')) {
        setRateLimitError(result.error);
      }
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setCredentials(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #064e3b 40%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    },
    blob1: {
      position: 'absolute',
      top: '-200px',
      right: '-200px',
      width: '600px',
      height: '600px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
      pointerEvents: 'none',
    },
    blob2: {
      position: 'absolute',
      bottom: '-200px',
      left: '-200px',
      width: '500px',
      height: '500px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
      pointerEvents: 'none',
    },
    card: {
      width: '100%',
      maxWidth: '480px',
      position: 'relative',
      zIndex: 1,
    },
    logoArea: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    logoIcon: {
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #10b981, #0ea5e9)',
      borderRadius: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
      boxShadow: '0 20px 60px rgba(16,185,129,0.4)',
    },
    title: {
      fontSize: '2.25rem',
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
      color: '#ffffff',
      margin: '0 0 0.5rem',
      letterSpacing: '-0.02em',
    },
    subtitle: {
      fontSize: '1rem',
      color: 'rgba(255,255,255,0.6)',
      margin: '0 0 0.25rem',
    },
    subtitleSmall: {
      fontSize: '0.875rem',
      color: 'rgba(255,255,255,0.4)',
      margin: 0,
    },
    formCard: {
      background: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '24px',
      padding: '2.5rem',
      boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
    },
    fieldGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      fontSize: '0.8rem',
      fontWeight: 600,
      color: 'rgba(255,255,255,0.7)',
      marginBottom: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
    inputWrapper: {
      position: 'relative',
    },
    inputIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(255,255,255,0.4)',
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
    },
    input: (focused) => ({
      width: '100%',
      padding: '1rem 1rem 1rem 3rem',
      background: focused ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
      border: focused ? '1.5px solid rgba(16,185,129,0.8)' : '1.5px solid rgba(255,255,255,0.1)',
      borderRadius: '14px',
      color: '#ffffff',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box',
      boxShadow: focused ? '0 0 0 4px rgba(16,185,129,0.15)' : 'none',
    }),
    eyeButton: {
      position: 'absolute',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'rgba(255,255,255,0.4)',
      display: 'flex',
      alignItems: 'center',
      padding: '0.25rem',
      minHeight: 'unset',
    },
    errorBox: {
      background: 'rgba(239,68,68,0.15)',
      border: '1px solid rgba(239,68,68,0.4)',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#fca5a5',
      fontSize: '0.9rem',
    },
    submitBtn: {
      width: '100%',
      padding: '1.1rem',
      background: isLoading
        ? 'rgba(16,185,129,0.5)'
        : 'linear-gradient(135deg, #10b981, #0ea5e9)',
      border: 'none',
      borderRadius: '14px',
      color: '#ffffff',
      fontSize: '1rem',
      fontWeight: 700,
      cursor: isLoading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      letterSpacing: '0.03em',
      boxShadow: '0 8px 32px rgba(16,185,129,0.4)',
      marginTop: '0.5rem',
    },
    devNotice: {
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid rgba(255,255,255,0.08)',
    },
    devBox: {
      background: 'rgba(59,130,246,0.1)',
      border: '1px solid rgba(59,130,246,0.3)',
      borderRadius: '12px',
      padding: '1rem',
    },
    devTitle: {
      fontSize: '0.8rem',
      fontWeight: 600,
      color: '#93c5fd',
      margin: '0 0 0.25rem',
    },
    devText: {
      fontSize: '0.75rem',
      color: 'rgba(147,197,253,0.7)',
      margin: 0,
    },
    footer: {
      textAlign: 'center',
      marginTop: '1.5rem',
      fontSize: '0.8rem',
      color: 'rgba(255,255,255,0.35)',
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2.5px solid rgba(255,255,255,0.3)',
      borderTopColor: '#ffffff',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    },
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        .admin-input::placeholder { color: rgba(255,255,255,0.3); }
        .admin-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(16,185,129,0.5) !important; }
        .admin-eye-btn:hover { color: rgba(255,255,255,0.8) !important; }
      `}</style>

      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoArea}>
          <div style={styles.logoIcon}>
            <Shield size={36} color="#ffffff" />
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Madhuban NGO Admin Panel</p>
          <p style={styles.subtitleSmall}>Manage your website content securely</p>
        </div>

        {/* Form Card */}
        <div style={styles.formCard}>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Username</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  style={styles.input(focusedField === 'username')}
                  className="admin-input"
                  placeholder="Enter your username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...styles.input(focusedField === 'password'), paddingRight: '3rem' }}
                  className="admin-input"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  className="admin-eye-btn"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={styles.errorBox}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              style={styles.submitBtn}
              className="admin-submit-btn"
            >
              {isLoading ? (
                <>
                  <div style={styles.spinner} />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Shield size={18} />
                  <span>Sign In to Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Dev notice */}
          {import.meta.env.DEV && (
            <div style={styles.devNotice}>
              <div style={styles.devBox}>
                <p style={styles.devTitle}>⚡ Development Mode</p>
                <p style={styles.devText}>Configure credentials in your .env file</p>
              </div>
            </div>
          )}
        </div>

        <p style={styles.footer}>Need help? Contact your system administrator</p>
      </div>
    </div>
  );
};

export default AdminLogin;
