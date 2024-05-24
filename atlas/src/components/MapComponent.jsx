import React, { useState, useEffect } from 'react';

const MapComponent = (countryCode) => {
    console.log(countryCode.country);
    const country = countryCode.country
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    // Fetch the SVG file from the backend
    fetch(`http://localhost:3001/api/map/getByCountry/${country}`)
      .then(response => response.text())
      .then(svgText => {
        setSvgContent(svgText);
      })
      .catch(error => {
        console.error('Error fetching SVG:', error);
      });
  }, []);

  return (
    <div>
      {svgContent && (
        <div  />
      )}
    </div>
  );
};

export default MapComponent;
