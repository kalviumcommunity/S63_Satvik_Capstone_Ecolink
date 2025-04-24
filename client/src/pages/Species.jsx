import React, { useState } from 'react';

const SpeciesCard = ({ name, status, population, habitat, threats, description }) => {
  return (
    <div className="bg-green-50 rounded-lg p-6 mb-4">
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{name}</h2>
          <span className={`inline-block px-3 py-1 text-white text-sm rounded-full ${status === 'Critically Endangered' ? 'bg-red-500' : status === 'Endangered' ? 'bg-orange-500' : 'bg-yellow-500'}`}>
            {status}
          </span>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">About Me</h3>
          <p className="text-sm text-gray-600">
            {description}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Facts</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full text-sm">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Population:</span>
              <span className="text-gray-600">{population}</span>
            </div>

            <div className="flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full text-sm">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Habitat:</span>
              <span className="text-gray-600">{habitat}</span>
            </div>

            <div className="flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full text-sm">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Threats:</span>
              <span className="text-gray-600">{threats}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-full hover:bg-green-700">
            Add as Pet
          </button>
          <button className="px-3 py-1 text-green-600 text-sm hover:text-green-700 flex items-center gap-1">
            Learn More
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
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
      description: "The Amur leopard is one the world's most endangered big cats, found primarily in the temperate forests of the Russian Far East. With a population of fewer than 100 individuals in the wild, they face threats from habitat loss, poaching, and prey depletion. Conservation efforts are underway to protect this majestic species."
    },
    {
      name: "Ghost Orchid",
      status: "Critically Endangered",
      population: "Very low",
      habitat: "Cypress swamps",
      threats: "Habitat loss, collection",
      description: "Ghost Orchid is the endemically endangered plant species, found in southern Florida, Cuba, and the Caribbean. Its habitats like cypress swamps are threatened, and climate change poses an additional risk to this rare and beautiful flowering plant."
    },
    {
      name: "Vaquita",
      status: "Critically Endangered",
      population: "Less than 10",
      habitat: "Marine waters",
      threats: "Fishing nets, pollution",
      description: "The vaquita is the world's most rare marine mammal and faces imminent extinction. Found only in Mexico's Gulf of California, this small porpoise is often caught and drowned in gillnets used for illegal fishing operations."
    },
    {
      name: "Javan Rhino",
      status: "Critically Endangered",
      population: "Approximately 60",
      habitat: "Tropical forests",
      threats: "Habitat loss, poaching",
      description: "The Javan rhino is the most threatened of the five rhino species, with only around 60 individuals surviving in Ujung Kulon National Park in Java, Indonesia. They are primarily threatened by poaching for their horns and by habitat loss due to human encroachment."
    },
    {
      name: "California Condor",
      status: "Critically Endangered",
      population: "Around 500",
      habitat: "Mountains, canyons",
      threats: "Lead poisoning, habitat loss",
      description: "The California condor is one of the largest flying birds in the world and was brought back from the brink of extinction through intensive conservation efforts. This iconic bird was reduced to just 22 individuals in the 1980s but has slowly recovered through captive breeding programs."
    },
    {
      name: "Sumatran Orangutan",
      status: "Critically Endangered",
      population: "Less than 14,000",
      habitat: "Tropical rainforests",
      threats: "Deforestation, palm oil plantations",
      description: "The Sumatran orangutan is a critically endangered great ape that lives exclusively in the north of the Indonesian island of Sumatra. They face severe threats from palm oil plantation expansion, illegal logging, and forest fires. Their population has declined by over 80% in the last 75 years."
    },
    {
      name: "Hawksbill Sea Turtle",
      status: "Critically Endangered",
      population: "Unknown, declining",
      habitat: "Coral reefs, oceans",
      threats: "Poaching, bycatch, climate change",
      description: "The hawksbill sea turtle is a critically endangered sea turtle with a distinctive pattern of overlapping scales that form a serrated look on the edge of its shell. They are threatened by the loss of nesting and feeding habitats, excessive egg collection, pollution, and coastal development."
    },
    {
      name: "Giant Panda",
      status: "Vulnerable",
      population: "About 1,800",
      habitat: "Bamboo forests",
      threats: "Habitat fragmentation, livestock grazing",
      description: "The giant panda is perhaps the most beloved conservation icon worldwide. After decades of effective conservation work, these distinctive bears have been downgraded from 'Endangered' to 'Vulnerable' on the IUCN Red List, though they remain threatened by habitat fragmentation and climate change."
    },
    {
      name: "Bengal Tiger",
      status: "Endangered",
      population: "Fewer than 2,500",
      habitat: "Tropical and subtropical forests",
      threats: "Poaching, habitat loss",
      description: "The Bengal tiger is primarily found in India with smaller populations in Bangladesh, Nepal, Bhutan, China and Myanmar. It is threatened by poaching and habitat loss due to agricultural expansion and development projects."
    },
    {
      name: "Galápagos Penguin",
      status: "Endangered",
      population: "Less than 2,000",
      habitat: "Marine coastal areas",
      threats: "Climate change, fishing nets",
      description: "The Galápagos penguin is the only penguin species found north of the equator. Its population is directly impacted by El Niño events that reduce marine productivity and food availability."
    },
    {
      name: "Arctic Polar Bear",
      status: "Vulnerable",
      population: "22,000-31,000",
      habitat: "Sea ice and coastal areas",
      threats: "Climate change, pollution",
      description: "Polar bears are uniquely adapted to life on sea ice, which they rely on for hunting seals. As climate change causes sea ice to melt earlier in spring and form later in fall, polar bears are increasingly threatened by reduced access to their primary food source."
    },
    {
      name: "Blue Whale",
      status: "Endangered",
      population: "10,000-25,000",
      habitat: "Oceans worldwide",
      threats: "Ship strikes, entanglement",
      description: "The blue whale is the largest animal known to have ever existed. Despite international protection since 1966, they remain endangered, recovering slowly from intensive whaling operations in the 20th century."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Endangered Species</h1>
          <p className="text-gray-600">Learn about and help protect these remarkable creatures</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-grow max-w-xl">
              <input
                type="text"
                placeholder="Search species..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              <select className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>All Status</option>
                <option>Critically Endangered</option>
                <option>Endangered</option>
                <option>Vulnerable</option>
              </select>
              <select className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
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

        <div className="space-y-4">
          {speciesData.map((species, index) => (
            <SpeciesCard key={index} {...species} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeciesPage; 