const express = require('express');
const router = express.Router();
const mapService = require('../services/mapService');

// get map by country code
router.get('/map/:countryCode', async (req, res) => {
    const { countryCode } = req.params;
    try {
        console.log("Recieved: ", countryCode.toUpperCase())
        console.log(countryCode)
        const map = await mapService.getMapByCountryCode(countryCode.toUpperCase());
        res.json(map)
    }
    catch (error) {
        console.error('Error fetching map: ', error);
        res.status(500).json({error: 'Error fetching data'});
    }
});

module.exports = router;