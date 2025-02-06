import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactSVGPanZoom, TOOL_AUTO, fitSelection } from 'react-svg-pan-zoom';

const InteractiveMap = () => {
  const { countryCode } = useParams();
  const [svgData, setSvgData] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    // Fetch SVG data from backend
    fetch(`http://localhost:3001/maps/${countryCode.toLowerCase()}.svg`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch SVG data');
        }
        return response.text();
      })
      .then(svg => {
        setSvgData(svg);
        // Fit SVG to viewer on initial load
        const nextValue = fitSelection(600, 600, 0, 0, 600, 600);
        setValue(nextValue);
      })
      .catch(error => {
        console.error('Error fetching SVG data:', error);
      });
  }, [countryCode]);

  const handleClick = (event) => {
    // Handle click on map region
    const regionName = event.target.getAttribute('data-region');
    console.log('Clicked region:', regionName);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '20px', display: 'inline-block' }}>
      {svgData ? (
        <ReactSVGPanZoom
          width={600}
          height={600}
          tool={TOOL_AUTO}
          value={value}
          onChangeValue={setValue}
          onClick={handleClick}
        >
          <ReactSVGPanZoom.SVG>
            <g dangerouslySetInnerHTML={{ __html: svgData }} />
          </ReactSVGPanZoom.SVG>
        </ReactSVGPanZoom>
      ) : (
        <div>Loading map...</div>
      )}
    </div>
  );
};

export default InteractiveMap;
