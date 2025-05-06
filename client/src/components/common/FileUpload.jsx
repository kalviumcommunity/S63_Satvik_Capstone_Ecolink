import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';

const FileUpload = ({ 
  accept = 'image/*',
  maxSize = 5242880, // 5MB
  maxFiles = 1,
  onUpload,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFile = (file) => {
    // Check file type
    if (accept.includes('/*')) {
      const generalType = accept.split('/')[0];
      if (!file.type.startsWith(generalType)) {
        alert(`File ${file.name} is not a valid file type. Expected: ${accept}`);
        return false;
      }
    } else if (!accept.split(',').some(type => file.type === type.trim())) {
      alert(`File ${file.name} is not a valid file type. Expected: ${accept}`);
      return false;
    }

    // Check file size
    if (file.size > maxSize) {
      alert(`File ${file.name} is too large. Maximum size is ${maxSize / 1024 / 1024}MB`);
      return false;
    }

    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    if (newFiles.length + files.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles = newFiles.filter(validateFile);
    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);

    // Initialize progress for new files
    const newProgress = { ...uploadProgress };
    validFiles.forEach(file => {
      newProgress[file.name] = 0;
    });
    setUploadProgress(newProgress);

    // Simulate upload for each file
    validFiles.forEach(file => {
      simulateUpload(file);
    });
  };

  const simulateUpload = (file) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(prev => ({
        ...prev,
        [file.name]: progress
      }));

      if (progress >= 100) {
        clearInterval(interval);
        if (onUpload) {
          onUpload(file);
        }
      }
    }, 300);
  };

  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const updated = { ...prev };
      delete updated[fileName];
      return updated;
    });
  };

  return (
    <Card 
      variant={isDragging ? 'outline' : 'default'} 
      className={`${className} ${isDragging ? 'border-primary-500 border-2' : ''}`}
    >
      <div
        className="relative p-8"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={handleFileInput}
        />

        {/* Upload Area */}
        <div className="text-center">
          <div className="mb-4">
            <motion.div
              animate={{ scale: isDragging ? 1.1 : 1 }}
              className="w-16 h-16 mx-auto bg-primary-50 rounded-full flex items-center justify-center"
            >
              <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </motion.div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">
              Drag and drop your {maxFiles > 1 ? 'files' : 'file'} here, or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                browse
              </button>
            </p>
            <p className="text-sm text-gray-500">
              Maximum file size: {maxSize / 1024 / 1024}MB
            </p>
            {maxFiles > 1 && (
              <p className="text-sm text-gray-500">
                Maximum files: {maxFiles}
              </p>
            )}
          </div>
        </div>

        {/* File List */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 space-y-4"
            >
              {files.map(file => (
                <div key={file.name} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">{file.name}</span>
                    </div>
                    <button
                      onClick={() => removeFile(file.name)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress[file.name]}%` }}
                      className="bg-primary-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default FileUpload; 