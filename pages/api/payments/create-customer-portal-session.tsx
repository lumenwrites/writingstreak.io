import handler from 'backend/handler'
import prisma from 'prisma/prismaClient'
import config from 'config.json'

const dev = process.env.NODE_ENV === 'development'
const domain = dev ? config.devDomain : config.domain

const stripe = require('stripe')(process.env.STRIPE_SECRET)

async function CreateCheckoutSession(req, res) {
  try {
    // https://stripe.com/docs/billing/quickstart
    // stripeCustomerId is saved in subscription-success after the user completes checkout and returns to the thank you page
    // Now I can use this customerId to let them edit their subscription
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: req.user.stripeCustomerId,
      return_url: `${domain}/user/settings`,
    })
    res.redirect(303, portalSession.url)
  } catch (error) {
    console.log(error)
    res.json({ error: 'Creatign portal session error.' })
  }
}

export default handler().get(CreateCheckoutSession)
