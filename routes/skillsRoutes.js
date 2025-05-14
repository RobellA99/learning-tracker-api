import express from "express";
import { addSkills, getSkills } from "../controllers/skillsController.js";

const router = express.Router();

router.route("/").get(getSkills).post(addSkills);

export default router;
