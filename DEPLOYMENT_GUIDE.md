# Deployment & Backend Integration Guide

## Quick Start

### 1. **Deploy on Vercel (Frontend Only - Now)**

#### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

#### Step 2: Deploy
```bash
vercel
```

#### Step 3: Login & Connect GitHub
- Login to your Vercel account
- Connect your GitHub repository
- Vercel will auto-deploy on push

**Your site is live at:** `https://yourdomain.vercel.app`

---

### 2. **Add Backend Later (Same Repository)**

The backend structure is already set up! Just follow these steps:

#### Step 1: Update Contact Form (Already Done!)
✅ Contact.jsx now has a working form
✅ When backend is ready, uncomment the API call

#### Step 2: Set Up Email Service (Choose One)

**Option A: Using SendGrid (Recommended)**
```bash
npm install @sendgrid/mail
```

Update `/api/contact.js`:
```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  // ... CORS setup ...
  
  if (req.method === 'POST') {
    try {
      const { name, email, phone, message, subject } = req.body;

      await sgMail.send({
        to: 'madhuban02020@gmail.com',
        from: 'noreply@yourdomain.com',
        replyTo: email,
        subject: `New Contact Form: ${subject || 'No Subject'}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      });

      return res.status(200).json({ 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon!' 
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send email' 
      });
    }
  }
};
```

**Option B: Using Nodemailer**
```bash
npm install nodemailer
```

**Option C: Using AWS SES**
```bash
npm install aws-sdk
```

#### Step 3: Add Environment Variables to Vercel

1. Push updated code to GitHub
2. Go to Vercel Dashboard → Your Project
3. Settings → Environment Variables
4. Add:
   ```
   SENDGRID_API_KEY=your_key_here
   ```

#### Step 4: Enable API Route in Contact Form

Open `src/pages/Contact.jsx` and uncomment:
```javascript
// Uncomment this when backend is ready:
const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
const response = await fetch(`${apiUrl}/api/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

---

## Step-by-Step: Complete Deployment

### Week 1: Deploy Frontend

**Monday:**
1. Create GitHub repo (if not already)
2. Push code: `git push`

**Tuesday:**
1. Sign up on Vercel (free)
2. Connect GitHub
3. Deploy with `vercel` command

**Wednesday:**
1. Test website on mobile
2. Fix any responsive issues

**Deployed! 🎉**

---

### Week 2-3: Add Backend (Optional)

**Monday:**
1. Choose email service (SendGrid recommended)
2. Create account & get API key

**Tuesday:**
1. Install required packages: `npm install @sendgrid/mail`
2. Update `/api/contact.js` with email logic
3. Test locally: `npm run dev`

**Wednesday:**
1. Add environment variable to Vercel dashboard
2. Uncomment API call in Contact.jsx
3. Push to GitHub

**Thursday:**
1. Test contact form submission
2. Verify emails received

**Backend Live! 🎉**

---

## Directory Structure After Setup

```
cep-madhuban/
├── src/
│   ├── pages/
│   │   ├── Contact.jsx          ✅ Updated with form
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Programs.jsx
│   │   └── Gallery.jsx
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── api/                         ✅ Backend ready
│   ├── contact.js              ✅ Contact endpoint
│   ├── programs.js             (Future)
│   ├── utils.js                ✅ Helper functions
│   └── README.md               ✅ API docs
├── public/
│   └── assets/
│       └── images/
├── vercel.json                  ✅ Deployment config
├── .env.example                 ✅ Environment template
├── package.json
├── vite.config.js
├── index.html
└── RESPONSIVE_DESIGN_SUMMARY.md ✅ Design docs
```

---

## Environment Variables Reference

### Development (.env.local)
```env
# Optional - for testing against local backend
VITE_API_URL=http://localhost:3000
```

### Production (Vercel Dashboard)
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
# OR
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
# OR your email service credentials
```

---

## Testing Checklist

### Frontend (Deployed)
- [ ] Website loads at yourdomain.vercel.app
- [ ] All pages are responsive (mobile, tablet, desktop)
- [ ] Navigation works
- [ ] Images load
- [ ] Contact form appears

### Backend (After Setup)
- [ ] Contact form submits without error
- [ ] Email received at madhuban02020@gmail.com
- [ ] Form resets after submission
- [ ] Error handling works
- [ ] Loading state shows while submitting

---

## Useful Links

- **Vercel Docs:** https://vercel.com/docs
- **Vercel API Reference:** https://vercel.com/docs/concepts/functions/serverless-functions
- **SendGrid:** https://sendgrid.com
- **Nodemailer:** https://nodemailer.com
- **GitHub:** https://github.com

---

## Common Issues & Solutions

### Issue 1: Form doesn't submit after uncommenting API call
**Solution:**
- Check VITE_API_URL environment variable
- Check browser console for errors
- Verify API endpoint exists

### Issue 2: Emails not sending
**Solution:**
- Check SendGrid API key is correct
- Verify from email is authorized in SendGrid
- Check Vercel function logs for errors

### Issue 3: CORS errors
**Solution:**
- API already has CORS headers configured
- If issues persist, check browser console
- Update allowed origins in `/api/utils.js`

### Issue 4: Environment variable not working
**Solution:**
- Restart Vercel deployment after adding vars
- Check variable name matches code
- Test with dummy value first

---

## Next Steps After Deployment

1. ✅ Set up custom domain
2. ✅ Configure email service
3. ✅ Add analytics (Google Analytics)
4. ✅ Add form validation
5. ✅ Add admin dashboard
6. ✅ Add blog/news section
7. ✅ Add donation functionality
8. ✅ Add volunteer signup

---

## Need Help?

- Check `/api/README.md` for API documentation
- Review `vercel.json` for deployment config
- See `.env.example` for environment variables
- Test locally with `npm run dev`

**Happy Deploying! 🚀**
