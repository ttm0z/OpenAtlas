import React, {useState} from "react";
import InteractiveMap from "./InteractiveMap";
import CountrySelect from "./CountrySelect";

const Frontpage = () => {
    const [country,setCountry] = useState('');

    const handleCountrySelect = (country) => {
        setCountry(country);
    }
    console.log(country)
    return (
        <>
        <CountrySelect onSelect={handleCountrySelect}/>
        <InteractiveMap svgPath={country}/>
        </>
    )
}
export default Frontpage;