import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Toastify from 'toastify-js'

import { Google } from '@/components/commons/Icons/Google'
import { Github } from '@/components/commons/Icons/Github'
import useAuth from '@/hooks/useAuth'

const inputClass =
  'border border-black dark:border-white rounded-lg p-4 w-full focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm'

export default function SignUpPage() {
  const { session, register } = useAuth()
  const navigate = useNavigate()

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.isAuthenticated) navigate('/', { replace: true })
  }, [session, navigate])

  function handleSignUp(event) {
    event.preventDefault()
    if (!fullname || !email || !password || !confirmPassword) {
      Toastify({ text: 'Please fill in all fields.', duration: 2000, style: { background: '#b42506' } }).showToast()
      return
    }
    if (password !== confirmPassword) {
      Toastify({ text: 'Passwords do not match.', duration: 2000, style: { background: '#b42506' } }).showToast()
      return
    }
    if (password.length < 6) {
      Toastify({ text: 'Password must be at least 6 characters.', duration: 2000, style: { background: '#b42506' } }).showToast()
      return
    }
    setIsLoading(true)
    const result = register({ fullname: fullname.trim(), email: email.trim(), password })
    setIsLoading(false)

    if (result.success) {
      Toastify({ text: 'Account created! Welcome to Shoppy 🎉', duration: 2500, style: { background: '#6d28d9' } }).showToast()
      navigate('/', { replace: true })
    } else {
      Toastify({ text: result.error, duration: 2500, style: { background: '#b42506' } }).showToast()
    }
  }

  return (
    <section className="my-10 w-96">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-white dark:bg-gray-900 rounded-lg border border-black dark:border-white shadow-sm sm:max-w-md">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>

            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="John Doe"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white bg-violet-700 hover:bg-violet-800 font-medium rounded-lg text-sm px-5 py-3 text-center disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Creating account…' : 'Create account'}
              </button>

              <div className="flex gap-2">
                <button type="button" disabled title="OAuth not configured"
                  className="w-full bg-white dark:bg-gray-800 border border-black dark:border-white rounded-lg text-sm px-5 py-3 text-center opacity-50 cursor-not-allowed">
                  <div className="flex gap-2 justify-center items-center dark:text-white">
                    <Google /><span>Google</span>
                  </div>
                </button>
                <button type="button" disabled title="OAuth not configured"
                  className="w-full text-white bg-gray-800 border border-black dark:border-white rounded-lg text-sm px-5 py-3 text-center opacity-50 cursor-not-allowed">
                  <div className="flex gap-2 justify-center items-center">
                    <Github /><span>GitHub</span>
                  </div>
                </button>
              </div>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/sign-in" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
