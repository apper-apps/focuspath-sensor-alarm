import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon 
              name={icon} 
              size={18} 
              className="text-gray-400" 
            />
          </div>
        )}
        
        <motion.input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 py-3 ${icon ? 'pl-10' : ''} 
            border border-gray-200 rounded-xl 
            bg-white text-gray-900 placeholder-gray-500
            focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 
            transition-all duration-200
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
          `}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 flex items-center"
        >
          <ApperIcon name="AlertCircle" size={14} className="mr-1" />
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default Input