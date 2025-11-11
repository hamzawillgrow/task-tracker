import Flag from "./Flag";

function TaskItem({ task, onDelete, onToggleFlag }) {
  return (
    <div
      style={{
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: task.flagged ? "#ffe6e6" : "#fff",
        border: `2px solid ${task.flagged ? "#ff4444" : "#ddd"}`,
        borderRadius: "4px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
        {task.title}
      </span>
      <div>
        <Flag flagged={task.flagged} onToggle={() => onToggleFlag(task.id)} />
        <button onClick={() => onDelete(task.id)} style={{ marginLeft: "10px" }}>
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
