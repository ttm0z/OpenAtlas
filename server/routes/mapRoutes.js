const express = require('express');
const router = express.Router();
const fs = require('fs');

const mapService = require('../services/mapService');
const { count } = require('console');

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

// get map by country name
router.get('/map/getByCountry/:country', async (req, res) => {
    const { name } = req.params;
    const countryName = req.params.country;
    console.log("params: ", req.params);
    console.log("country: ", countryName);
    try {
        const map = await mapService.getSVGByCountryName(countryName);
        console.log("map: ", map);
        
        const imageBuffer = fs.readFileSync(map);
        const imageBase64 = imageBuffer.toString('base64');
        const responseData = {
            imageData: imageBase64,
        }
        res.json(responseData);
    }
    catch (error) {
        console.error('Error fetching map: ', error);
        res.status(500).json({error: 'Error fetching data'});
    }
});

router.get('/getCarousel', async (req, res) => {
    console.log("requested carousel data");
    try{
        const carouselResponseData = mapService.constructCarouselData();
        console.log(carouselResponseData);
        res.json(carouselResponseData);
    }
    catch(error) {
        console.error("Error fetching carousel data: ", error);
        res.status(500).json({error: "Error fetching carousel data: "});
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

router.get('/map/getData/:countryName', async (req, res) => {
    console.log("Map data request recieved")
    console.log("request: ", req.params)

    const { countryName } = req.params;
    console.log("countryName: ", countryName)
    

    try{
        const responseData = mapService.constructCountryData(countryName);
        res.json(responseData)
    }
    catch(error) {
        console.error('Error fetching map: ', error);
        res.status(500).json({error: 'Error fetching data'});
    }
})



module.exports = router;