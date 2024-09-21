import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityWeather from './components/CityWeather';
import SearchBox from './components/SearchBox';
import ForecastCard from './components/ForecastCard';
import ToggleButton from './components/ToggleButton';

const App = () => {
  const [city, setCity] = useState('Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('C');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city, unit]);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=01eb5ea6b4f87efee341ad14169df308&units=${unit === 'C' ? 'metric' : 'imperial'}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=01eb5ea6b4f87efee341ad14169df308&units=${unit === 'C' ? 'metric' : 'imperial'}`
      );
      setWeatherData({ current: response.data, forecast: forecastResponse.data });
      setError('');
    } catch (error) {
      setError('City not found. Please try again.');
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === 'C' ? 'F' : 'C';
    setUnit(newUnit);
    fetchWeatherData(city);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 min-h-screen p-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Weather Forecast</h1>

          <div className="flex justify-center items-center mb-8 space-x-4">
            <button
              onClick={toggleDarkMode}
              className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-2 rounded-lg transition duration-300 mt-4"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <ToggleButton unit={unit} toggleUnit={toggleUnit} />
          </div>

          <SearchBox onSearch={setCity} />

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {weatherData && (
            <>
              <CityWeather
                city={weatherData.current.name}
                temperature={weatherData.current.main.temp}
                weatherCondition={weatherData.current.weather[0].description}
                icon={weatherData.current.weather[0].icon}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
                {weatherData.forecast.list.slice(0, 5).map((day, index) => (
                  <ForecastCard
                    key={index}
                    day={new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}
                    high={day.main.temp_max}
                    low={day.main.temp_min}
                    icon={day.weather[0].icon}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
