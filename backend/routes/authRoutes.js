const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');
// const verifyToken = require("../middleware/authMiddleware");

router.post('/api/register', userController.registerUser);
router.post('/api/login', userController.loginUser);
router.delete('/api/deleteuser', userController.deleteUser);
router.patch('/api/updateUserStatus', userController.updateUserStatus);
router.patch('/api/updateUserInfo', userController.updateUserInfo);
// router.patch

// router.get("/auth", verifyToken, (req, res) => {
// 	res.status(201).json({ message: true });
// });
module.exports = router;
