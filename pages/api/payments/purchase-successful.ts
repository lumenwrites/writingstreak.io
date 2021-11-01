import handler from "backend/handler"
import dbConnect from "backend/database/dbConnect"
import User from "backend/database/models/User"
import jwt from 'jwt-simple'
import { sendEmail } from 'backend/sendgrid'

async function purchaseSuccessful(req, res) {
  const { email, discountCode } = req.body
  try {
    await dbConnect()
    const user = await User.create({ email })
    const token = jwt.encode({ email }, process.env.JWT_SECRET)
    console.log('[api/users/purchase-successful] created user, sending token', user.email)
    sendEmail({
      subject: `purchaseSuccessful ${user.email}, ${discountCode}`,
      message: `purchaseSuccessful ${user.email}, ${discountCode}`,
      to: 'raymestalez@gmail.com'
    })
    res.json({ token })
  } catch (error) {
    console.log('[api/users/purchase-successful] error', error)
    res.json({ error })
  }
}

export default handler().post(purchaseSuccessful)
