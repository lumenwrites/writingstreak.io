import axios from 'axios'

export default async function handler(req, res) {
  const { email } = req.body
  if (!email || !email.trim()) return res.json({ error: 'Email is required.' })
  try {
    // https://developers.convertkit.com/?shell#add-subscriber-to-a-form
    const url = `https://api.convertkit.com/v3/forms/${process.env.CONVERT_KIT_FORM_ID}/subscribe`
    const result = await axios.post(url, { api_key: process.env.CONVERT_KIT_API_KEY, email })
    console.log('RESULT', result.data)
    return res.status(201).json({ message: 'Success!' });
  } catch (error) {
    console.log('ERROR', error.response.data)
    return res.json({ error: error.response.data.message})
  }
}
