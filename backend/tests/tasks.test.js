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
    // Flag la première tâche
    await request(app).patch("/api/tasks/1/flag");

    // Récupère toutes les tâches
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);

    // Cherche les tâches flaggées et non-flaggées
    const flaggedIndex = res.body.findIndex(t => t.flagged === true);
    const unflaggedIndex = res.body.findIndex(t => t.flagged === false);

    // Les deux doivent exister
    expect(flaggedIndex).toBeGreaterThanOrEqual(0);
    expect(unflaggedIndex).toBeGreaterThanOrEqual(0);

    // Flagged doit être avant unflagged
    expect(flaggedIndex).toBeLessThan(unflaggedIndex);
});
