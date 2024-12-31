import React, { useState } from "react"
import Layout from "../../layout/Layout"
import styles from "./Setting.module.css"
import userIcon from "../../assets/images/Frame 1036.svg"
import mailIcon from "../../assets/images/mdi-light_email.svg"
import lockIcon from "../../assets/images/Group.svg"
import eyeIcon from "../../assets/images/view.svg"
import eyeClose from "../../assets/images/eyeclose.svg"
import { useNavigate } from "react-router-dom"
import { userUpdate } from "../../apis/auth"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Setting = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(true)
  const [confirmVisible, setConfirmVisible] = useState(true)
  const name = localStorage.getItem("user")
  const email = localStorage.getItem("email")
  const [data, setData] = useState({
    newName: "" || name,
    updateEmail: "",
    oldPassword: "",
    newPassword: "",
  })
  const [error, setError] = useState({})
  const [samePassword, setSamePassword] = useState(false)
  const [passwordUpdate, setPasswordUpdate] = useState(false)

  const handleFormChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleUpdateBtn = async (e) => {
    setPasswordUpdate(true)
    e.preventDefault()
    const error = {}
    if (!data.oldPassword.length) {
      error.oldPassword = " old password is required"
    }
    if (!data.newPassword.length) {
      error.newPassword = "New password is required"
    }
    setError(error)
    if (data.oldPassword === data.newPassword) {
      setSamePassword(true)
    }
    const email = localStorage.getItem("email")
    const response = await userUpdate({
      email,
      newName: data.newName,
      updateEmail: data.updateEmail,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    })
    console.log(response)
    if (response?.success === false) {
      toast.error(response.message)
      setPasswordUpdate(false)
    }
    if (response?.success === true) {
      toast.success(response.message)
      setTimeout(() => {
        localStorage.clear()
        navigate("/login")
      }, 2000)
    }
  }
  return (
    <div className={styles.setContext}>
      <Layout />
      <main className={styles.settingContainer}>
        <p>Setting</p>
        <section className={styles.inputContainer}>
          <div className={styles.inputD}>
            <img src={userIcon} alt="userIcon" className={styles.icon} />
            <input
              className={styles.loginEmail}
              type="text"
              placeholder="Name"
              name="newName"
              // value={data.newName}
              onChange={handleFormChange}
            />
          </div>
          <div className={styles.inputD}>
            <img src={mailIcon} alt="mailIcon" className={styles.mailIcon} />
            <input
              className={styles.loginEmail}
              type="email"
              placeholder="Update Email"
              name="updateEmail"
              // value={data.email}
              onChange={handleFormChange}
            />
          </div>
          <div className={styles.inputD}>
            <img src={lockIcon} alt="lockIcon" className={styles.icon} />

            <input
              className={styles.loginEmail}
              type={visible ? "password" : "text"}
              placeholder="Old Password"
              name="oldPassword"
              // value={data.password}
              onChange={handleFormChange}
            />
            {visible ? (
              <img
                src={eyeIcon}
                alt="eyeIcon"
                className={styles.eyeIcon}
                onClick={() => setVisible(!visible)}
              />
            ) : (
              <img
                src={eyeClose}
                alt="eyeIcon"
                className={styles.eyeIcon}
                onClick={() => setVisible(!visible)}
              />
            )}
            {error.oldPassword ? (
              <p className={styles.error}>{error.password}</p>
            ) : (
              <></>
            )}
            <br />
          </div>
          <div className={styles.inputD}>
            <img src={lockIcon} alt="lockIcon" className={styles.icon} />

            <input
              className={styles.loginEmail}
              type={confirmVisible ? "password" : "text"}
              placeholder="New Password"
              name="newPassword"
              value={data.newPassword}
              onChange={handleFormChange}
            />
            {confirmVisible ? (
              <img
                src={eyeIcon}
                alt="eyeIcon"
                className={styles.eyeIcon}
                onClick={() => setConfirmVisible(!confirmVisible)}
              />
            ) : (
              <img
                src={eyeClose}
                alt="eyeIcon"
                className={styles.eyeIcon}
                onClick={() => setConfirmVisible(!confirmVisible)}
              />
            )}
            {error.newPassword ? (
              <p className={styles.error}>{error.newPassword}</p>
            ) : (
              <></>
            )}
            <br />
          </div>
        </section>
        <section>
          <button className={styles.updateBtn} onClick={handleUpdateBtn}>
            Update
          </button>
        </section>
      </main>
    </div>
  )
}

export default Setting
