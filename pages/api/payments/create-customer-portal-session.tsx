import handler from 'backend/handler'
import config from 'config.json'

const dev = process.env.NODE_ENV === 'development'
const domain = dev ? config.devDomain : config.domain

const stripe = require('stripe')(process.env.STRIPE_SECRET)

async function CreateCheckoutSession(req, res) {
  try {
    // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    // Typically this is stored alongside the authenticated user in your database.
    // Checkout returns session id:
    const session_id = "cs_test_a19tuJ3G0hcqH8LOKziDWTEJOj29pvdVbxZFeVD6NwurpgvpErw1IDllU7"
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
    console.log('customer', checkoutSession.customer)
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: `${domain}/`, //settings
    })

    res.redirect(303, portalSession.url)
  } catch (error) {
    console.log(error)
    res.json({ error: 'Creatign portal session error.' })
  }
}

export default handler().get(CreateCheckoutSession)
