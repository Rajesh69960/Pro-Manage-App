require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const AuthRoute = require("./routes/AuthRoute")
const Task = require("./routes/TaskRoute")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

mongoose
  .connect(process.env.MONGODBURL)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error))

app.use("/api/auth", AuthRoute)
app.use("/api/task", Task)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server is running")
})
