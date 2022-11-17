const { check } = require("express-validator");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// validates input for account creation

const validatePut = [
  check("name", "name is required").notEmpty(),
  check("name", "Name must be at least 4 characters but less than 15").isLength(
    { min: 4, max: 15 }
  ),
  check("email", "email is required").notEmpty(),
  check("password", "password is required").notEmpty(),
  check(
    "password",
    "Password must be at least 6 characters but less than 15"
  ).isLength({ min: 6, max: 15 }),
  check("country", "country is required").notEmpty(),
];

const auth = (req, res, next) => {
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        status: "error",
        message: "unauthorised",
      });
    }
  } else {
    return res.status(403).send({
      status: "error",
      message: "missing token",
    });
  }
};

module.exports = { validatePut, auth };
