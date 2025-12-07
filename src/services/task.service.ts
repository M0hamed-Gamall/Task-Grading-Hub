import Task from "../models/task.model.js"

/**
 * 
 * @param title 
 * @param description 
 * @param deadline 
 * @param publishedBy 
 * @returns task
 */
const addTask = async(title: string, description: string, deadline: Date, publishedBy: string) => {
  const task = await Task.create({title, description, deadline, publishedBy})
  return task;
}

export default {addTask}