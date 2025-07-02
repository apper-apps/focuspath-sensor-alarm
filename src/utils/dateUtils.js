import { format, startOfWeek, addDays, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns'

export const formatDate = (date, formatStr = 'yyyy-MM-dd') => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }
  return format(date, formatStr)
}

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export const getWeekDays = (startDate = new Date()) => {
  const start = startOfWeek(startDate, { weekStartsOn: 1 }) // Monday start
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

export const getRelativeDate = (date) => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }
  
  if (isToday(date)) return 'Today'
  if (isTomorrow(date)) return 'Tomorrow'
  if (isYesterday(date)) return 'Yesterday'
  
  return format(date, 'MMM d')
}

export const getDayName = (date, short = false) => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }
  return format(date, short ? 'EEE' : 'EEEE')
}

export const getDateKey = (date) => {
  if (typeof date === 'string') {
    return date
  }
  return format(date, 'yyyy-MM-dd')
}

export const isDateInRange = (date, startDate, endDate) => {
  const checkDate = typeof date === 'string' ? parseISO(date) : date
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate
  
  return checkDate >= start && checkDate <= end
}

export const getTimeUntilDeadline = (targetDate) => {
  const target = typeof targetDate === 'string' ? parseISO(targetDate) : targetDate
  const now = new Date()
  const diffTime = target - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'Overdue'
  if (diffDays === 0) return 'Due today'
  if (diffDays === 1) return 'Due tomorrow'
  if (diffDays < 7) return `${diffDays} days left`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks left`
  
  return `${Math.ceil(diffDays / 30)} months left`
return `${Math.ceil(diffDays / 30)} months left`
}

// Re-export date-fns functions for external use
export { isToday }