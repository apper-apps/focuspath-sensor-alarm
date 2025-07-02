import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const IconButton = ({
  icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30',
    secondary: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
    accent: 'bg-gradient-to-r from-accent-500 to-primary-500 text-white shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30'
  }
  
  const sizes = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  }
  
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center justify-center rounded-xl 
        transition-all duration-200 focus-visible
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      <ApperIcon name={icon} size={iconSizes[size]} />
    </motion.button>
  )
}

export default IconButton