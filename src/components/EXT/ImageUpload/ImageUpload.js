import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

    const selectedImages = files.filter((file) =>
      validImageTypes.includes(file.type)
    );

    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...selectedImages,
    ]);
  };

  const handleDelete = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };

  const handleFileRead = (index, e) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index].preview = e.target.result;
    setSelectedFiles(newSelectedFiles);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

    const selectedImages = files.filter((file) =>
      validImageTypes.includes(file.type)
    );

    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...selectedImages,
    ]);

    Array.from(e.target.files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => handleFileRead(index, reader);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5001/status",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(selectedFiles)
  return (
    <div>
      <div>
        <input type="checkbox" id="Add-Photo-Modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 ">
            <div className="image-uploader">
              <div
                className="drop-zone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <p>Drag and drop images here</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </div>
              {selectedFiles.length > 0 && (
                <div className="image-preview">
                  {selectedFiles.map((file, index) => (
                    <div className="image-preview-item" key={index}>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(index)}
                      >
                        X
                      </button>
                      <img src={file.preview} alt="Preview" />
                    </div>
                  ))}
                  <button onClick={handleSubmit}>Upload</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
