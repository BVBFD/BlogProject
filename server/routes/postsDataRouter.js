import express from "express";
import "express-async-errors";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json("Success!");
  } catch (err) {
    res.status(500).josn(err);
  }
});

export default router;
