import React, { useContext, useEffect, useState } from "react"
import styles from "./AddPeopleModal.module.css"
import { addEmail, getAllMails } from "../../apis/auth"
import { ThemeContext } from "../../component/Context/context"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AddPeopleModal = ({ showEmail, setShowEmail, setMails }) => {
  const [completeEmail, setCompleteEmail] = useState(false)

  const [emailId, setEmailId] = useContext(ThemeContext)

  const getMails = async () => {
    const response = await getAllMails()
    console.log(response.data)
    setMails(response.data || [])
  }
  const handleAddEmail = async () => {
    const response = await addEmail(emailId)
    setEmailId(response)
    console.log(response.email)
    setCompleteEmail(true)
    getMails()
  }
  const handleEmail = (e) => {
    setEmailId({ ...emailId, [e.target.name]: e.target.value })
  }

  const handleOkayClick = () => {
    setShowEmail(false)
    setCompleteEmail(false)
    setTimeout(() => {
      toast.success("Email added successfully")
    }, 1000)
  }

  useEffect(() => {
    getMails()
  }, [])
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "scroll"
    }
  }, [])
  return (
    <>
      {showEmail ? (
        !completeEmail ? (
          <>
            <div
              onClick={() => setShowEmail(false)}
              className={styles.modal}
            ></div>

            <div className={styles.modalContainer}>
              <p className={styles.addingPeopleText}>Add people to the board</p>
              <div className={styles.emailInput}>
                <input
                  className={styles.enterTask}
                  type="text"
                  placeholder="Enter the email"
                  name="email"
                  onChange={handleEmail}
                />
              </div>
              <div className={styles.alignButtonRight}>
                <button
                  onClick={() => setShowEmail(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button className={styles.addEmailBtn} onClick={handleAddEmail}>
                  Add Email
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => setCompleteEmail(false)}
              className={styles.completeModal}
            ></div>
            <div className={styles.completeModalContainer}>
              <p className={styles.emailText}>
                <acronym>{emailId.email.email}</acronym> added to Board
              </p>
              <p className={styles.gotItBtn} onClick={handleOkayClick}>
                Okay,got it!
              </p>
            </div>
          </>
        )
      ) : null}
    </>
  )
}

export default AddPeopleModal
