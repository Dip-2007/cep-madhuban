# Backend API Structure

This folder contains serverless API functions for the Madhuban NGO website. These functions are automatically deployed to Vercel.

## Available Endpoints

### 1. Contact Form Submission
**File:** `contact.js`
**URL:** `POST /api/contact`
**Description:** Handles contact form submissions

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "subject": "Support Query",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message. We will get back to you soon!"
}
```

---

### 2. Programs (Future Implementation)
**File:** `programs.js`
**URL:** `GET /api/programs`
**Description:** Returns list of all programs

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Special Care Sanctuary",
      "description": "...",
      "icon": "Sun"
    }
  ]
}
```

---

## Development

### Running Locally
```bash
npm run dev
# API available at: http://localhost:3000/api/*
```

### Environment Variables
Create a `.env.local` file:
```env
VITE_API_URL=http://localhost:3000
```

---

## Deployment

### On Vercel
1. Push to GitHub
2. Connect repo to Vercel
3. Vercel automatically detects `/api` folder
4. Functions are deployed automatically

**Live API:** `https://yourdomain.com/api/*`

---

## Integrating with Frontend

### Example: Contact Form
```javascript
// In your React component
const handleSubmit = async (formData) => {
  const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
  
  const response = await fetch(`${apiUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  const data = await response.json();
  if (data.success) {
    alert('Message sent successfully!');
  }
};
```

---

## Future Enhancements

- [ ] Add email service integration (SendGrid, Nodemailer, AWS SES)
- [ ] Add database (MongoDB, PostgreSQL, Firebase)
- [ ] Add authentication
- [ ] Add file upload handling
- [ ] Add admin dashboard API
- [ ] Add analytics API
- [ ] Add donation/payment processing

---

## Useful Resources

- **Vercel Serverless Functions:** https://vercel.com/docs/concepts/functions/serverless-functions
- **Node.js Email Services:**
  - SendGrid: https://sendgrid.com
  - Nodemailer: https://nodemailer.com
  - AWS SES: https://aws.amazon.com/ses/
- **Databases:**
  - MongoDB Atlas: https://www.mongodb.com/cloud/atlas
  - Firebase: https://firebase.google.com
  - PostgreSQL: https://www.postgresql.org

---

## Questions?

Contact your development team or check the main README.md
