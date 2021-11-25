import { sendEmail } from 'backend/sendgrid';
import bcrypt from 'bcryptjs'
import jwt from 'jwt-simple'
import prisma from 'prisma/prismaClient'
import handler from "backend/handler"
import config from 'config.json'

// LoginModal sends me username/email/password,
// I hash password, create user, send back the token.
// Client saves token into cookies. AuthContext uses it to fetch user.
async function signUp(req, res) {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    })
    const token = jwt.encode({ email: user.email }, process.env.JWT_SECRET)
    res.json({ token })
    sendEmail({
      subject: `${username} signed up to ${config.title}!`,
      message: `${username} signed up to ${config.title}. <br/> Email: ${email}`,
      to: 'raymestalez@gmail.com', // buyer.email
    })
  } catch (error) {
    console.log('[signup error]', error)
    if (error.code === 'P2002') res.json({ error: "User with this email already exists." })
  }
}

export default handler().post(signUp)
