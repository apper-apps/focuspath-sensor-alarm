import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import ProgressRing from '@/components/molecules/ProgressRing'
import { getProgressMessage } from '@/utils/progressUtils'

const GoalCard = ({ goal, tasks = [], className = '' }) => {
  const nextTask = tasks.find(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed).length
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className={`
        bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl 
        border border-gray-100 hover:border-primary-200 
        transition-all duration-300 ${className}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate mb-1">
            {goal.title}
          </h3>
          <p className="text-sm text-gray-600">
            {goal.category}
          </p>
        </div>
        <div className="flex-shrink-0 ml-4">
          <ApperIcon 
            name="Target" 
            size={20} 
            className="text-gray-400" 
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <ProgressRing 
          progress={goal.progress} 
          size={60} 
          strokeWidth={6}
          color={goal.color}
        />
        
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-600 mb-1">
            {getProgressMessage(goal.progress)}
          </div>
          <div className="text-xs text-gray-500">
            {completedTasks} of {tasks.length} tasks completed
          </div>
        </div>
      </div>

      {nextTask && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 p-3 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <ApperIcon name="ArrowRight" size={14} className="text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Next: {nextTask.title}
            </span>
          </div>
        </motion.div>
      )}

      {goal.progress === 100 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-r from-accent-50 to-primary-50 p-3 rounded-lg flex items-center space-x-2"
        >
          <ApperIcon name="Trophy" size={16} className="text-accent-600" />
          <span className="text-sm font-semibold text-accent-700">
            Goal Completed! 🎉
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default GoalCard