import express from "express";
import {
  addGoal,
  deleteGoal,
  getGoals,
  updateGoal,
} from "../controllers/goalsController.js";

const router = express.Router();

router
  .route("/")
  .get(getGoals)
  .post(addGoal)
  .delete(deleteGoal)
  .patch(updateGoal);

export default router;
