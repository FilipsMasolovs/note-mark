// src/components/Preview.tsx
import React from "react";
import ReactMarkdown from "react-markdown";

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  return <div className="preview"><ReactMarkdown>{content}</ReactMarkdown></div>;
};

export default Preview;
