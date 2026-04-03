// /api/utils.js
// Helper functions for API endpoints

export const enableCORS = (res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
};

export const handlePreflight = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
};

export const sendResponse = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};

export const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({ 
    success: false, 
    error: message 
  });
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
