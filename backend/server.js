import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/tasks", tasksRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
