import React from 'react';

const CityWeather = ({ city, temperature, weatherCondition, icon }) => {
  const capitalizedCondition = weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1);

  return (
    <div className="mt-5 flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4">{city}</h2>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Weather Icon"
        className="w-20 h-20"
      />
      <p className="text-xl font-semibold mt-2">{`${temperature}°`}</p>
      <p className="text-lg text-gray-600 dark:text-gray-300">{capitalizedCondition}</p>
    </div>
  );
};

export default CityWeather;
