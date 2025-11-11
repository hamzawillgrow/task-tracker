import request from "supertest";
import express from "express";
import tasksRouter from "../routes/tasks.js";

const app = express();
app.use(express.json());
app.use("/api/tasks", tasksRouter);

test("GET /api/tasks returns tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("title");
});

test("PATCH /api/tasks/:id/flag toggles the flag", async () => {
    const res = await request(app).patch("/api/tasks/1/flag");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("flagged");
    expect(res.body.flagged).toBe(true);
});

test("GET /api/tasks returns flagged tasks first", async () => {
    // Crée 2 tâches
    const task1Res = await request(app).post("/api/tasks").send({ title: "Urgente" });
    const task1Id = task1Res.body.id;

    const task2Res = await request(app).post("/api/tasks").send({ title: "Normal" });

    // Flag la première
    await request(app).patch(`/api/tasks/${task1Id}/flag`);

    // Récupère toutes les tâches
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);

    // Vérifie que flagged est avant non-flagged
    const flaggedIndices = res.body.map((t, i) => t.flagged ? i : -1).filter(i => i >= 0);
    const unflaggedIndices = res.body.map((t, i) => !t.flagged ? i : -1).filter(i => i >= 0);

    if (flaggedIndices.length > 0 && unflaggedIndices.length > 0) {
        const maxFlagged = Math.max(...flaggedIndices);
        const minUnflagged = Math.min(...unflaggedIndices);
        expect(maxFlagged).toBeLessThan(minUnflagged);
    }
});