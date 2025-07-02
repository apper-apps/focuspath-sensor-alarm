import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import VoiceInput from '@/components/molecules/VoiceInput'
import goalService from '@/services/api/goalService'
import taskService from '@/services/api/taskService'

const AddGoalModal = ({ isOpen, onClose, onGoalAdded }) => {
  const [step, setStep] = useState('input') // input, voice, processing, breakdown
  const [goalData, setGoalData] = useState({
    title: '',
    description: '',
    category: 'Personal',
    targetDate: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedTasks, setGeneratedTasks] = useState([])

  const categories = ['Personal', 'Career', 'Health', 'Learning', 'Finance', 'Relationships']

  const handleInputChange = (field, value) => {
    setGoalData(prev => ({ ...prev, [field]: value }))
  }

  const handleVoiceTranscript = (transcript) => {
    setGoalData(prev => ({ ...prev, title: transcript }))
    setStep('input')
  }

  const handleCreateGoal = async () => {
    if (!goalData.title.trim()) {
      toast.error('Please enter a goal title')
      return
    }

    if (!goalData.targetDate) {
      toast.error('Please select a target date')
      return
    }

    setIsProcessing(true)
    setStep('processing')

    try {
      // Step 1: Create the goal
      const newGoal = await goalService.create(goalData)
      
      // Step 2: Generate AI tasks
      const aiTasks = await goalService.breakdownGoal(goalData.title, goalData.targetDate)
      
      // Step 3: Create tasks with goal ID
      const tasksWithGoalId = aiTasks.map(task => ({
        ...task,
        goalId: newGoal.Id.toString()
      }))
      
      await taskService.createMultiple(tasksWithGoalId)
      
      setGeneratedTasks(aiTasks)
      setStep('breakdown')
      
      toast.success(`Goal created with ${aiTasks.length} tasks!`)
      
      // Notify parent component
      onGoalAdded(newGoal)
      
    } catch (error) {
      console.error('Error creating goal:', error)
      toast.error('Failed to create goal. Please try again.')
      setStep('input')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFinish = () => {
    setGoalData({
      title: '',
      description: '',
      category: 'Personal',
      targetDate: ''
    })
    setGeneratedTasks([])
    setStep('input')
    onClose()
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            {step === 'input' ? 'Add New Goal' : 
             step === 'voice' ? 'Voice Input' :
             step === 'processing' ? 'Creating Your Plan' :
             'Your Action Plan'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="X" size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Input Step */}
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setStep('voice')}
                    variant="secondary"
                    icon="Mic"
                    className="flex-1"
                  >
                    Speak Goal
                  </Button>
                  <span className="text-gray-400 self-center">or</span>
                  <span className="text-sm text-gray-600 self-center">Type below</span>
                </div>

                <Input
                  label="What's your goal?"
                  placeholder="e.g., Learn Spanish, Run a marathon, Build an app..."
                  value={goalData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />

                <Input
                  label="Description (optional)"
                  placeholder="Add more details about your goal..."
                  value={goalData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={goalData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Target Date"
                  type="date"
                  value={goalData.targetDate}
                  onChange={(e) => handleInputChange('targetDate', e.target.value)}
                  min={getMinDate()}
                />

                <div className="flex space-x-3 pt-4">
                  <Button variant="secondary" onClick={onClose} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleCreateGoal} className="flex-1">
                    Create Goal
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Voice Input Step */}
            {step === 'voice' && (
              <motion.div
                key="voice"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <VoiceInput
                  onTranscript={handleVoiceTranscript}
                  onClose={() => setStep('input')}
                />
              </motion.div>
            )}

            {/* Processing Step */}
            {step === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center"
                >
                  <ApperIcon name="Sparkles" size={24} className="text-white" />
                </motion.div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  AI is planning your journey...
                </h3>
                <p className="text-gray-600">
                  Breaking down "{goalData.title}" into achievable daily tasks
                </p>
              </motion.div>
            )}

            {/* Breakdown Step */}
            {step === 'breakdown' && (
              <motion.div
                key="breakdown"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center">
                    <ApperIcon name="CheckCircle" size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Your plan is ready! 🎉
                  </h3>
                  <p className="text-gray-600">
                    Created {generatedTasks.length} weekly tasks to achieve your goal
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 max-h-48 overflow-y-auto">
                  <h4 className="font-medium text-gray-900 mb-3">Sample Tasks:</h4>
                  <div className="space-y-2">
                    {generatedTasks.slice(0, 5).map((task, index) => (
                      <div key={index} className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-primary-500 rounded-full" />
                        <span className="text-gray-700">{task.title}</span>
                      </div>
                    ))}
                    {generatedTasks.length > 5 && (
                      <div className="text-sm text-gray-500 pl-5">
                        +{generatedTasks.length - 5} more tasks...
                      </div>
                    )}
                  </div>
                </div>

                <Button onClick={handleFinish} className="w-full">
                  Start My Journey!
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AddGoalModal