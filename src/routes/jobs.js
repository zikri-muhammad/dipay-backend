import express from "express";
import { getJobs } from "../controllers/jobController.js";
const router = express.Router()

// Import the controller

router.get("/jobs", getJobs);


export default router