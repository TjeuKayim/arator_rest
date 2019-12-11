const express = require("express");
const router = express.Router();
const userService = require("../services/user_service");
const User = require("../data/models/user");
const tokenService = require("../services/token_service");
const smsService = require("../services/sms_service");

/* Register new user */
router.post("/register", async (req, res) => {
  const user = new User(req.body.email, req.body.password);
  user.confirmPassword = req.body.confirmPassword;
  try {
    await userService.registerUser(user);
    res.status(201);
  } catch (err) {
    res.json({ message: `${err.message}` });
  }
});

/* Login existing user */
router.post("/login", function(req, res, next) {
  const user = new User(req.body.email, req.body.password);

  try {
    userService.authenticateUser(user);
    const jwtToken = tokenService.generateUserToken(user);

    res.json({
      jwt: jwtToken
    });
  } catch (err) {
    res.json({
      message: `${err.message}`
    });
  }
});

/* Get all users */
router.get("/", async function(req, res) {
  try {
    const users = await userService.userList();
    res.json(users);
  } catch (err) {
    res.json({
      message: `${err.message}`
    });
  }
});

/* Get all users */
router.get("/sms", async function(req, res) {
  try {
    smsService.verifySms();
    res.end();
  } catch (err) {
    res.json({
      message: `${err.message}`
    });
  }
});
module.exports = router;
