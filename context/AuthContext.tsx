
import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import { useContext } from 'react'

const AuthContext = createContext({
  user: {} as any,
  fetchUser: () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({ username: '', subscriptionStatus: ''})
  async function fetchUser() {
    const res = await axios.get('/api/users/me')
    console.log('[AuthContext] Fetched user', res.data.user)
    if (res.data.user) {
      const { username, subscriptionStatus } = res.data.user
      setUser({ username, subscriptionStatus })
    }
  }

  // Fetch the user when the app loads
  useEffect(() => {
    fetchUser()
  }, [])

  const context = { user, fetchUser }
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
export default AuthContext
