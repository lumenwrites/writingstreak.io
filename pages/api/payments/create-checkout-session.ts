import handler from "backend/handler"
import config from 'config.json'

const dev = process.env.NODE_ENV === 'development'
const domain = dev ? config.devDomain : config.domain

const stripe = require('stripe')(process.env.STRIPE_SECRET)

async function CreateCheckoutSession(req, res) {
  try {
    // https://stripe.com/docs/billing/quickstart
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: process.env.PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer_email: req.user.email,
      success_url: `${domain}/api/payments/subscription-success?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/payments/cancelled?canceled=true`,
    });
  
    res.redirect(303, session.url);
    // res.json({ client_secret })
  } catch (error) {
    console.log(error)
    res.json({ error: "Checkout error." })
  }
}

export default handler().get(CreateCheckoutSession)

