import { sendEmail } from 'backend/sendgrid';
import bcrypt from 'bcryptjs'
import jwt from 'jwt-simple'
import prisma from 'prisma/prismaClient'
import handler from "backend/handler"
import config from 'config.json'

// To create the stripe customer as soon as user signs up
// https://stripe.com/docs/billing/subscriptions/build-subscription?ui=elements#create-customer
const stripe = require('stripe')(process.env.STRIPE_SECRET)

// LoginModal sends me username/email/password,
// I hash password, create user, send back the token.
// Client saves token into cookies. AuthContext uses it to fetch user.
async function signUp(req, res) {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    // const { stripe_customer_id, stripe_subscription_id, stripe_current_period_end } = await setUpStripe(email)
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        // stripe_customer_id,
        // stripe_subscription_id,
        // stripe_current_period_end
      },
    })
    const token = jwt.encode({ email: user.email }, process.env.JWT_SECRET)
    res.json({ token })
    sendEmail({
      subject: `${username} signed up to ${config.title}!`,
      message: `${username} signed up to ${config.title}. <br/> Email: ${email}`,
      to: 'raymestalez@gmail.com', // buyer.email
    })
    const emailInput = document.querySelector('#email');


  } catch (error) {
    console.log('[signup error]', error)
    if (error.code === 'P2002') res.json({ error: "User with this email already exists." })
  }
}

async function setUpStripe(email) {
  // Create a new stripe customer
  const customer = await stripe.customers.create({ email })
  // Create subscription https://stripe.com/docs/billing/subscriptions/build-subscription?ui=elements#create-subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: process.env.PRICE_ID }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'], // ???
  })
  return {
    stripe_customer_id: customer.id,
    stripe_subscription_id: subscription.id,
    stripe_current_period_end: subscription.current_period_end
  }
}

export default handler().post(signUp)
