const mongoose = require("mongoose");
const validator = require("validator");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("./Tasks");
const sharp = require("sharp");

// Create the userSchema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      // Throw error if password contains the word password
      validate(value) {
        if (value.includes("password")) {
          throw new Error(chalk.red.inverse("Password cannot contain 'password'"));
        }
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      // Throw error if age is a negative number
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number");
        }
      },
    },
    // Tokens array to store tokens from multiple sessions
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    // Store binary profile picture information
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

// Create psuedo task field to populate 
// Each users task from the task collection
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  // If the password is updated prior to a save rehash it
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  // Exit this middleware function
  next();
});

// Generate tokens for the user user
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);
  // Add the token to the user objects session token array
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Hide fields on the user obj by modifying the toJSON method
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  delete userObj.avatar;
  return userObj;
};

// Verify a user via email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to log in");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to log in");
  }

  return user;
};

// Delete user task(s) when the user is deleted
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

// Create the user model from the userSchema 
const User = mongoose.model("User", userSchema);

// Export the user model
module.exports = User;
