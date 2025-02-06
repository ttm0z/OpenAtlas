import { useState, useEffect } from "react";
import axios from 'axios';



const getCountryList = () => {
    const [countryList, setCountryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        const fetchNames = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/countryList`);
                
                setCountryList(response);
            }
            catch (error) {
                setError(error);
            }
            finally {setLoading(false)};
        }
        fetchNames();
    }, []);
    return {countryList, loading, error};
};

export default getCountryList;