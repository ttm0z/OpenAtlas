const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

// Get routes
const userRoutes = require('./routes/userRoutes');

const mapRoutes = require('./routes/mapRoutes');

// use statements
app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);
app.use('/api', mapRoutes);


// start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});