const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

// Get routes
const userRoutes = require('./routes/userRoutes');


// use statements
app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);





// start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});