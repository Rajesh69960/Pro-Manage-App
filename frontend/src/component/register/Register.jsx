import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Register.module.css"
import Art from "../../assets/images/Art.svg"
import Back from "../../assets/images/Back.svg"
import { userRegister } from "../../apis/auth"
import userIcon from "../../assets/images/Frame 1036.svg"
import mailIcon from "../../assets/images/mdi-light_email.svg"
import lockIcon from "../../assets/images/Group.svg"
import eyeIcon from "../../assets/images/view.svg"
import eyeClose from "../../assets/images/eyeclose.svg"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Register = () => {
  const [visible, setVisible] = useState(true)
  const [confirmVisible, setConfirmVisible] = useState(true)
  const navigate = useNavigate()

  const [checkPassword, setCheckPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState({
    name: "",
    email: "",
    confirmPassword: "",
    password: "",
  })
  const [error, setError] = useState({})
  const [registerUser, setRegisterUser] = useState(false)
  const handleFormChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setRegisterUser(true)
    if (!data.name.length) {
      error.name = "Name required"
    }
    if (!data.email.length) {
      error.email = "Email required"
    }
    if (!data.password.length) {
      error.password = "Password required"
    }
    if (!data.confirmPassword.length) {
      error.confirmPassword = "ConfirmPassword required"
    }

    setError(error)
    if (data.password !== data.confirmPassword) {
      setCheckPassword(true)
      setRegisterUser(false)
    }

    const response = await userRegister({ ...data })
    if (response?.success === false) {
      toast.error(response.message)
      setRegisterUser(false)
    }
    if (response?.success === true) {
      localStorage.setItem("user", response.name)
      localStorage.setItem("token", response.token)
      localStorage.setItem("email", response.email)
      navigate("/board")
      setTimeout(() => {
        toast.success(response.message)
      }, 2000)
    }
  }
  return (
    <>
      <main className={styles.container}>
        <section className={styles.leftContainer}>
          <section className={styles.imageContainer}>
            <img className={styles.backImage} src={Back} alt="BackImage" />
            <img className={styles.artImage} src={Art} alt="ArtImage" />
          </section>
          <div className={styles.textAlign}>
            <h1>Welcome aboard my friend</h1>
            <p>just a couple of clicks and we start</p>
          </div>
        </section>
        <section className={styles.rightContainer}>
          <h2 className={styles.loginTxt}>Register</h2>
          <form>
            <section className={styles.inputContainer}>
              <div className={styles.inputD}>
                <img
                  src={userIcon}
                  alt="userIcon"
                  className={styles.mailIcon}
                />
                <input
                  className={styles.loginEmail}
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleFormChange}
                />
              </div>
              {error.name ? (
                <p className={styles.error}>{error.name}</p>
              ) : (
                <></>
              )}
              <br />
              <div className={styles.inputD}>
                <img
                  src={mailIcon}
                  alt="mailIcon"
                  className={styles.mailIcon}
                />
                <input
                  className={styles.loginEmail}
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleFormChange}
                />
              </div>
              {error.email ? (
                <p className={styles.error}>{error.email}</p>
              ) : (
                <></>
              )}
              <br />
              <div className={styles.inputD}>
                <img src={lockIcon} alt="lockIcon" className={styles.icon} />

                <input
                  className={styles.loginEmail}
                  type={confirmVisible ? "password" : "text"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
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
              </div>
              {error.confirmPassword ? (
                <p className={styles.error}>{error.confirmPassword}</p>
              ) : (
                <></>
              )}
              <br />
              <div className={styles.inputD}>
                <img
                  src={lockIcon}
                  alt="lockIcon"
                  className={styles.icon}
                  onClick={() => setConfirmVisible(!confirmVisible)}
                />

                <input
                  className={styles.loginEmail}
                  type={visible ? "password" : "text"}
                  placeholder="Password"
                  name="password"
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
              </div>
              {error.password ? (
                <p className={styles.error}>{error.password}</p>
              ) : (
                <></>
              )}
              <br />
            </section>
            <section className={styles.btnSection}>
              <button className={styles.loginBtn} onClick={handleRegister}>
                {isLoading ? "Loading..." : "Register"}
              </button>
            </section>
          </form>
          <section className={styles.btnSection}>
            <p>Have an account?</p>
            <button
              className={styles.registerBtn}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </section>
        </section>
      </main>
    </>
  )
}
export default Register
