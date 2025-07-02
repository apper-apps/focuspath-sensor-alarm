import tasksData from '@/services/mockData/tasks.json'

class TaskService {
  constructor() {
    this.tasks = [...tasksData]
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 250))
    return [...this.tasks]
  }

  async getByDate(date) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0]
    return this.tasks.filter(task => task.scheduledDate === dateStr)
  }

  async getByGoalId(goalId) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.tasks.filter(task => task.goalId === goalId.toString())
  }

  async getWeekTasks(startDate) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const start = new Date(startDate)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    
    return this.tasks.filter(task => {
      const taskDate = new Date(task.scheduledDate)
      return taskDate >= start && taskDate <= end
    })
  }

  async create(taskData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id)) + 1,
      ...taskData,
      completed: false,
      completedAt: null
    }
    
    this.tasks.push(newTask)
    return { ...newTask }
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const index = this.tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks[index] = { ...this.tasks[index], ...updateData }
    return { ...this.tasks[index] }
  }

  async complete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = this.tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks[index] = {
      ...this.tasks[index],
      completed: true,
      completedAt: new Date().toISOString()
    }
    
    return { ...this.tasks[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = this.tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks.splice(index, 1)
    return true
  }

  async createMultiple(tasksData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newTasks = tasksData.map((taskData, index) => ({
      Id: Math.max(...this.tasks.map(t => t.Id)) + index + 1,
      ...taskData,
      completed: false,
      completedAt: null
    }))
    
    this.tasks.push(...newTasks)
    return [...newTasks]
  }
}

export default new TaskService()