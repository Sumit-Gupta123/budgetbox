// backend/server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db'); 

const app = express();

// CRITICAL FIX: Allow Render to set the port
const PORT = process.env.PORT || 4000; 

app.use(cors());
app.use(express.json());

// 1. GET: Fetch latest from DB
app.get('/budget/latest', async (req, res) => {
  try {
    // Use the email you inserted in your DB seed
    const result = await pool.query(
      'SELECT income, expenses, last_updated FROM budgets LIMIT 1' 
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
  const user_email = 'hire-me@anshumat.org'; // Hardcoded for demo

  try {
    await pool.query(
      `UPDATE budgets 
       SET income = $1, expenses = $2, last_updated = $3 
       WHERE user_email = $4`,
      [income, expenses, lastUpdated, user_email]
    );
    
    res.json({ status: 'success', timestamp: Date.now() });
  } catch (err) {
    console.error('Sync Error:', err.message);
    res.status(500).json({ error: 'Sync failed' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
