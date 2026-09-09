const paymentSuccessEmail = (studentName = "Student", amount, orderId, paymentId) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { margin:0; padding:0; background:#f4f4f4; font-family:Arial,Helvetica,sans-serif; }
          .container { max-width:600px; margin:40px auto; background:#fff; padding:30px; border-radius:10px; }
          .logo { text-align:center; font-size:28px; font-weight:bold; color:#2563eb; }
          .heading { text-align:center; color:#333; }
          .message { color:#555; font-size:16px; line-height:1.6; }
          .success-banner { text-align:center; margin:20px 0; padding:15px; background:#dcfce7; border-radius:8px; }
          .success-text { color:#16a34a; font-size:20px; font-weight:bold; }
          .details-box { margin:25px 0; padding:20px; background:#f1f5f9; border-radius:8px; }
          .details-box table { width:100%; border-collapse:collapse; }
          .details-box td { padding:10px 0; font-size:15px; color:#444; border-bottom:1px solid #e2e8f0; }
          .details-box td:first-child { font-weight:bold; color:#333; width:40%; }
          .details-box tr:last-child td { border-bottom:none; }
          .amount { font-size:22px; font-weight:bold; color:#2563eb; }
          .footer { margin-top:30px; text-align:center; color:#999; font-size:12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">StudyLoop</div>
          <h2 class="heading">Payment Received 🎉</h2>

          <div class="success-banner">
            <div class="success-text"> Payment Successful!</div>
          </div>

          <p class="message">Hello ${studentName},</p>
          <p class="message">
            Thank you for your payment! We have successfully received your payment.
            Here are your transaction details:
          </p>

          <div class="details-box">
            <table>
              <tr>
                <td>Amount Paid</td>
                <td class="amount">₹${amount}</td>
              </tr>
              <tr>
                <td>Order ID</td>
                <td>${orderId}</td>
              </tr>
              <tr>
                <td>Payment ID</td>
                <td>${paymentId}</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>${new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}</td>
              </tr>
            </table>
          </div>

          <p class="message">
            Your enrolled course(s) are now available in your account. Happy Learning! 🚀
          </p>
          <p class="message">
            If you have any questions, feel free to reach out to our support team.
          </p>

          <div class="footer">© ${new Date().getFullYear()} StudyLoop. All rights reserved.</div>
        </div>
      </body>
    </html>
  `;
};

module.exports = paymentSuccessEmail;
