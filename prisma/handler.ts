import 'dotenv/config'
import nextConnect from "next-connect"
import prisma from '@prisma/client'
import jwt from 'jwt-simple'

import * as cookie from 'cookie'

export async function getUser(req) {
  const { token } = req.cookies // jwt token
  if (!token) return false // if not logged in
  var decodedToken = jwt.decode(token, process.env.JWT_SECRET)
  // const user = await prisma.user.findUnique({ where: { email: decodedToken.email } })
  // console.log('ssr user', user)
  // return user
}


// https://www.youtube.com/watch?v=TvCu_oK083U
async function authMiddleware(req, res, next) {
  const user = await getUser(req)
  if (!user) return next()
  req.user = user // attach user to the request
  // console.log("[authMiddleware] attaching user", user.email)
  next()
}

export function onError(err, req, res, next) {
  console.log("[connectErrors onError]", err)
  res.status(501).json({ error: err.toString() })
}

export function onNoMatch(req, res) {
  console.log("[connectErrors onNoMatch]", req.method)
  res.status(405).json({ error: `Wrong request type. Method ${req.method} not allowed.` })
}

// https://www.npmjs.com/package/next-connect
// common errors - can't use the same instance
export default function base() {
  return nextConnect({ onError, onNoMatch }).use(authMiddleware)
}

