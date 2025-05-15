import express from "express";
import {
  addSkills,
  deleteSkill,
  getSkills,
  getSkillsByCategory,
  getSkillsByResource,
  updateSkill,
} from "../controllers/skillsController.js";

const router = express.Router();

router
  .route("/")
  .get(getSkills)
  .post(addSkills)
  .delete(deleteSkill)
  .patch(updateSkill);

router.route("/:id").get(getSkillsByCategory).get(getSkillsByResource);

export default router;
