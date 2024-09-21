import { db }from "../connection.js";

export const addReport = (req, res) => {
    const user_id = req.body.user_id;

    const q = 
    "INSERT INTO reports(`user_id`, `title`, `description`, `report_date`) VALUES(?, ?, ?, NOW());";

    const values = [
        user_id,
        req.body.title,
        req.body.description
    ];

    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Error during SQL query:", err);
            return res.status(500).json(err);
        }
        return res.json("Report added successfully");
    });
};

export const getReports = (req, res) => {
    const user_id = req.params.userId;

    const q = "SELECT * FROM reports WHERE user_id = ?;";

    db.query(q, [ user_id ], (err, data) => {
        if (err) {
            console.error("Error during SQL query:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
};

export const getAllReports = (req, res) => {
    const q = "SELECT * FROM reports;";

    db.query(q, (err, data) => {
        if (err) {
            console.error("Database query error: ", err);
            return res.status(500).json({ message: "Server error while fetching reports." });
        }

        return res.status(200).json(data);
    });
};

export const deleteReport = (req, res) => {
    const id = req.params.id;

    const q = "DELETE FROM reports WHERE id = ?;";

    db.query(q, [id], (err, data) => {
        if (err) {
            console.error("Error during SQL query:", err);
            return res.status(500).json(err);
        }
        return res.json("Report deleted successfully");
    });
};