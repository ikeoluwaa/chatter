import { useState } from "react";

export default function VideoUploader({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform upload action here
      onUpload(selectedFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="video/*" />
      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
}
