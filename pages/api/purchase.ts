import axios from 'axios'

export default async function handler(req, res) {
  const { email } = req.body
  if (!email || !email.trim()) return res.json({ error: 'Email is required.' })
  try {
    // Process payment with stripe
    // If it succeeds - send the person to content
    return res.status(201).json({ message: 'Success!' });
  } catch (error) {
    // console.log('ERROR', error.response.data)
    return res.json({ error: error.response.data.message})
  }
}
