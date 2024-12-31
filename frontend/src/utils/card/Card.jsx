import styles from "./Card.module.css"
import { useContext, useEffect, useRef, useState } from "react"
import { VscChevronDown, VscChevronUp } from "react-icons/vsc"
import { deleteTask, getAllTask, moveTaskInZone } from "../../apis/Task"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { ThemeContext } from "../../component/Context/context"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Card = ({
  id,
  title,
  priority,
  date,
  checklist,
  assignTo,
  zone1,
  zone2,
  zone3,
  setShowAdd,
}) => {
  const [dotClick, setDotClick] = useState(false)
  const [deleteClick, setDeleteClick] = useState(false)
  const controlRef = useRef()
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

  const notify = () => toast.success("Share link copied")
  const [checklistCollapse, setChecklistCollapse] = useState(false)
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ]

  const getTasks = async () => {
    const response = await getAllTask()
    const doneZone = response?.data?.filter((elem) => {
      return elem.zone === "Done"
    })
    const backlogZone = response?.data?.filter((elem) => {
      return elem.zone === "Backlog"
    })
    const todoZone = response?.data?.filter((elem) => {
      return elem.zone === "Todo"
    })
    const progressZone = response?.data?.filter((elem) => {
      return elem.zone === "Progress"
    })
    setDoneTask(doneZone || [])
    setBacklogTask(backlogZone || [])
    setTodoTask(todoZone || [])
    setProgressTask(progressZone || [])
  }
  useEffect(() => {
    setTimeout(() => {
      getTasks()
    })
  }, [])

  const moveTask = async (id, zone) => {
    const response = await moveTaskInZone(id, { zone })
    if (response.status === 200) {
      getTasks()
      toast.success("Status updated")
    }
  }

  const handleEdit = () => {
    setShowAdd(true)
    setDotClick(false)
    setUpdateId(id)
    setUpdate({ title, priority, assignTo, date, checklist })
  }

  const cancelHandle = () => {
    setDeleteClick(false)
    setDotClick(false)
  }
  const upperEmailInitial = (s) => {
    const firstLetter = s[0]
    const secondLetter = s[1]
    const words = firstLetter.toUpperCase() + secondLetter.toUpperCase()
    return words
  }

  const closeControls = (e) => {
    if (
      dotClick &&
      controlRef.current &&
      !controlRef.current.contains(e.target)
    ) {
      setDotClick(false)
    }
  }

  const handleDelete = async (id) => {
    const response = await deleteTask(id)
    if ((response.success = true)) {
      getTasks()
      toast.success("Task Deleted successfully")
    }
    setDeleteClick(false)
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeControls)
  })
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "scroll"
    }
  }, [])

  return (
    <>
      <div className={styles.cardContainAlign}>
        <section className={styles.cardContain}>
          <section className={styles.priorityBar}>
            <div>
              <p
                className={`${
                  priority === "HIGH PRIORITY"
                    ? styles.priorityHigh
                    : priority === "MODERATE PRIORITY"
                    ? styles.priorityModerate
                    : priority === "LOW PRIORITY"
                    ? styles.priorityLow
                    : null
                }`}
              ></p>
              <span>{priority}</span>

              {assignTo ? (
                <span className={styles.emailIcon}>
                  {upperEmailInitial(assignTo)}
                </span>
              ) : null}
            </div>
            <h4 onClick={() => setDotClick(true)}>. . .</h4>
            {dotClick ? (
              <>
                <div
                  onClick={() => setDotClick(false)}
                  className={styles.modal}
                ></div>
                <section className={styles.dotContainer} ref={controlRef}>
                  <p onClick={handleEdit}>Edit</p>
                  <CopyToClipboard text={`${window.location.href}/task/${id}`}>
                    <p onClick={notify}>Share</p>
                  </CopyToClipboard>

                  <p
                    onClick={() => setDeleteClick(true)}
                    className={styles.deleteBtnText}
                  >
                    Delete
                  </p>
                  {
                    <>
                      {deleteClick ? (
                        <>
                          <div
                            onClick={cancelHandle}
                            className={styles.deletemodal}
                          ></div>
                          <div className={styles.deleteModalContainer}>
                            <p>Are you sure you want to Delete?</p>
                            <div>
                              <button
                                onClick={() => handleDelete(id)}
                                className={styles.logoutBtn}
                              >
                                Yes, Delete
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={cancelHandle}
                                className={styles.cancelBtn}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </>
                  }
                </section>
              </>
            ) : null}
          </section>
          <section className={styles.heroSection}>{title}</section>
          <section className={styles.checklistContainer}>
            <section className={styles.checklist}>
              <p>
                Checklist <span>(1/{checklist.length})</span>
              </p>
              <div onClick={() => setChecklistCollapse(!checklistCollapse)}>
                {checklistCollapse ? <VscChevronUp /> : <VscChevronDown />}
              </div>
            </section>
            {checklistCollapse
              ? checklist.map(
                  (check, i) =>
                    checklistCollapse && (
                      <section key={i} className={styles.checklistbox}>
                        <input
                          type="checkbox"
                          className={styles.checklistCheckbox}
                        ></input>
                        {check || "Task to be Done"}
                        {/* <input
                          className={styles.addTaskInput}
                          placeholder={`${`Task to be done` || check} `}
                        /> */}
                      </section>
                    )
                )
              : null}
          </section>
          <section className={styles.bottomBtnContainer}>
            <div>
              {date ? (
                <button className={styles.dateBtn}>
                  {`${months[date.substr(5, 2) - 1]} `}
                  {`${date.substr(8, 1) + date.substr(9, 1)}th`}
                </button>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.zonesBtn}>
              <button onClick={() => moveTask(id, String(zone1))}>
                {zone1}
              </button>
              <button onClick={() => moveTask(id, String(zone2))}>
                {zone2}
              </button>
              <button onClick={() => moveTask(id, String(zone3))}>
                {zone3}
              </button>
            </div>
          </section>
        </section>
      </div>
    </>
  )
}

export default Card
