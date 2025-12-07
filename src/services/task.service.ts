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

/**
 * 
 * @returns tasks from database
 */
const getTasks = async() => {
  return await Task.find()
}

/**
 * 
 * @param id 
 * @returns task from database
 */
const getTask = async(id: string) => {
  return await Task.findById(id);
}

export default {addTask, getTasks, getTask}