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
        "SELECT a.id, a.name, a.description, a.price, a.quantity, a.img, a.date_added, u.img as user_img, u.username as username, ct.clothing_type_name as cat FROM articles a JOIN users u ON a.user_id = u.id JOIN clothing_type ct ON a.category_id = ct.id WHERE a.id = ?;"

        db.query(q, [req.params.id], (err, data)=>{
            if (err) return res.status(500).json(err);

            return res.status(200).json(data[0]);
        });
};

export const addItem = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).send("Unauthorized");

    jwt.verify(token, "secret", (err, userInfo) => {
        if(err) return res.status(403).send("Token expired");

        const q = 
        "INSERT INTO articles(`name`, `description`, `price`, `quantity`, `date_added`, `img`, `condition`, `user_id`, `category_id`) VALUES(?, ?, ?, ?, NOW(), ?, ?, ?, ?);";

        const values = [
            req.body.name,
            req.body.description,
            req.body.price,
            req.body.quantity,
            req.body.img,
            req.body.condition,
            userInfo.id,
            req.body.category_id
        ];

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.json("Item added successfully");
        });
    });
};

export const deleteItem = (req, res) => {
  
};



export const updateItem = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).send("Unauthorized");

    jwt.verify(token, "secret", (err, userInfo) => {
        if(err) return res.status(403).send("Token expired");

        const post_id = req.params.id;
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

        db.query(q, [...values, post_id, userInfo.id], (err, data) => {
            if(err) return res.status(403).json("You can update only your own items!");

            return res.json("Item updated successfully");
        });
    });    
};