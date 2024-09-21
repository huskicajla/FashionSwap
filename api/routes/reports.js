import express from "express";
import { 
    addReport,
    getReports,
    getAllReports,
    deleteReport
} from "../controllers/reports.js";


const router = express.Router();

router.post("/add_report", addReport);
router.get("/get_reports/:userId", getReports);
router.get("/", getAllReports);
router.delete("/delete_report/:id", deleteReport);


export default router;