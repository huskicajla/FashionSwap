import express from "express";
import {
    addOrder,
    getUserOrders,
    getOrders,
    deleteOrder,
    confirmOrder
} from "../controllers/orders.js";

const router = express.Router();

router.post("/add_order", addOrder);
router.get("/orders/:userId", getUserOrders);
router.get("/orders", getOrders);
router.delete("/:orderId", deleteOrder);
router.put("/:orderId", confirmOrder);


export default router;