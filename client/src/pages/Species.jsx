import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import SpeciesImagePlaceholder from '../components/SpeciesImagePlaceholder';

const SpeciesCard = ({ name, status, population, habitat, threats, description, image }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Critically Endangered':
        return 'bg-red-500';
      case 'Endangered':
        return 'bg-orange-500';
      case 'Vulnerable':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card hover variant="elevated" className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Image */}
        <div className="md:w-2/5 relative">
          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0">
              <SpeciesImagePlaceholder name={name} />
            </div>
          )}
          <img 
            src={image} 
            alt={name}
            className={`w-full h-[300px] md:h-full object-cover transition-opacity duration-300 ${
              imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </div>

        {/* Right side - Content */}
        <div className="md:w-3/5 p-8">
          {/* Title and Status */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-3 font-display">{name}</h2>
            <span className={`inline-block px-4 py-1.5 text-white text-sm font-semibold rounded-full ${getStatusColor(status)}`}>
              {status}
            </span>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>

          {/* Facts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Population */}
            <Card hover variant="default" className="bg-primary-50">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-semibold text-primary-800">Population</span>
              </div>
              <p className="text-primary-700 text-sm">{population}</p>
            </Card>

            {/* Habitat */}
            <Card hover variant="default" className="bg-primary-50">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-primary-800">Habitat</span>
              </div>
              <p className="text-primary-700 text-sm">{habitat}</p>
            </Card>

            {/* Threats */}
            <Card hover variant="default" className="bg-primary-50">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="font-semibold text-primary-800">Threats</span>
              </div>
              <p className="text-primary-700 text-sm">{threats}</p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg">
              Add as Pet
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const SpeciesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const speciesData = [
    {
      name: "Amur Leopard",
      status: "Critically Endangered",
      population: "Less than 100",
      habitat: "Temperate forests",
      threats: "Habitat loss, poaching",
      description: "The Amur leopard is one the world's most endangered big cats, found primarily in the temperate forests of the Russian Far East. With a population of fewer than 100 individuals in the wild, they face threats from habitat loss, poaching, and prey depletion. Conservation efforts are underway to protect this majestic species.",
      image: "https://i.natgeofe.com/n/6490d605-3ef3-4c44-8a4d-582c8f45da86/amur-leopard-upclose_16x9.jpg"
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

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeInUp}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-display">
            Endangered Species
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and learn about remarkable creatures that need our help and protection
          </p>
        </motion.div>

        {/* Filters Section */}
        <Card className="mb-12">
          <Card.Body>
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              {/* Search */}
              <div className="flex-grow">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search species..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-700 text-lg"
                  />
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400"
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
              </div>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-700 text-lg"
              >
                <option>All Status</option>
                <option>Critically Endangered</option>
                <option>Endangered</option>
                <option>Vulnerable</option>
              </select>

              {/* Region Filter */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-700 text-lg"
              >
                <option>All Regions</option>
                <option>Asia</option>
                <option>Africa</option>
                <option>North America</option>
                <option>South America</option>
                <option>Europe</option>
                <option>Oceania</option>
              </select>
            </div>
          </Card.Body>
        </Card>

        {/* Species Grid */}
        <div className="space-y-8">
          {speciesData
            .filter(species => 
              species.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
              (selectedStatus === "All Status" || species.status === selectedStatus) &&
              (selectedRegion === "All Regions" || species.habitat.includes(selectedRegion))
            )
            .map((species, index) => (
              <motion.div
                key={species.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SpeciesCard {...species} />
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SpeciesPage; 