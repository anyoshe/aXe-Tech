// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, contact, organization, service, budget, message } = body;

    // Namecheap PrivateEmail SMTP configuration
    const transporter = nodemailer.createTransport({
      host: 'mail.privateemail.com',
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: 'hello@getaxe.tech',
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    console.log('Attempting to send email via Namecheap PrivateEmail...');

    // Verify connection before sending
    await transporter.verify();
    console.log('SMTP connection to Namecheap verified successfully');

    // Email content
    const mailOptions = {
      from: `"GetAxe.Tech Website" <hello@getaxe.tech>`,
      to: 'hello@getaxe.tech', // Send to yourself
      replyTo: email, // So you can reply directly to the customer
      subject: `🖥️ ICT Inquiry: ${name} - ${service || 'General Inquiry'}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                margin: 0; 
                padding: 0; 
                background: #f4f4f4;
              }
              .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              }
              .header { 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white; 
                padding: 30px 20px; 
                text-align: center; 
              }
              .logo { 
                font-size: 24px; 
                font-weight: bold; 
                margin-bottom: 10px;
              }
              .content { 
                padding: 30px; 
              }
              .field { 
                margin-bottom: 20px; 
                padding-bottom: 20px;
                border-bottom: 1px solid #eee;
              }
              .label { 
                font-weight: bold; 
                color: #667eea; 
                display: block;
                margin-bottom: 5px;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .value { 
                color: #555; 
                font-size: 16px;
              }
              .message-box {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #667eea;
                margin-top: 10px;
              }
              .footer {
                background: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 14px;
                border-top: 1px solid #eee;
              }
              .urgent {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                padding: 10px;
                border-radius: 5px;
                margin-top: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">GetAxe.Tech</div>
                <h1>New ICT Solutions Inquiry</h1>
                <p>Website Contact Form Submission</p>
              </div>
              
              <div class="content">
                <div class="field">
                  <span class="label">Contact Information</span>
                  <div class="value">
                    <strong>${name}</strong><br>
                    📧 ${email}<br>
                    📞 ${contact}
                  </div>
                </div>

                <div class="field">
                  <span class="label">Organization</span>
                  <div class="value">${organization || 'Not provided'}</div>
                </div>

                <div class="field">
                  <span class="label">Service Requested</span>
                  <div class="value">
                    <strong style="color: #667eea;">${service || 'Not specified'}</strong>
                  </div>
                </div>

                <div class="field">
                  <span class="label">Budget Range</span>
                  <div class="value">${budget || 'Not specified'}</div>
                </div>

                <div class="field">
                  <span class="label">Project Details</span>
                  <div class="message-box">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>

                <div class="urgent">
                  ⚡ <strong>Action Required:</strong> Please respond within 24 hours
                </div>
              </div>

              <div class="footer">
                <p>This email was sent from your website contact form at GetAxe.Tech</p>
                <p>📍 Lead Source: Website Contact Form | 🕒 ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New ICT Inquiry from GetAxe.Tech Website

Contact Information:
Name: ${name}
Email: ${email}
Phone: ${contact}

Organization: ${organization || 'Not provided'}

Service Requested: ${service || 'Not specified'}
Budget Range: ${budget || 'Not specified'}

Message:
${message}

---
Sent from GetAxe.Tech website contact form
${new Date().toLocaleString()}
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully via Namecheap:', info.messageId);

    return NextResponse.json(
      { 
        success: true,
        message: 'Email sent successfully to hello@getaxe.tech',
        messageId: info.messageId 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email via Namecheap:', error);
    
    // More detailed error information
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      errorMessage = error.message;
      if (errorMessage.includes('Invalid login')) {
        errorMessage = 'Email authentication failed. Please check your password.';
      } else if (errorMessage.includes('ECONNREFUSED')) {
        errorMessage = 'Cannot connect to Namecheap email server. Please check your SMTP settings.';
      }
    }

    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        provider: 'Namecheap PrivateEmail',
        host: 'mail.privateemail.com',
        port: 587
      },
      { status: 500 }
    );
  }
}