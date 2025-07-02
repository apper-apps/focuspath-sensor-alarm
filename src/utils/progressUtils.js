export const calculateGoalProgress = (tasks) => {
  if (!tasks || tasks.length === 0) return 0
  
  const completedTasks = tasks.filter(task => task.completed).length
  return Math.round((completedTasks / tasks.length) * 100)
}

export const getProgressColor = (progress) => {
  if (progress >= 80) return '#10b981' // Green
  if (progress >= 60) return '#f59e0b' // Yellow
  if (progress >= 30) return '#3b82f6' // Blue
  return '#6b7280' // Gray
}

export const getProgressMessage = (progress) => {
  if (progress === 100) return 'Completed! 🎉'
  if (progress >= 80) return 'Almost there!'
  if (progress >= 60) return 'Great progress!'
  if (progress >= 30) return 'Keep going!'
  if (progress > 0) return 'Getting started!'
  return 'Ready to begin?'
}

export const calculateDailyProgress = (todaysTasks) => {
  if (!todaysTasks || todaysTasks.length === 0) return { completed: 0, total: 0, percentage: 0 }
  
  const completed = todaysTasks.filter(task => task.completed).length
  const total = todaysTasks.length
  const percentage = Math.round((completed / total) * 100)
  
  return { completed, total, percentage }
}

export const getStreakLevel = (streakCount) => {
  if (streakCount >= 100) return 'legendary'
  if (streakCount >= 50) return 'master'
  if (streakCount >= 30) return 'expert'
  if (streakCount >= 14) return 'advanced'
  if (streakCount >= 7) return 'intermediate'
  if (streakCount >= 3) return 'beginner'
  return 'newbie'
}

export const getStreakEmoji = (streakCount) => {
  if (streakCount >= 100) return '👑'
  if (streakCount >= 50) return '🏆'
  if (streakCount >= 30) return '🔥'
  if (streakCount >= 14) return '⚡'
  if (streakCount >= 7) return '💪'
  if (streakCount >= 3) return '🌟'
  return '🌱'
}

export const getMoodEmoji = (mood) => {
  switch (mood) {
    case 'happy': return '😊'
    case 'neutral': return '😐'
    case 'stressed': return '😰'
    default: return '😊'
  }
}

export const getMoodColor = (mood) => {
  switch (mood) {
    case 'happy': return '#fbbf24'
    case 'neutral': return '#6b7280'
    case 'stressed': return '#ef4444'
    default: return '#6b7280'
  }
}