import React from "react";

interface FolderViewerProps {
  folder: string;
  onBack: () => void;
}

const FolderViewer: React.FC<FolderViewerProps> = ({ folder, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h2>Contents of {folder}/index.html</h2>
      <iframe
        src={`/${folder}/index.html`}
        title={`index.html of ${folder}`}
        width="100%"
        height="600px"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default FolderViewer;
