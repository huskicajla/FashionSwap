import { db } from "../connection.js";
import jwt from "jsonwebtoken";

export const getItems = (req, res) => {
    const q = req.query.cat
        ? "SELECT a.*, ct.clothing_type_name FROM articles a JOIN clothing_type ct ON a.category_id = ct.id WHERE ct.clothing_type_name = ?;"
        : "SELECT * FROM articles";

        db.query(q, [req.query.cat], (err, data) => {
            if (err) return res.status(500).send(err); 
            
            return res.status(200).send(data);
        });
};

export const getItem = (req, res) => {
    const q = 
        "SELECT a.id, a.name, a.description, a.price, a.quantity, a.img, a.date_added, a.condition, u.img as user_img, u.username as username, a.category_id, ct.clothing_type_name as cat FROM articles a JOIN users u ON a.user_id = u.id JOIN clothing_type ct ON a.category_id = ct.id WHERE a.id = ?;"

        db.query(q, [req.params.id], (err, data)=>{
            if (err) return res.status(500).json(err);

            return res.status(200).json(data[0]);
        });
};

export const addItem = (req, res) => {
    const user_id = req.body.user_id;

    const q = 
    "INSERT INTO articles(`name`, `description`, `price`, `quantity`, `date_added`, `img`, `condition`, `user_id`, `category_id`) VALUES(?, ?, ?, ?, NOW(), ?, ?, ?, ?);";

    const values = [
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.quantity,
        req.body.img,
        req.body.condition,
        user_id,
        req.body.category_id
    ];

    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Error during SQL query:", err);
            return res.status(500).json(err);
        }
        return res.json("Item added successfully");
    });
};


export const deleteItem = (req, res) => {
    const q = "DELETE FROM articles WHERE id = ?;";

    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.json("Item deleted successfully");
    });
};

export const updateItem = (req, res) => {
    const post_id = req.params.id;
    const user_id = req.body.user_id;  
    
    const q = 
      "UPDATE articles SET `name` = ?, `description` = ?, `price` = ?, `quantity` = ?, `img` = ?, `condition` = ?, `category_id` = ? WHERE id = ? AND user_id = ?;";
  
    const values = [
      req.body.name,
      req.body.description,
      req.body.price,
      req.body.quantity,
      req.body.img,
      req.body.condition,
      req.body.category_id
    ];
  
    db.query(q, [...values, post_id, user_id], (err, data) => {
      if (err) return res.status(403).json("You can update only your own items!");
  
      return res.json("Item updated successfully");
    });
  };
  

  export const toggleItemInWishlist = (req, res) => {
    const userId = req.body.userId; 
    const itemId = req.body.itemId; 
  
    console.log("Received userId:", userId, "Received itemId:", itemId);
  
    if (!userId || !itemId) {
      return res.status(400).json({ error: "User ID and Item ID are required." });
    }
  
    const checkQuery = "SELECT * FROM wishlist WHERE user_id = ? AND article_id = ?";
  
    db.query(checkQuery, [userId, itemId], (err, data) => {
      if (err) {
        console.error("Error checking wishlist:", err); 
        return res.status(500).json({ error: "Failed to check wishlist." });
      }
  
      if (data.length > 0) {
        const deleteQuery = "DELETE FROM wishlist WHERE user_id = ? AND article_id = ?";
        db.query(deleteQuery, [userId, itemId], (err, result) => {
          if (err) {
            console.error("Error deleting item from wishlist:", err); 
            return res.status(500).json({ error: "Failed to remove item from wishlist." });
          }
          return res.status(200).json({
            message: "Item removed from wishlist successfully!",
          });
        });
      } else {
        const insertQuery = "INSERT INTO wishlist (user_id, article_id) VALUES (?, ?)";
        db.query(insertQuery, [userId, itemId], (err, result) => {
          if (err) {
            console.error("Error adding item to wishlist:", err); 
            return res.status(500).json({ error: "Failed to add item to wishlist." });
          }
          return res.status(200).json({
            message: "Item added to wishlist successfully!",
          });
        });
      }
    });
  };
  
  export const isWishlisted = (req, res) => {
    const { userId, postId } = req.params; 
    const checkQuery = "SELECT * FROM wishlist WHERE user_id = ? AND article_id = ?";
  
    db.query(checkQuery, [userId, postId], (err, data) => {
      if (err) {
        console.error("Error checking wishlist:", err);
        return res.status(500).json({ error: "Failed to check wishlist." });
      }
  
      if (data.length > 0) {
        return res.status(200).json({ isWishlisted: true });
      } else {
        return res.status(200).json({ isWishlisted: false });
      }
    });
  };

  export const getUserPosts = (req, res) => {
    const userId = req.params.userId;
  
    const q = "SELECT * FROM articles WHERE user_id = ?;"; 
    
    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };

  export const getWishlist = (req, res) => {
    const userId = req.params.userId;

    const q = "SELECT a.id, a.name, u.username, a.quantity FROM articles a JOIN wishlist w ON a.id = w.article_id JOIN users u ON a.user_id = u.id WHERE w.user_id = ?;";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
  };
  

  