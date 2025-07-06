import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password for Gmail
    },
  });
};

// Email templates
const emailTemplates = {
  volunteer: (data) => ({
    subject: 'New Volunteer Application Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6F00;">New Volunteer Application</h2>
        <p>A new volunteer application has been submitted:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.email}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Gender:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.gender}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Date of Birth:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${new Date(data.dob).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Interests:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${Array.isArray(data.interests) ? data.interests.join(', ') : data.interests}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Availability:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.availability}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Experience:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.experience}</td>
          </tr>
          ${data.reference ? `
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Reference:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.reference}</td>
          </tr>
          ` : ''}
        </table>
        
        <p style="margin-top: 20px; color: #666;">
          Please review this application in your HR dashboard.
        </p>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            This is an automated notification from Drops of Change NGO website.
          </p>
        </div>
      </div>
    `,
  }),

  intern: (data) => ({
    subject: 'New Internship Application Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6F00;">New Internship Application</h2>
        <p>A new internship application has been submitted:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.email}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Gender:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.gender}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Date of Birth:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${new Date(data.dob).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Course:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.course}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">College:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.college}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Duration:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.duration}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Interests:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${Array.isArray(data.interests) ? data.interests.join(', ') : data.interests}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Availability:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.availability}</td>
          </tr>
          ${data.reference ? `
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Reference:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.reference}</td>
          </tr>
          ` : ''}
        </table>
        
        <p style="margin-top: 20px; color: #666;">
          Please review this application in your HR dashboard.
        </p>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            This is an automated notification from Drops of Change NGO website.
          </p>
        </div>
      </div>
    `,
  }),

  donation: (data) => ({
    subject: 'New Donation Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6F00;">New Donation Received</h2>
        <p>A new donation has been submitted:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Donor Name:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.donorName || 'Anonymous'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.email || 'Not provided'}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Amount:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">₹${data.amount}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Payment Method:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.paymentMethod || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Transaction ID:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.transactionId || 'Not provided'}</td>
          </tr>
          ${data.message ? `
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.message}</td>
          </tr>
          ` : ''}
        </table>
        
        ${data.screenshotPath ? `
        <div style="margin: 20px 0;">
          <p style="font-weight: bold;">Payment Screenshot:</p>
          <img src="${data.screenshotPath}" alt="Payment Screenshot" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 5px;">
        </div>
        ` : ''}
        
        <p style="margin-top: 20px; color: #666;">
          Please verify this donation in your admin dashboard.
        </p>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            This is an automated notification from Drops of Change NGO website.
          </p>
        </div>
      </div>
    `,
  }),

  contact: (data) => ({
    subject: 'New Contact Form Submission',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF6F00;">New Contact Message</h2>
        <p>A new contact form has been submitted:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.email}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Subject:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.subject || 'General Inquiry'}</td>
          </tr>
        </table>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #FF6F00;">Message:</h3>
          <div style="padding: 15px; background-color: #f8f9fa; border-radius: 5px; border-left: 4px solid #FF6F00;">
            ${data.message}
          </div>
        </div>
        
        <p style="margin-top: 20px; color: #666;">
          Please respond to this inquiry at your earliest convenience.
        </p>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            This is an automated notification from Drops of Change NGO website.
          </p>
        </div>
      </div>
    `,
  }),
};

// Send email function
export const sendNotificationEmail = async (type, data) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates[type];
    
    if (!template) {
      throw new Error(`Email template not found for type: ${type}`);
    }

    const emailContent = template(data);
    const recipients = ['hr.dropsofchange@gmail.com', 'dropsofchange4@gmail.com'];

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipients,
      subject: emailContent.subject,
      html: emailContent.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export default {
  sendNotificationEmail,
};
