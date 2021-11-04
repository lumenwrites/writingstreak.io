import handler from "backend/handler"
import jwt from 'jwt-simple'
import { serialize } from 'cookie'

import config from 'config.json'
import content from 'backend/json/content'
const {firstChapterUrl} = content.courses['adventure-academy']
const dev = process.env.NODE_ENV === 'development'

async function verify(req, res) {
  const { authToken } = req.query
  try {
    var { email } = jwt.decode(authToken, process.env.JWT_SECRET)
    console.log("[verify-magic-link] user logged in", email)
    // Save JWT from url into cookies
    res.setHeader('Set-Cookie', serialize('token', authToken, { path: '/' }))
    // Redirect to the first chapter of the course
    const domain = dev ? config.devDomain : config.domain
    res.writeHead(302, {Location: `${domain}/${firstChapterUrl}`})
    res.end()
  } catch (error) {
    console.log('[api/users/verify-magic-link] error', error)
    res.json({ error })
  }
}

export default handler().get(verify)

