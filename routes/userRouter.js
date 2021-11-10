const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller.js");
const { body } = require("express-validator");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password", "Week password").isStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  }),
  userController.registration
);
router.post(
  "/login",
  body("email").isEmail(),
  body("password", "Week password").isStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  }),
  userController.login
);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.post("/refresh", userController.refresh);
router.get("/users", userController.getUsers);

module.exports = router;
