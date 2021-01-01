const express = require("express");
const path = require("path");
const cors = require("cors")
require("./db/mongoose");
const userRouter = require("./router/user");
const taskRouter = require("./router/task");

// Create server and port
const app = express();

// Run Middleware
const buildPath = path.join(__dirname, "..", "client", "build");
console.log(`The public path is ${buildPath}`);
const publicPath = path.join(__dirname,"..", "client", "public");
// console.log(`The public path is ${publicPath}`);
app.use(express.static(buildPath));
// app.use(express.static(publicPath));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(cors());

// app.get("/", (req, res) => {
//          res.sendFile(path.join(publicPath, "index.html"));
//        });


module.exports = app;

