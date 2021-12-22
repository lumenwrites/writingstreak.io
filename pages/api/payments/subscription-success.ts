import moment from 'moment'
import prisma from 'prisma/prismaClient'
import handler from "backend/handler"
import { SubscriptionStatus } from "@prisma/client" // https://stackoverflow.com/questions/68579505/how-to-get-enums-in-prisma-client

const stripe = require('stripe')(process.env.STRIPE_SECRET)

async function Success(req, res) {
  try {
    const { session_id } = req.body
    // Use the session_id returned after the checkout process to fetch stripe customer id and subscription id
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
    // Retreive subscription info: https://stripe.com/docs/api/subscriptions/retrieve?lang=node
    const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription)
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        subscriptionStatus: subscription.status === 'active' ? SubscriptionStatus.STANDARD : undefined,
        stripeCustomerId: checkoutSession.customer,
        stripeSubscriptionId: checkoutSession.subscription,
      },
    })
    const { subscriptionStatus, stripeCustomerId, stripeSubscriptionId, stripeSessionId } = updatedUser
    console.log('Completed checkout, returned to thankyou page, successfully stored data about the stripe subscription', stripeCustomerId)

    res.json({ subscriptionStatus, stripeCustomerId, stripeSubscriptionId, stripeSessionId })
  } catch (error) {
    console.log(error, JSON.stringify(error, null, 2))
    res.json({ error: "Error." })
  }
}

export default handler().post(Success)

