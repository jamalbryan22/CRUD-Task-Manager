const express = require("express");
const path = require("path");
const cors = require("cors")
require("./db/mongoose");
const userRouter = require("./router/user");
const taskRouter = require("./router/task");
const corsOptions = {
 
  //To allow requests from client
  origin: [
  "https://bryan-task-manager.herokuapp.com/dashboard"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

// Create server and port
const app = express();

// Run Middleware
app.use(cors(corsOptions));
// app.options('*', cors())
const buildPath = path.join(__dirname, "..", "client", "build");
app.use(express.static(buildPath));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


module.exports = app;

