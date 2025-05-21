import express from "express";
import {
  addResource,
  deleteResource,
  getResource,
  updateResource,
} from "../controllers/resourceController.js";

const router = express.Router();

router
  .route("/")
  .get(getResource)
  .post(addResource)
  .delete(deleteResource)
  .patch(updateResource);

export default router;
