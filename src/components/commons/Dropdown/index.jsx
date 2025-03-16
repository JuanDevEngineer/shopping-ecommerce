import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

export function Dropdown({ list, session }) {
  const { setSession } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    if (localStorage.getItem('session')) {
      localStorage.removeItem('session')
      navigate('/sign-in', { replace: true })
      setSession({})
    }
  }

  return (
    <>
      <div className="top-16 text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black dark:bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              Menu
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5 text-violet-400 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black/5 focus:outline-none dark:shadow-white">
              <>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {() => (
                      <span
                        className={`group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold dark:text-white`}
                      >
                        {session?.user?.email}
                      </span>
                    )}
                  </Menu.Item>
                </div>

                {list?.map(function (item, i) {
                  return (
                    <div className="px-1 py-1" key={i}>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            className={`${
                              active
                                ? 'bg-violet-700 text-white dark:text-white'
                                : 'text-gray-900 dark:text-white'
                            } group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm`}
                            to={item.to}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  )
                })}

                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={handleLogout}
                        className={`${
                          active
                            ? 'bg-violet-700 text-white dark:text-white'
                            : 'text-gray-900 dark:text-white'
                        } group flex w-full items-center cursor-pointer rounded-md px-2 py-2 text-sm`}
                      >
                        Logout
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  )
}
