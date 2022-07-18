const { validationResult } = require("express-validator");

// Function to validate the errors
const validate = (req, res, next) => {
  const errors = validationResult(req);

  // if there is no error, the request continues
  if (errors.isEmpty()) {
    return next();
  }

  // If there are errors, we will extract them.
  const extractedErrors = [];

  // Fill the extractedErrors array
  errors.array().map((err) => extractedErrors.push(err.msg));

  // Return the errors array
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = validate;
