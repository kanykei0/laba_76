import { Router } from "express";
import fileDb from "../fileDb";
import { Message, MessageApi } from "../types";

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
    let lastMessages: MessageApi[] = [];
    const queryDate = req.query.datetime as string;

    if (queryDate !== undefined) {
      const date = new Date(queryDate);
      if (isNaN(date.getDate())) {
        return res.status(400).send({ error: "Wrong date" });
      }
      let index = messages.findIndex((item) => item.datetime === queryDate);
      if (index !== -1) {
        let result = messages.slice(index + 1, index + 31);
        lastMessages = result;
      }
    } else {
      lastMessages = messages.slice(-30);
    }
    res.send(lastMessages);
  } catch (e) {
    next(e);
  }
});

export default messagesRouter;
