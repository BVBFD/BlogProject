import express from "express";
import "express-async-errors";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log(req.body.id, req.body.password);
    res.status(200).json("Login Success!");
  } catch (err) {
    res.status(401).json("invalid id and pwd!");
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body.id, req.body.password);
    res.status(201).json("Sign Up!");
  } catch (err) {
    res.status(409).json("This Id already existed!");
  }
});

export default router;
