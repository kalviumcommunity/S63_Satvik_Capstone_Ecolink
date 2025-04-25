import React from 'react';

const SpeciesImagePlaceholder = ({ name }) => {
  return (
    <div className="w-full h-full min-h-[300px] bg-green-50 flex items-center justify-center">
      <div className="text-center p-4">
        <svg 
          className="w-16 h-16 mx-auto text-green-600 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
        <p className="text-green-700 font-medium">{name}</p>
        <p className="text-green-600 text-sm">Image loading...</p>
      </div>
    </div>
  );
};

export default SpeciesImagePlaceholder; 