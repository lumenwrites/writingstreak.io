// @ts-nocheck
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendEmail({ subject, message, to }) {
  const msg = {
    to: to,
    from: 'lumenwrites@gmail.com',
    subject: subject,
    // text: message,
    html: message,
  }
  console.log('Sending email', msg)
  try {
    const response = await sgMail.send(msg)
    console.log('Email sent', msg)
  } catch (e) {
    console.log('Email sending error', e)
  }
  
}

// sendEmail({
//   subject: 'Payment successful',
//   message: 'payment successful!!',
//   to: 'raymestalez@gmail.com'
// })
