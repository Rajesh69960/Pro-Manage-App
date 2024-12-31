import React, { useEffect, useState } from "react"
import Layout from "../../layout/Layout"
import styles from "./Analytics.module.css"
import { getTaskAnalytics } from "../../apis/Task"

const Analytics = () => {
  const [analytics, setAnalytics] = useState({})
  const getAnalytics = async () => {
    const response = await getTaskAnalytics()
    setAnalytics(response.data)
    console.log(response.data)
  }
  useEffect(() => {
    getAnalytics()
  }, [])
  return (
    <>
      <div className={styles.context}>
        <Layout />

        <main className={styles.contextContainer}>
          <p className={styles.heading}>Analytics</p>
          <section className={styles.Container}>
            <section className={styles.leftContainer}>
              <ul className={styles.groupList}>
                <li>
                  Backlog Tasks
                  <span className={styles.spaning}>
                    {analytics?.backlogTask || 0}
                  </span>
                </li>

                <li>
                  To-do Tasks
                  <span className={styles.spaning}>
                    {analytics?.todoTask || 0}
                  </span>
                </li>

                <li>
                  In Progress Tasks
                  <span className={styles.spaning}>
                    {analytics?.ProgressTask || 0}
                  </span>
                </li>
                <li>
                  Completed Tasks
                  <span className={styles.spaning}>
                    {analytics.doneTask || 0}
                  </span>
                </li>
              </ul>
            </section>
            <section className={styles.rightContainer}>
              <ul className={styles.groupList}>
                <li>
                  Low Priority
                  <span className={styles.spaning}>
                    {analytics.lowPriority || 0}
                  </span>
                </li>

                <li>
                  Moderate Priority
                  <span className={styles.spaning}>
                    {analytics.moderatePriority || 0}
                  </span>
                </li>

                <li>
                  High Priority
                  <span className={styles.spaning}>
                    {analytics.highPriority || 0}
                  </span>
                </li>
                <li>
                  Due Date Tasks
                  <span className={styles.spaning}>
                    {analytics.dueDatetaskTotal || 0}
                  </span>
                </li>
              </ul>
            </section>
          </section>
        </main>
      </div>
    </>
  )
}

export default Analytics
