import express from "express";
import "express-async-errors";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log(req.query.cat);
    // 쿼리 사용시 (catgories 별로 포스트 뽑기)
    res.status(200).json("Success!");
  } catch (err) {
    res.status(500).josn(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).json("Created!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    res.status(200).json("Updated!");
  } catch (err) {
    res.status(401).json(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    res.status(204).json("Deleted No Contents!");
  } catch (err) {
    res.status(401).json(err);
  }
});

export default router;
