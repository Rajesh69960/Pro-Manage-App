const express = require("express")
const router = express.Router()

const {
  RegisterController,
  LoginController,
  UpdatePassword,
  AddMail,
  getAllMails,
} = require("../controller/AuthController")
const VerifyToken = require("../middleware/AuthMiddleware")

router.post("/register", RegisterController)

router.post("/login", LoginController)
router.post("/update", VerifyToken, UpdatePassword)
router.post("/mail", VerifyToken, AddMail)
router.get("/allmail", VerifyToken, getAllMails)

module.exports = router
