import { db } from "../connection.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? OR username = ? OR phone_number = ?";

    db.query(q, [req.body.email, req.body.username, req.body.phone_number], (err, result) => {
        if (err) return res.status(500).json({ message: err });

        if (result.length) {
            return res.status(409).json({ message: "User already exists" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const query = "INSERT INTO users (`username`, `password`, `email`, `address`, `phone_number`, `is_admin`, `is_active`) VALUES (?, ?, ?, ?, ?, '0', '1')";

        const values = [
            req.body.username,
            hash,
            req.body.email,
            req.body.adress,
            req.body.phone_number,
        ];

        db.query(query, values, (err, data) => {
            if (err) return res.status(500).json({ message: err });

            const token = jwt.sign({ id: data.insertId }, "jwtkey");

            return res.status(200).json({ message: "User created", token });
        });
    });
};




export const login = async (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], async (err, data) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        if (data.length === 0) return res.status(404).json({ message: "User not found" });

        if (data[0].is_active === "0") return res.status(401).json({ message: "User is not active. Please contact the admin." });

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Password or username is incorrect" });

        const token = jwt.sign({ id: data[0].id }, "jwtkey");

        const { password, ...userData } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            path: "/"
        })
        .status(200)
        .json(userData);
    });
};


export const logout = async (req, res) => {
    res.clearCookie("access_token", {
        secure: true,
        sameSite: "none",
    }).status(200).json("Logged out");
};