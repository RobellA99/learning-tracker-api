import express from "express";
const router = express.Router();
import authorise from "../middleware/auth.js";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/usersController.js";

router.route("/").post(registerUser).post(loginUser).get(authorise, getUser);

export default router;
