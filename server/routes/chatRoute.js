import express from "express";
import { chatWithBot } from "../controllers/chatController.js";
import { authChatbot } from "../controllers/authChatbotController.js";

const chatRouter = express.Router();

chatRouter.post("/", chatWithBot);
chatRouter.post("/login", authChatbot)

export default chatRouter;