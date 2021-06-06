const express = require("express");
const User = require("../models/User");
const router = express.Router();
const auth = require("../middleware/authenticationMW");
const multer = require("multer");
const { red } = require("chalk");
const sharp = require("sharp");

// Define the profile picture requirements
const avatar = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

// Create a new user
router.post("/users", async (req, res) => {
  // Create a new user based on request parameters
  const user = new User(req.body);

  try {
    // Save the new user to the DB
    await user.save();
    // Create a token for the new user
    const token = await user.generateAuthToken();
    // Set session cookies
    res.cookie("auth_token", token, { 
      maxAge: 900000,
      httpOnly: false
    });
    res.cookie("user_id", user._id, { 
      maxAge: 900000,
      httpOnly: false
    });
    // Send the newly created user and new authorization token back
    res.status(201).send({ user, token });
  } catch (error) {
    // Throw any necessary errors
    res.status(400).send(error);
  }
});

// Log a user out of all sessions
router.post("/users/logoutALL", auth, async (req, res) => {
  try {
    // Empty out the users session token array
    req.user.tokens = [];
    // Save the updated user
    await req.user.save();
    // Remove session cookie
    res.clearCookie("auth_token");
    res.clearCookie("user_id");
    // Send a 200 success status back
    res.send();
  } catch (error) {
    // Throw any necessary errors
    res.status(500).send(error);
  }
});

// Log a user out of a specific session
router.post("/users/logout", auth, async (req, res) => {
  try {
    // Remove the current session token from the session token array
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    // Update the user info
    await req.user.save();
    // Remove session cookie
    res.clearCookie("auth_token");
    res.clearCookie("user_id");
    // Send the response back to the client
    res.send();
  } catch (error) {
    // Throw any necessary errors
    res.status(500).send(e);
  }
});

// Get the users profile from the DB
router.get("/users/me", auth, (req, res) => {
  try {
    // Return the user object stored on the request by the auth middleware
    res.send(req.user);
  } catch (error) {
    // Throw any necessary errors
    res.status(400).send(error);
  }
});

// Update the user profile
router.patch("/users/me", auth, async (req, res) => {
  // Store fields requested to be updated
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  // Make sure every requested update is to an updatable field
  const isValidOperation = updates.every((updateKey) => allowedUpdates.includes(updateKey));

  // Throw error if trying to update an invalid field
  if (!isValidOperation) {
    return res.status(400).send("Error: one or more update keys do not exist");
  }

  try {
    // Update each requested update
    updates.forEach((update) => (req.user[update] = req.body[update]));

    // Save the updates to the user
    await req.user.save();

    // Send the user back with a successful 200 code
    res.send(req.user);
  } catch (e) {
    // Throw any necessary errors
    res.status(400).send(e);
  }
});

// Allow a user to delete their profile
router.delete("/users/me", auth, async (req, res) => {
  try {
    // Remove the user from the DB
    await req.user.remove();
    // Send the deleted user back with a success code
    res.send(req.user);
  } catch (e) {
    // Thrown any necessary errors
    return res.status(500).send();
  }
});

// Allow a user to login
router.post("/users/login", async (req, res) => {
  try {
    // Search DB for user and return a session token
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    // Set user and new authorization token 
    res.cookie("auth_token", token, {
       maxAge: 900000,
       httpOnly: false
      });

    res.cookie("user_id", user._id, { 
      maxAge: 900000,
      httpOnly: false
    });
    // Send the user back with the token
    res.send({ user, token });
  } catch (e) {
    // Throw any neccessay errors
    res.status(400).send(e);
  }
});

// Allow the user to post a profile pictures
router.post("/users/me/avatar", auth, avatar.single("avatar"), async (req, res) => {
  // Resize the image file and convert all to PNG
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

  try {
    // Store binary version of the profile picture
    req.user.avatar = buffer;
    // Update the user object
    await req.user.save();
    // Return a success codes
    res.send();
  } catch (error) {
    // Throw any necessary errors
    res.status(400).send({ error: error.message });
  }
});

// Allow a user to delete their profile picture
router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    // Remove the current profile picture
    req.user.avatar = undefined;
    // Update the user in the DB
    await req.user.save();
    // Return success code
    res.send();
  } catch (error) {
    // Throw any necessary errors
    res.status(400).send(e);
  }
});

// Get a user's profile image 
router.get("/users/:id/avatar", async (req, res) => {
  try {
    // Try to fetch the user from the DB
    const user = await User.findById(req.params.id);

    // If there is no user by that ID, or they do not have a profile picture
    // Throw an errors
    if (!user || !user.avatar) {
      throw new Error();
    }
    // Set the headers for the return image
    res.set("Content-Type", "image/png");
    // Return the user image
    res.send(user.avatar);
  } catch (error) {
    // Throw any necessary errors
    res.status(400).send(error);
  }
});

// Export the user router
module.exports = router;
