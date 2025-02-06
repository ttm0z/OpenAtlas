const express = require('express');
const router = express.Router();
const countryService = require('../services/countryService');


router.get('/countryList', async (req, res) => {
    try{
        const countries = await countryService.getAllCountries();        
        res.json(countries);
    }
    catch(error) {
        console.error(": ", error);
        res.status(500).json({error: "Error"});
    }
});

module.exports = router;