import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function Map(countryCode){
    
    const [map, setMap] = useState([]);
  
    const getMapFromCode = (countryCode) => {
        console.log(countryCode);
      fetch(`http://localhost:3001/api/map/${countryCode}`)
        .then(response => {
          if(!response.ok){
            throw new Error("Error retreiving users");
          }
          return response.json();
        })
        .then(data => {
          setMap(data);
          console.log("map recieved")
        })
        .catch(error => {
          console.error("Could not fetch data");
        });
    };
  // Call getMapFromCode when countryCode changes
    useEffect(() => {
        if (countryCode) {
            getMapFromCode(countryCode.countryCode);
        }
    }, [countryCode])

    
    return (
        <>
          {map ? (
            <div>
                <h2>{map.title}</h2>
                <img src={map.svgPath} alt = {map.title} />
            </div>
          ) : (
            <p>Loading map...</p>
          )}
        </>
      );
}
export default Map;