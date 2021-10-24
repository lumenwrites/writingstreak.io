import handler from "backend/handler"
import dbConnect from "backend/database/dbConnect"
import User from "backend/database/models/User"
import jwt from 'jwt-simple'

async function getUserByEmail(req, res) {
  const { email } = req.body
  if (!email || !email.trim()) return res.json({ error: 'Email is invalid.' })
  try {
    await dbConnect()
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.json(
      { error: "You have already purchased this course. Login to your account to access the content." }
    )
    res.json({ message: "No user found, you may proceed with the purchase." })
  } catch (error) {
    console.log('[api/users/getUserByEmail] error', error)
    res.json({ error })
  }
}

export default handler().post(getUserByEmail)

