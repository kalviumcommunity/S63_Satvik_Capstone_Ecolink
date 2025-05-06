import React from 'react';
import SignUpForm from '../components/auth/SignUpForm';

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SignUpForm />
    </div>
  );
};

export default SignUp;