import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import itemRoutes from "./routes/item.js";
import userRoutes from "./routes/users.js";
import reportsRoutes from "./routes/reports.js";
import ordersRoutes from "./routes/orders.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

const router = express.Router();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true 
}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/uploads");
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
    res.status(200).json({ filename: req.file.filename, path: `/uploads/${req.file.filename}` });
});
+
app.use(express.json());
app.use("/", router);
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/orders", ordersRoutes);


app.listen(8800, () => {
    console.log('Server is running on port 8800');
});
