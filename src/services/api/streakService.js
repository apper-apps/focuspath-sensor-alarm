import streakData from '@/services/mockData/streak.json'

class StreakService {
  constructor() {
    this.streak = { ...streakData }
  }

  async getStreak() {
    await new Promise(resolve => setTimeout(resolve, 150))
    return { ...this.streak }
  }

  async updateStreak(completed = true) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const today = new Date().toISOString().split('T')[0]
    const lastActive = new Date(this.streak.lastActiveDate)
    const todayDate = new Date(today)
    
    // Check if last active was yesterday
    const yesterday = new Date(todayDate)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (completed) {
      if (lastActive.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) {
        // Continue streak
        this.streak.currentStreak += 1
      } else if (lastActive.toISOString().split('T')[0] === today) {
        // Already updated today, no change
      } else {
        // Reset streak to 1
        this.streak.currentStreak = 1
      }
      
      // Update longest streak if current is higher
      if (this.streak.currentStreak > this.streak.longestStreak) {
        this.streak.longestStreak = this.streak.currentStreak
      }
      
      this.streak.lastActiveDate = today
      this.streak.totalCompletedTasks += 1
    }
    
    return { ...this.streak }
  }

  async resetStreak() {
    await new Promise(resolve => setTimeout(resolve, 150))
    
    this.streak.currentStreak = 0
    return { ...this.streak }
  }

  getStreakMessage(streakCount) {
    if (streakCount === 0) return "Start your journey today!"
    if (streakCount === 1) return "Great start! Keep it going!"
    if (streakCount < 7) return "Building momentum!"
    if (streakCount < 14) return "You're on fire! 🔥"
    if (streakCount < 30) return "Incredible consistency!"
    if (streakCount < 60) return "Streak master! 🏆"
    return "Legendary dedication! 👑"
  }
}

export default new StreakService()