import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/tasks", tasksRouter);

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`✅ Server running on http://0.0.0.0:${PORT}`));
