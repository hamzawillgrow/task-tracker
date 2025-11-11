function TaskItem({ task, onDelete }) {
  return (
    <div>
      <span>{task.title}</span>
      <button onClick={() => onDelete(task.id)}>🗑️</button>
    </div>
  );
}

export default TaskItem;
