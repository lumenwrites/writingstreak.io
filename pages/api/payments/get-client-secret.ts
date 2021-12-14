// Use Subscription ID to get client_secret so that I could render the PaymentElement in PurchaseModal.
import handler from "backend/handler"

// AuthContext requests a user when the app loads to know if I'm logged in
// handler takes JWT from cookies, finds user in the db, attaches it to req
async function getClientSecret(req, res) {
  try {
    const { stripe_subscription_id } = req.user
    const client_secret = 'abc' // await 
    res.json({ client_secret })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

export default handler().get(getClientSecret)

