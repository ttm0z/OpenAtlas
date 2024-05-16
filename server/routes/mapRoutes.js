const express = require('express');
const router = express.Router();
const fs = require('fs');

const mapService = require('../services/mapService');

// get map by country code
router.get('/map/:countryCode', async (req, res) => {
    const { countryCode } = req.params;
    try {
        const map = await mapService.getMapByCountryCode(countryCode.toUpperCase());
        
        const imageBuffer = fs.readFileSync(map.svgPath);
        const imageBase64 = imageBuffer.toString('base64');
        const responseData = {
            imageData: imageBase64,
            name: map.title
        }
        res.json(responseData);
    }
    catch (error) {
        console.error('Error fetching map: ', error);
        res.status(500).json({error: 'Error fetching data'});
    }
});

router.get('/map/city/:countryName', async (req, res) => {
    const { countryName } = req.params;
    console.log(countryName)
    try {
        const city = mapService.getCapitalCity(countryName)        
        const responseData = {
            cityName: city
        }
        res.json(responseData);
    }
    catch (error) {
        console.error('Error fetching map: ', error);
        res.status(500).json({error: 'Error fetching data'});
    }
});



module.exports = router;