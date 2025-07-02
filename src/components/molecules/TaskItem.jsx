import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { formatTime } from '@/utils/dateUtils'

const TaskItem = ({ task, onComplete, onMoodSelect }) => {
  const [isCompleting, setIsCompleting] = useState(false)
  const [showMoodCheck, setShowMoodCheck] = useState(false)

  const handleSwipeComplete = async () => {
    if (task.completed || isCompleting) return
    
    setIsCompleting(true)
    await onComplete(task.Id)
    setShowMoodCheck(true)
    
    setTimeout(() => {
      setIsCompleting(false)
    }, 1000)
  }

  const handleMoodSelect = (mood) => {
    onMoodSelect(task.Id, mood)
    setShowMoodCheck(false)
  }

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className={`
          relative bg-white p-4 rounded-xl border border-gray-100 
          transition-all duration-300 hover:shadow-md
          ${task.completed ? 'opacity-60' : 'hover:border-primary-200'}
          ${isCompleting ? 'scale-105 shadow-lg' : ''}
        `}
      >
        <div className="flex items-center space-x-4">
          {/* Completion button */}
          <motion.button
            onClick={handleSwipeComplete}
            disabled={task.completed || isCompleting}
            className={`
              flex-shrink-0 w-6 h-6 rounded-full border-2 
              flex items-center justify-center transition-all duration-200
              ${task.completed 
                ? 'bg-accent-500 border-accent-500' 
                : 'border-gray-300 hover:border-primary-500 hover:bg-primary-50'
              }
              ${isCompleting ? 'animate-pulse' : ''}
            `}
            whileHover={{ scale: task.completed ? 1 : 1.1 }}
            whileTap={{ scale: task.completed ? 1 : 0.9 }}
          >
            {task.completed && (
              <ApperIcon name="Check" size={14} className="text-white" />
            )}
          </motion.button>

          {/* Task content */}
          <div className="flex-1 min-w-0">
            <h4 className={`
              font-medium truncate
              ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}
            `}>
              {task.title}
            </h4>
            <div className="flex items-center space-x-3 mt-1">
              <div className="flex items-center text-sm text-gray-500">
                <ApperIcon name="Clock" size={12} className="mr-1" />
                {formatTime(task.scheduledTime)}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <ApperIcon name="Timer" size={12} className="mr-1" />
                {task.duration}m
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex-shrink-0">
            {task.completed ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-accent-500"
              >
                <ApperIcon name="CheckCircle2" size={20} />
              </motion.div>
            ) : (
              <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
            )}
          </div>
        </div>

        {/* Swipe indicator */}
        {!task.completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <ApperIcon name="ArrowRight" size={16} />
          </motion.div>
        )}

        {/* Completion effect */}
        {isCompleting && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500 rounded-xl flex items-center justify-center"
          >
            <ApperIcon name="Check" size={24} className="text-white" />
          </motion.div>
        )}
      </motion.div>

      {/* Mood check overlay */}
      {showMoodCheck && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowMoodCheck(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full"
          >
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              How are you feeling?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Quick mood check after completing your task
            </p>
            
            <div className="flex justify-center space-x-6">
              {[
                { mood: 'happy', emoji: '😊', label: 'Great' },
                { mood: 'neutral', emoji: '😐', label: 'Okay' },
                { mood: 'stressed', emoji: '😰', label: 'Stressed' }
              ].map(({ mood, emoji, label }) => (
                <motion.button
                  key={mood}
                  onClick={() => handleMoodSelect(mood)}
                  className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-3xl mb-2">{emoji}</span>
                  <span className="text-sm text-gray-600">{label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default TaskItem