import React from 'react';

const Testimonial = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Aarav Patel"
                  className="w-24 h-24 object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            
            <div className="text-center mt-8">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-xl md:text-2xl text-gray-600 mb-8 italic">
                "EcoLink helped me connect with like-minded people. Now I plant trees every weekend!"
              </blockquote>
              <div className="font-semibold text-xl text-gray-900 mb-1">Aarav Patel</div>
              <div className="text-green-600">Volunteer, Mumbai Chapter</div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-b-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial; 