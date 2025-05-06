const mongoose = require('mongoose');
const Species = require('../models/Species');
require('dotenv').config();

const sampleSpecies = [
  {
    name: 'Amur Leopard',
    title: 'With fewer than 100 left in the wild, the Amur leopard could be the rarest cat on Earth',
    subtitle: 'PROBABLY THE WORLD'S RAREST CAT?',
    description: 'The Amur leopard is one of the world's most endangered big cats. It is estimated that only about 100 individuals remain in the wild, mostly in the Russian Far East and Northeast China. These rare cats are particularly vulnerable to extinction due to their small population size and limited range.',
    conservationStatus: 'Critically Endangered',
    population: 'Less than 100 individuals in the wild',
    habitat: 'Temperate broadleaf and mixed forests',
    threats: 'Habitat loss, poaching, human conflict, small population size',
    mainImage: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&h=600&auto=format&fit=crop&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&h=600&auto=format&fit=crop&q=80',
        caption: 'Amur leopard in snowy habitat'
      },
      {
        url: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&h=600&auto=format&fit=crop&q=80',
        caption: 'Close-up of Amur leopard'
      }
    ],
    location: 'The Russian Far East and Northeast China, primarily in the Land of the Leopard National Park and surrounding areas.',
    importance: 'As a top predator, the Amur leopard plays a crucial role in maintaining the health of its ecosystem. Their presence helps control prey populations and maintain biodiversity. Their conservation also helps protect the unique temperate forest habitats they inhabit.'
  },
  {
    name: 'Snow Leopard',
    title: 'Ghost of the Mountains',
    subtitle: 'MASTER OF HIGH-ALTITUDE SURVIVAL',
    description: 'Snow leopards are perfectly adapted to the cold, barren landscape of their high-altitude home. Their thick fur and long tail help them survive in the harsh alpine environment.',
    conservationStatus: 'Vulnerable',
    population: '4,000-6,500 individuals in the wild',
    habitat: 'High mountain ranges of Central and South Asia',
    threats: 'Climate change, habitat degradation, poaching',
    mainImage: 'https://images.unsplash.com/photo-1607274134639-043342705e6f?w=800&auto=format&fit=crop&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1607274134639-043342705e6f?w=800&auto=format&fit=crop&q=80',
        caption: 'Snow leopard in mountain habitat'
      },
      {
        url: 'https://images.unsplash.com/photo-1607274134639-043342705e6f?w=800&auto=format&fit=crop&q=80',
        caption: 'Snow leopard hunting'
      }
    ],
    location: 'Found in 12 countries across Central and South Asia, including the mountain ranges of the Himalayas.',
    importance: 'Snow leopards are an indicator species for the health of high-mountain ecosystems. Their presence signifies an intact ecosystem that also supports local communities and their livelihoods.'
  }
];

async function initDb() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecolink', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing species
    await Species.deleteMany({});
    console.log('Cleared existing species data');

    // Insert sample species
    await Species.insertMany(sampleSpecies);
    console.log('Sample species data inserted successfully');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDb(); 