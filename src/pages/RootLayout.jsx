import PropTypes from 'prop-types'

export default function RootLayout({ children }) {
  return (
    <main className='flex flex-col items-center mt-20 min-w-full'>
      { children }
    </main>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired
}
