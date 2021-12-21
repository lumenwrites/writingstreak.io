import prisma from 'prisma/prismaClient'
import handler from "backend/handler"

const stripe = require('stripe')(process.env.STRIPE_SECRET)

async function Success(req, res) {
  try {
    const { session_id } = req.body
    // Use the session_id returned after the checkout process to fetch stripe customer id and subscription id
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        stripeCustomerId: checkoutSession.customer,
        stripeSubscriptionId: checkoutSession.subscription,
        stripeSessionId: session_id,
      },
    })
    const { stripeCustomerId, stripeSubscriptionId, stripeSessionId } = updatedUser
    console.log('Completed checkout, returned to thankyou page, successfully stored data about the stripe subscription', stripeCustomerId)
    res.json({ stripeCustomerId, stripeSubscriptionId, stripeSessionId })
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    res.json({ error: "Error." })
  }
}

export default handler().post(Success)

