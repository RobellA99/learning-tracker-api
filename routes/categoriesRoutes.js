import express from "express";
import {
  addCategories,
  deleteCategories,
  getCategories,
  updateCategories,
} from "../controllers/categoriesController.js";

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(addCategories)
  .delete(deleteCategories)
  .patch(updateCategories);

export default router;
