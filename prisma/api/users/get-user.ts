import nextConnect from "next-connect"
import prisma from 'prisma/prismaClient'
import jwt from 'jwt-simple'

// Used in [username] to check if I'm profile owner
// Also maybe use it in handler to shorten attaching the user to the request
export async function getUser(req) {
  if (!req.cookies.token) return false
  var decodedToken = jwt.decode(req.cookies.token, process.env.JWT_SECRET)
  // console.log(decodedToken)
  const user = await prisma.user.findUnique({ where: { email: decodedToken.email } })
  if (user) return user
  return false
}
