const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Authentication Middleware for application routes
const auth = async (req, res, next) => {
  try {
    // Create token from user cookie
    const token = req.cookies.auth_token;
    // Verify token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Fetch user based on id stored in token payload
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    
    // Throw error if user not found
    if (!user) {
      throw new Error("User not found");
    }
    
    // Store user data in request object for further manipulation
    req.user = user;
    req.token = token;
    // Exit middleware
    next();
  } catch (error) {
    // Provide data with thrown error
    res.send(error);
  }
};

// Export middleware function
module.exports = auth;
