import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export default function verify() {
  const router = useRouter()
  async function verifyMagicLink() {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const authToken = urlSearchParams.get('authToken')
    const { data } = await axios.post('/api/users/verify-magic-link', { authToken })
    if (data.error) {
      // Show error and login form
    }
    // Save a login cookie
    Cookies.set('token', data.token)
    // Redirect
    console.log('[verify] data', data)
  }
  useEffect(() => {
    verifyMagicLink()
  }, [])

  return <div>Verify</div>
}
