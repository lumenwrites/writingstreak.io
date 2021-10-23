import handler from "backend/handler"
import dbConnect from "backend/dbConnect"
import User from "backend/models/User"
import jwt from 'jwt-simple'

async function signup(req, res) {
  const { email } = req.body
  try {
    await dbConnect()
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
