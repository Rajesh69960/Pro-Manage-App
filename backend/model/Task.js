const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },

    priority: {
      required: true,
      type: String,
      enum: ["HIGH PRIORITY", "MODERATE PRIORITY", "LOW PRIORITY"],
    },
    checklist: {
      required: true,
      type: Array,
    },
    assignTo: {
      type: String,
    },
    date: {
      type: Date,
    },
    zone: {
      type: String,
      required: true,
      enum: ["Backlog", "Todo", "Progress", "Done"],
      default: "Todo",
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true }, // Enable getters in JSON output
    toObject: { getters: true },
  }
)
const Task = mongoose.model("Task", TaskSchema)

module.exports = Task
