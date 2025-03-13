import React from "react";

const KMLUploader = ({ onUpload }) => {
  const handleKMLUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="upload-section">
      <label htmlFor="file-upload" className="custom-file-upload">
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".kml"
        onChange={handleKMLUpload}
        className="file-input"
      />
    </div>
  );
};

export default KMLUploader;
