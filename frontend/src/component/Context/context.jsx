import { createContext, useEffect, useState } from "react"
import { getAllTask } from "../../apis/Task"
import { getAllMails } from "../../apis/auth"

export const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [doneTask, setDoneTask] = useState()
  const [backlogTask, setBacklogTask] = useState()
  const [todoTask, setTodoTask] = useState()
  const [progressTask, setProgressTask] = useState()
  const [update, setUpdate] = useState({})
  const [updateId, setUpdateId] = useState()
  const [emailId, setEmailId] = useState({
    email: [],
  })
  const token = localStorage.getItem("token")

  const getTasks = async () => {
    if (token) {
      const response = await getAllTask()
      const doneZoneTasks = response?.data?.filter((elem) => {
        return elem.zone === "Done"
      })
      const backlogZoneTasks = response?.data?.filter((elem) => {
        return elem.zone === "Backlog"
      })
      const todoZonetask = response?.data?.filter((elem) => {
        return elem.zone === "Todo"
      })
      const progressZoneTask = response?.data?.filter((elem) => {
        return elem.zone === "Progress"
      })
      setDoneTask(doneZoneTasks)
      setBacklogTask(backlogZoneTasks)
      setTodoTask(todoZonetask)
      setProgressTask(progressZoneTask)
      setUpdateId(response.id)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])
  return (
    <ThemeContext.Provider
      value={[
        doneTask,
        setDoneTask,
        backlogTask,
        setBacklogTask,
        todoTask,
        setTodoTask,
        progressTask,
        setProgressTask,

        update,
        setUpdate,
        updateId,
        setUpdateId,
        emailId,
        setEmailId,
      ]}
    >
      {children}
    </ThemeContext.Provider>
  )
}
export default ThemeProvider
