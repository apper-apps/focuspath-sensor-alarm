import React from 'react'
import { motion } from 'framer-motion'

const Loading = ({ type = 'dashboard' }) => {
  if (type === 'dashboard') {
    return (
      <div className="min-h-screen bg-white p-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 animate-pulse" />
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-24 animate-pulse" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
            <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Progress rings skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-24 animate-pulse" />
                <div className="h-4 w-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-full animate-pulse" />
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Today's tasks skeleton */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl mb-6">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 mb-4 animate-pulse" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-white rounded-xl"
              >
                <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 animate-pulse" />
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2 animate-pulse" />
                </div>
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-12 animate-pulse" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Week preview skeleton */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 mb-4 animate-pulse" />
          <div className="flex space-x-4 overflow-x-auto">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex-shrink-0 text-center"
              >
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-8 mb-2 animate-pulse" />
                <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mb-2 animate-pulse" />
                <div className="flex flex-col space-y-1">
                  <div className="h-2 w-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                  <div className="h-2 w-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="h-8 w-8 border-3 border-primary-200 border-t-primary-500 rounded-full"
      />
    </div>
  )
}

export default Loading