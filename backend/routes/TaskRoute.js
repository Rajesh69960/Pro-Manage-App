const express = require("express")
const router = express.Router()

const {
  CreateTask,
  UpdateTask,
  DeleteTask,
  getAllTask,
  getTaskById,
  moveTaskInZone,
  getTaskByZone,
  getAllAnalytics,
} = require("../controller/TaskController")
const VerifyToken = require("../middleware/AuthMiddleware")

router.post("/create", VerifyToken, CreateTask)

router.get("/alltask", VerifyToken, getAllTask)

router.put("/edit/:id", VerifyToken, UpdateTask)

router.delete("/delete/:id", VerifyToken, DeleteTask)

router.get("/taskId/:id", VerifyToken, getTaskById)

router.put("/zone/:id", VerifyToken, moveTaskInZone)
router.get("/zone/:zoneName", VerifyToken, getTaskByZone)
router.get("/analytics", VerifyToken, getAllAnalytics)
module.exports = router
