const emailVerificationTemplate = (otp, name = "User") => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { margin:0; padding:0; background:#f4f4f4; font-family:Arial,Helvetica,sans-serif; }
          .container { max-width:600px; margin:40px auto; background:#fff; padding:30px; border-radius:10px; }
          .logo { text-align:center; font-size:28px; font-weight:bold; }
          .heading { text-align:center; color:#333; }
          .message { color:#555; font-size:16px; line-height:1.6; }
          .otp { text-align:center; margin:30px 0; font-size:32px; font-weight:bold; letter-spacing:8px; color:#2563eb; }
          .footer { margin-top:30px; text-align:center; color:#999; font-size:12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">StudyLoop</div>
          <h2 class="heading">Verify Your Email</h2>
          <p class="message">Hello ${name},</p>
          <p class="message">Use the OTP below to verify your email address.</p>
          <div class="otp">${otp}</div>
          <p class="message">This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
          <p class="message">If you did not request this, you can safely ignore this email.</p>
          <div class="footer">© ${new Date().getFullYear()} StudyLoop. All rights reserved.</div>
        </div>
      </body>
    </html>
  `;
};

module.exports = emailVerificationTemplate;
