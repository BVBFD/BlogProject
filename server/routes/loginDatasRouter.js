import express from "express";
import "express-async-errors";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json("Login Success!");
  } catch (err) {
    res.status(401).json("invalid id and pwd!");
  }
});

export default router;
