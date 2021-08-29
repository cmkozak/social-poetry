const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const userController = require("../controller/userController");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.delete("/logout", userController.logoutUser);
router.get("/me", auth, userController.getUserDetails);
router.get("/getuserinfo/:id", userController.getUserInfo);
router.get("/getusersettings", userController.getUserSettings);
router.patch("/updateuser", userController.updateUser);

module.exports = router;
