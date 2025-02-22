// src/components/Editor.tsx
import React, { ChangeEvent } from "react";

interface EditorProps {
  title: string;
  content: string;
  onTitleChange: (newTitle: string) => void;
  onContentChange: (newContent: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
}) => {
  return (
    <div>
      <input
        type="text"
        value={title}
        placeholder="Note Title"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onTitleChange(e.target.value)
        }
      />
      <textarea
        value={content}
        placeholder="Start writing your note..."
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onContentChange(e.target.value)
        }
      />
    </div>
  );
};

export default Editor;
