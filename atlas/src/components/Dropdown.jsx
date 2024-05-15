import React, {useState} from 'react';

const Dropdown = ({options, onSelect}) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        onSelect(value)
    };

    return (
        <select value={selectedOption} onChange={handleChange}>
            <option value="" disabled> Select a Country</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
    );
};

export default Dropdown;