import { Router } from "express";
import fileDb from "../fileDb";
import { Message } from "../types";

const messagesRouter = Router();

messagesRouter.post("/", async (req, res, next) => {
  try {
    const message = req.body.message;
    const author = req.body.author;
    if (!message || !author) {
      return res
        .status(422)
        .send({ error: "Author and message must be present in the request" });
    }

    const data: Message = {
      message: message,
      author: author,
    };

    const newMessage = await fileDb.addMessage(data);

    return res.send(newMessage);
  } catch (e) {
    next(e);
  }
});

messagesRouter.get("/", async (req, res, next) => {
  try {
    const messages = await fileDb.getMessages();
    res.send(messages);
  } catch (e) {
    next(e);
  }
});

export default messagesRouter;
