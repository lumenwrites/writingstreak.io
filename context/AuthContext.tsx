import { createContext, useState, useEffect } from "react"
import { useContext } from "react"
import axios from "axios"

const AuthContext = createContext({
  user: { username: "" },
  fetchUser: () => {}
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({ username: "" })
  async function fetchUser() {
    const res = await axios.get("/api/users/me")
    console.log('[AuthContext] Fetched user', res.data.user)
    setUser(res.data.user)
  }
  // Fetch the user when the app loads
  useEffect(() => { fetchUser() }, [])
  
  const context = { user, fetchUser }
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
export default AuthContext