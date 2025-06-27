import React, { useState, useRef } from 'react';
import axios from 'axios';

const SearchBar = ({ placeholder = 'Type to search with AI...', onSelect }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const fetchSuggestions = async (value) => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/autocomplete', { prompt: value });
      setSuggestions(res.data.suggestions || []);
    } catch (err) {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setShowDropdown(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => fetchSuggestions(value), 400);
  };

  const handleSelect = (suggestion) => {
    setInput(suggestion);
    setShowDropdown(false);
    if (onSelect) onSelect(suggestion);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder={placeholder}
        value={input}
        onChange={handleChange}
        onFocus={() => setShowDropdown(true)}
        autoComplete="off"
      />
      {showDropdown && (suggestions.length > 0 || loading) && (
        <div className="absolute left-0 right-0 bg-white border rounded-lg shadow-lg mt-1 z-10">
          {loading ? (
            <div className="p-3 text-gray-500 text-center">Loading...</div>
          ) : (
            suggestions.map((s, i) => (
              <div
                key={i}
                className="px-4 py-2 hover:bg-primary-100 cursor-pointer"
                onClick={() => handleSelect(s)}
              >
                {s}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 