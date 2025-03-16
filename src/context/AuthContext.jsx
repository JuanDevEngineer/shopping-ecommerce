import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

export const statesAuth = {
  'NO-AUTHENTICATE': 'NO-AUTHENTICATE',
  'AUTHENTICATE-PENDING': 'AUTHENTICATE-PENDING',
  'AUTHENTICATE': 'AUTHENTICATE',
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState({})

  useEffect(function() {
    if (localStorage.getItem('session')) {
      setSession(JSON.parse(localStorage.getItem('session')))
    } else {
      setSession({})
    }
  }, []) 

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