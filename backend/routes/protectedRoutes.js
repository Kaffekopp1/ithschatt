const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/protected", verifyToken, (req, res) => {
	res.status(200).json({ message: "Protected route accessed" });
});

module.exports = router;
