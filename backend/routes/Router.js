const express = require("express");
const router = express();

// Import routers
router.use("/api/polls", require("./PollsRouter"));
router.use("/api/questions", require("./QuestionsRouter"));
router.use("/api/users", require("./UserRouter"));

// test route
router.get("/", (req, res) => {
  res.send("Api Working!");
});

module.exports = router;
