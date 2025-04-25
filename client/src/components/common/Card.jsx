import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  animate = true,
  ...props 
}) => {
  const baseStyles = 'rounded-xl bg-white shadow-sm overflow-hidden';
  
  const variants = {
    default: 'border border-gray-200',
    elevated: 'shadow-lg',
    outline: 'border-2 border-primary-500',
  };

  const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : '';
  
  const classes = `${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`;

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Subcomponents for consistent card layouts
Card.Header = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`} {...props}>
    {children}
  </div>
);

Card.Body = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`} {...props}>
    {children}
  </div>
);

export default Card; 