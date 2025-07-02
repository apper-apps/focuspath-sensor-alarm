import moodData from '@/services/mockData/moodCheckins.json'

class MoodService {
  constructor() {
    this.moodCheckins = [...moodData]
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 200))
    return [...this.moodCheckins]
  }

  async getByTaskId(taskId) {
    await new Promise(resolve => setTimeout(resolve, 150))
    return this.moodCheckins.find(m => m.taskId === taskId.toString())
  }

  async create(moodData) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const newMoodCheckin = {
      Id: Math.max(...this.moodCheckins.map(m => m.Id)) + 1,
      ...moodData,
      timestamp: new Date().toISOString()
    }
    
    this.moodCheckins.push(newMoodCheckin)
    return { ...newMoodCheckin }
  }

  async getRecentMoods(days = 7) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    
    return this.moodCheckins.filter(mood => 
      new Date(mood.timestamp) >= cutoffDate
    )
  }

  async getMoodStats() {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const totalMoods = this.moodCheckins.length
    const moodCounts = this.moodCheckins.reduce((acc, mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1
      return acc
    }, {})
    
    return {
      total: totalMoods,
      happy: moodCounts.happy || 0,
      neutral: moodCounts.neutral || 0,
      stressed: moodCounts.stressed || 0,
      happyPercentage: totalMoods > 0 ? Math.round((moodCounts.happy || 0) / totalMoods * 100) : 0
    }
  }
}

export default new MoodService()