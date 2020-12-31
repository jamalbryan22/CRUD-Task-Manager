const mongoose = require("mongoose");

// create Task schema
const taskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // reference the userSchema
      ref: "User",
    },
  },
  {
    // Add timestamp to each task
    timestamps: true,
  }
);

// Define the task model using the taskSchema
const Task = mongoose.model("Task", taskSchema);

// Export the task model
module.exports = Task;
