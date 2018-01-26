import nodemailer from 'nodemailer';


const from = '"Bookworm" <info@bookworm.com>';

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "734fe55b231010",
      pass: "99d74fa536dc71"
    }
  });

  export function sendConfirmationEmail(user) {
      const transport = setup();
      const email = {
          from,
          to: user.email,
          subject: "Welcome to Bookworm",
          text: '
          hello in bokwoorm. Please confirm your email.
          
          ${user.generateConfirmationUrl}
          '
      }
  }

  transport.sendMail(email);