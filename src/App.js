import React, { useState, useEffect } from "react";
import NoteInput from "./components/NoteInput";
import NotesGrid from "./components/NotesGrid";
import "./styles.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  const handleAddNote = async (noteData) => {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData),
      });
      if (response.ok) {
        const newNote = await response.json();
        setNotes([...notes, newNote]);
        await fetchNotes();
      } else {
        console.error("Server responded with:", response.status);
      }
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, { method: "DELETE" });
      if (response.ok) {
        await fetchNotes();
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <div className="notes-app">
      <h1>Mind Dump</h1>
      <NoteInput
        onAddNote={(content) =>
          handleAddNote({
            content,
            timestamp: new Date().toISOString(),
            color: getRandomPastelColor(),
          })
        }
      />
      <NotesGrid notes={notes} onDeleteNote={handleDeleteNote} />
    </div>
  );
}

const getRandomPastelColor = () => {
  const pastelColors = [
    "#FFD1DC",
    "#FFEBCD",
    "#E6E6FA",
    "#F0FFF0",
    "#F0F8FF",
    "#FFF0F5",
    "#F5F5DC",
    "#E0FFFF",
  ];
  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
};

export default App;
