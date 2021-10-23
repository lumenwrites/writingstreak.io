import dbConnect from "backend/dbConnect"
import User from "backend/models/User"
import jwt from 'jwt-simple'

export async function getUser(req) {
  const { token } = req.cookies // jwt token
  if (!token) return false // if not logged in
  var decodedToken = jwt.decode(token, process.env.JWT_SECRET)
  // await dbConnect()
  // const user = await User.findOne({ email: decodedToken.email })
  // console.log('[getUser] ssr user', user)
  // return user
  return { email: decodedToken.email }
}
