const express = require("express");
const router = express.Router();
const userController = require("../controller/UserAuth");

router.post("/emailScanner", userController.UserEmailScanner);

module.exports = router;
