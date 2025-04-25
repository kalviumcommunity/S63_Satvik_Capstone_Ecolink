import React, { useState } from 'react';
import SpeciesImagePlaceholder from '../components/SpeciesImagePlaceholder';

const SpeciesCard = ({ name, status, population, habitat, threats, description, image }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate a placeholder color based on the species name
  const getPlaceholderImage = (name) => {
    const colors = ['4CAF50', '2196F3', 'FF9800', '9C27B0', '607D8B'];
    const index = name.length % colors.length;
    return `https://placehold.co/800x400/${colors[index]}/FFFFFF/png?text=${encodeURIComponent(name)}`;
  };

  const handleImageError = (e) => {
    console.error('Image failed to load:', e);
    setImageError(true);
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully');
    setImageLoaded(true);
    setImageError(false);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Image */}
        <div className="md:w-1/3 relative bg-green-50">
          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0">
              <SpeciesImagePlaceholder name={name} />
            </div>
          )}
          <img 
            src={image || getPlaceholderImage(name)} 
            alt={name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ minHeight: '300px' }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            crossOrigin="anonymous"
          />
        </div>

        {/* Right side - Content */}
        <div className="md:w-2/3 p-6">
          {/* Title and Status */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{name}</h2>
            <span className={`inline-block px-4 py-1 text-white text-sm font-medium rounded-full ${
              status === 'Critically Endangered' ? 'bg-red-500' : 
              status === 'Endangered' ? 'bg-orange-500' : 
              'bg-yellow-500'
            }`}>
              {status}
            </span>
          </div>

          {/* About Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">About Me</h3>
            <p className="text-gray-600">{description}</p>
          </div>

          {/* Facts Section */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Facts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Population */}
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">Population</span>
                </div>
                <span className="text-gray-600 text-sm">{population}</span>
              </div>

              {/* Habitat */}
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Habitat</span>
                </div>
                <span className="text-gray-600 text-sm">{habitat}</span>
              </div>

              {/* Threats */}
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-medium">Threats</span>
                </div>
                <span className="text-gray-600 text-sm">{threats}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
              Add as Pet
            </button>
            <button className="px-4 py-2 text-green-600 text-sm font-medium hover:bg-green-50 rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpeciesPage = () => {
  const speciesData = [
    {
      name: "Amur Leopard",
      status: "Critically Endangered",
      population: "Less than 100",
      habitat: "Temperate forests",
      threats: "Habitat loss, poaching",
      description: "The Amur leopard is one the world's most endangered big cats, found primarily in the temperate forests of the Russian Far East. With a population of fewer than 100 individuals in the wild, they face threats from habitat loss, poaching, and prey depletion. Conservation efforts are underway to protect this majestic species.",
      image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&auto=format&fit=crop"
    },
    {
      name: "Giant Panda",
      status: "Vulnerable",
      population: "About 1,800",
      habitat: "Bamboo forests",
      threats: "Habitat fragmentation, livestock grazing",
      description: "The giant panda is perhaps the most beloved conservation icon worldwide. After decades of effective conservation work, these distinctive bears have been downgraded from 'Endangered' to 'Vulnerable' on the IUCN Red List, though they remain threatened by habitat fragmentation and climate change.",
      image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&auto=format&fit=crop"
    },
    {
      name: "Bengal Tiger",
      status: "Endangered",
      population: "Fewer than 2,500",
      habitat: "Tropical and subtropical forests",
      threats: "Poaching, habitat loss",
      description: "The Bengal tiger is primarily found in India with smaller populations in Bangladesh, Nepal, Bhutan, China and Myanmar. It is threatened by poaching and habitat loss due to agricultural expansion and development projects.",
      image: "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=800&auto=format&fit=crop"
    },
    {
      name: "Blue Whale",
      status: "Endangered",
      population: "10,000-25,000",
      habitat: "Oceans worldwide",
      threats: "Ship strikes, entanglement",
      description: "The blue whale is the largest animal known to have ever existed. Despite international protection since 1966, they remain endangered, recovering slowly from intensive whaling operations in the 20th century.",
      image: "https://images.unsplash.com/photo-1568430328012-21ed450453ea?w=800&auto=format&fit=crop"
    },
    {
      name: "Arctic Polar Bear",
      status: "Vulnerable",
      population: "22,000-31,000",
      habitat: "Sea ice and coastal areas",
      threats: "Climate change, pollution",
      description: "Polar bears are uniquely adapted to life on sea ice, which they rely on for hunting seals. As climate change causes sea ice to melt earlier in spring and form later in fall, polar bears are increasingly threatened by reduced access to their primary food source.",
      image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Endangered Species</h1>
          <p className="text-gray-600">Learn about and help protect these remarkable creatures</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-grow max-w-xl">
              <input
                type="text"
                placeholder="Search species..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex gap-4">
              <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>All Status</option>
                <option>Critically Endangered</option>
                <option>Endangered</option>
                <option>Vulnerable</option>
              </select>
              <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>All Regions</option>
                <option>Asia</option>
                <option>Africa</option>
                <option>Americas</option>
                <option>Europe</option>
                <option>Oceania</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {speciesData.map((species, index) => (
            <SpeciesCard key={index} {...species} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeciesPage; 