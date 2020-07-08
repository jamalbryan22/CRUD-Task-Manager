const express = require("express");
const chalk = require("chalk");
const userRouter = require("./router/user");
const taskRouter = require("./router/task");

// Create server and port
const app = express();
const port = process.env.PORT || 3000;

// Run Middleware
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Listen on default ports
app.listen(port, () => {
  console.log(chalk.blue.inverse(`Listening on port ${port}`));
});
