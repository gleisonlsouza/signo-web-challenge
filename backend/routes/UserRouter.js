const express = require("express");
const router = express.Router();

// Controllers
const {
  register,
  login,
  getCurrentUser,
  updateUser,
} = require("./../controllers/UserController");

// Middlewares
const validate = require("./../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("./../middlewares/userValidations");

const authGuard = require("../middlewares/authGuard");

router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpdateValidation(), validate, updateUser);

module.exports = router;
