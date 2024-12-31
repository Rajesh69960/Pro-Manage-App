import styles from "./PlusModal.module.css"
import { useContext, useEffect, useRef, useState } from "react"
import deleteIcon from "../../assets/images/Delete.svg"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { createTask, getAllTask, taskById } from "../../apis/Task"
import { ThemeContext } from "../../component/Context/context"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getAllMails } from "../../apis/auth"

const PlusModal = ({ showAdd, setShowAdd, mails }) => {
  const [getDate, setGetDate] = useState(null)
  const [addNew, setAddNew] = useState([])
  const token = localStorage.getItem("token")
  const [
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
  ] = useContext(ThemeContext)

  const { id, title, priority, date, checklist, assignTo } = update

  const high = useRef()
  const low = useRef()
  const medium = useRef()
  const dateNow = Date().now
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    checklist: [],
    assignTo: "",
    date: "",
  })
  const handleTaskCreate = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (e.target.value === "HIGH PRIORITY") {
      high.current.style.backgroundColor = "#EEECEC"
      medium.current.style.backgroundColor = "#FFFFFF"
      low.current.style.backgroundColor = "#FFFFFF"
    }
    if (e.target.value === "MODERATE PRIORITY") {
      medium.current.style.backgroundColor = "#EEECEC"
      low.current.style.backgroundColor = "#FFFFFF"
      high.current.style.backgroundColor = "#FFFFFF"
    }
    if (e.target.value === "LOW PRIORITY") {
      low.current.style.backgroundColor = "#EEECEC"
      high.current.style.backgroundColor = "#FFFFFF"
      medium.current.style.backgroundColor = "#FFFFFF"
    }
  }

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
      setDoneTask(doneZoneTasks || [])
      setBacklogTask(backlogZoneTasks || [])
      setTodoTask(todoZonetask || [])
      setProgressTask(progressZoneTask || [])
    }
  }

  const createAllTask = async () => {
    try {
      if (updateId) {
        // Updating an existing task

        const response = await taskById(updateId, formData)
        if (response?.status === 200) {
          setShowAdd(false)
          setUpdateId(id)
          setUpdate({})
          setTimeout(() => {
            toast.success("Task updated successfully")
          }, 800)
        } else {
          toast.error("Failed to update task")
        }
      } else {
        // Creating a new task
        if (!formData.title) {
          toast.error("Title is required")
          return
        }
        if (!formData.priority) {
          toast.error("Please select a priority")
          return
        }
        if (formData.checklist.length === 0) {
          toast.error("Please add at least one task in the checklist")
          return
        }

        const response = await createTask(formData)
        if (response?.success) {
          setShowAdd(false)
          setFormData({
            title: "",
            priority: "",
            assignTo: "",
            date: "",
            checklist: [],
            id: "",
          })
          setGetDate("")
          setUpdateId(id)
          setAddNew([])
          setTimeout(() => {
            toast.success("Task created successfully")
          }, 800)
        } else {
          toast.error(response?.message || "Failed to create task")
        }
        getTasks()
      }
    } catch (error) {
      toast.error("An error occurred while processing the task")
      console.error(error)
    }
  }

  const handleAdd = () => {
    setAddNew((prev) => [...prev, ""])
  }

  const handleChange = (e, index) => {
    const { value } = e.target
    const updatedChecklist = [...addNew]
    updatedChecklist[index] = value
    setAddNew(updatedChecklist)

    setFormData((prev) => ({
      ...prev,
      checklist: updatedChecklist,
    }))
  }

  const handleDelete = (index) => {
    setAddNew((prev) => prev.filter((_, i) => i !== index))
  }
  const cancelTask = () => {
    setShowAdd(false)
    setFormData({})
    setUpdateId(null)
    setUpdate({})
  }

  const handleDateChange = (dt) => {
    setGetDate(dt)
    formData.date = dt
  }
  useEffect(() => {
    if (updateId) {
      formData.checklist = checklist
      formData.date = date
      formData.assignTo = assignTo
      formData.priority = priority
      formData.title = title

      if (priority === "HIGH PRIORITY") {
        high.current.style.backgroundColor = "#EEECEC"
        medium.current.style.backgroundColor = "#FFFFFF"
        low.current.style.backgroundColor = "#FFFFFF"
      }
      if (priority === "MODERATE PRIORITY") {
        medium.current.style.backgroundColor = "#EEECEC"
        low.current.style.backgroundColor = "#FFFFFF"
        high.current.style.backgroundColor = "#FFFFFF"
      }
      if (priority === "LOW PRIORITY") {
        low.current.style.backgroundColor = "#EEECEC"
        high.current.style.backgroundColor = "#FFFFFF"
        medium.current.style.backgroundColor = "#FFFFFF"
      }
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "scroll"
    }
  }, [])
  return (
    <>
      {showAdd ? (
        <>
          <section
            onClick={() => setShowAdd(false)}
            className={styles.modal}
          ></section>

          <main className={styles.modalContainer}>
            <section>
              <div className={styles.title}>
                Title <span className={styles.mandatory}>*</span>
              </div>
              <div>
                <input
                  className={styles.enterTask}
                  type="text"
                  name="title"
                  placeholder={`Enter Task Title` || title}
                  defaultValue={"" || title}
                  onChange={handleTaskCreate}
                />
              </div>
            </section>
            <section className={styles.priority}>
              <div>
                Select Priority <span className={styles.mandatory}>*</span>
              </div>
              <div className={styles.priorityInputContainer}>
                <div className={styles.priorityInputs}>
                  <p className={styles.high}></p>
                  <input
                    readOnly
                    onClick={handleTaskCreate}
                    value="HIGH PRIORITY"
                    name="priority"
                    placeholder="HIGH PRIORITY"
                    ref={high}
                    className={styles.priorityInput}
                  />
                </div>

                <div className={styles.priorityInputs}>
                  <p className={styles.moderate}></p>
                  <input
                    readOnly
                    onClick={handleTaskCreate}
                    ref={medium}
                    value="MODERATE PRIORITY"
                    placeholder="MODERATE PRIORITY"
                    name="priority"
                    className={styles.priorityInput}
                  />
                </div>

                <div className={styles.priorityInputs}>
                  <p className={styles.low}></p>
                  <input
                    readOnly
                    ref={low}
                    onClick={handleTaskCreate}
                    value="LOW PRIORITY"
                    name="priority"
                    className={styles.priorityInput}
                  />
                </div>
              </div>
            </section>
            <section className={styles.assignToContainer}>
              {mails.length > 0 ? (
                <div className={styles.assignText}>
                  Assign To
                  <select
                    className={styles.assignToInput}
                    defaultValue={assignTo || "Add a Assignee"}
                    name="assignTo"
                    onChange={handleTaskCreate}
                  >
                    <option style={{ color: "#9B959F" }} type="text" disabled>
                      Add a assignee
                    </option>
                    {mails.map((element) => {
                      return (
                        <option key={element?._id}>{element?.email}</option>
                      )
                    })}
                  </select>
                </div>
              ) : null}
            </section>

            <div className={styles.checklistText}>
              Checklist <span>(0/{addNew?.length})</span>
              <span className={styles.mandatory}>*</span>
            </div>
            <main className={styles.addChecklistContainer}>
              <section className={styles.addNewContainer}>
                {addNew?.map((data, i) => (
                  <section key={i} className={styles.addChecklist}>
                    <section className={styles.checklistbox}>
                      <input type="checkbox"></input>
                      <input
                        className={styles.addTaskInput}
                        placeholder="Task to be done"
                        value={data}
                        name="checklist"
                        onChange={(e) => handleChange(e, i)}
                      />
                      <img
                        src={deleteIcon}
                        alt="deleteIcon"
                        onClick={() => handleDelete(i)}
                      />
                    </section>
                  </section>
                ))}
              </section>
              <div className={styles.addNewText} onClick={handleAdd}>
                + Add New
              </div>
            </main>

            <footer>
              <DatePicker
                className={styles.dateBtn}
                dateFormat="dd/MM/YYYY"
                selected={dateNow || getDate}
                placeholderText="Select Due Date"
                onChange={(e) => handleDateChange(e)}
              ></DatePicker>
              <div>
                <button className={styles.cancelBtn} onClick={cancelTask}>
                  Cancel
                </button>
                <button onClick={createAllTask} className={styles.saveBtn}>
                  {updateId ? "Update" : "Save"}
                </button>
              </div>
            </footer>
          </main>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default PlusModal
