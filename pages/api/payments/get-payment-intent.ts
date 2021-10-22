// import prisma from 'prisma/prismaClient'
import handler from "backend/handler"
import config from 'config.json'

const stripe = require('stripe')(process.env.STRIPE_SECRET)

async function getPaymentIntent(req, res) {
  const { email } = req.body
  console.log('get payment intent', email)
  // try {
  //   // console.log("post", post)
  //   // console.log('send payment to', post?.author.stripeAccountId)
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: config.price * 100,
  //     currency: 'usd',
  //     payment_method_types: ['card'], //default
  //     // Verify your integration in this guide by including this parameter
  //     metadata: {
  //       integration_check: 'accept_a_payment',
  //       postSlug: req.body.slug,
  //       buyerEmail: req.user.email
  //     },
  //   })
  //   console.log(paymentIntent)
  //   res.status(201).json({ paymentIntentSecert: paymentIntent.client_secret })
  // } catch (error) {
  //   console.log("[get-payment-intent] Error ", error);
  //   res.status(500).json({ error })
  // }
}

export default handler().post(getPaymentIntent)
