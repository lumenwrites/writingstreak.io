import { sendEmail } from 'backend/sendgrid'
import handler from "backend/handler"
import dbConnect from "backend/dbConnect"
import User from "backend/models/User"
import jwt from 'jwt-simple'

async function verify(req, res) {
  const { authToken } = req.body
  try {
    var { email, expirationDate } = jwt.decode(authToken, process.env.JWT_SECRET)
    await dbConnect()
    const existingUser = await User.findOne({ email })
    // check if it hasn't expired
    const token = jwt.encode({ email }, process.env.JWT_SECRET)
    console.log('[api/users/verify-magic-link] Magic link is valid, returning token')
    res.json({ token })
    res.json({ message: "Magic link is valid!", token })
  } catch (error) {
    console.log('[api/users/verify-magic-link] error', error)
    res.json({ error })
  }
}

export default handler().post(verify)

