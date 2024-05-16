import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Map from './Map'

function MapDisplay(){

  const styles = {
    container: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    imageContainer: {
        marginRight: '20px',
    },
    image: {
        width: '300px',
        height: '300px',
        objectFit: 'cover',
    },
    infoBox: {
        width: '300px',
        height: 'auto',
        border: '1px solid #ccc',
        padding: '10px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    infoContent: {
        marginTop: '10px',
        padding: '10px',
    },
};

  const [countryCode, setCountryCode] = useState('')
  const [map, setMap] = useState(null);
  const [capitalCity, setCapitalCity] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipOption, setTooltipOption] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [mapData, setMapData] = useState(null);
  

  const countryList = [
    { value: 'af', label: 'Afghanistan' },
    { value: 'al', label: 'Albania' },
    { value: 'dz', label: 'Algeria' },
    { value: 'as', label: 'American Samoa' },
    { value: 'ad', label: 'Andorra' },
    { value: 'ao', label: 'Angola' },
    { value: 'ai', label: 'Anguilla' },
    { value: 'aq', label: 'Antarctica' },
    { value: 'ag', label: 'Antigua and Barbuda' },
    { value: 'ar', label: 'Argentina' },
    { value: 'am', label: 'Armenia' },
    { value: 'aw', label: 'Aruba' },
    { value: 'au', label: 'Australia' },
    { value: 'at', label: 'Austria' },
    { value: 'az', label: 'Azerbaijan' },
    { value: 'bs', label: 'Bahamas' },
    { value: 'bh', label: 'Bahrain' },
    { value: 'bd', label: 'Bangladesh' },
    { value: 'bb', label: 'Barbados' },
    { value: 'by', label: 'Belarus' },
    { value: 'be', label: 'Belgium' },
    { value: 'bz', label: 'Belize' },
    { value: 'bj', label: 'Benin' },
    { value: 'bm', label: 'Bermuda' },
    { value: 'bt', label: 'Bhutan' },
    { value: 'bo', label: 'Bolivia' },
    { value: 'ba', label: 'Bosnia and Herzegovina' },
    { value: 'bw', label: 'Botswana' },
    { value: 'br', label: 'Brazil' },
    { value: 'bn', label: 'Brunei Darussalam' },
    { value: 'bg', label: 'Bulgaria' },
    { value: 'bf', label: 'Burkina Faso' },
    { value: 'bi', label: 'Burundi' },
    { value: 'cv', label: 'Cabo Verde' },
    { value: 'kh', label: 'Cambodia' },
    { value: 'cm', label: 'Cameroon' },
    { value: 'ca', label: 'Canada' },
    { value: 'ky', label: 'Cayman Islands' },
    { value: 'cf', label: 'Central African Republic' },
    { value: 'td', label: 'Chad' },
    { value: 'cl', label: 'Chile' },
    { value: 'cn', label: 'China' },
    { value: 'co', label: 'Colombia' },
    { value: 'km', label: 'Comoros' },
    { value: 'cg', label: 'Congo' },
    { value: 'cd', label: 'Congo, Democratic Republic' },
    { value: 'cr', label: 'Costa Rica' },
    { value: 'ci', label: 'Côte d\'Ivoire' },
    { value: 'hr', label: 'Croatia' },
    { value: 'cu', label: 'Cuba' },
    { value: 'cy', label: 'Cyprus' },
    { value: 'cz', label: 'Czechia' },
    { value: 'dk', label: 'Denmark' },
    { value: 'dj', label: 'Djibouti' },
    { value: 'dm', label: 'Dominica' },
    { value: 'do', label: 'Dominican Republic' },
    { value: 'ec', label: 'Ecuador' },
    { value: 'eg', label: 'Egypt' },
    { value: 'sv', label: 'El Salvador' },
    { value: 'gq', label: 'Equatorial Guinea' },
    { value: 'er', label: 'Eritrea' },
    { value: 'ee', label: 'Estonia' },
    { value: 'sz', label: 'Eswatini' },
    { value: 'et', label: 'Ethiopia' },
    { value: 'fj', label: 'Fiji' },
    { value: 'fi', label: 'Finland' },
    { value: 'fr', label: 'France' },
    { value: 'ga', label: 'Gabon' },
    { value: 'gm', label: 'Gambia' },
    { value: 'ge', label: 'Georgia' },
    { value: 'de', label: 'Germany' },
    { value: 'gh', label: 'Ghana' },
    { value: 'gr', label: 'Greece'},
    { value: 'gd', label: 'Grenada' },
    { value: 'gt', label: 'Guatemala' },
    { value: 'gn', label: 'Guinea' },
    { value: 'gw', label: 'Guinea-Bissau' },
    { value: 'gy', label: 'Guyana' },
    { value: 'ht', label: 'Haiti' },
    { value: 'hn', label: 'Honduras' },
    { value: 'hu', label: 'Hungary' },
    { value: 'is', label: 'Iceland' },
    { value: 'in', label: 'India' },
    { value: 'id', label: 'Indonesia' },
    { value: 'ir', label: 'Iran' },
    { value: 'iq', label: 'Iraq' },
    { value: 'ie', label: 'Ireland' },
    { value: 'il', label: 'Israel' },
    { value: 'it', label: 'Italy' },
    { value: 'jm', label: 'Jamaica' },
    { value: 'jp', label: 'Japan' },
    { value: 'jo', label: 'Jordan' },
    { value: 'kz', label: 'Kazakhstan' },
    { value: 'ke', label: 'Kenya' },
    { value: 'ki', label: 'Kiribati' },
    { value: 'kp', label: 'Korea (North)' },
    { value: 'kr', label: 'Korea (South)' },
    { value: 'kw', label: 'Kuwait' },
    { value: 'kg', label: 'Kyrgyzstan' },
    { value: 'la', label: 'Lao' },
    { value: 'lv', label: 'Latvia' },
    { value: 'lb', label: 'Lebanon' },
    { value: 'ls', label: 'Lesotho' },
    { value: 'lr', label: 'Liberia' },
    { value: 'ly', label: 'Libya' },
    { value: 'li', label: 'Liechtenstein' },
    { value: 'lt', label: 'Lithuania' },
    { value: 'lu', label: 'Luxembourg' },
    { value: 'mg', label: 'Madagascar' },
    { value: 'mw', label: 'Malawi' },
    { value: 'my', label: 'Malaysia' },
    { value: 'mv', label: 'Maldives' },
    { value: 'ml', label: 'Mali' },
    { value: 'mt', label: 'Malta' },
    { value: 'mh', label: 'Marshall Islands' },
    { value: 'mr', label: 'Mauritania' },
    { value: 'mu', label: 'Mauritius' },
    { value: 'mx', label: 'Mexico' },
    { value: 'fm', label: 'Micronesia' },
    { value: 'md', label: 'Moldova' },
    { value: 'mc', label: 'Monaco' },
    { value: 'mn', label: 'Mongolia' },
    { value: 'me', label: 'Montenegro' },
    { value: 'ma', label: 'Morocco' },
    { value: 'mz', label: 'Mozambique' },
    { value: 'mm', label: 'Myanmar' },
    { value: 'na', label: 'Namibia' },
    { value: 'nr', label: 'Nauru' },
    { value: 'np', label: 'Nepal' },
    { value: 'nl', label: 'Netherlands' },
    { value: 'nz', label: 'New Zealand' },
    { value: 'ni', label: 'Nicaragua' },
    { value: 'ne', label: 'Niger' },
    { value: 'ng', label: 'Nigeria' },
    { value: 'no', label: 'Norway' },
    { value: 'om', label: 'Oman' },
    { value: 'pk', label: 'Pakistan' },
    { value: 'pw', label: 'Palau' },
    { value: 'pa', label: 'Panama' },
    { value: 'pg', label: 'Papua New Guinea' },
    { value: 'py', label: 'Paraguay' },
    { value: 'pe', label: 'Peru' },
    { value: 'ph', label: 'Philippines' },
    { value: 'pl', label: 'Poland' },
    { value: 'pt', label: 'Portugal' },
    { value: 'qa', label: 'Qatar' },
    { value: 'ro', label: 'Romania' },
    { value: 'ru', label: 'Russia' },
    { value: 'rw', label: 'Rwanda' },
    { value: 'ws', label: 'Samoa' },
    { value: 'sm', label: 'San Marino' },
    { value: 'st', label: 'Sao Tome and Principe' },
    { value: 'sa', label: 'Saudi Arabia' },
    { value: 'sn', label: 'Senegal' },
    { value: 'rs', label: 'Serbia' },
    { value: 'sc', label: 'Seychelles' },
    { value: 'sl', label: 'Sierra Leone' },
    { value: 'sg', label: 'Singapore' },
    { value: 'sk', label: 'Slovakia' },
    { value: 'si', label: 'Slovenia' },
    { value: 'sb', label: 'Solomon Islands' },
    { value: 'so', label: 'Somalia' },
    { value: 'za', label: 'South Africa' },
    { value: 'es', label: 'Spain' },
    { value: 'lk', label: 'Sri Lanka' },
    { value: 'sd', label: 'Sudan' },
    { value: 'sr', label: 'Suriname' },
    { value: 'se', label: 'Sweden' },
    { value: 'ch', label: 'Switzerland' },
    { value: 'sy', label: 'Syria' },
    { value: 'tw', label: 'Taiwan' },
    { value: 'tj', label: 'Tajikistan' },
    { value: 'tz', label: 'Tanzania' },
    { value: 'th', label: 'Thailand' },
    { value: 'tl', label: 'Timor-Leste' },
    { value: 'tg', label: 'Togo' },
    { value: 'to', label: 'Tonga' },
    { value: 'tt', label: 'Trinidad and Tobago' },
    { value: 'tn', label: 'Tunisia' },
    { value: 'tr', label: 'Turkey' },
    { value: 'tm', label: 'Turkmenistan' },
    { value: 'tv', label: 'Tuvalu' },
    { value: 'ug', label: 'Uganda' },
    { value: 'ua', label: 'Ukraine' },
    { value: 'ae', label: 'United Arab Emirates' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'us', label: 'United States' },
    { value: 'uy', label: 'Uruguay' },
    { value: 'uz', label: 'Uzbekistan' },
    { value: 'vu', label: 'Vanuatu' },
    { value: 'va', label: 'Vatican City' },
    { value: 've', label: 'Venezuela' },
    { value: 'vn', label: 'Vietnam' },
    { value: 'ye', label: 'Yemen' },
    { value: 'zm', label: 'Zambia' },
    { value: 'zw', label: 'Zimbabwe'}
  ]
  
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

  const getCapitalCity = (countryName) => {
    fetch(`http://localhost:3001/api/map/city/${countryName}`)
      .then(response => {
        if(!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then(data => {
        setCapitalCity(data.cityName);
      })
      .catch(error => {
        console.error("error");
      });
  };

  // send the selected country to the backend to generate the map
  const handleSelect = async(value) => {
    console.log('Selected value: ', value)
    setCountryCode(value);
  }

  const handleTooltipToggle = () => {
    setShowTooltip(!showTooltip);
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (selectedOptions.includes(value)) {
        setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
        setSelectedOptions([...selectedOptions, value]);
    }
};
  useEffect(() => {
    if (countryCode) {
        getMapFromCode(countryCode);
    }
}, [countryCode]);

useEffect(() => {
  if (map) {
      getCapitalCity(map.name);
  }
}, [map]);


  
  return (
  <>
    <h3 className="ViewerHeader">Country Viewer</h3>
    
    <div style={styles.container}>
      
      <div style={styles.imageContainer}>
        
        {map && (
          <>
            <h2>{map.name}</h2>
              <img
                src={`http://localhost:3001/maps/${countryCode}.svg`}
                alt={map.name}
                style={styles.image}
              />
          </>
        )
        }
      </div>

      <div style={styles.infoBox}>
        
        <div className="CountryDropdown">
          <Dropdown options={countryList} onSelect={handleSelect} />
        </div>
        
        <div className="infoContent">
          <button onClick={handleTooltipToggle}>Map Options</button>
            {showTooltip && (
                <div style={{ position: 'absolute', zIndex: 1, background: '#000', padding: '10px' }}>
                  <label>
                    <input
                      type="checkbox"
                      value="capital"
                      checked={selectedOptions.includes('capital')}
                      onChange={handleOptionChange}
                    />
                    Capital City
                            
                  </label>
                  <br />

                          
                  <label>
                    <input
                      type="checkbox"
                      value="population"
                      checked={selectedOptions.includes('population')}
                      onChange={handleOptionChange}
                    />
                    Population
                          
                  </label>
                  <br />

                  
                  <label>
                    <input
                      type="checkbox"
                      value="avgTemp"
                      checked={selectedOptions.includes('avgTemp')}
                      onChange={handleOptionChange}
                    />
                    Yearly Average Temperature
                          
                  </label>
                  <br />

                  <label>
                    <input
                      type="checkbox"
                      value="Area"
                      checked={selectedOptions.includes('Area')}
                      onChange={handleOptionChange}
                    />
                    Area (km^2)
                          
                  </label>
                  <br />
                  
                  <label>
                    <input
                      type="checkbox"
                      value="populationDensity"
                      checked={selectedOptions.includes('populationDensity')}
                      onChange={handleOptionChange}
                    />
                    Population Density
                          
                  </label>
                  <br />

                </div>
              )}
              
            {selectedOptions.includes('capital') && (
              <>
                <p>Capital City: {capitalCity}</p>
                  
                {/* Additional info if needed */}

              </>
                        
            )}
                        
            {selectedOptions.includes('population') && (
              <>
                  <p>Population: {map?.population}</p>
                  {/* Additional info if needed */}
              </>
            )}
            
            {selectedOptions.includes('avgTemp') && (
              <>
                  <p>Average Yearly Temperature: {map?.population}</p>
                  {/* Additional info if needed */}
              </>
            )}
            
            {selectedOptions.includes('Area') && (
              <>
                  <p>Area (km^2): {map?.population}</p>
                  {/* Additional info if needed */}
              </>
            )}
            
            {selectedOptions.includes('populationDensity') && (
              <>
                  <p>Population Density: {map?.population}</p>
                  {/* Additional info if needed */}
              </>
            )}


            </div>
        </div>
    </div>
</>

      )
}
export default MapDisplay;