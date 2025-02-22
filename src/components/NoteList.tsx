// src/components/NoteList.tsx
import React from "react";
import { Note } from "../app/page";

interface NoteListProps {
  notes: Note[];
  selectedNoteId: string | null;
  onAddNote: () => void;
  onSelectNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedNoteId,
  onAddNote,
  onSelectNote,
  onDeleteNote,
}) => {
  return (
    <div>
      <button onClick={onAddNote}>New Note</button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            className={`note-item ${
              note.id === selectedNoteId ? "selected" : ""
            }`}
            onClick={() => onSelectNote(note.id)}
          >
            <span>{note.title || "Untitled"}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNote(note.id);
              }}
              className="note-delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
