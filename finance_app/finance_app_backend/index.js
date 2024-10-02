// server.js or index.js (Backend)

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Import the pg module

// Initialize PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres', // Your PostgreSQL username
  host: 'localhost', // Your PostgreSQL server
  database: 'Finance Automation', // Your PostgreSQL database name
  password: '123', // Your PostgreSQL password
  port: 5432, // Your PostgreSQL port
});

// Initialize Express app
const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse JSON requests

// POST route for Schemes
app.post('/api/schemes', async (req, res) => {
  const {
    SchemeName,
    StartDate,
    EndDate,
    TotalAmount,
    PaymentFrequency,
    IsRefundable,
    RefundAmount,
  } = req.body;

  // Log the incoming data to the console
  console.log("Received scheme data:", req.body);

  try {
    const result = await pool.query(
      `INSERT INTO schemes (SchemeName, StartDate, EndDate, TotalAmount, PaymentFrequency, IsRefundable, RefundAmount)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [SchemeName, StartDate, EndDate, TotalAmount, PaymentFrequency, IsRefundable, RefundAmount]
    );
    
    // Respond back to the client
    res.json({ message: "Scheme data stored successfully", data: result.rows[0] });
  } catch (error) {
    console.error("Error inserting scheme data:", error);
    res.status(500).json({ error: 'Failed to store scheme data' });
  }
});

// POST route for Funds
app.post('/api/funds', async (req, res) => {
  const {
    FundName,
    TotalAmount,
    FundManager,
    StartDate,
    EndDate,
    PaymentFrequency,
    IsRefundable,
    RefundAmount,
  } = req.body;

  // Log the incoming data to the console
  console.log("Received fund data:", req.body);

  try {
    const result = await pool.query(
      `INSERT INTO funds (FundName, TotalAmount, FundManager, StartDate, EndDate, PaymentFrequency, IsRefundable, RefundAmount)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [FundName, TotalAmount, FundManager, StartDate, EndDate, PaymentFrequency, IsRefundable, RefundAmount]
    );

    // Respond back to the client
    res.json({ message: "Fund data stored successfully", data: result.rows[0] });
  } catch (error) {
    console.error("Error inserting fund data:", error);
    res.status(500).json({ error: 'Failed to store fund data' });
  }
});

// Start the server
const PORT = 5000; // Make sure this port doesn't conflict with the frontend
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
