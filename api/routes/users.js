import express from "express";
import {
    updateProfile,
    getUsers,
    getItemsAdmin,
    changeStatus
} from "../controllers/users.js";

const router = express.Router();

router.put("/:id", updateProfile);
router.get("/", getUsers);
router.get("/items", getItemsAdmin);
router.put("/status/:id", changeStatus);

export default router;