// backend/server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import the hardcoded DB connection

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const DEMO_EMAIL = 'hire-me@anshumat.org';

// 1. GET: Fetch latest from DB
app.get('/budget/latest', async (req, res) => {
  try {
    console.log('Attempting to fetch from DB...');
    const result = await pool.query(
      'SELECT income, expenses, last_updated FROM budgets WHERE user_email = $1', 
      [DEMO_EMAIL]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const row = result.rows[0];
    res.json({
      income: Number(row.income),
      expenses: row.expenses,
      lastUpdated: Number(row.last_updated)
    });
  } catch (err) {
    console.error('Database Error:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// 2. POST: Sync to DB
app.post('/budget/sync', async (req, res) => {
  const { income, expenses, lastUpdated } = req.body;
  
  try {
    console.log('Attempting to sync to DB...');
    await pool.query(
      `UPDATE budgets 
       SET income = $1, expenses = $2, last_updated = $3 
       WHERE user_email = $4`,
      [income, expenses, lastUpdated, DEMO_EMAIL]
    );
    
    console.log('✅ Database updated successfully for:', DEMO_EMAIL);
    res.json({ status: 'success', timestamp: Date.now() });
  } catch (err) {
    console.error('Sync Error:', err.message);
    res.status(500).json({ error: 'Sync failed' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
