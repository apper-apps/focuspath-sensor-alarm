import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import DashboardHeader from '@/components/organisms/DashboardHeader'
import GoalsList from '@/components/organisms/GoalsList'
import TodaysTasks from '@/components/organisms/TodaysTasks'
import WeekCalendar from '@/components/molecules/WeekCalendar'
import AddGoalModal from '@/components/organisms/AddGoalModal'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import goalService from '@/services/api/goalService'
import taskService from '@/services/api/taskService'
import moodService from '@/services/api/moodService'
import streakService from '@/services/api/streakService'
import { formatDate } from '@/utils/dateUtils'
import { calculateGoalProgress } from '@/utils/progressUtils'

const Dashboard = () => {
  // State management
  const [goals, setGoals] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [todaysTasks, setTodaysTasks] = useState([])
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0, lastActiveDate: null, totalCompletedTasks: 0 })
  
  // Loading and error states
  const [goalsLoading, setGoalsLoading] = useState(true)
  const [tasksLoading, setTasksLoading] = useState(true)
  const [streakLoading, setStreakLoading] = useState(true)
  const [goalsError, setGoalsError] = useState(null)
  const [tasksError, setTasksError] = useState(null)
  const [streakError, setStreakError] = useState(null)
  
  // Modal state
  const [showAddGoalModal, setShowAddGoalModal] = useState(false)

  // Load initial data
  useEffect(() => {
    loadGoals()
    loadTasks()
    loadStreak()
  }, [])

  const loadGoals = async () => {
    try {
      setGoalsLoading(true)
      setGoalsError(null)
      const goalsData = await goalService.getAll()
      setGoals(goalsData)
    } catch (error) {
      console.error('Error loading goals:', error)
      setGoalsError('Failed to load goals')
    } finally {
      setGoalsLoading(false)
    }
  }

  const loadTasks = async () => {
    try {
      setTasksLoading(true)
      setTasksError(null)
      const allTasksData = await taskService.getAll()
      setAllTasks(allTasksData)
      
      // Filter today's tasks
      const today = formatDate(new Date())
      const todaysTasksData = await taskService.getByDate(today)
      setTodaysTasks(todaysTasksData)
    } catch (error) {
      console.error('Error loading tasks:', error)
      setTasksError('Failed to load tasks')
    } finally {
      setTasksLoading(false)
    }
  }

  const loadStreak = async () => {
    try {
      setStreakLoading(true)
      setStreakError(null)
      const streakData = await streakService.getStreak()
      setStreak(streakData)
    } catch (error) {
      console.error('Error loading streak:', error)
      setStreakError('Failed to load streak data')
    } finally {
      setStreakLoading(false)
    }
  }

  // Update goal progress when tasks change
  useEffect(() => {
    if (goals.length > 0 && allTasks.length > 0) {
      updateGoalProgress()
    }
  }, [allTasks])

  const updateGoalProgress = async () => {
    try {
      const updatedGoals = goals.map(goal => {
        const goalTasks = allTasks.filter(task => task.goalId === goal.Id.toString())
        const progress = calculateGoalProgress(goalTasks)
        return { ...goal, progress }
      })
      
      setGoals(updatedGoals)
      
      // Update goals in service (in real app, this would be API calls)
      for (const goal of updatedGoals) {
        if (goal.progress !== goals.find(g => g.Id === goal.Id)?.progress) {
          await goalService.update(goal.Id, { progress: goal.progress })
        }
      }
    } catch (error) {
      console.error('Error updating goal progress:', error)
    }
  }

  const handleCompleteTask = async (taskId) => {
    try {
      const updatedTask = await taskService.complete(taskId)
      
      // Update local state
      setAllTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ))
      
      setTodaysTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ))
      
      // Update streak
      const updatedStreak = await streakService.updateStreak(true)
      setStreak(updatedStreak)
      
      toast.success('Task completed! 🎉')
      
    } catch (error) {
      console.error('Error completing task:', error)
      toast.error('Failed to complete task')
    }
  }

  const handleMoodSelect = async (taskId, mood) => {
    try {
      await moodService.create({
        taskId: taskId.toString(),
        mood
      })
      
      toast.success('Mood recorded!')
      
    } catch (error) {
      console.error('Error recording mood:', error)
      toast.error('Failed to record mood')
    }
  }

  const handleGoalAdded = () => {
    // Reload data when new goal is added
    loadGoals()
    loadTasks()
  }

  // Show loading state while initial data loads
  const isInitialLoading = goalsLoading || tasksLoading || streakLoading

  if (isInitialLoading) {
    return <Loading type="dashboard" />
  }

  // Show error if critical data failed to load
  const criticalError = goalsError || tasksError

  if (criticalError) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <Error 
          message={criticalError}
          onRetry={() => {
            loadGoals()
            loadTasks()
            loadStreak()
          }}
          type="network"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <DashboardHeader 
          streak={streak}
          onAddGoal={() => setShowAddGoalModal(true)}
        />

        {/* Main content grid */}
        <div className="space-y-8">
          {/* Goals section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Your Goals
            </h2>
            <GoalsList 
              goals={goals}
              allTasks={allTasks}
              loading={false}
              error={goalsError}
              onRetry={loadGoals}
              onAddGoal={() => setShowAddGoalModal(true)}
            />
          </section>

          {/* Today's tasks and week calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Today's tasks */}
            <div className="lg:col-span-2">
              <TodaysTasks 
                tasks={todaysTasks}
                onCompleteTask={handleCompleteTask}
                onMoodSelect={handleMoodSelect}
              />
            </div>

            {/* Week calendar */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  This Week
                </h3>
                <WeekCalendar tasks={allTasks} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Goal Modal */}
      <AddGoalModal 
        isOpen={showAddGoalModal}
        onClose={() => setShowAddGoalModal(false)}
        onGoalAdded={handleGoalAdded}
      />
    </div>
  )
}

export default Dashboard