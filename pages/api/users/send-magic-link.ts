import { sendEmail } from 'backend/sendgrid'
import handler from "backend/handler"
import dbConnect from "backend/dbConnect"
import User from "backend/models/User"
import jwt from 'jwt-simple'
import config from 'config.json'

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
    // Generate Auth Token
    const expirationDate = new Date()
    expirationDate.setHours(new Date().getHours() + 2)
    const authToken = jwt.encode({ email, expirationDate }, process.env.JWT_SECRET)
    // Email Token to the User
    const loginLink = `http://localhost:3050/api/users/verify-magic-link?authToken=${authToken}`
    let message = `Click the link below to sign in to your account:<br/>`
    message += `<a href=${loginLink}>Log in!</a><br/>`
    message += `(This link will expire in 2 hours and can only be used once.)`
    sendEmail({ subject: `Adventure Academy Login Link`, message, to: email })
    console.log('[api/users/login] attempting login, sending email', email)
    res.json({ message: "Email is Sent!" })
  } catch (error) {
    console.log('[api/users/send-magic-link] error', error)
    res.json({ error })
  }
}

export default handler().post(login)

