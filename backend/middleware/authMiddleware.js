const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }

  // Verify Token
  const verified = await jwt.verify(token, process.env.JWT_SECRET);
  // Get user id from token
  const user = await User.findById(verified.id).select("-password");

  if (!user) {
    res.status(401);
    next(new Error("User not found"));
  }
  req.user = user;
  next();
});

module.exports = protect;
