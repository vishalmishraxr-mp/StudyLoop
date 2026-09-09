const passwordUpdate = (resetLink, name = "User") => {
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
          .button-container { text-align:center; margin:30px 0; }
          .button { display:inline-block; padding:14px 25px; background:#2563eb; color:#fff !important; text-decoration:none; border-radius:6px; font-weight:bold; }
          .footer { margin-top:30px; text-align:center; color:#999; font-size:12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">StudyLoop</div>
          <h2 class="heading">Update Your Password</h2>
          <p class="message">Hello ${name},</p>
          <p class="message">We received a request to update your password. Click the button below to continue.</p>
          <div class="button-container">
            <a href="${resetLink}" class="button">Update Password</a>
          </div>
          <p class="message">This link is valid for 5 minutes. If you did not request this, please ignore this email.</p>
          <div class="footer">© ${new Date().getFullYear()} StudyLoop. All rights reserved.</div>
        </div>
      </body>
    </html>
  `;
};

module.exports = passwordUpdate;
