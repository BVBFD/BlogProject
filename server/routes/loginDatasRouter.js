import express from "express";
import "express-async-errors";
import {
  login,
  signUp,
  update,
  remove,
} from "../controllers/loginDatasController.js";
import isAuthLogin from "../middleware/isAuthLogin.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", isAuthLogin, signUp);

router.put("/update", update);

router.delete("/delete", remove);

export default router;
