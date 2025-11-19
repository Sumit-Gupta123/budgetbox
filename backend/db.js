// backend/db.js
const { Pool } = require('pg');

// If running locally, you might need to temporarily hardcode it for testing, 
// BUT for Render, we MUST use process.env.DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false, // Required for Supabase/Neon
  },
});

module.exports = pool;
