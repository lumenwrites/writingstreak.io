import { sendEmail } from 'backend/sendgrid'
import handler from "backend/handler"
import dbConnect from "backend/dbConnect"
import User from "backend/models/User"
import jwt from 'jwt-simple'
import config from 'config.json'
const dev = process.env.NODE_ENV === 'development'

// If the user with this email exists in the database, I send them a link with JWT.
// /api/users/verify-magic-link takes token from the link, saves it into a cookie, redirects to the first chapter
// pages run getUser(), which takes the token from the cookie, decodes it, sends back the email.
// The ONLY time I check the user against the db is before sending an email. After that it's just putting it into a cookie.
async function login(req, res) {
  const { email } = req.body
  if (!email || !email.trim()) return res.json({ error: 'Email is required.' })

  try {
    await dbConnect()
    const existingUser = await User.findOne({ email })
    if (!existingUser) return res.json({ error: "User with this email does not exist." })
    // Email Token to the User
    const authToken = jwt.encode({ email }, process.env.JWT_SECRET)
    const domain = dev ? config.devDomain : config.domain
    const loginLink = `${domain}/api/users/verify-magic-link?authToken=${authToken}`
    sendEmail({
      subject: `Adventure Academy Login Link`,
      message: `Click <a href="${loginLink}">this link</a> to sign in to your account.`,
      to: email
    })
    console.log('[api/users/login] attempting login, sending email to', email)
    res.json({ message: "Email is Sent!" })
  } catch (error) {
    console.log('[api/users/send-magic-link] error', error)
    res.json({ error })
  }
}

export default handler().post(login)

