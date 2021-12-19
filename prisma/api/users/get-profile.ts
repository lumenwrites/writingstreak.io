import nextConnect from "next-connect"
import prisma from 'prisma/prismaClient'
import jwt from 'jwt-simple'

// Used in [username] to check if I'm profile owner
// Also maybe use it in handler to shorten attaching the user to the request
export async function getProfile(username) {
  const user = await prisma.user.findUnique({ where: { username } })
  if (user) return user
  return false
}
