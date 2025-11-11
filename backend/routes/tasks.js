import express from "express";
const router = express.Router();

let tasks = [{ id: 1, title: "Découvrir React", done: false, flagged: false }];

// GET all tasks
router.get("/", (req, res) => {
  const sorted = [...tasks].sort((a, b) => b.flagged - a.flagged);
  res.json(sorted);
});

// POST new task
router.post("/", (req, res) => {
  const newTask = { id: Date.now(), title: req.body.title, done: false, flagged: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE a task
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.sendStatus(204);
});

// PATCH a task to toggle flag
router.patch("/:id/flag", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.flagged = !task.flagged;
  res.status(200).json(task);
});

export default router;
