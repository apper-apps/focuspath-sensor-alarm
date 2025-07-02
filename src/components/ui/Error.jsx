import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = "Something went wrong", 
  onRetry = null,
  type = 'general' 
}) => {
  const getErrorContent = () => {
    switch (type) {
      case 'network':
        return {
          icon: 'Wifi',
          title: 'Connection Problem',
          description: 'Please check your internet connection and try again.',
          actionText: 'Retry Connection'
        }
      case 'goals':
        return {
          icon: 'Target',
          title: 'Goals Unavailable',
          description: 'We couldn\'t load your goals right now.',
          actionText: 'Reload Goals'
        }
      case 'voice':
        return {
          icon: 'Mic',
          title: 'Voice Recognition Failed',
          description: 'We couldn\'t process your voice input. Please try typing instead.',
          actionText: 'Try Again'
        }
      default:
        return {
          icon: 'AlertTriangle',
          title: 'Oops, something went wrong',
          description: message,
          actionText: 'Try Again'
        }
    }
  }

  const { icon, title, description, actionText } = getErrorContent()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="mb-6 p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-full"
      >
        <ApperIcon 
          name={icon} 
          size={32} 
          className="text-red-500" 
        />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold text-gray-900 mb-2"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-6 max-w-md"
      >
        {description}
      </motion.p>

      {onRetry && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-200 hover:scale-105 focus-visible"
        >
          <ApperIcon name="RefreshCw" size={16} className="inline mr-2" />
          {actionText}
        </motion.button>
      )}
    </motion.div>
  )
}

export default Error