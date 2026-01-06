import React, { useEffect, useState } from "react";
import "./FolderList.css";

interface Entry {
  name: string;
  isDirectory: boolean;
}

interface Props {
  path: string;
  onSelect: (name: string, isDir: boolean) => void;
}

const FolderList: React.FC<Props> = ({ path, onSelect }) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/list?path=${encodeURIComponent(path)}`)
      .then((res) => res.json())
      .then(setEntries);
  }, [path]);

  return (
    <div className="folder-list-container">
      <ul className="folder-list-ul">
        {path && (
          <li className="folder-list-li">
            <button
              className="folder-list-btn folder-list-btn-back"
              onClick={() =>
                onSelect(path.split("/").slice(0, -1).join("/"), true)
              }
            >
              <span className="folder-list-icon">⬅️</span> Back
            </button>
          </li>
        )}
        {entries.map((entry) => (
          <li key={entry.name} className="folder-list-li">
            <button
              className="folder-list-btn"
              onClick={() =>
                onSelect(
                  path ? `${path}/${entry.name}` : entry.name,
                  entry.isDirectory
                )
              }
            >
              <span className="folder-list-icon">
                {entry.isDirectory ? "📁" : "📄"}
              </span>
              {entry.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderList;
