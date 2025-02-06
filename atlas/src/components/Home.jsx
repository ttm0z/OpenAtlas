import { useState, useEffect } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';

function Home(){
  const [imageUrls, setImageUrls] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  const fetchCarouselImages = () => {
    fetch('http://localhost:3001/api/getCarousel')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error retrieving carousel");
            }
            return response.json();
        })
        .then(data => {
          setImageUrls(data.urls.map(url => url.toLowerCase()));
          setImageNames(data.names);
          setImageData(data.summaries);
        })
        .catch(error => {
            console.error("Could not fetch map data");
        });
  };

  const isDataLoaded = imageUrls.length > 0 && imageNames.length > 0 && imageData.length > 0;

  return (
  <>
    <div className="home-header">
      <h2>OpenAtlas</h2>
      <p>An online repository for geographic and demographic data</p>
    </div>
    
    <div className="home-container" style={{ backgroundColor: 'lightyellow' }}>
      <Row>
        <Col md={3}>
          {/* Add any additional content or components you want in this column */}
        </Col>
        <Col md={9}>
          {isDataLoaded ? (
            <Carousel className="text-center">
              {imageUrls.map((url, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={`http://localhost:3001/maps/${url}.svg`}
                    alt={`Slide ${index + 1}`}
                    style={{ height: '300px', width: '500px' }} // Adjust height as needed
                  />
                  <Carousel.Caption style={{ color: 'black' }}>
                    <h3>{imageNames[index]}</h3>
                    <p>{imageData[index]}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>Loading carousel data...</p> // Show a loading indicator
          )}
        </Col>
      </Row>
    </div>
    </>
  );
}

export default Home;
