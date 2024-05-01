const pool = require('../database/sqlConfig');

// Function to fetch all users from the database
async function getAllUsers() {
  try {
    const [rows, fields] = await pool.promise().query('SELECT * FROM users');
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllUsers
};
