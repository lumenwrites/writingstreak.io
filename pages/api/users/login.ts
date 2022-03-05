import bcrypt from 'bcryptjs'
import jwt from 'jwt-simple'
import prisma from 'prisma/prismaClient'
import handler from "backend/handler"

async function login(req, res) {
  try {
    const { email, password } = req.body
    console.log({ email, password })
    const user = await prisma.user.findUnique({ where: { email } })
    // console.log('user', user)
    if (!user) return res.json({ error: "User with this email doesn't exist." })
    const passwordsMatch = await bcrypt.compare(password, user.password)
    // console.log('passwordsMatch', passwordsMatch);
    if (!passwordsMatch) return res.json({ error: "Wrong Password." })
    const token = jwt.encode({ email: user.email }, process.env.JWT_SECRET)
    // console.log('token')
    res.json({ token })
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    res.json({ error: "Login error." })
  }
}

export default handler().post(login)

