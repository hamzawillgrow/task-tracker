import React, { useState, useEffect } from "react";
import { getTasks, addTask, deleteTask, toggleTaskFlag } from "../services/api.js";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleAdd = async (title) => {
    const newTask = await addTask(title);
    setTasks([...tasks, newTask]);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleToggleFlag = async (id) => {
    const updatedTask = await toggleTaskFlag(id);
    const updated = tasks.map(t => t.id === id ? updatedTask : t);
    // Trier : flagged d'abord
    const sorted = updated.sort((a, b) => b.flagged - a.flagged);
    setTasks(sorted);
  };

  return (
    <div style={{ margin: 40 }}>
      <h1>🧠 Task Tracker</h1>
      <TaskForm onAdd={handleAdd} />
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onDelete={handleDelete} onToggleFlag={handleToggleFlag} />
      ))}
    </div>
  );
}

export default App;
