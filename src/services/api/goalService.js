import goalsData from '@/services/mockData/goals.json'

class GoalService {
  constructor() {
    this.goals = [...goalsData]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.goals]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const goal = this.goals.find(g => g.Id === parseInt(id))
    if (!goal) {
      throw new Error('Goal not found')
    }
    return { ...goal }
  }

  async create(goalData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newGoal = {
      Id: Math.max(...this.goals.map(g => g.Id)) + 1,
      ...goalData,
      createdAt: new Date().toISOString(),
      progress: 0,
      color: this.getRandomColor()
    }
    
    this.goals.push(newGoal)
    return { ...newGoal }
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.goals.findIndex(g => g.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Goal not found')
    }
    
    this.goals[index] = { ...this.goals[index], ...updateData }
    return { ...this.goals[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const index = this.goals.findIndex(g => g.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Goal not found')
    }
    
    this.goals.splice(index, 1)
    return true
  }

  getRandomColor() {
    const colors = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // AI-powered goal breakdown simulation
  async breakdownGoal(goalTitle, targetDate) {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Simulate AI processing with realistic task breakdown
    const taskTemplates = [
      { prefix: "Research", duration: 45 },
      { prefix: "Practice", duration: 30 },
      { prefix: "Review", duration: 20 },
      { prefix: "Study", duration: 60 },
      { prefix: "Complete", duration: 90 },
      { prefix: "Learn", duration: 40 }
    ]
    
    const tasks = []
    const startDate = new Date()
    const endDate = new Date(targetDate)
    const daysUntilTarget = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
    const weeksUntilTarget = Math.ceil(daysUntilTarget / 7)
    
    // Generate 3-5 tasks per week
    const tasksPerWeek = Math.min(5, Math.max(3, Math.ceil(20 / weeksUntilTarget)))
    
    for (let week = 0; week < Math.min(weeksUntilTarget, 8); week++) {
      for (let taskIndex = 0; taskIndex < tasksPerWeek; taskIndex++) {
        const template = taskTemplates[Math.floor(Math.random() * taskTemplates.length)]
        const taskDate = new Date(startDate)
        taskDate.setDate(startDate.getDate() + (week * 7) + Math.floor(Math.random() * 7))
        
        tasks.push({
          title: `${template.prefix} ${goalTitle.toLowerCase().split(' ').slice(0, 3).join(' ')}`,
          scheduledDate: taskDate.toISOString().split('T')[0],
          scheduledTime: this.getRandomTime(),
          duration: template.duration + Math.floor(Math.random() * 20) - 10
        })
      }
    }
    
    return tasks
  }

  getRandomTime() {
    const hours = [8, 9, 10, 14, 15, 16, 17, 18, 19, 20]
    const hour = hours[Math.floor(Math.random() * hours.length)]
    const minute = Math.random() > 0.5 ? '00' : '30'
    return `${hour.toString().padStart(2, '0')}:${minute}`
  }
}

export default new GoalService()