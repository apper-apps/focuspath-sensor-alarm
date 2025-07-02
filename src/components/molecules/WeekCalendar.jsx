import React from 'react'
import { motion } from 'framer-motion'
import { getWeekDays, getDayName, formatDate, isToday } from '@/utils/dateUtils'

const WeekCalendar = ({ tasks = [], className = '' }) => {
  const weekDays = getWeekDays()
  
  const getTasksForDate = (date) => {
    const dateKey = formatDate(date)
    return tasks.filter(task => task.scheduledDate === dateKey)
  }

  const getTaskDots = (dayTasks) => {
    const completed = dayTasks.filter(task => task.completed).length
    const total = dayTasks.length
    
    return { completed, remaining: total - completed }
  }

  return (
    <div className={`${className}`}>
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {weekDays.map((day, index) => {
          const dayTasks = getTasksForDate(day)
          const { completed, remaining } = getTaskDots(dayTasks)
          const today = isToday(day)
          
          return (
            <motion.div
              key={formatDate(day)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`
                flex-shrink-0 text-center p-3 rounded-xl transition-all duration-200
                ${today 
                  ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <div className="text-xs font-medium mb-1">
                {getDayName(day, true)}
              </div>
              
              <div className={`
                text-lg font-bold mb-2
                ${today ? 'text-white' : 'text-gray-900'}
              `}>
                {day.getDate()}
              </div>
              
              {/* Task indicators */}
              <div className="flex flex-col items-center space-y-1">
                {/* Completed tasks */}
                {Array.from({ length: completed }, (_, i) => (
                  <motion.div
                    key={`completed-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`
                      w-2 h-2 rounded-full
                      ${today ? 'bg-white' : 'bg-accent-500'}
                    `}
                  />
                ))}
                
                {/* Remaining tasks */}
                {Array.from({ length: remaining }, (_, i) => (
                  <motion.div
                    key={`remaining-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + completed * 0.1 + i * 0.1 }}
                    className={`
                      w-2 h-2 rounded-full border-2 calendar-dot
                      ${today 
                        ? 'border-white' 
                        : 'border-primary-300'
                      }
                    `}
                  />
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default WeekCalendar