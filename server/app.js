const express = require("express");
require("./db/mongoose");
const userRouter = require("./router/user");
const taskRouter = require("./router/task");
const cors = require("cors")

// Create server and port
const app = express();

// Run Middleware
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(cors());

module.exports = app;

