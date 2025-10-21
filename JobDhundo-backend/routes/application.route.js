import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../Controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs); // Assuming this is for getting applications
router.route("/:id/applicants").get(isAuthenticated, getApplicants); // Assuming this is for getting applicants for a specific job
router.route("/status/:id").post(isAuthenticated, updateStatus);

export default router;
