import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import itemRoutes from "./routes/item.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express();

const router = express.Router();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true 
}));

app.use(express.json());
app.use("/", router);
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);

app.listen(8800, () => {
    console.log('Server is running on port 8800');
});
