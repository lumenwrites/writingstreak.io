import handler from "backend/handler"
import jwt from 'jwt-simple'
import { serialize } from 'cookie'

async function verify(req, res) {
  const { authToken } = req.query
  try {
    var { email } = jwt.decode(authToken, process.env.JWT_SECRET)
    console.log("[verify-magic-link] user logged in", email)
    res.setHeader('Set-Cookie', serialize('token', authToken, { path: '/' }));
    res.writeHead(301, {Location: 'http://localhost:3050/section-slug/initial-setup'});
    res.end()
  } catch (error) {
    console.log('[api/users/verify-magic-link] error', error)
    res.json({ error })
  }
}

export default handler().get(verify)

