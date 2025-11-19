// backend/db.js
const { Pool } = require('pg');
require('dotenv').config(); // We will assume .env works for the repo structure

// USE THIS FOR GITHUB (Don't show your real password)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Back to using env variable
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;