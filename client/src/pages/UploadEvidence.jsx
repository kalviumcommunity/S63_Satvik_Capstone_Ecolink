import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import FileUpload from '../components/common/FileUpload';

const UploadEvidence = () => {
  const [activityType, setActivityType] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpload = (file) => {
    setUploadedFiles(prev => [...prev, file]);
  };

  const resetForm = () => {
    setActivityType('');
    setDescription('');
    setUploadedFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log the submission data
    console.log('Submitting:', {
      activityType,
      description,
      files: uploadedFiles
    });

    // Show success message immediately
    setShowSuccess(true);
    
    // Reset form
    resetForm();
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-96 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Evidence submitted successfully!</span>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-green-700 hover:text-green-900"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 font-display mb-2">
            Upload Activity Evidence
          </h1>
          <p className="text-xl text-gray-600">
            Share your environmental contributions and earn eco-points
          </p>
        </motion.div>

        {/* Upload Form */}
        <Card>
          <Card.Body>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Activity Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Type
                </label>
                <select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="">Select an activity type</option>
                  <option value="tree-planting">Tree Planting</option>
                  <option value="waste-collection">Waste Collection</option>
                  <option value="recycling">Recycling</option>
                  <option value="beach-cleanup">Beach Cleanup</option>
                  <option value="wildlife-conservation">Wildlife Conservation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Describe your environmental activity..."
                  required
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Evidence
                </label>
                <FileUpload
                  accept="image/*,application/pdf"
                  maxSize={10485760} // 10MB
                  maxFiles={3}
                  onUpload={handleUpload}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Upload photos or documents as evidence of your activity (max 3 files, 10MB each)
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={!activityType || !description || uploadedFiles.length === 0}
                >
                  Submit Evidence
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>

        {/* Guidelines Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Card variant="outline" className="bg-primary-50">
            <Card.Body>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Guidelines for Evidence Submission
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Photos should clearly show your participation in the activity
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Include before and after pictures when applicable
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Documents should be official or verifiable (certificates, receipts, etc.)
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  All submissions will be reviewed by our team
                </li>
              </ul>
            </Card.Body>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadEvidence; 