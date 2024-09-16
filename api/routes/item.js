import express from "express";
import { 
    getItems, 
    getItem, 
    addItem, 
    deleteItem, 
    updateItem, 
    addItemToWishlist
} from "../controllers/item.js";

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", addItem);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);
router.post("/wishlist", addItemToWishlist);

export default router;