import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LandingPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-green-700"
          >
            EcoLink
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-x-6"
          >
            <Link to="/login" className="text-gray-600 hover:text-green-700 transition-colors">Login</Link>
            <Link to="/signup" className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">
              Sign Up
            </Link>
          </motion.div>
        </nav>
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerChildren}
          className="flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <motion.div variants={fadeInUp} className="flex-1 space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Connect with Nature, <br />
              <span className="text-green-600">Make a Difference</span>
            </h1>
            <p className="text-xl text-gray-600">
              Join our community of environmental enthusiasts. Share your passion, discover events, and contribute to a sustainable future.
            </p>
            <div className="flex gap-4">
              <Link to="/signup" className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors">
                Get Started
              </Link>
              <Link to="/events" className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full hover:bg-green-50 transition-colors">
                Explore Events
              </Link>
            </div>
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            className="flex-1"
          >
            <img 
              src="/hero-image.jpg" 
              alt="Environmental Conservation" 
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </motion.div>
      </header>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white py-20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EcoLink?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Community Events",
                description: "Join local environmental events and connect with like-minded individuals.",
                icon: "🌱"
              },
              {
                title: "Species Tracking",
                description: "Contribute to biodiversity research by documenting local species.",
                icon: "🦋"
              },
              {
                title: "Impact Measurement",
                description: "Track your environmental impact and see your contributions grow.",
                icon: "📊"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-green-50 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of environmental enthusiasts who are already making an impact.
          </p>
          <Link to="/signup" className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors inline-block">
            Start Your Journey
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EcoLink</h3>
              <p className="text-gray-400">Connecting people with nature for a sustainable future.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/events" className="hover:text-white">Events</Link></li>
                <li><Link to="/species" className="hover:text-white">Species</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/guides" className="hover:text-white">Guides</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@ecolink.com</li>
                <li>Phone: (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EcoLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 