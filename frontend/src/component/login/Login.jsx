import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Login.module.css"
import { userLogin } from "../../apis/auth"
import Art from "../../assets/images/Art.svg"
import Back from "../../assets/images/Back.svg"
import mailIcon from "../../assets/images/mdi-light_email.svg"
import lockIcon from "../../assets/images/Group.svg"
import eyeIcon from "../../assets/images/view.svg"
import eyeClose from "../../assets/images/eyeclose.svg"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" })

  const [visible, setVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [error, setError] = useState({})
  const [loginUser, setLoginUser] = useState(false)
  const handleFormChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }
  const handleLogIn = async (e) => {
    e.preventDefault()
    const error = {}
    setIsLoading(true)
    setLoginUser(true)

    if (!data.email.length) {
      error.email = "Email required"
      setLoginUser(false)
    }
    if (!data.password.length) {
      error.password = "Password required"
      setLoginUser(false)
    }
    setError(error)
    const result = await userLogin(data.email, data.password)

    if (result?.success === false) {
      toast.error(result.message)
      setLoginUser(false)
    }
    if (result?.success === true) {
      localStorage.setItem("user", result.name)
      localStorage.setItem("token", result.token)
      localStorage.setItem("email", result.email)
      navigate("/board")
      setTimeout(() => {
        toast.success(result.message)
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
          <h2 className={styles.loginTxt}>Login</h2>
          <form method="post">
            <section className={styles.inputContainer}>
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
              <button className={styles.loginBtn} onClick={handleLogIn}>
                {isLoading ? "Loading..." : "Login"}
              </button>
            </section>
          </form>
          <section className={styles.btnSection}>
            <p>Have no account yet?</p>
            <button
              className={styles.registerBtn}
              onClick={() => navigate("/")}
            >
              Register
            </button>
          </section>
        </section>
      </main>
    </>
  )
}

export default Login
