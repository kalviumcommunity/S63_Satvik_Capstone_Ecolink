import React from 'react';
import { motion } from 'framer-motion';

const PageLayout = ({ 
  children, 
  title, 
  subtitle,
  headerContent,
  containerClassName = "",
  animate = true 
}) => {
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      className="min-h-screen bg-secondary-50"
      initial={animate ? "initial" : false}
      animate={animate ? "animate" : false}
      exit={animate ? "exit" : false}
      variants={pageTransition}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4">
            {title && (
              <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 font-display">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-secondary-600 text-lg">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            {headerContent && (
              <div className="flex justify-between items-center">
                {headerContent}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-secondary-200 mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-secondary-500 text-sm">
            © 2024 EcoLink. All rights reserved.
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default PageLayout; 