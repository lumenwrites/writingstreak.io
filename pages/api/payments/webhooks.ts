import handler from "backend/handler"
import dbConnect from "backend/dbConnect"
import User from "backend/models/User"
import jwt from 'jwt-simple'

import { sendEmail } from 'backend/sendgrid'
const stripe = require('stripe')(process.env.STRIPE_SECRET)
import config from 'config.json'
const dev = process.env.NODE_ENV === 'development'

async function webhooks(req, res) {
  const event = req.body
  console.log('[webhooks]', event)
  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('payment_intent.succeeded') // , event)
      handleSuccessfulPayment(event.data)
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }
  res.status(200).end()
}

export default handler().post(webhooks)

async function handleSuccessfulPayment(data) {
  const { email } = data.object.metadata // comes from get-payment-intent
  console.log('[webhooks] Payment successful', email)
  // Store the email in the database
  // in case it wasn't already created in purchase-successful from the frontend
  try {
    await dbConnect()
    const user = await User.create({ email })
  } catch (error) {
    console.log("[webhooks] error", error)
  }
  // Email Token to the User
  const authToken = jwt.encode({ email }, process.env.JWT_SECRET)
  const domain = dev ? config.devDomain : config.domain
  const loginLink = `${domain}/api/users/verify-magic-link?authToken=${authToken}`
  sendEmail({
    subject: `Thank you for your purchase!`,
    message: `Click <a href="${loginLink}">this link</a> to sign in to your account and start learning!`,
    to: email
  })
  // Send me an email about a successful purchase
  sendEmail({
    subject: `${email} has just purchased Adventure Academy!`,
    message: `${email} has just purchased Adventure Academy!`,
    to: 'raymestalez@gmail.com'
  })
}

