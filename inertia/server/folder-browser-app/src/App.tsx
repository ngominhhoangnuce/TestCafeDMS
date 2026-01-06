import React, { useState } from "react";
import FolderList from "./components/FolderList";
import "./App.css";

const App: React.FC = () => {
  const [path, setPath] = useState("");
  const [viewFile, setViewFile] = useState<string | null>(null);

  return (
    <div className="app-root">
      <div className="app-content">
        <h1 className="app-header">TestCafe Reports</h1>
        {!viewFile ? (
          <FolderList
            path={path}
            onSelect={(name, isDir) => {
              if (isDir) setPath(name);
              else setViewFile(name);
            }}
          />
        ) : (
          <div>
            <button className="app-back-btn" onClick={() => setViewFile(null)}>
              ⬅️ Back
            </button>
            <iframe
              src={`http://localhost:4000/files/${viewFile}`}
              title={viewFile}
              className="app-iframe"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
