import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MapComponent from './InteractiveMap';

function CountryDetail() {
  const { countryName } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${countryName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }
        const data = await response.json();
        setCountryData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [countryName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <div>
      <h1>{countryData.title}</h1>
      <img src={countryData.thumbnail?.source} alt={countryData.title} />
      <p>{countryData.extract}</p>
      <a href={countryData.content_urls.desktop.page} target="_blank" rel="noopener noreferrer">Read more on Wikipedia</a>
    </div>
    <div>
    <MapComponent country = {countryName}/>
    </div>
    </>
  );
}

export default CountryDetail;
