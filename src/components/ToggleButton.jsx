import React from 'react';

const ToggleButton = ({ unit, toggleUnit }) => {
  return (
    <button onClick={toggleUnit} className="bg-green-500 text-white p-2 rounded-lg mt-4">
      Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
    </button>
  );
};

export default ToggleButton;
