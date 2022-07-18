const express = require("express");
const router = express.Router();

// Controllers
const {
  updateQuestion,
  createQuestion,
  deleteQuestion,
} = require("./../controllers/questionsController");

// Middlewares
const validate = require("./../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");
const {
  questionUpdateValidation,
  questionCreateValidation,
} = require("./../middlewares/questionsValidation");

router.put(
  "/:pollID/:questionID",
  authGuard,
  questionUpdateValidation(),
  validate,
  updateQuestion
);

router.post(
  "/create/:pollID",
  authGuard,
  questionCreateValidation(),
  validate,
  createQuestion
);

router.delete("/:pollID/:questionID", authGuard, deleteQuestion);

module.exports = router;
