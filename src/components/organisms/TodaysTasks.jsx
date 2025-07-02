import React from 'react'
import { motion } from 'framer-motion'
import TaskItem from '@/components/molecules/TaskItem'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { calculateDailyProgress } from '@/utils/progressUtils'

const TodaysTasks = ({ 
  tasks = [], 
  onCompleteTask, 
  onMoodSelect,
  className = '' 
}) => {
  const { completed, total, percentage } = calculateDailyProgress(tasks)
  
  if (tasks.length === 0) {
    return (
      <div className={`bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl ${className}`}>
        <Empty 
          type="tasks"
          actionText="Add a Goal"
        />
      </div>
    )
  }

  const pendingTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  if (pendingTasks.length === 0) {
    return (
      <div className={`bg-gradient-to-br from-accent-50 to-primary-50 p-6 rounded-2xl ${className}`}>
        <Empty 
          type="completed"
          actionText="View Progress"
        />
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Today's Focus
          </h2>
          <p className="text-sm text-gray-600">
            {completed} of {total} completed ({percentage}%)
          </p>
        </div>
        
        <motion.div
          animate={{ rotate: percentage === 100 ? 360 : 0 }}
          transition={{ duration: 0.5 }}
          className={`
            p-3 rounded-full
            ${percentage === 100 
              ? 'bg-gradient-to-r from-accent-500 to-primary-500 text-white' 
              : 'bg-white text-gray-600'
            }
          `}
        >
          <ApperIcon 
            name={percentage === 100 ? "Trophy" : "Target"} 
            size={20} 
          />
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="w-full bg-white rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
          />
        </div>
      </div>

      {/* Pending tasks */}
      {pendingTasks.length > 0 && (
        <div className="space-y-3 mb-6">
          {pendingTasks.map((task, index) => (
            <motion.div
              key={task.Id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TaskItem 
                task={task}
                onComplete={onCompleteTask}
                onMoodSelect={onMoodSelect}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Completed tasks (collapsed) */}
      {completedTasks.length > 0 && (
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <span>Completed Tasks ({completedTasks.length})</span>
            <ApperIcon 
              name="ChevronDown" 
              size={16} 
              className="group-open:rotate-180 transition-transform" 
            />
          </summary>
          
          <div className="mt-3 space-y-2">
            {completedTasks.map((task) => (
              <TaskItem 
                key={task.Id}
                task={task}
                onComplete={onCompleteTask}
                onMoodSelect={onMoodSelect}
              />
            ))}
          </div>
        </details>
      )}
    </div>
  )
}

export default TodaysTasks