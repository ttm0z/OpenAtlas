import React, { useState, useEffect } from 'react';
import { ReactSVGPanZoom, TOOL_AUTO, fitSelection } from 'react-svg-pan-zoom';

const InteractiveMap = () => {
  const [svgData, setSvgData] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    // Fetch SVG data from backend
    fetch("http://localhost:3001/maps/ca.svg")
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch SVG data');
        }
        return response.text();
      })
      .then(svg => {
        setSvgData(svg);
        // Fit SVG to viewer on initial load
        const nextValue = fitSelection(600, 400, 0, 0, 600, 400);
        setValue(nextValue);
      })
      .catch(error => {
        console.error('Error fetching SVG data:', error);
      });
  }, []);

  const onChange = () => {
    console.log("changed");
  };

  const handleClick = (event) => {
    // Handle click on map region
    const regionName = event.target.getAttribute('data-region');
    // Show tooltip or perform other actions
    console.log('Clicked region:', regionName);
  };

  return (
    <div>
      {svgData ? (
        <ReactSVGPanZoom
          width={600}
          height={400}
          tool={TOOL_AUTO}
          value={value}
          onChangeValue={setValue}
          SVGBackground="#f0f0f0"
          onChangeTool={onChange}
          onZoom={() => console.log("zoom")}
          onPan={() => console.log("pan")}
          onClick={handleClick}
        >
          <ReactSVGPanZoom.SVG width={600} height={400} style={{ background: '#f0f0f0' }}>
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