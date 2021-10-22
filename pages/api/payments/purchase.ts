import axios from 'axios'
import handler from "backend/handler"
// import prisma from 'prisma/prismaClient'

async function purchase(req, res) {
  const { email } = req.body
  if (!email || !email.trim()) return res.json({ error: 'Email is required.' })
  try {
    // Process payment with stripe
    // If it succeeds - send the person to content
    console.log(`[purchase-post] ${email} has purchased the course`)
    return res.status(201).json({ message: 'Purchase successful!' });
  } catch (error) {
    // console.log('ERROR', error.response.data)
    return res.json({ error: error.response.data.message})
  }
}

export default handler().post(purchase)
