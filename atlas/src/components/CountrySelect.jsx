import React, {useState} from "react";
import getCountryList from "../hooks/getCountryList";
const CountrySelect = ({onSelect}) => {

    const [selectedOption, setSelectedOption] = useState('');
    const {countryList, loading, error} = getCountryList();

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        onSelect(selectedOption);
    };

    if(loading) return (<p>Loading</p>);
    if(error) return (<p>error</p>);
    return (
        <>
        <div className="country-select">
            <label htmlFor="dropdown">Select Region</label>
            <select id="dropdown" value={selectedOption} onChange={handleChange}>
                <option value="">Select an option</option> {/* Default option */}
                {Object.entries(countryList.data).map((option) => (
                    <option key={option[0]} value={option[1].map}>
                         {option[1].name}
                    </option>
                ))}
            </select>
        </div>
        </>
    )
}
export default CountrySelect;