const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
router.get("/api/messages", messageController.getMessages);
router.post("/api/messages", messageController.createMessages);

module.exports = router;
