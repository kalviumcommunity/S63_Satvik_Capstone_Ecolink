import React from 'react';

const SpeciesImagePlaceholder = ({ name }) => {
  return (
    <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="text-center p-4">
        <div className="text-6xl mb-4">🌿</div>
        <h3 className="text-xl font-semibold text-green-700 mb-2">{name}</h3>
        <p className="text-green-600 text-sm">Image temporarily unavailable</p>
      </div>
    </div>
  );
};

export default SpeciesImagePlaceholder; 