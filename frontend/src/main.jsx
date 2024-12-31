import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import WelcomePage from "./pages/welcomepage/WelcomePage.jsx"
import LoginPage from "./pages/loginpage/LoginPage.jsx"
import RegisterPage from "./pages/registerpage/RegisterPage.jsx"
import Analytics from "./utils/Analytics/Analytics.jsx"
import Setting from "./utils/Setting/Setting.jsx"

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/board",
        element: <WelcomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <RegisterPage />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
