import { createContext, useEffect, useState } from 'react'
import { userRepository } from '@/api/repositories/userRepository'

const AuthContext = createContext({})

export const statesAuth = {
  'NO-AUTHENTICATE': 'NO-AUTHENTICATE',
  'AUTHENTICATE-PENDING': 'AUTHENTICATE-PENDING',
  'AUTHENTICATE': 'AUTHENTICATE',
}

const SESSION_KEY = 'shoppy_session'

/**
 * AuthProvider
 *
 * Manages authentication state. Session is persisted in localStorage.
 * The `session` object exposes:
 *   - user: { id, fullname, email, role, phone, address, avatar }
 *   - isAuthenticated: boolean
 *   - token: timestamp string
 *
 * To integrate a real auth API, replace `userRepository` calls with
 * your backend service — the rest of the app uses the same session shape.
 */
export function AuthProvider({ children }) {
  const [session, setSessionState] = useState(null) // null = not yet hydrated
  const [authLoading, setAuthLoading] = useState(true)

  // Hydrate session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY)
      if (stored) {
        setSessionState(JSON.parse(stored))
      } else {
        setSessionState({})
      }
    } catch {
      setSessionState({})
    } finally {
      setAuthLoading(false)
    }
  }, [])

  /**
   * Persist a session and update state.
   * @param {object} sessionData
   */
  function setSession(sessionData) {
    setSessionState(sessionData)
    if (sessionData && Object.keys(sessionData).length > 0) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  }

  /**
   * Attempt login. Validates credentials against the user repository.
   * @param {string} email
   * @param {string} password
   * @returns {{ success: boolean, error?: string, session?: object }}
   */
  function login(email, password) {
    const user = userRepository.findByEmail(email)

    if (!user) {
      return { success: false, error: 'No account found with that email.' }
    }

    if (user.password !== password) {
      return { success: false, error: 'Incorrect password.' }
    }

    const sessionData = {
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
      },
      isAuthenticated: true,
      authenticate: statesAuth.AUTHENTICATE,
      token: String(Date.now()),
    }

    setSession(sessionData)
    return { success: true, session: sessionData }
  }

  /**
   * Register a new user and auto-login.
   * @param {{ fullname: string, email: string, password: string }} data
   * @returns {{ success: boolean, error?: string }}
   */
  function register(data) {
    try {
      const newUser = userRepository.create(data)
      const sessionData = {
        user: {
          id: newUser.id,
          fullname: newUser.fullname,
          email: newUser.email,
          role: newUser.role,
          phone: newUser.phone,
          address: newUser.address,
          avatar: newUser.avatar,
        },
        isAuthenticated: true,
        authenticate: statesAuth.AUTHENTICATE,
        token: String(Date.now()),
      }
      setSession(sessionData)
      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  /**
   * Update the current session user's profile data.
   * @param {object} updatedFields
   */
  function updateSessionUser(updatedFields) {
    if (!session?.user?.id) return
    const updated = userRepository.update(session.user.id, updatedFields)
    if (updated) {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          fullname: updated.fullname,
          phone: updated.phone,
          address: updated.address,
        },
      }
      setSession(newSession)
    }
  }

  /**
   * Log out the current user.
   */
  function logout() {
    setSession({})
    localStorage.removeItem(SESSION_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        authLoading,
        setSession,
        login,
        register,
        logout,
        updateSessionUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
