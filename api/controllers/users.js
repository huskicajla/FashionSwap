import { db } from '../connection.js';
import bcrypt from 'bcryptjs';

export const updateProfile = (req, res) => {
    const id = req.params.id;

    console.log("Request body: ", req.body);

    if (!req.body.username || !req.body.email || !req.body.address || !req.body.phone_number) {
        return res.status(400).json({ message: "All fields except password are required." });
    }

    if (isNaN(req.body.phone_number)) {
        return res.status(400).json({ message: "Invalid phone number. Must be numeric." });
    }

    let q = "UPDATE users SET `username` = ?, `email` = ?, `address` = ?, `phone_number` = ?, `img` = ? WHERE id = ?;";
    let values = [
        req.body.username,
        req.body.email,
        req.body.address,
        req.body.phone_number,
        req.body.img
    ];

    if (req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        q = "UPDATE users SET `username` = ?, `password` = ?, `email` = ?, `address` = ?, `phone_number` = ?, `img` = ? WHERE id = ?;";
        values = [
            req.body.username,
            hash,
            req.body.email,
            req.body.address,
            req.body.phone_number,
            req.body.img
        ];
    }

    values.push(id);

    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Database update error: ", err);
            return res.status(500).json({ message: "Server error while updating profile." });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ message: "Profile updated successfully." });
    });
};

export const getUsers = (req, res) => {

    const q = "SELECT * FROM users WHERE is_admin = 0;";

    db.query(q, (err, data) => {
        if (err) {
            console.error("Database query error: ", err);
            return res.status(500).json({ message: "Server error while fetching users." });
        }

        return res.status(200).json(data);
    });

};

export const getItemsAdmin = (req, res) => {
    const q =  
      "SELECT a.id, a.name, u.username, a.date_added FROM articles a JOIN users u ON a.user_id = u.id;";
    db.query(q, (err, data) => {
      if (err) {
        console.error("Error fetching admin items:", err); 
        return res.status(500).send(err);
      }
      console.log("Fetched items from DB:", data); 
      return res.status(200).send(data); 
    });
  };

  export const changeStatus = (req, res) => {
    const id = req.params.id;

    const q  = "UPDATE users SET is_active = !is_active WHERE id = ?;";

    db.query(q, [id], (err, result) => {
        if (err) {
            console.error("Database error: ", err);
            return res.status(500).json({ message: "Server error while updating user status." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ message: "User status updated successfully." });
    });
};