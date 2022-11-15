const { check } = require("express-validator");

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

module.exports = { validatePut };
