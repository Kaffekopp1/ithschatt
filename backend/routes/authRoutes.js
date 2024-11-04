const express = require("express");
const router = express.Router();
const userController = require("../controllers/authController");
// const verifyToken = require("../middleware/authMiddleware");

router.post("/register", userController.registerUser);
// router.post("/login", userController.loginUser);
// router.get("/auth", verifyToken, (req, res) => {
// 	res.status(201).json({ message: true });
// });
module.exports = router;
