import React from "react";

function NoteCard({ note, index, onDelete }) {
  const handleDelete = () => onDelete(note.id);

  return (
    <div
      className={`note-card note-${index % 5}`}
      style={{
        backgroundColor: note.color,
        transform: `rotate(${
          (index % 2 === 0 ? 1 : -1) * ((index % 3) * 2)
        }deg)`,
      }}
    >
      <p>{note.content}</p>
      <div className="note-footer">
        <span>{new Date(note.timestamp).toLocaleDateString()}</span>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
}

export default NoteCard;
