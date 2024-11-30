import React, { useState } from "react";

function NoteInput({ onAddNote }) {
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.trim()) {
      onAddNote(note);
      setNote("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-input-form">
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteInput;
