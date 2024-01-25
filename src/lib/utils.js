import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const dateTime = () => {
  let today = new Date()
  let month = today.getMonth() < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
  let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()

  let date = today.getFullYear() + '-' + month + '-' + day
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  return date + ' ' + time
}