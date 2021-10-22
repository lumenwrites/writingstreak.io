// import prisma from 'prisma/prismaClient'
// import handler from "backend/handler"
// import { sendEmail } from 'backend/sendgrid'

// const stripe = require('stripe')(process.env.STRIPE_SECRET)

async function webhooks(req, res) {
  const event = req.body
  console.log('[webhooks]', event)
  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('payment_intent.succeeded', event)
      handleSuccessfulPayment(event.data)
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }
  res.status(200).end()
}

// export default handler().post(webhooks)

async function handleSuccessfulPayment(data) {
  // Store the email in the database (just in case it didn't work right away)
  // Send "payment successful" email with a login link
  // Send me an email payment notification
}

