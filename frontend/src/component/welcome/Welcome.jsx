import React, { useContext } from "react"
import { useState, useEffect } from "react"
import styles from "./Welcome.module.css"

import { LuUsersRound } from "react-icons/lu"
import Layout from "../../layout/Layout"
import Card from "../../utils/card/Card"
import fileCollapse from "../../assets/images/codicon_collapse-all.svg"
import plusIcon from "../../assets/images/Group 10.svg"
import PlusModal from "../../Modals/plus clicked/PlusModal"

import AddPeopleModal from "../../Modals/addPeople/AddPeopleModal"
import { getAllTask } from "../../apis/Task"
import "react-toastify/dist/ReactToastify.css"
import { ThemeContext } from "../Context/context"
import { getAllMails } from "../../apis/auth"

const Welcome = () => {
  const [showEmail, setShowEmail] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [handleDate, setHandleDate] = useState(null)
  const [mails, setMails] = useState([])
  const [
    doneTask,
    setDoneTask,
    backlogTask,
    setBacklogTask,
    todoTask,
    setTodoTask,
    progressTask,
    setProgressTask,
  ] = useContext(ThemeContext)

  const [backlogCollapse, setBacklogCollapse] = useState(true)
  const [todoCollapse, setTodoCollapse] = useState(true)
  const [progressCollapse, setProgressCollapse] = useState(true)
  const [doneCollapse, setDoneCollapse] = useState(true)
  const [selectedDates, setSelectedDates] = useState()

  const getMails = async () => {
    const response = await getAllMails()
    setMails(response?.data || [])
  }
  const dateTime = new Date()
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
  const getMonth = months[dateTime.getMonth()]
  const getYear = dateTime.getFullYear()
  const getDate = dateTime.getDate()
  const getFulldate = `${getDate}th ${getMonth} ${getYear}`
  const user = localStorage.getItem("user")

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

  const formatDate = (date) => {
    const suffixes = ["th", "st", "nd", "rd"]
    // Get the day and determine the suffix
    const day = date.getDate()
    const daySuffix =
      suffixes[
        day % 10 > 3 || Math.floor((day % 100) / 10) === 1 ? 0 : day % 10
      ]

    // Format the date using Intl.DateTimeFormat
    const options = { month: "short", year: "numeric" }
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date)

    return `${day}${daySuffix} ${formattedDate}`
  }

  const getToday = () => {
    const today = new Date()

    return formatDate(today)
  }

  const getThisWeek = () => {
    const today = new Date()
    const startOfWeek = new Date(today)
    const endOfWeek = new Date(today)

    // Set start to Sunday and end to Saturday
    startOfWeek.setDate(today.getDate() - today.getDay())
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()))

    return {
      start: formatDate(startOfWeek),
      end: formatDate(endOfWeek),
    }
  }

  const getThisMonth = () => {
    const today = new Date()
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    return {
      start: formatDate(startOfMonth),
      end: formatDate(endOfMonth),
    }
  }

  const handleDateChange = (event) => {
    const selectedValue = event.target.value
    setSelectedDates(selectedValue)
    if (selectedValue === "today") {
      setSelectedDates(`${getToday()}`)
    }
    if (selectedValue === "week") {
      const week = getThisWeek()
      setSelectedDates(`${week.start} to ${week.end}`)
    }
    if (selectedValue === "month") {
      const month = getThisMonth()
      setSelectedDates(`${month.start} to ${month.end}`)
    }
  }

  const getmail = async () => {
    const response = await getAllMails()
    setMails(response.data.data)
  }
  useEffect(() => {
    setTimeout(() => {
      getmail()
    }, 1000)
  }, [])

  return (
    <>
      <main className={styles.Container}>
        <Layout />

        <main className={styles.rightContainer}>
          <section>
            <section className={styles.welcomeMessage}>
              <h2>Welcome! {user}</h2>
              <p>{selectedDates || getFulldate}</p>
            </section>
            <section className={styles.welcomeBoardSection}>
              <div className={styles.boardHeading}>
                <h1>Board</h1>
                {showEmail ? (
                  <AddPeopleModal
                    showEmail={showEmail}
                    setShowEmail={setShowEmail}
                    setMails={setMails}
                  />
                ) : null}
                <span onClick={() => setShowEmail(true)}>
                  <LuUsersRound />
                  Add Person
                </span>
              </div>
              <select
                id="mySelect"
                className={styles.weekSection}
                onChange={handleDateChange}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </section>
          </section>

          <main className={styles.cardContainer}>
            <main className={styles.dummy}>
              <section className={styles.Card}>
                <section className={styles.cardHeaders}>
                  <h3>Backlog</h3>
                  <div
                    className={styles.iconAlignment}
                    onClick={() => setBacklogCollapse(!backlogCollapse)}
                  >
                    <img src={fileCollapse} alt="fileCollapse" />
                  </div>
                </section>
                <div className={styles.cardContainContainer}>
                  {backlogCollapse ? (
                    backlogTask?.length > 0 ? (
                      backlogTask?.map((elem) => (
                        <Card
                          key={elem.id}
                          title={elem.title}
                          priority={elem.priority}
                          checklist={elem.checklist}
                          date={elem.date}
                          assignTo={elem.assignTo}
                          id={elem._id}
                          zone1={"Todo"}
                          zone2={"Progress"}
                          zone3={"Done"}
                          setShowAdd={setShowAdd}
                        />
                      ))
                    ) : null
                  ) : (
                    <></>
                  )}
                </div>
              </section>

              <section className={styles.Card}>
                <section className={styles.cardHeaders}>
                  <h3>Todo</h3>
                  <div className={styles.iconAlignment}>
                    <img
                      src={plusIcon}
                      alt="plusIcon"
                      onClick={() => setShowAdd(true)}
                    />
                    <img
                      src={fileCollapse}
                      alt="fileCollapse"
                      onClick={() => setTodoCollapse(!todoCollapse)}
                    />
                  </div>
                </section>
                <div className={styles.cardContainContainer}>
                  {todoCollapse ? (
                    todoTask?.length > 0 ? (
                      todoTask?.map((elem) => (
                        <Card
                          key={elem.id}
                          title={elem.title}
                          priority={elem.priority}
                          checklist={elem.checklist}
                          date={elem.date}
                          assignTo={elem.assignTo}
                          id={elem._id}
                          zone1={"Backlog"}
                          zone2={"Progress"}
                          zone3={"Done"}
                          setShowAdd={setShowAdd}
                        />
                      ))
                    ) : null
                  ) : (
                    <></>
                  )}
                </div>
              </section>

              <section className={styles.Card}>
                <section className={styles.cardHeaders}>
                  <h3>In Progress</h3>
                  <div
                    className={styles.iconAlignment}
                    onClick={() => setProgressCollapse(!progressCollapse)}
                  >
                    <img src={fileCollapse} alt="fileCollapse" />
                  </div>
                </section>
                <div className={styles.cardContainContainer}>
                  {progressCollapse ? (
                    progressTask?.length > 0 ? (
                      progressTask?.map((elem) => (
                        <Card
                          key={elem.id}
                          title={elem.title}
                          priority={elem.priority}
                          checklist={elem.checklist}
                          date={elem.date}
                          assignTo={elem.assignTo}
                          id={elem._id}
                          zone1={"Backlog"}
                          zone2={"Todo"}
                          zone3={"Done"}
                          setShowAdd={setShowAdd}
                        />
                      ))
                    ) : null
                  ) : (
                    <></>
                  )}
                </div>
              </section>

              <section className={styles.Card}>
                <section className={styles.cardHeaders}>
                  <h3>Done</h3>
                  <div
                    className={styles.iconAlignment}
                    onClick={() => setDoneCollapse(!doneCollapse)}
                  >
                    <img src={fileCollapse} alt="fileCollapse" />
                  </div>
                </section>
                <div className={styles.cardContainContainer}>
                  {doneCollapse ? (
                    doneTask?.length > 0 ? (
                      doneTask?.map((elem) => (
                        <Card
                          key={elem.id}
                          title={elem.title}
                          priority={elem.priority}
                          checklist={elem.checklist}
                          date={elem.date}
                          assignTo={elem.assignTo}
                          id={elem._id}
                          zone1={"Backlog"}
                          zone2={"Todo"}
                          zone3={"Progress"}
                          setShowAdd={setShowAdd}
                        />
                      ))
                    ) : null
                  ) : (
                    <></>
                  )}
                </div>
              </section>
            </main>
          </main>
        </main>
      </main>
      {showAdd && (
        <PlusModal
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          mails={mails}
          setMails={setMails}
        />
      )}
    </>
  )
}

export default Welcome
