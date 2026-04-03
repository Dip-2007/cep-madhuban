// example: /api/contact.js
// This is a serverless function that will handle contact form submissions
// It will be available at: https://yoursite.com/api/contact

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, message, subject } = req.body;

      // Validation
      if (!name || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          error: 'Name, email, and message are required' 
        });
      }

      // TODO: Add your email service here (SendGrid, Nodemailer, etc.)
      // Example:
      // await sendEmail({
      //   to: 'madhuban02020@gmail.com',
      //   from: email,
      //   subject: `New Contact Form: ${subject || 'No Subject'}`,
      //   html: `
      //     <p><strong>Name:</strong> ${name}</p>
      //     <p><strong>Email:</strong> ${email}</p>
      //     <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      //     <p><strong>Message:</strong> ${message}</p>
      //   `
      // });

      console.log('Contact form submission:', { name, email, phone, message, subject });

      return res.status(200).json({ 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon!' 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to process your request' 
      });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
