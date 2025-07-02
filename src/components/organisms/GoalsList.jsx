import React from 'react'
import { motion } from 'framer-motion'
import GoalCard from '@/components/molecules/GoalCard'
import Empty from '@/components/ui/Empty'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'

const GoalsList = ({ 
  goals = [], 
  allTasks = [], 
  loading = false, 
  error = null, 
  onRetry = null,
  onAddGoal = null 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 animate-pulse rounded-2xl h-48" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={onRetry}
        type="goals"
      />
    )
  }

  if (goals.length === 0) {
    return (
      <Empty 
        type="goals"
        onAction={onAddGoal}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {goals.map((goal, index) => {
        const goalTasks = allTasks.filter(task => task.goalId === goal.Id.toString())
        
        return (
          <motion.div
            key={goal.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GoalCard 
              goal={goal} 
              tasks={goalTasks}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

export default GoalsList