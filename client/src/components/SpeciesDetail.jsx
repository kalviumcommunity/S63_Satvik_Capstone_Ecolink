import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './common/Button';
import './SpeciesDetail.css';

const speciesData = [
  {
    _id: "1",
    name: "Amur Leopard",
    title: "With fewer than 100 left in the wild, the Amur leopard could be the rarest cat on Earth",
    subtitle: "PROBABLY THE WORLD'S RAREST CAT?",
    description: "The Amur leopard is one the world's most endangered big cats, found primarily in the temperate forests of the Russian Far East. With a population of fewer than 100 individuals in the wild, they face threats from habitat loss, poaching, and prey depletion. Conservation efforts are underway to protect this majestic species.",
    conservationStatus: "Critically Endangered",
    population: "Less than 100",
    habitat: "Temperate forests",
    threats: "Habitat loss, poaching",
    mainImage: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&h=600&auto=format&fit=crop&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&h=600&auto=format&fit=crop&q=80",
        caption: "Amur leopard in snowy habitat"
      }
    ],
    location: "The Russian Far East and Northeast China, primarily in the Land of the Leopard National Park and surrounding areas.",
    importance: "As a top predator, the Amur leopard plays a crucial role in maintaining the health of its ecosystem. Their presence helps control prey populations and maintain biodiversity."
  },
  {
    _id: "2",
    name: "Eagle",
    title: "Majestic birds of prey facing multiple threats",
    subtitle: "APEX PREDATOR OF THE SKIES",
    description: "Eagles are powerful birds of prey with exceptional eyesight and hunting abilities. They are apex predators in their ecosystems, capable of spotting potential prey from great distances. Despite their impressive capabilities, many eagle species face threats from human activities and habitat loss.",
    conservationStatus: "Endangered",
    population: "Around 2,000",
    habitat: "Mountains and forests",
    threats: "Habitat destruction, poisoning, hunting",
    mainImage: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800&h=600&auto=format&fit=crop&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800&h=600&auto=format&fit=crop&q=80",
        caption: "Eagle in flight"
      }
    ],
    location: "Found across various mountain ranges and forests worldwide",
    importance: "Eagles are vital indicators of ecosystem health and play a crucial role in controlling prey populations."
  },
  {
    _id: "3",
    name: "Bengal Tiger",
    title: "India's iconic big cat faces critical challenges",
    subtitle: "GUARDIAN OF THE JUNGLE",
    description: "The Bengal tiger is primarily found in India with smaller populations in Bangladesh, Nepal, Bhutan, China and Myanmar. It is threatened by poaching and habitat loss due to agricultural expansion and development projects.",
    conservationStatus: "Endangered",
    population: "Fewer than 2,500",
    habitat: "Tropical and subtropical forests",
    threats: "Poaching, habitat loss",
    mainImage: "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=800&auto=format&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=800&auto=format&fit=crop",
        caption: "Bengal tiger in its natural habitat"
      }
    ],
    location: "Indian subcontinent, primarily in India's national parks and wildlife sanctuaries",
    importance: "Bengal tigers are keystone predators that help maintain the balance of their ecosystems."
  },
  {
    _id: "4",
    name: "Blue Whale",
    title: "Earth's largest animal needs our protection",
    subtitle: "GIANT OF THE OCEANS",
    description: "The blue whale is the largest animal known to have ever existed. Despite international protection since 1966, they remain endangered, recovering slowly from intensive whaling operations in the 20th century.",
    conservationStatus: "Endangered",
    population: "10,000-25,000",
    habitat: "Oceans worldwide",
    threats: "Ship strikes, entanglement",
    mainImage: "https://images.unsplash.com/photo-1568430328012-21ed450453ea?w=800&auto=format&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1568430328012-21ed450453ea?w=800&auto=format&fit=crop",
        caption: "Blue whale surfacing"
      }
    ],
    location: "Found in all of the world's oceans, migrating between feeding and breeding grounds",
    importance: "Blue whales play a vital role in maintaining marine ecosystem health and carbon cycling."
  },
  {
    _id: "5",
    name: "Arctic Polar Bear",
    title: "Climate change threatens the Arctic's iconic predator",
    subtitle: "SENTINEL OF THE ARCTIC",
    description: "Polar bears are uniquely adapted to life on sea ice, which they rely on for hunting seals. As climate change causes sea ice to melt earlier in spring and form later in fall, polar bears are increasingly threatened by reduced access to their primary food source.",
    conservationStatus: "Vulnerable",
    population: "22,000-31,000",
    habitat: "Sea ice and coastal areas",
    threats: "Climate change, pollution",
    mainImage: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&auto=format&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&auto=format&fit=crop",
        caption: "Polar bear on Arctic ice"
      }
    ],
    location: "Arctic Circle, spanning across multiple countries including Canada, Greenland, Norway, and Russia",
    importance: "Polar bears are a key indicator species for the health of the Arctic ecosystem."
  },
  {
    _id: "6",
    name: "Rafflesia Flower",
    title: "The World's Largest Single Flower - A Rare Parasitic Wonder",
    subtitle: "NATURE'S REMARKABLE GIANT BLOOM",
    description: "The Rafflesia is the largest individual flower in the world, with blooms that can reach up to 3 feet in diameter. This parasitic plant has no stems, leaves, or roots, and only becomes visible when it's ready to reproduce. It's nicknamed the 'corpse flower' due to its distinctive rotting meat smell used to attract pollinators. Each flower takes many months to develop and blooms for just a few days.",
    conservationStatus: "Critically Endangered",
    population: "Less than 100 blooming annually",
    habitat: "Tropical rainforests",
    threats: "Deforestation, climate change, tourism",
    mainImage: "/images/species/ghost-orchid.jpg",
    images: [
      {
        url: "/images/species/ghost-orchid.jpg",
        caption: "Rafflesia in full bloom"
      }
    ],
    location: "Southeast Asian rainforests, particularly in Indonesia, Malaysia, and the Philippines",
    importance: "The Rafflesia is not only a unique botanical wonder but also plays a crucial role in its ecosystem. Its presence indicates a healthy rainforest environment, and it attracts specific pollinators that are vital for forest biodiversity."
  },
  {
    _id: "7",
    name: "Ghost Orchid",
    title: "North America's Most Enigmatic and Ethereal Orchid",
    subtitle: "THE FLOATING PHANTOM OF THE SWAMPS",
    description: "The Ghost Orchid (Dendrophylax lindenii) is one of the rarest and most mysterious flowers in North America. This ethereal plant appears to float in mid-air due to its nearly invisible roots. It blooms for only a few weeks each year and can only be pollinated by a single species of moth, the Giant Sphinx Moth. Found primarily in Florida's swamps, it faces multiple threats to its survival, including poaching for collectors and loss of habitat.",
    conservationStatus: "Critically Endangered",
    population: "Less than 2,000",
    habitat: "Swamp forests",
    threats: "Illegal collection, habitat destruction, climate change",
    mainImage: "/images/species/rafflesia.jpg",
    images: [
      {
        url: "/images/species/rafflesia.jpg",
        caption: "Ghost Orchid in its natural habitat"
      }
    ],
    location: "Found primarily in Florida's swamps, particularly in the Fakahatchee Strand Preserve State Park and Big Cypress National Preserve",
    importance: "The Ghost Orchid is a flagship species for wetland conservation. Its extreme sensitivity to environmental changes makes it an important indicator of ecosystem health. The species also highlights the intricate relationships between plants and their pollinators."
  }
];

const SpeciesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const species = speciesData.find(s => s._id === id);

  const handleImageError = () => {
    setImageError(true);
  };

  if (!species) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Species Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the species you're looking for.</p>
          <Button variant="primary" onClick={() => navigate('/species')}>
            Return to Species List
          </Button>
        </div>
      </div>
    );
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const conservationTips = [
    {
      title: "Spread Awareness",
      description: "Share information about endangered species on social media and with your community.",
      icon: "🌍"
    },
    {
      title: "Support Conservation",
      description: "Donate to wildlife conservation organizations working to protect these species.",
      icon: "💝"
    },
    {
      title: "Reduce Impact",
      description: "Make environmentally conscious choices in your daily life to help protect wildlife habitats.",
      icon: "🌱"
    }
  ];

  const funFacts = [
    {
      fact: "Unique Spots",
      description: "Each Amur leopard has a unique spot pattern, like human fingerprints, which helps researchers identify individuals in the wild."
    },
    {
      fact: "Amazing Jumpers",
      description: "They can leap more than 19 feet horizontally and up to 10 feet vertically, making them incredible hunters in their forest habitat."
    },
    {
      fact: "Solitary Hunters",
      description: "They are mainly nocturnal and hunt alone, using stealth and ambush tactics to catch prey like deer, wild boar, and hares."
    },
    {
      fact: "Temperature Adaptations",
      description: "Their thick coat can grow up to 7cm in winter, allowing them to survive in temperatures as low as -22°F (-30°C)."
    },
    {
      fact: "Territory Range",
      description: "A single Amur leopard can have a territory ranging from 19 to 119 square miles, marking it with scent and scratches."
    },
    {
      fact: "Breeding",
      description: "Females give birth to 2-4 cubs after a 90-95 day gestation period, caring for them alone for about two years."
    }
  ];

  const dietInfo = {
    primaryPrey: ["Sika Deer", "Roe Deer", "Wild Boar"],
    huntingStyle: "Solitary and stealthy hunter, primarily active at dawn and dusk",
    feedingHabits: "Can eat up to 150 pounds of meat from a single kill, returning to large kills for several days",
    preyAdaptations: "Excellent climbers, allowing them to pursue prey in trees and store kills away from other predators"
  };

  const habitatDetails = {
    preferredAreas: ["Temperate broadleaf", "Mixed forests", "Mountainous regions"],
    requirements: ["Dense forest cover", "Access to prey", "Rocky terrain for dens"],
    threats: [
      {
        type: "Habitat Loss",
        description: "Logging, forest fires, and land conversion threaten their habitat"
      },
      {
        type: "Human Conflict",
        description: "Development and agriculture fragment their territory"
      },
      {
        type: "Climate Change",
        description: "Affecting prey availability and habitat conditions"
      }
    ]
  };

  const conservationEfforts = [
    {
      title: "Protected Areas",
      description: "Establishment of Land of the Leopard National Park and other reserves",
      icon: "🌲"
    },
    {
      title: "Anti-Poaching",
      description: "Increased patrol efforts and stricter law enforcement against poaching",
      icon: "👮"
    },
    {
      title: "Research",
      description: "Ongoing studies using camera traps and GPS tracking to monitor populations",
      icon: "📷"
    },
    {
      title: "Breeding Programs",
      description: "International cooperation for captive breeding and genetic diversity",
      icon: "🔬"
    }
  ];

  const getPlantFacts = (name) => {
    if (name === "Rafflesia Flower") {
      return [
        {
          fact: "Record Size",
          description: "Can grow up to 3 feet in diameter and weigh up to 24 pounds"
        },
        {
          fact: "Parasitic Nature",
          description: "Lives entirely inside its host vine, only emerging to flower"
        },
        {
          fact: "Rare Blooming",
          description: "Takes 9-21 months to develop and blooms for only 4-7 days"
        },
        {
          fact: "Unique Scent",
          description: "Produces a scent similar to rotting meat to attract pollinators"
        },
        {
          fact: "No Photosynthesis",
          description: "Lacks chlorophyll and cannot produce its own food"
        },
        {
          fact: "Gender Specific",
          description: "Individual plants are either male or female"
        }
      ];
    } else if (name === "Ghost Orchid") {
      return [
        {
          fact: "Rare Sightings",
          description: "Only visible when in bloom, which occurs for 1-2 weeks per year"
        },
        {
          fact: "Specialized Pollinator",
          description: "Can only be pollinated by the Giant Sphinx Moth"
        },
        {
          fact: "Unique Growth",
          description: "Grows without leaves, appearing to float in mid-air"
        },
        {
          fact: "Night Blooming",
          description: "Flowers open at night and emit a fragrant apple-like scent"
        },
        {
          fact: "Complex Roots",
          description: "Uses photosynthetic roots that attach to tree bark"
        },
        {
          fact: "Long Lifespan",
          description: "Can live up to 20 years if conditions are suitable"
        }
      ];
    }
    return funFacts; // Return animal facts for other species
  };

  const getPlantCharacteristics = (name) => {
    if (name === "Rafflesia Flower") {
      return {
        flowerSize: "Up to 3 feet in diameter",
        bloomPeriod: "4-7 days",
        color: "Deep red with white spots",
        scent: "Resembles rotting meat",
        reproduction: "Parasitic, requires specific vine host",
        habitat: "Tropical rainforest floor"
      };
    } else if (name === "Ghost Orchid") {
      return {
        flowerSize: "3-4 inches wide",
        bloomPeriod: "1-2 weeks annually",
        color: "Pure white",
        scent: "Sweet, apple-like fragrance",
        reproduction: "Requires specific moth pollinator",
        habitat: "On tree bark in swamp forests"
      };
    }
    return null;
  };

  const displayFacts = getPlantFacts(species.name);

  return (
    <div className="species-detail bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="hero-section relative h-[60vh]">
        {imageError ? (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🌿</div>
              <p className="text-xl text-gray-400">{species.name}</p>
            </div>
          </div>
        ) : (
          <img 
            src={species.mainImage} 
            alt={species.name} 
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-5xl font-bold mb-4"
            >
              {species.name.toUpperCase()}: {species.subtitle}
            </motion.h1>
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-red-600 text-white inline-block px-4 py-2 rounded-md mb-4"
            >
              {species.conservationStatus}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-gray-900 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 overflow-x-auto py-4">
            {['about', 'challenges', 'facts', 'help'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-lg whitespace-nowrap px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8">
        {/* About Section */}
        <motion.div
          initial="hidden"
          animate={activeTab === 'about' ? 'visible' : 'hidden'}
          variants={fadeIn}
          className={`space-y-8 ${activeTab !== 'about' ? 'hidden' : ''}`}
        >
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">About {species.name}</h2>
            <p className="text-gray-300 leading-relaxed">
              {showFullDescription ? species.description : `${species.description.slice(0, 200)}...`}
            </p>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-primary-500 hover:text-primary-400 mt-2"
            >
              {showFullDescription ? 'Read Less' : 'Read More'}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Population</h3>
              <p className="text-gray-300">{species.population}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Habitat</h3>
              <p className="text-gray-300">{species.habitat}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-gray-300">{species.location}</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-bold mb-4">Diet & Hunting</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Primary Prey</h4>
                <ul className="list-disc list-inside text-gray-300">
                  {dietInfo.primaryPrey.map((prey, index) => (
                    <li key={index}>{prey}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Hunting Style</h4>
                <p className="text-gray-300">{dietInfo.huntingStyle}</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Feeding Habits</h4>
              <p className="text-gray-300">{dietInfo.feedingHabits}</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-bold mb-4">Habitat Requirements</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {habitatDetails.preferredAreas.map((area, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-300">{area}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Critical Needs</h4>
              <ul className="list-disc list-inside text-gray-300">
                {habitatDetails.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {species.name.includes("Flower") || species.name.includes("Orchid") ? (
            <div className="bg-gray-900 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-bold mb-4">Plant Characteristics</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(getPlantCharacteristics(species.name)).map(([key, value]) => (
                  <div key={key} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                    <p className="text-gray-300">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </motion.div>

        {/* Challenges Section */}
        <motion.div
          initial="hidden"
          animate={activeTab === 'challenges' ? 'visible' : 'hidden'}
          variants={fadeIn}
          className={`space-y-8 ${activeTab !== 'challenges' ? 'hidden' : ''}`}
        >
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Key Challenges</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Current Threats</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {species.threats.split(', ').map((threat, index) => (
                    <li key={index}>{threat}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Conservation Status</h3>
                <p className="text-gray-300">{species.conservationStatus}</p>
                <div className="mt-4">
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-red-600 rounded-full"
                      style={{ width: species.conservationStatus === 'Critically Endangered' ? '90%' : '60%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-bold mb-4">Habitat Requirements</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {habitatDetails.preferredAreas.map((area, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-300">{area}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Critical Needs</h4>
              <ul className="list-disc list-inside text-gray-300">
                {habitatDetails.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Facts Section */}
        <motion.div
          initial="hidden"
          animate={activeTab === 'facts' ? 'visible' : 'hidden'}
          variants={fadeIn}
          className={`space-y-8 ${activeTab !== 'facts' ? 'hidden' : ''}`}
        >
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Interesting Facts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {displayFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold mb-2">{fact.fact}</h3>
                  <p className="text-gray-300">{fact.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {species.name.includes("Flower") || species.name.includes("Orchid") ? (
            <div className="bg-gray-900 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-bold mb-4">Conservation Guidelines</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Habitat Protection</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    <li>Maintain natural forest conditions</li>
                    <li>Protect host species</li>
                    <li>Control invasive species</li>
                    <li>Maintain water quality and quantity</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Research Needs</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    <li>Population monitoring</li>
                    <li>Pollination studies</li>
                    <li>Climate change impacts</li>
                    <li>Propagation techniques</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial="hidden"
          animate={activeTab === 'help' ? 'visible' : 'hidden'}
          variants={fadeIn}
          className={`space-y-8 ${activeTab !== 'help' ? 'hidden' : ''}`}
        >
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">How You Can Help</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {conservationTips.map((tip, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg p-6"
                >
                  <div className="text-4xl mb-4">{tip.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
                  <p className="text-gray-300">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-bold mb-4">Current Conservation Projects</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {conservationEfforts.map((effort, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 p-4 rounded-lg"
                >
                  <div className="text-3xl mb-2">{effort.icon}</div>
                  <h4 className="font-semibold mb-2">{effort.title}</h4>
                  <p className="text-gray-300">{effort.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-4">Take Action Now</h3>
            <button
              onClick={() => navigate('/virtual-pet')}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Add as Virtual Pet
            </button>
          </div>
        </motion.div>

        {/* Add a Timeline section */}
        <div className="bg-gray-900 rounded-lg p-6 mt-6">
          <h3 className="text-xl font-bold mb-4">Conservation Timeline</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
            <div className="space-y-8 relative">
              <div className="ml-8">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-primary-600"></div>
                <h4 className="font-semibold">1996</h4>
                <p className="text-gray-300">Listed as Critically Endangered by IUCN</p>
              </div>
              <div className="ml-8">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-primary-600"></div>
                <h4 className="font-semibold">2012</h4>
                <p className="text-gray-300">Land of the Leopard National Park established</p>
              </div>
              <div className="ml-8">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-primary-600"></div>
                <h4 className="font-semibold">2020</h4>
                <p className="text-gray-300">Population shows signs of recovery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add a Physical Characteristics section */}
        <div className="bg-gray-900 rounded-lg p-6 mt-6">
          <h3 className="text-xl font-bold mb-4">Physical Characteristics</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Size</h4>
              <ul className="text-gray-300 space-y-2">
                <li>• Body Length: 4.3-6.2 feet</li>
                <li>• Tail Length: 2.8-3.5 feet</li>
                <li>• Weight: 70-110 pounds</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Distinctive Features</h4>
              <ul className="text-gray-300 space-y-2">
                <li>• Pale, cream-colored coat</li>
                <li>• Widely spaced rosettes</li>
                <li>• Longer limbs than other leopards</li>
                <li>• Thick winter coat</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesDetail; 