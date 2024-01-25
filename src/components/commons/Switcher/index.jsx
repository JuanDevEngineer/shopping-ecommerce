import { DarkModeSwitch } from 'react-toggle-dark-mode'
import useDarkMode from '../../../hooks/useDarkMode.jsx'
import { useState } from 'react'

export function Switcher() {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setDarkMode] = useState(colorTheme === 'light');

  const toggleDarkMode = checked => {
    setTheme(colorTheme);
    setDarkMode(checked);
  };

  return (
    <DarkModeSwitch
      checked={darkMode}
      onChange={toggleDarkMode}
      size={25}
      sunColor={"#6d28d9"}
      moonColor={"#FFFFFF"}
    />
  )
}