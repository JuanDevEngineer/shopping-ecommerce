import { Link } from 'react-router-dom'
import { Google } from '../../components/commons/Icons/Google.jsx'
import { Github } from '../../components/commons/Icons/Github.jsx'

export default function SingInPage() {
  return (
    <section className='bg-white dark:bg-gray-900 mt-3 w-96'>
      <div className='flex flex-col items-center justify-center'>
        <Link to='#' className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
          Shopping
        </Link>
        <div
          className='w-full bg-white rounded-lg shadow-sm dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700 shadow-black dark:shadow-white'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in
            </h1>
            <form className='space-y-4 md:space-y-6' action='#'>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                  required=''
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required=''
                />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      required=''
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor="" className='text-gray-500 dark:text-gray-300'>Remember me</label>
                  </div>
                </div>
                <Link to='#' className='text-sm font-medium text-primary-600 hover:underline dark:text-white'>
                  {' '} Forgot password?
                </Link>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                Sign in
              </button>
              <div className="flex gap-2">
                <button
                  type='submit'
                  className='w-full bg-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                  <div className="flex gap-2 justify-center items-center">
                    <Google />
                    <span>Google</span>
                  </div>
                </button>
                <button
                  type='submit'
                  className='w-full text-white bg-gray-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                  <div className="flex gap-2 justify-center items-center">
                    <Github />
                    <span>Github</span>
                  </div>
                </button>
              </div>

              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet? {''}
                <Link to='#' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
)
}