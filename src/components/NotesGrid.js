import React from "react";
import NoteCard from "./NoteCard";

function NotesGrid({ notes, onDeleteNote }) {
  return (
    <div className="notes-grid">
      {notes.map((note, index) => (
        <NoteCard
          key={note.id}
          note={note}
          index={index}
          onDelete={onDeleteNote}
        />
      ))}
    </div>
  );
}

export default NotesGrid;
