import { MessageApi, Message } from "./types";
import { promises as fs } from "fs";
import crypto from "crypto";

const fileName = "./db.json";
let data: MessageApi[] = [];

const fileDb = {
  async init() {
    try {
      const fileMessages = await fs.readFile(fileName);
      data = JSON.parse(fileMessages.toString());
    } catch (e) {
      data = [];
    }
  },
  async getMessages() {
    return data;
  },
  async addMessage(item: Message) {
    const id = crypto.randomUUID();
    const datetime = new Date().toISOString();
    const message = {
      id,
      ...item,
      datetime,
    };
    data.push(message);

    await this.save();

    return message;
  },
  async save() {
    return fs.writeFile(fileName, JSON.stringify(data));
  },
};

export default fileDb;
