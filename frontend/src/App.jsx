import { Outlet } from "react-router-dom"
import "./App.css"
import ThemeProvider from "./component/Context/context"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <ThemeProvider>
      <ToastContainer />
      <Outlet />
    </ThemeProvider>
  )
}

export default App
