import express from "express";
import "express-async-errors";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import postsDataRouter from "./routes/postsDataRouter.js";
import loginDatasRouter from "./routes/loginDatasRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.get("/lee", (req, res, next) => {
  console.log("Hey this is initial test code!");
  return res.status(200).send(console.log("Success!"));
});

app.use("/posts", postsDataRouter);
app.use("/loginDatas", loginDatasRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Mongo DB Start!"))
  .catch((err) => console.error(err));

app.listen("5000", () => {
  console.log("Backend is running check!");
});
