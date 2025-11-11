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
    // Crée 3 tâches
    const task1Res = await request(app).post("/api/tasks").send({ title: "Première (not flagged)" });
    const task1Id = task1Res.body.id;

    const task2Res = await request(app).post("/api/tasks").send({ title: "Deuxième (will be flagged)" });
    const task2Id = task2Res.body.id;

    const task3Res = await request(app).post("/api/tasks").send({ title: "Troisième (not flagged)" });
    const task3Id = task3Res.body.id;

    // Flag la tâche du milieu
    await request(app).patch(`/api/tasks/${task2Id}/flag`);

    // Récupère toutes les tâches
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);

    // Doit avoir 4 tâches (1 initiale + 3 créées)
    expect(res.body.length).toBe(4);

    // Trouver les indices
    const task2InResponse = res.body.find(t => t.id === task2Id);
    const task1InResponse = res.body.find(t => t.id === task1Id);
    const task3InResponse = res.body.find(t => t.id === task3Id);

    // task2 doit être flagged et être la première parmi les flagged
    expect(task2InResponse.flagged).toBe(true);

    // Tous les flagged doivent être avant les non-flagged
    const indexOfFlaggedTask2 = res.body.indexOf(task2InResponse);
    const indexOfUnflaggedTask1 = res.body.indexOf(task1InResponse);
    const indexOfUnflaggedTask3 = res.body.indexOf(task3InResponse);

    expect(indexOfFlaggedTask2).toBeLessThan(indexOfUnflaggedTask1);
    expect(indexOfFlaggedTask2).toBeLessThan(indexOfUnflaggedTask3);
});