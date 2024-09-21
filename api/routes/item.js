import express from "express";
import { 
    getItems, 
    getItem, 
    addItem, 
    deleteItem, 
    updateItem, 
    toggleItemInWishlist, 
    isWishlisted,
    getUserPosts,
    getWishlist
} from "../controllers/item.js";

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", addItem);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);
router.post("/wishlist", toggleItemInWishlist);
router.get("/:postId/wishlist/:userId", isWishlisted);
router.get("/user/:userId", getUserPosts);
router.get("/wishlist/:userId", getWishlist);

export default router;