import React, { useState } from 'react';

const cities = [
  'New York', 'London', 'Tokyo', 'Paris', 'Mumbai', 'Los Angeles',
  'Berlin', 'Sydney', 'Toronto', 'Delhi'
];

const SearchBox = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setShowDropdown(false);
    onSearch(selectedCity);
  };

  const handleSearch = () => {
    if (city) onSearch(city);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="border border-gray-300 p-3 rounded-md w-full dark:bg-gray-800 dark:text-white"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
      />
      <button
        className="bg-blue-500 text-white p-2 mt-2 rounded-lg w-full"
        onClick={handleSearch}
      >
        Search
      </button>
      {showDropdown && filteredCities.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg mt-1 max-h-40 overflow-y-auto z-10 transition-all duration-300 ease-out transform">
          {filteredCities.map((city, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer text-black dark:text-white"
              onClick={() => handleCitySelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
