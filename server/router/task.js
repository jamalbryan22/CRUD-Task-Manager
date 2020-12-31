const express = require("express");
const Task = require("../models/Tasks");
const router = express.Router();
const auth = require("../middleware/authenticationMW");

// Route to post a task
router.post("/tasks", auth, async (req, res) => {
  // Create a new task
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  // Save the task to the DB
  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    // Throw and necessary errors
    .catch((error) => {
      res.status(400).send(error);
    });
});

// Get all task associated with a user
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  // Return completed task if specified by query 
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  // Return task sort descending ('desc') if specified by query 
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    // Sort the field('parts[0]') by parts[1] (asc(1) or dsc(-1)) order
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    // Populate the pseudo task field on the user object
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    // Throw and necessary errors
    res.status(404).send(error);
  }
});

// Get a specific task
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // Try to get the task from the DB based on the task ID (_id) and requesting user's ID
    const task = await Task.findOne({ _id, owner: req.user.id });
    // If the task could not be found throw an error messages
    if (!task) {
      return res.status(404).send({ errorMessage: "Couldn't get task" });
    }
    // Return the task found in the DB
    res.send(task);
  } catch (error) {
    // Throw and necessary errors
    res.status(500).send(error);
  }
});

// Update a task by id
router.patch("/tasks/:id", auth, async (req, res) => {
  // Store fields looking to be updated
  const updates = Object.keys(req.body);
  // Pre-stored values that can be changed on each task
  const allowedUpdates = ["description", "completed"];
  // Verify each task on the request body can be updated 
  const isValidOperation = updates.every((updateKey) =>
    allowedUpdates.includes(updateKey)
  );

  // If all values cannot bbe updated return an error
  if (!isValidOperation) {
    return res.status(400).send("Error: one or more update keys do not exsist");
  }

  try {
    // Fetch the task based on the task id, and owner id
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    // For each update on the request, update the task
    updates.forEach((update) => (task[update] = req.body[update]));

    // Save the updated task
    await task.save();

    // If the task could not be found, return an error message
    if (!task) {
      return res.status(404).send({ errorMessage: "Task could not be found" });
    }

    // Return the updated task
    res.send(task);
  } catch (e) {
    // Throw any necessary errors
    res.status(400).send(e);
  }
});

// Delete a task by ID
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // Search the DB for the task based on request parameters
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    // If the task was not found return an error
    if (!task) {
      return res.status(400).send({ errorMessage: "Task could not be found" });
    }

    // Return the deleted task
    res.send(task);
  } catch (e) {
    // Throw any necessay errors
    return res.send(500).send();
  }
});

// Export all the the task routes
module.exports = router;
