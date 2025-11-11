import React from "react";

export default function Flag({ flagged, onToggle }) {
    return (
        <button
            onClick={onToggle}
            style={{
                padding: "5px 10px",
                marginLeft: "10px",
                backgroundColor: flagged ? "#ff4444" : "#ddd",
                color: flagged ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
            }}
            title={flagged ? "Unflag this task" : "Flag this task"}
        >
            {flagged ? "🚩 Flagged" : "⚩ Flag"}
        </button>
    );
}
