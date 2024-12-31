import React, { useState, useEffect } from "react"
import styles from "./Layout.module.css"
import sandBox from "../assets/images/codesandbox.svg"
import logoutlogo from "../assets/images/Logout.svg"
import layout from "../assets/images/layout.svg"
import database from "../assets/images/database.svg"
import setting from "../assets/images/settings.svg"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Layout = () => {
  const navigate = useNavigate()
  const [logoutModal, setLogoutModal] = useState(false)

  const LogoutModel = () => {
    useEffect(() => {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = "scroll"
      }
    }, [])

    const userLogout = () => {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      navigate("/login")
      setTimeout(() => {
        toast.success("User Logged Out")
      }, 1000)
    }

    return (
      <>
        <div
          onClick={() => setLogoutModal(false)}
          className={styles.modal}
        ></div>
        <div className={styles.modalContainer}>
          <p>Are you sure you want to Logout?</p>
          <div>
            <button onClick={userLogout} className={styles.logoutBtn}>
              Yes, Logout
            </button>
          </div>
          <div>
            <button
              onClick={() => setLogoutModal(false)}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    )
  }

  const handleAnalytics = () => {
    console.log("clicked")
    navigate("/analytics")
  }
  const handleSettings = () => {
    console.log("clicked")
    navigate("/setting")
  }
  const handleBoard = () => {
    console.log("clicked")
    navigate("/")
  }

  return (
    <>
      <main className={styles.sideBarContainer}>
        <section className={styles.proSection}>
          <img src={sandBox} alt="sandBox" />
          <span>
            <h4>Pro Manage</h4>
          </span>
        </section>
        <section className={styles.allSection}>
          <div
            className={styles.boardSection}
            onClick={() => navigate("/board")}
          >
            <img src={layout} alt="Board image" />
            <span>Board</span>
          </div>

          <div
            className={styles.analyticsSection}
            onClick={() => navigate("/analytics")}
          >
            <img src={database} alt="analytic image" />
            <span>Analytics</span>
          </div>

          <div
            className={styles.settingSection}
            onClick={() => navigate("/setting")}
          >
            <img src={setting} alt="setting image" />
            <span>Settings</span>
          </div>
        </section>
        <div
          className={styles.logoutSection}
          onClick={() => setLogoutModal(true)}
        >
          <img src={logoutlogo} alt="logout" className={styles.logoutLogo} />

          <span>Logout</span>
        </div>
        {logoutModal && <LogoutModel />}
      </main>
    </>
  )
}

export default Layout
