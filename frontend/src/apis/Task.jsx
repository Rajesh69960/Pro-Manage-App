import axios from "axios"
const backendUrl = import.meta.env.VITE_BACKEND_URL
export const createTask = async ({
  title,
  priority,
  checklist,
  assignTo,
  date,
}) => {
  try {
    const reqUrl = `${backendUrl}/api/task/create`
    const reqPayload = { title, priority, checklist, assignTo, date }
    const token = localStorage.getItem("token")
    const response = await axios.post(reqUrl, reqPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
    return error.response
  }
}

export const getAllTask = async () => {
  try {
    const url = `${backendUrl}/api/task/alltask`
    const token = localStorage.getItem("token")
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const getTaskById = async (id) => {
  try {
    const url = `${backendUrl}/api/task/taskId/${id}`
    const response = await axios.get(url, id)
    return response
  } catch (error) {
    console.log(error)
  }
}
export const deleteTask = async (id) => {
  try {
    const url = `${backendUrl}/api/task/delete/${id}`
    const token = localStorage.getItem("token")
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const taskById = async (id, taskPayload) => {
  try {
    const url = `${backendUrl}/api/task/edit/${id}`
    const token = localStorage.getItem("token")

    const response = await axios.put(url, taskPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error("Error updating task:", error)
    toast.error("Failed to update task. Please try again.")
    return null
  }
}

export const getTaskAnalytics = async () => {
  try {
    const url = `${backendUrl}/api/task/analytics`
    const token = localStorage.getItem("token")
    const response = axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
export const moveTaskInZone = async (id, newZone) => {
  try {
    const url = `${backendUrl}/api/task/zone/${id}`
    const token = localStorage.getItem("token")
    const response = await axios.put(url, newZone, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
