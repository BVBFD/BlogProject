import express from "express";
import "express-async-errors";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import postsDataRouter from "./routes/postsDataRouter.js";
import loginDatasRouter from "./routes/loginDatasRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import ContactDatasModel from "./models/contactDatasModel.js";
import isAuthLogin from "./middleware/isAuthLogin.js";

dotenv.config();

const app = express();
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/images", express.static(path.join(__dirname, "/image")));

app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.get("/lee", (req, res, next) => {
  console.log("Hey this is initial test code!");
  return res.status(200).send(console.log("Success!"));
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post(
  "/pic/upload",
  isAuthLogin,
  upload.single("file"),
  (req, res, next) => {
    res.status(200).json(`http://localhost:5000/images/${req.body.name}`);
  }
);

app.use("/posts", postsDataRouter);
app.use("/loginDatas", loginDatasRouter);
app.post("/contacts", async (req, res, next) => {
  try {
    const newContact = new ContactDatasModel({
      customerName: req.body.customerName,
      email: req.body.email,
      number: req.body.number,
      message: req.body.message,
    });
    !newContact && res.status(400).json("Bad Request!");
    const savedNewContact = await newContact.save();
    console.log(savedNewContact);
    res.status(201).json({ savedNewContact });
  } catch (err) {
    res.status(500).json(err);
  }
});

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

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running check!");
});
