const jwt = require("jsonwebtoken")

const VerifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization")
  const token = authHeader?.split(" ")[1] // Extract the token from "Bearer <token>" format

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied",
    })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    req.body.id = decodedToken.id
    next()
  } catch (error) {
    console.error("Error verifying token:", error)
    res.status(403).json({
      success: false,
      message: "Invalid token",
    })
  }
}

module.exports = VerifyToken
