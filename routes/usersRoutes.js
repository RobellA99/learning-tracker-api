import express from "express";
const router = express.Router();
import authorise from "../middleware/auth.js";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/usersController.js";

router.route("/").get(authorise, getUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
