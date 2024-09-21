import { db } from '../connection.js';

export const addOrder = (req, res) => {
    const userId = req.body.userId;
    const article_id = req.body.article_id;
    const total_price = req.body.total_price;

    const q = `INSERT INTO orders (user_id, order_date, total_price, status, article_id) VALUES (?, NOW(), ?, 'pending', ?)`;

    db.query(q, [userId, total_price, article_id], (err, data) => {
        if (err) {
            console.error("Error during SQL query:", err);
            return res.status(500).json(err);
        }
        return res.json("Order added successfully");
    });
  };

  export const getUserOrders = (req, res) => {
    const userId = req.params.userId;

    const q = `SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC`;

    db.query(q, [ userId] , (err, data) => {
        if (err) {
            console.error("Error during SQL query:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
};


export const getOrders = (req, res) => {
    const q = `SELECT o.*, u.username FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.order_date DESC`;

    db.query(q, (err, data) => {
        if (err) {
            console.error("Error during SQL query:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
};

export const deleteOrder = (req, res) => {
    const orderId = req.params.orderId;

    const q = `DELETE FROM orders WHERE id = ?`;

    db.query(q, [orderId], (err, data) => {
        if (err) {
            console.error("Error during SQL query:", err);
            return res.status(500).json(err);
        }
        return res.json("Order deleted successfully");
    });
};

export const confirmOrder = (req, res) => {
    const orderId = req.params.orderId;

    const q = `UPDATE orders SET status = 'confirmed' WHERE id = ?`;

    db.query(q, [orderId], (err, data) => {
        if (err) {
            console.error("Error during SQL query:", err);
            return res.status(500).json(err);
        }
        return res.json("Order confirmed successfully");
    }
    );
};
