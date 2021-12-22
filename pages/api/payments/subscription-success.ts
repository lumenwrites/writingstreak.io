import moment from 'moment'
import prisma from 'prisma/prismaClient'
import handler from "backend/handler"
import { SubscriptionStatus } from "@prisma/client" // https://stackoverflow.com/questions/68579505/how-to-get-enums-in-prisma-client

const stripe = require('stripe')(process.env.STRIPE_SECRET)

async function Success(req, res) {
  try {
    const { success, session_id } = req.query
    // Use the session_id returned after the checkout process to fetch stripe customer id and subscription id
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
    // Retreive subscription info: https://stripe.com/docs/api/subscriptions/retrieve?lang=node
    const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription)
    // TODO Gotta verify if it's active, and if not - redirect the user to cancelled?
    // Like, if subscription fails because of wrong credit card or insufficient funds: https://stripe.com/docs/billing/subscriptions/overview
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        subscriptionStatus: subscription.status === 'active' ? SubscriptionStatus.STANDARD : undefined,
        stripeCustomerId: checkoutSession.customer,
        stripeSubscriptionId: checkoutSession.subscription,
      },
    })
    const { subscriptionStatus, stripeCustomerId, stripeSubscriptionId } = updatedUser
    console.log('[subscription-success] Completed checkout, redirected here, stored stripe data', stripeCustomerId)
    // res.json({ subscriptionStatus, stripeCustomerId, stripeSubscriptionId })
    res.redirect(303, '/payments/thankyou');
  } catch (error) {
    console.log(error, JSON.stringify(error, null, 2))
    res.json({ error: "Error." })
  }
}

export default handler().get(Success)

