import { useEffect, useState } from 'react'

export default function useDarkMode() {
  const [theme, setTheme] = useState(localStorage.theme || 'dark')
  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(function() {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)
    // save theme to local storage
    localStorage.setItem('theme', theme)
  }, [colorTheme, theme])

  return [colorTheme, setTheme]
}