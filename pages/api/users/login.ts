import bcrypt from 'bcryptjs'
import jwt from 'jwt-simple'
import prisma from 'prisma/prismaClient'
import handler from "backend/handler"

async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.json({ error: "User with this email doesn't exist." })
    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) return res.json({ error: "Wrong Password." })
    const token = jwt.encode({email: user.email}, process.env.JWT_SECRET)
    res.json({ token })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

export default handler().post(login)

