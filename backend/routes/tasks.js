import express from "express";
const router = express.Router();

let tasks = [{ id: 1, title: "Découvrir React", done: false }];

// GET all tasks
router.get("/", (req, res) => res.json(tasks));

// POST new task
router.post("/", (req, res) => {
  const newTask = { id: Date.now(), title: req.body.title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE a task
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.sendStatus(204);
});

export default router;
