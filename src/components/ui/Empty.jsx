import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  type = 'goals',
  onAction = null,
  actionText = 'Get Started'
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case 'goals':
        return {
          icon: 'Target',
          title: 'Ready to achieve something amazing?',
          description: 'Your journey to success starts with a single goal. Speak it or type it - we\'ll help you break it down into daily wins.',
          illustration: '🎯',
          actionText: 'Add Your First Goal',
          gradient: 'from-primary-500 to-secondary-500'
        }
      case 'tasks':
        return {
          icon: 'CheckCircle',
          title: 'All caught up!',
          description: 'No tasks for today. Take a moment to celebrate your progress or add a new goal to keep the momentum going.',
          illustration: '✨',
          actionText: 'Add a Goal',
          gradient: 'from-accent-500 to-primary-500'
        }
      case 'completed':
        return {
          icon: 'Trophy',
          title: 'Amazing work!',
          description: 'You\'ve completed all your tasks for today. Your consistency is building something incredible.',
          illustration: '🏆',
          actionText: 'View Progress',
          gradient: 'from-accent-500 to-secondary-500'
        }
      case 'week':
        return {
          icon: 'Calendar',
          title: 'Your week is wide open',
          description: 'Perfect time to plan ahead. Add some goals and watch them transform into your weekly action plan.',
          illustration: '📅',
          actionText: 'Plan Your Week',
          gradient: 'from-secondary-500 to-primary-500'
        }
      default:
        return {
          icon: 'Sparkles',
          title: 'Nothing here yet',
          description: 'This space is waiting for your goals and dreams to fill it.',
          illustration: '✨',
          actionText: 'Get Started',
          gradient: 'from-primary-500 to-secondary-500'
        }
    }
  }

  const { icon, title, description, illustration, actionText: defaultActionText, gradient } = getEmptyContent()
  const buttonText = actionText || defaultActionText

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      {/* Floating illustration */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        className="mb-6 text-6xl animate-float"
      >
        {illustration}
      </motion.div>

      {/* Icon with gradient background */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className={`mb-6 p-4 bg-gradient-to-br ${gradient} bg-opacity-10 rounded-full`}
      >
        <ApperIcon 
          name={icon} 
          size={32} 
          className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        />
      </motion.div>

      {/* Title with gradient text */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`text-xl font-bold gradient-text mb-3`}
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 max-w-md leading-relaxed"
      >
        {description}
      </motion.p>

      {/* Action button */}
      {onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onAction}
          className={`px-8 py-4 bg-gradient-to-r ${gradient} text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus-visible group`}
        >
          <ApperIcon 
            name="Plus" 
            size={18} 
            className="inline mr-2 group-hover:rotate-90 transition-transform duration-300" 
          />
          {buttonText}
        </motion.button>
      )}
    </motion.div>
  )
}

export default Empty