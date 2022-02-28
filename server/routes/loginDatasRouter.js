import express from "express";
import "express-async-errors";
import { login, signUp } from "../controllers/loginDatasController.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signUp);

export default router;
