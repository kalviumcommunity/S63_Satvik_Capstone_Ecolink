import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import InteractiveSpeciesCard from '../components/species/InteractiveSpeciesCard';

/**
 * Interactive Species Page
 * 
 * A highly interactive page for displaying endangered species with:
 * - Animated filter transitions
 * - Interactive filter chips/tags
 * - Parallax scrolling effects
 * - Animated background elements
 * - Staggered animations for cards
 * - Scroll-triggered animations
 */
const InteractiveSpeciesPage = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  
  // Animation controls
  const controls = useAnimation();
  const headerControls = useAnimation();
  
  // Refs for scroll animations
  const pageRef = useRef(null);
  
  // Update active filters when selections change
  useEffect(() => {
    const filters = [];
    if (selectedStatus !== "All Status") {
      filters.push({ type: 'status', value: selectedStatus });
    }
    if (selectedRegion !== "All Regions") {
      filters.push({ type: 'region', value: selectedRegion });
    }
    if (searchTerm) {
      filters.push({ type: 'search', value: searchTerm });
    }
    setActiveFilters(filters);
  }, [selectedStatus, selectedRegion, searchTerm]);
  
  // Start animations when component mounts
  useEffect(() => {
    controls.start("visible");
    headerControls.start("visible");
    
    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );
    
    if (pageRef.current) {
      observer.observe(pageRef.current);
    }
    
    return () => {
      if (pageRef.current) {
        observer.unobserve(pageRef.current);
      }
    };
  }, [controls, headerControls]);
  
  // Remove a filter
  const removeFilter = (filterToRemove) => {
    if (filterToRemove.type === 'status') {
      setSelectedStatus("All Status");
    } else if (filterToRemove.type === 'region') {
      setSelectedRegion("All Regions");
    } else if (filterToRemove.type === 'search') {
      setSearchTerm("");
    }
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setSelectedStatus("All Status");
    setSelectedRegion("All Regions");
    setSearchTerm("");
  };
  
  // Sample species data
  const speciesData = [
    {
      _id: "1",
      name: "Amur Leopard",
      status: "Critically Endangered",
      population: "Less than 100",
      habitat: "Temperate forests",
      threats: "Habitat loss, poaching",
      description: "The Amur leopard is one the world's most endangered big cats, found primarily in the temperate forests of the Russian Far East. With a population of fewer than 100 individuals in the wild, they face threats from habitat loss, poaching, and prey depletion. Conservation efforts are underway to protect this majestic species.",
      image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&h=600&auto=format&fit=crop&q=80",
      didYouKnow: "Amur leopards can leap more than 10 feet high to catch prey."
    },
    {
      _id: "2",
      name: "Eagle",
      status: "Endangered",
      population: "Around 2,000",
      habitat: "Mountains and forests",
      threats: "Habitat destruction, poisoning, hunting",
      description: "Eagles are powerful birds of prey with exceptional eyesight and hunting abilities. They are apex predators in their ecosystems, capable of spotting potential prey from great distances. Despite their impressive capabilities, many eagle species face threats from human activities and habitat loss.",
      image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800&h=600&auto=format&fit=crop&q=80",
      didYouKnow: "Eagles have incredible eyesight and can spot a rabbit from 2 miles away."
    },
    {
      _id: "3",
      name: "Bengal Tiger",
      status: "Endangered",
      population: "Fewer than 2,500",
      habitat: "Tropical and subtropical forests",
      threats: "Poaching, habitat loss",
      description: "The Bengal tiger is primarily found in India with smaller populations in Bangladesh, Nepal, Bhutan, China and Myanmar. It is threatened by poaching and habitat loss due to agricultural expansion and development projects.",
      image: "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=800&auto=format&fit=crop",
      didYouKnow: "Bengal tigers have unique stripe patterns - no two tigers have exactly the same stripes."
    },
    {
      _id: "4",
      name: "Blue Whale",
      status: "Endangered",
      population: "10,000-25,000",
      habitat: "Oceans worldwide",
      threats: "Ship strikes, entanglement",
      description: "The blue whale is the largest animal known to have ever existed. Despite international protection since 1966, they remain endangered, recovering slowly from intensive whaling operations in the 20th century.",
      image: "https://images.unsplash.com/photo-1568430328012-21ed450453ea?w=800&auto=format&fit=crop",
      didYouKnow: "A blue whale's heart is so big that a human could swim through its arteries."
    },
    {
      _id: "5",
      name: "Arctic Polar Bear",
      status: "Vulnerable",
      population: "22,000-31,000",
      habitat: "Sea ice and coastal areas",
      threats: "Climate change, pollution",
      description: "Polar bears are uniquely adapted to life on sea ice, which they rely on for hunting seals. As climate change causes sea ice to melt earlier in spring and form later in fall, polar bears are increasingly threatened by reduced access to their primary food source.",
      image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&auto=format&fit=crop",
      didYouKnow: "Polar bears have black skin under their white fur, which helps them absorb heat from the sun."
    },
    {
      _id: "6",
      name: "Rafflesia Flower",
      status: "Critically Endangered",
      population: "Less than 100 blooming annually",
      habitat: "Tropical rainforests",
      threats: "Deforestation, climate change, tourism",
      description: "The Rafflesia is the largest individual flower in the world, with blooms that can reach up to 3 feet in diameter. This parasitic plant has no stems, leaves, or roots, and only becomes visible when it's ready to reproduce. It's nicknamed the 'corpse flower' due to its distinctive rotting meat smell used to attract pollinators. Each flower takes many months to develop and blooms for just a few days.",
      image: "/images/species/rafflesia.jpg",
      didYouKnow: "The Rafflesia flower can weigh up to 24 pounds and is the largest single flower in the world."
    },
    {
      _id: "7",
      name: "Ghost Orchid",
      status: "Critically Endangered",
      population: "Less than 2,000",
      habitat: "Swamp forests",
      threats: "Illegal collection, habitat destruction, climate change",
      description: "The Ghost Orchid (Dendrophylax lindenii) is one of the rarest and most mysterious flowers in North America. This ethereal plant appears to float in mid-air due to its nearly invisible roots. It blooms for only a few weeks each year and can only be pollinated by a single species of moth, the Giant Sphinx Moth. Found primarily in Florida's swamps, it faces multiple threats to its survival, including poaching for collectors and loss of habitat.",
      image: "/images/species/ghost-orchid.jpg",
      didYouKnow: "The Ghost Orchid can only be pollinated by a single species of moth - the Giant Sphinx Moth."
    }
  ];
  
  // Filter species based on search and filters
  const filteredSpecies = speciesData.filter(species => 
    species.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedStatus === "All Status" || species.status === selectedStatus) &&
    (selectedRegion === "All Regions" || species.habitat.includes(selectedRegion))
  );
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  // Floating Particles Background
  const ParticlesBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-primary-500 opacity-10"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              x: [
                Math.random() * window.innerWidth, 
                Math.random() * window.innerWidth, 
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight, 
                Math.random() * window.innerHeight, 
                Math.random() * window.innerHeight
              ],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: Math.random() * 20 + 20, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
  };
  
  // Animated Filter Chip component
  const FilterChip = ({ filter, onRemove }) => (
    <motion.div 
      className="flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      layout
    >
      <span>{filter.value}</span>
      <button 
        onClick={() => onRemove(filter)}
        className="w-4 h-4 rounded-full bg-primary-200 text-primary-800 flex items-center justify-center hover:bg-primary-300"
      >
        ×
      </button>
    </motion.div>
  );
  
  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <ParticlesBackground />
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-secondary-500/10 rounded-full filter blur-3xl opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
        >
          <motion.div 
            className="inline-block mb-2"
            variants={itemVariants}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              <span className="mr-1">🌍</span> Conservation
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display"
            variants={itemVariants}
          >
            <span className="relative inline-block">
              Endangered Species
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-primary-500 rounded-full"
                initial={{ width: 0, left: "50%" }}
                animate={{ width: "100%", left: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Discover and learn about remarkable creatures that need our help and protection
          </motion.p>
        </motion.div>

        {/* Filters Section */}
        <motion.div 
          className="mb-8 bg-white rounded-xl shadow-md overflow-hidden"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-6">
            <div className="flex flex-col space-y-4">
              {/* Search */}
              <div className="relative">
                <motion.div 
                  className={`absolute inset-0 bg-primary-100 rounded-lg transition-all duration-300 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`}
                  animate={{ 
                    scale: isSearchFocused ? 1.02 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
                <input
                  type="text"
                  placeholder="Search species..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-700 relative z-10 bg-transparent"
                />
                <motion.svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ 
                    scale: isSearchFocused ? 1.2 : 1,
                    color: isSearchFocused ? "#059669" : "#9CA3AF"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </motion.svg>
              </div>
              
              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status Filter */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conservation Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-700 appearance-none"
                  >
                    <option>All Status</option>
                    <option>Critically Endangered</option>
                    <option>Endangered</option>
                    <option>Vulnerable</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Region Filter */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Habitat Region</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-700 appearance-none"
                  >
                    <option>All Regions</option>
                    <option>forests</option>
                    <option>Oceans</option>
                    <option>Sea ice</option>
                    <option>rainforests</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Active Filters:</h3>
                    <motion.button
                      onClick={clearAllFilters}
                      className="text-sm text-primary-600 hover:text-primary-800"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Clear All
                    </motion.button>
                  </div>
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    layout
                  >
                    <AnimatePresence>
                      {activeFilters.map((filter, index) => (
                        <FilterChip 
                          key={`${filter.type}-${filter.value}`} 
                          filter={filter} 
                          onRemove={removeFilter} 
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="mb-6 flex justify-between items-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredSpecies.length}</span> species
          </p>
          
          {/* Sort options could go here */}
        </motion.div>

        {/* Species Grid */}
        <motion.div 
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {filteredSpecies.length > 0 ? (
            filteredSpecies.map((species, index) => (
              <motion.div
                key={species._id}
                variants={itemVariants}
                custom={index}
                layout
              >
                <InteractiveSpeciesCard {...species} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="text-center py-16"
              variants={itemVariants}
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No species found</h3>
              <p className="text-gray-600">Try adjusting your filters or search term</p>
              <motion.button
                onClick={clearAllFilters}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm"
                whileHover={{ scale: 1.05, backgroundColor: "#047857" }}
                whileTap={{ scale: 0.95 }}
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveSpeciesPage;