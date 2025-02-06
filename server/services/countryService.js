const { countryData }= require("../countryData");

async function getAllCountries() {
    
    try {
        return countryData;
    }
    catch(error) {
        return [];
    }
}

async function getCountryNames() {
    
    try {
        const countryNames = countryData.map((tag) => tag.name);
        return countryNames;
    }
    catch(error) {
        return [];
    }
}

module.exports = {getAllCountries};