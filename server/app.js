const express = require("express");
const path = require("path");
const cors = require("cors")
const cookieParser = require('cookie-parser')
require("./db/mongoose");
const userRouter = require("./router/user");
const taskRouter = require("./router/task");
const corsOptions = {
  origin: [
    "https://bryan-task-manager.herokuapp.com"
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

// Create server and port
const app = express();

//Configure CORS use
app.use(cors(corsOptions))

// Run Middleware
const buildPath = path.join(__dirname, "..", "client", "build");
app.use(express.static(buildPath));
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(taskRouter);


module.exports = app;

