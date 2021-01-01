const mongoose = require("mongoose");

// Connect to DB on localhost
// mongoose.connect(process.env.MONGODB_URL, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
// });

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
});


