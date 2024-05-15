import { useState, useEffect } from 'react';

function Map({ countryCode }) {
    const [map, setMap] = useState(null);

    const getMapFromCode = (countryCode) => {
        fetch(`http://localhost:3001/api/map/${countryCode}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error retrieving map");
                }
                return response.json();
            })
            .then(data => {
                setMap(data);
            })
            .catch(error => {
                console.error("Could not fetch map data");
            });
    };

    // Call getMapFromCode when countryCode changes
    useEffect(() => {
        if (countryCode) {
            getMapFromCode(countryCode);
        }
    }, [countryCode]);

    return (
        <>
            {map ? (
                <div>
                    <h2>{map.name}</h2>
                    <img src={`data:image/jpeg;base64,${map.imageData}`} alt={map.name} />
                </div>
            ) : (
                <p>Loading map...</p>
            )}
        </>
    );
}

export default Map;
