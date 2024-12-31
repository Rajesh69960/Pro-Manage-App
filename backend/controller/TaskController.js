const { default: mongoose } = require("mongoose")
const Task = require("../model/Task")

const CreateTask = async (req, res) => {
  try {
    const { title, priority, checklist, assignTo, date, zone } = req.body
    const userRef = req.body.id
    if (!title || !priority || !checklist.length) {
      console.log("fields are required")
      res.status(401).json({
        success: false,
        message: "fields are required",
      })
    }
    const newTask = new Task({
      title,
      priority,
      checklist,
      assignTo,
      date,
      userRef,
      zone,
    })
    const savedTask = await newTask.save()
    res.status(200).json({
      data: savedTask,
      success: true,
      message: "Task added succefully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" })
  }
}
const UpdateTask = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Task ID" })
    }
    const editTask = await Task.findByIdAndUpdate(
      id,
      data,
      { $set: data },
      {
        runValidators: true,
        new: true,
      }
    )
    if (!editTask) {
      res.status(401).json({
        success: false,
        message: "Task not found",
      })
    }
    res.status(200).json({
      data: editTask,
      success: true,
      message: "Task updated successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" })
  }
}

const DeleteTask = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const response = await Task.findByIdAndDelete(id, data)
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" })
  }
}
const getAllTask = async (req, res) => {
  try {
    const userId = req.body.id

    const task = await Task.find({ userRef: userId })
    res.status(200).json({
      data: task,
      success: true,
      message: "Task fetched successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" })
  }
}
const getTaskById = async (req, res) => {
  try {
    const id = req.params.id
    const response = await Task.findById(id)
    res.status(200).json({
      data: response,
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

const moveTaskInZone = async (req, res) => {
  try {
    const id = req.params.id
    const { zone } = req.body
    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      })
    }
    task.zone = zone
    await task.save()
    res.json({
      success: true,
      message: "Task moved successfully",
      task: task,
    })
  } catch (error) {
    console.log(error)
  }
}
const getTaskByZone = async (req, res) => {
  try {
    const id = req.body.id
    const zoneName = req.params.zoneName
    const task = await Task.find({ zone: zoneName, userRef: id })
    res.status(200).json({
      data: task,
      success: true,
    })
  } catch (error) {
    console.log(error)
  }
}

const getAllAnalytics = async (req, res) => {
  try {
    const userId = req.body.id
    const backlog = await Task.countDocuments({
      userRef: userId,
      zone: "Backlog",
    })
    console.log(backlog)
    const todo = await Task.countDocuments({
      userRef: userId,
      zone: "Todo",
    })
    const Progress = await Task.countDocuments({
      userRef: userId,
      zone: "Progress",
    })
    const done = await Task.countDocuments({
      userRef: userId,
      zone: "Done",
    })
    const high = await Task.countDocuments({
      userRef: userId,
      priority: "HIGH PRIORITY",
    })
    const low = await Task.countDocuments({
      userRef: userId,
      priority: "LOW PRIORITY",
    })
    const moderate = await Task.countDocuments({
      userRef: userId,
      priority: "MODERATE PRIORITY",
    })
    const nullDateTask = await Task.countDocuments({
      userRef: userId,
      date: "",
    })
    const totalDateTask = await Task.countDocuments({
      userRef: userId,
      date: { $exists: true },
    })
    res.status(200).json({
      backlogTask: backlog,
      todoTask: todo,
      ProgressTask: Progress,
      doneTask: done,
      highPriority: high,
      lowPriority: low,
      moderatePriority: moderate,
      dueDateTaskNull: nullDateTask,
      dueDatetaskTotal: totalDateTask,
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  CreateTask,
  UpdateTask,
  DeleteTask,
  getAllTask,
  getTaskById,
  moveTaskInZone,
  getTaskByZone,
  getAllAnalytics,
}
