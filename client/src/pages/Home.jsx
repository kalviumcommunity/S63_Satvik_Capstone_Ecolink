import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import FileUpload from '../components/upload/FileUpload';

const Home = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-bold text-green-700 mb-2">Welcome to EcoLink 🌿</h1>
      <p className="text-gray-700 text-lg mb-10">Join the movement. Make an impact.</p>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <LoginForm />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <SignUpForm />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Upload a File</h2>
        <FileUpload />
      </div>
    </div>
  );
};

export default Home;
