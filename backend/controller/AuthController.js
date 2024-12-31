const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Register = require("../model/Register")
const Mail = require("../model/Mail")
const RegisterController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    if (!name || !email || !password || !confirmPassword) {
      res.status(401).json({
        success: false,
        message: "fields required",
      })
    }
    const isUser = await Register.findOne({ email: email })
    if (isUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hashpwd = await bcrypt.hash(password, salt)

    const newUser = new Register({
      name,
      email,
      confirmPassword: hashpwd,
      password: hashpwd,
    })

    const userRegister = await newUser.save()
    const token = jwt.sign({ id: userRegister._id }, process.env.SECRET)
    res.status(200).json({
      success: true,
      message: "User registered sucessfully",
      email: userRegister.email,
      token,
      name: userRegister.name,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Internal server error",
    })
  }
}

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(401).json({
        success: false,
        message: "fields required",
      })
    }

    const isEmail = await Register.findOne({ email: email })
    if (!isEmail) {
      res.status(400).json({
        success: false,
        message: "User does not exists",
      })
    }
    const pwdMatch = await bcrypt.compare(password, isEmail.password)
    if (!pwdMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      })
    }
    const token = jwt.sign({ id: isEmail._id }, process.env.SECRET, {
      expiresIn: "60h",
    })
    res.status(200).json({
      success: true,
      message: "LoggedIn successfully",
      email: isEmail.email,
      token,
      name: isEmail.name,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" })
  }
}
const UpdatePassword = async (req, res) => {
  try {
    const { newName, email, oldPassword, newPassword } = req.body
    if (!newName || !email || !oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false })
    }
    const user = await Register.findOne({ email: email })
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false })
    }
    const comparePassword = await bcrypt.compare(oldPassword, user.password)
    if (!comparePassword) {
      return res
        .status(400)
        .json({ message: "Your old password is incorrect", success: false })
    }
    if (oldPassword === newPassword) {
      return res.status(400).json({
        message: "Your old password and new password are same",
        success: false,
      })
    }
    const hashPwd = await bcrypt.hash(newPassword, 10)
    user.password = hashPwd
    user.name = newName
    const response = await user.save()
    res.status(200).json({
      data: response,
      message: "Details Updated Successfully",
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" })
  }
}
const AddMail = async (req, res) => {
  try {
    const { email } = req.body
    const userRef = req.body.id
    const newMail = new Mail({ email, userRef })
    const response = await newMail.save()
    res.status(200).json({
      message: "Mail saved successfully",
      success: true,
      email: response,
    })
  } catch (error) {
    console.log(error)
  }
}

const getAllMails = async (req, res) => {
  try {
    const userId = req.body.id
    const allMail = await Mail.find({ userRef: userId })
    res.status(200).json({
      data: allMail,
      success: true,
      message: "mails fethed successfully",
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  RegisterController,
  LoginController,
  UpdatePassword,
  AddMail,
  getAllMails,
}
