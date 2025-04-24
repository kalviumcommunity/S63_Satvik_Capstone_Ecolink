import React from 'react';
import { Link } from 'react-router-dom';

const SpeciesPage = () => {
  const species = [
    {
      id: 1,
      name: 'Monarch Butterfly',
      scientificName: 'Danaus plexippus',
      category: 'Insect',
      status: 'Endangered',
      image: '/species/monarch.jpg',
      description: 'The monarch butterfly is known for its remarkable annual migration.',
      sightings: 156,
      lastSighted: 'March 10, 2024'
    },
    {
      id: 2,
      name: 'Red Fox',
      scientificName: 'Vulpes vulpes',
      category: 'Mammal',
      status: 'Least Concern',
      image: '/species/red-fox.jpg',
      description: 'The red fox is the largest of the true foxes and one of the most widely distributed members of the order Carnivora.',
      sightings: 89,
      lastSighted: 'March 15, 2024'
    },
    {
      id: 3,
      name: 'Blue Heron',
      scientificName: 'Ardea herodias',
      category: 'Bird',
      status: 'Least Concern',
      image: '/species/blue-heron.jpg',
      description: 'The great blue heron is a large wading bird in the heron family Ardeidae.',
      sightings: 234,
      lastSighted: 'March 18, 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Species Tracking</h1>
            <Link
              to="/species/report"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Report Sighting
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg mb-6 p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search species..."
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                <option>All Categories</option>
                <option>Mammal</option>
                <option>Bird</option>
                <option>Insect</option>
                <option>Reptile</option>
                <option>Amphibian</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                <option>All Status</option>
                <option>Endangered</option>
                <option>Threatened</option>
                <option>Least Concern</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {species.map((species) => (
            <div key={species.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {species.category}
                  </span>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    species.status === 'Endangered' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {species.status}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-900">{species.name}</h3>
                  <p className="text-sm text-gray-500 italic">{species.scientificName}</p>
                </div>
                <p className="mt-2 text-gray-600">{species.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {species.sightings} sightings
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Last sighted: {species.lastSighted}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Report Sighting
                  </button>
                  <Link
                    to={`/species/${species.id}`}
                    className="text-sm font-medium text-green-600 hover:text-green-500"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SpeciesPage;
