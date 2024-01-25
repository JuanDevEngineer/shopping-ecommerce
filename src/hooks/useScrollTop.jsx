import { useEffect, useState } from 'react'

export default function useScrollTop(threshold = 5) {
  const [scrolled, setScrolled] = useState(false)

  function handleScroll() {
    if (window.scrollY > threshold) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  return scrolled
}