import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { format } from 'date-fns'
import { getStreakEmoji } from '@/utils/progressUtils'

const DashboardHeader = ({ streak, onAddGoal }) => {
  const today = format(new Date(), 'EEEE, MMMM d')
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-8"
    >
      <div className="space-y-1">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold font-display gradient-text"
        >
          FocusPath
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600"
        >
          {today}
        </motion.p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Streak display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center space-x-2 bg-gradient-to-r from-accent-50 to-primary-50 px-4 py-2 rounded-xl"
        >
          <span className="text-xl streak-flame">
            {getStreakEmoji(streak.currentStreak)}
          </span>
          <div className="text-right">
            <div className="text-lg font-bold gradient-text">
              {streak.currentStreak}
            </div>
            <div className="text-xs text-gray-600">
              day streak
            </div>
          </div>
        </motion.div>

        {/* Add goal button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          onClick={onAddGoal}
          className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-200 flex items-center justify-center hover:scale-105 focus-visible"
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Plus" size={24} />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default DashboardHeader