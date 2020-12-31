const mongoose = require("mongoose");

// Connect to DB on localhost
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
