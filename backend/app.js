import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
