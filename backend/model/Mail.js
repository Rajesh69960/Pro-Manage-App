const mongoose = require("mongoose")

const UserMailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
})

const Mail = mongoose.model("Mail", UserMailSchema)
module.exports = Mail
