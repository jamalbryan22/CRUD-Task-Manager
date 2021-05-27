const chalk = require("chalk");
const app = require('./app');

// Define a port
const port = process.env.PORT || 3008;

// Listen on default ports
app.listen(port, () => {
  console.log(chalk.blue.inverse(`Listening on port ${port}`));
});

module.exports = port