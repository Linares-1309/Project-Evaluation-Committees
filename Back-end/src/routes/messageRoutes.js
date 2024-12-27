import express from "express";

import {
  createMessage,
  getMessages,
  getUnreadMessages,
  getMessageById
} from "../controller/messageController.js";

import checkAuthWithRol from "../middleware/checkAuthWithRol.js";

const router = express.Router();

router
  .route("/")
  .post(createMessage)
  .get(checkAuthWithRol(["Admin"]), getMessages);

router.route("/unread").get(checkAuthWithRol(["Admin"]), getUnreadMessages);
router.route("/:id").get(checkAuthWithRol(["Admin"]), getMessageById);

export default router;
