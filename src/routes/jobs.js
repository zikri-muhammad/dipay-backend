import express from "express";
import { createJobs, getJobs } from "../controllers/jobController.js";
const router = express.Router()

router.get("/jobs", getJobs);
router.post("/jobs", createJobs);

export default router