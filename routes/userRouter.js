const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller.js");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/activate:link", userController.activate);
router.post("/refresh", userController.refresh);
router.get("/users", userController.getUsers);

module.exports = router;
