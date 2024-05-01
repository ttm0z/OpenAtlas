const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// get all users
router.get('/users', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).json({error: 'Error fetching data'});
    }
});

module.exports = router;