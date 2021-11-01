//@ts-nocheck
import handler from "backend/handler"
import config from 'config.json'

const stripe = require('stripe')(process.env.STRIPE_SECRET)

async function getPaymentIntent(req, res) {
  const { email, discountCode } = req.body
  console.log('[getPaymentIntent]', email)
  let price = config.price
  if (discountCode === "free") price = 0
  if (discountCode === "halfprice2021") price /= 2
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100,
      currency: 'usd',
      payment_method_types: ['card'], //default
      metadata: { email },
    })
    // console.log('[getPaymentIntent] paymentIntent', paymentIntent)
    res.status(201).json({ paymentIntentSecert: paymentIntent.client_secret })
  } catch (error) {
    console.log("[get-payment-intent] Error ", error);
    res.status(500).json({ error })
  }
}

export default handler().post(getPaymentIntent)
