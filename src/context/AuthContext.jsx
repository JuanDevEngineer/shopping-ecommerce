import { createContext, useState } from 'react'

const AuthContext = createContext({})

const memorySession = {
  user: 'cuadrosc99@gmail.com',
  authenticate: true,
  token: Date.now()
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(memorySession)
  return (
    <AuthContext.Provider value={{
      session,
      setSession
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext