import React from 'react';

const ForecastCard = ({ day, high, low, icon }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-700 rounded-md shadow-lg text-center transition-all duration-300">
      <h3 className="text-lg font-semibold mb-2">{day}</h3>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Weather Icon"
        className="w-16 h-16 mx-auto mb-2"
      />
      <p className="text-sm text-gray-500 dark:text-gray-300">High: {`${high}°`}</p>
      <p className="text-sm text-gray-500 dark:text-gray-300">Low: {`${low}°`}</p>
    </div>
  );
};

export default ForecastCard;
