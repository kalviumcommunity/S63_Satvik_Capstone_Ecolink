import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file first.");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(`✅ File uploaded: ${res.data.filename}`);
    } catch (err) {
      setMessage('❌ Upload failed');
    }
  };

  return (
    <form onSubmit={handleUpload} className="flex flex-col items-start gap-2">
      <input type="file" onChange={handleChange} />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Upload
      </button>
      <p className="text-sm text-gray-700">{message}</p>
    </form>
  );
};

export default FileUpload;
