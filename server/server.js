const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 3001;

// Get routes
const userRoutes = require('./routes/userRoutes');

const mapRoutes = require('./routes/mapRoutes');

// use statements
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/api', userRoutes);
app.use('/api', mapRoutes);


const population = require('./node_modules/country-json/src/country-by-population.json');

const density = require('./node_modules/country-json/src/country-by-population-density.json');

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);

});