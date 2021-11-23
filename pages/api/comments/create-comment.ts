import handler from "backend/handler"
import dbConnect from "backend/database/dbConnect"
import Comment from "backend/database/models/Comment"
import jwt from 'jwt-simple'
import { sendEmail } from 'backend/sendgrid'

async function purchaseSuccessful(req, res) {
  const { postSlug, username, email, body, parentId } = req.body
  try {
    await dbConnect()
    const comment = await Comment.create({ postSlug, username, email, body })
    const token = jwt.encode({ email }, process.env.JWT_SECRET)
    sendEmail({
      subject: `${username} has left a comment under ${postSlug}`,
      message: `${body}`,
      to: 'raymestalez@gmail.com'
    })
    res.json({ token })
  } catch (error) {
    console.log('[api/users/purchase-successful] error', error)
    res.json({ error })
  }
}

export default handler().post(purchaseSuccessful)
