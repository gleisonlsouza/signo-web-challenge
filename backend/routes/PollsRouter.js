const express = require("express");
const router = express.Router();

// Controllers
const {
  createPoll,
  deletePoll,
  getAllPolls,
  getPollByID,
  getPollsInProgress,
  getPollsFinished,
  getFuturePolls,
  updatePoll,
  getUserPolls,
  votePoll,
} = require("./../controllers/pollsController");

// Middlewares
const validate = require("./../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");
const {
  pollsCreateValidation,
  pollUpdateValidation,
} = require("./../middlewares/pollsValidation");

router.post(
  "/create",
  authGuard,
  pollsCreateValidation(),
  validate,
  createPoll
);

router.post("/vote/:pollId/:questionId", votePoll);

router.delete("/:id", authGuard, deletePoll);

router.get("/", getAllPolls);
router.get("/progress", getPollsInProgress);
router.get("/finished", getPollsFinished);
router.get("/future", getFuturePolls);
router.get("/user", authGuard, getUserPolls);
router.get("/:id", getPollByID);
router.put("/:id", authGuard, pollUpdateValidation(), validate, updatePoll);

module.exports = router;
