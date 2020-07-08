const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Authentication Middleware for application routes
const auth = async (req, res, next) => {
  try {
    // Create token from auth headers
    const token = req.header("Authorization").replace("Bearer ", "");
    // Verify token from auth headers
    const decoded = jwt.verify(token, "secretToken");
    // Fetch user based on id stored in token payload
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    // Throw error if user not found
    if (!user) {
      throw new Error();
    }

    // Store user data in request object for further manipulation
    req.user = user;
    req.token = token;
    // Exit middleware
    next();
  } catch (error) {
    // Provide data with thrown error
    res.status(401).send({ Error: "Please Authenticate" });
  }
};

// Export middleware function
module.exports = auth;
