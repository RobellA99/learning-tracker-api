import express from "express";
import {
  addSkills,
  deleteSkill,
  getSkills,
  updateSkill,
} from "../controllers/skillsController.js";

const router = express.Router();

router
  .route("/")
  .get(getSkills)
  .post(addSkills)
  .delete(deleteSkill)
  .patch(updateSkill);

export default router;
