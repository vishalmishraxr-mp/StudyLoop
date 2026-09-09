const courseEnrollmentEmail = (courseName, studentName = "Student") => {
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
          .course { margin:25px 0; padding:20px; background:#f1f5f9; border-radius:8px; text-align:center; }
          .course-name { font-size:20px; font-weight:bold; color:#2563eb; }
          .success { text-align:center; color:#16a34a; font-size:18px; font-weight:bold; }
          .footer { margin-top:30px; text-align:center; color:#999; font-size:12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">StudyLoop</div>
          <h2 class="heading">Course Enrollment Successful 🎉</h2>
          <p class="message">Hello ${studentName},</p>
          <p class="message">Congratulations! You have successfully enrolled in:</p>
          <div class="course"><div class="course-name">${courseName}</div></div>
          <p class="success">Your course is now available in your account.</p>
          <p class="message">Happy Learning! 🚀</p>
          <div class="footer">© ${new Date().getFullYear()} StudyLoop. All rights reserved.</div>
        </div>
      </body>
    </html>
  `;
};

module.exports = courseEnrollmentEmail;
