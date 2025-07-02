import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import useVoiceInput from '@/hooks/useVoiceInput'

const VoiceInput = ({ onTranscript, onClose }) => {
  const { isListening, transcript, error, startListening, clearTranscript, isSupported } = useVoiceInput()
  const [hasTranscript, setHasTranscript] = useState(false)

  React.useEffect(() => {
    if (transcript && !hasTranscript) {
      setHasTranscript(true)
    }
  }, [transcript, hasTranscript])

  const handleUseTranscript = () => {
    if (transcript) {
      onTranscript(transcript)
      clearTranscript()
      setHasTranscript(false)
      onClose()
    }
  }

  const handleRetry = () => {
    clearTranscript()
    setHasTranscript(false)
    startListening()
  }

  if (!isSupported) {
    return (
      <div className="text-center p-6">
        <ApperIcon name="MicOff" size={48} className="text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">Voice input is not supported in your browser</p>
        <Button variant="secondary" onClick={onClose}>
          Use Text Input Instead
        </Button>
      </div>
    )
  }

  return (
    <div className="text-center p-6">
      <AnimatePresence mode="wait">
        {isListening && (
          <motion.div
            key="listening"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mx-auto w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center voice-pulse"
            >
              <ApperIcon name="Mic" size={32} className="text-white" />
            </motion.div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Listening...</h3>
              <p className="text-gray-600">Speak your goal clearly</p>
            </div>
          </motion.div>
        )}

        {!isListening && !hasTranscript && !error && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="space-y-6"
          >
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Mic" size={32} className="text-white" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Listen</h3>
              <p className="text-gray-600 mb-6">Tap the button and speak your goal</p>
              
              <Button onClick={startListening} icon="Mic">
                Start Recording
              </Button>
            </div>
          </motion.div>
        )}

        {hasTranscript && (
          <motion.div
            key="transcript"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="space-y-6"
          >
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Check" size={32} className="text-white" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Got it!</h3>
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <p className="text-gray-900 font-medium">"{transcript}"</p>
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={handleUseTranscript} className="flex-1">
                  Use This Goal
                </Button>
                <Button variant="secondary" onClick={handleRetry}>
                  Try Again
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="space-y-6"
          >
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <ApperIcon name="AlertTriangle" size={32} className="text-white" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops!</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              
              <div className="flex space-x-3">
                <Button onClick={startListening} className="flex-1">
                  Try Again
                </Button>
                <Button variant="secondary" onClick={onClose}>
                  Use Text Instead
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VoiceInput