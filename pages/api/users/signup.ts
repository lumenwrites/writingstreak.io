import handler from "backend/handler"
import dbConnect from "backend/dbConnect"
import User from "backend/models/User"
import jwt from 'jwt-simple'

async function signup(req, res) {
  const { email } = req.body
  if (!email || !email.trim()) return res.json({ error: 'Email is required.' })

  await dbConnect()

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.json({ error: "User with this email already exists." })
    const user = await User.create({ email })
    const token = jwt.encode({ email }, process.env.JWT_SECRET)
    console.log('[api/users/signup] created user, sending token', user.email)
    res.json({ token })
  } catch (error) {
    console.log('[api/users/signup] error', error)
    res.json({ error })
  }
}

export default handler().post(signup)
