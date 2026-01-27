import express from "express";
import { databaseConnection, databaseSync } from "./database/connection.js";
import {userModel} from "./database/models/user.model.js";
import {postModel} from "./database/models/post.model.js";
import {commentModel} from "./database/models/comment.model.js";
import userRouter from "./modules/user/user.controller.js";
import postRouter from "./modules/post/post.controller.js";
import commentRouter from "./modules/comment/comment.controller.js";
export const bootstrap = async () => {
  const app = express();
  const PORT = 3000;
  app.use(express.json());
  await databaseConnection();
  await databaseSync();
  app.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
  });
  app.use("/users", userRouter);
  app.use("/post", postRouter);
  app.use("/comment", commentRouter);
  app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};