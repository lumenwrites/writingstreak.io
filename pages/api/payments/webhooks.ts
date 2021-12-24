// https://stripe.com/docs/billing/quickstart
import moment from 'moment'
import prisma from 'prisma/prismaClient'
import handler from "backend/handler"
import { sendEmail } from 'backend/sendgrid'
import { SubscriptionStatus } from "@prisma/client" // https://stackoverflow.com/questions/68579505/how-to-get-enums-in-prisma-client

const stripe = require('stripe')(process.env.STRIPE_SECRET)

async function webhooks(req, res) {
  const event = req.body
  console.log('[webhooks] event', event.type)
  // const event = verifyEvent(req, res)
  // if (!event) res.status(400).end() // returns false if verification has failed
  let customer, subscription, status
  // Handle the event
  switch (event.type) {
    case 'customer.subscription.updated':
      subscription = event.data.object;
      handleSubscriptionUpdated(subscription)
      break;
    case 'customer.subscription.deleted':
      subscription = event.data.object;
      status = subscription.status;
      console.log(`Subscription status is ${status}.`);
      // handleSubscriptionDeleted(subscriptionDeleted);
      break;
    default:
      break;
    // console.log(`Unhandled event type ${event.type}.`);
  }
  // Return a 200 res to acknowledge receipt of the event
  res.status(200).end()
}

async function handleSubscriptionUpdated(subscription) {
  console.log(`[handleSubscriptionUpdated] Subscription status is ${subscription.status}.`, subscription.id)
  if (subscription.status === 'active') {
    const customer = await stripe.customers.retrieve(subscription.customer)
    console.log('Retreived customer', customer.email)
    const updatedUser = await prisma.user.update({
      where: { email: customer.email },
      data: {
        subscriptionStatus: SubscriptionStatus.STANDARD,
        subscriptionExpires: moment.unix(subscription.current_period_end).toDate(),
        stripeCustomerId: subscription.customer,
        stripeSubscriptionId: subscription.id,
      },
    })
    console.log('Webhooks updated the user', updatedUser.email, updatedUser.subscriptionStatus)
  }
}

export default handler().post(webhooks)


// case 'customer.created':
//   customer = event.data.object;
//   handleCustomerCreated(customer)
//   break;
// async function handleCustomerCreated(customer) {
//   console.log('Customer created', customer)
// }


// case 'customer.subscription.created':
//   subscription = event.data.object;
//   status = subscription.status;
//   console.log(`Subscription status is ${status}.`);
//   // Then define and call a method to handle the subscription created.
//   // handleSubscriptionCreated(subscription);
//   break;

// export const config = {
//   api: {
//     bodyParser: false
//   }
// }
// export default webhooks 

// function verifyEvent(req, res) {
//   let event = req.body
//   console.log('[webhooks verifyEvent]', event)
//   const endpointSecret = process.env.WEBHOOK_ENDPOINT_SECRET;
//   // Only verify the event if you have an endpoint secret defined.
//   // Otherwise use the basic event deserialized with JSON.parse
//   if (endpointSecret) {
//     // Get the signature sent by Stripe
//     const signature = req.headers['stripe-signature'];
//     console.log('endpointSecret', endpointSecret)
//     console.log('signature', signature)
//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         signature,
//         endpointSecret
//       );
//     } catch (err) {
//       console.log(`Webhook signature verification failed.`, err.message);
//       return false
//     }
//   }
//   return event
// }
