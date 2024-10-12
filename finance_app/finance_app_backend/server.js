// npm run dev
const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express(); // app is the server with all functionality of express

app.use(express.json()); // to handle JSON requests
app.use(cors()); // Enable CORS for all origins

// POST route for adding scheme
app.post("/api/schemes", (req, res) => {
  const { 
    SchemeName, 
    StartDate, 
    EndDate, 
    TotalAmount, 
    PaymentFrequency, 
    IsRefundable, 
    RefundAmount 
  } = req.body;

  const insertQuery = `
    INSERT INTO schemes (
      SchemeName, 
      StartDate, 
      EndDate, 
      TotalAmount, 
      PaymentFrequency,
      IsRefundable, 
      RefundAmount
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
  `;

  const values = [
    SchemeName, 
    StartDate, 
    EndDate, 
    TotalAmount, 
    PaymentFrequency, 
    IsRefundable, 
    RefundAmount
  ];

  // Execute the query using parameterized inputs to avoid SQL injection
  pool.query(insertQuery, values)
    .then((response) => {
      console.log("Data saved:", response.rows[0]);
      res.json({ message: "Scheme added successfully", data: response.rows[0] });
    })
    .catch((err) => {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Error saving scheme", details: err.message  });
    });
});

// POST route for adding scheme
app.post("/api/funds", (req, res) => {
  const { 
    FundName, 
    TotalAmount, 
    StartDate, 
    EndDate,
    PaymentFrequency, 
    IsRefundable, 
    RefundAmount 
  } = req.body;

  const insertQuery = `
  INSERT INTO funds (
    FundName, 
    TotalAmount, 
    StartDate, 
    EndDate,
    PaymentFrequency, 
    IsRefundable, 
    RefundAmount
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
  `;

  const values = [
    FundName, 
    TotalAmount, 
    StartDate, 
    EndDate,
    PaymentFrequency, 
    IsRefundable, 
    RefundAmount
  ];

  // Execute the query using parameterized inputs to avoid SQL injection
  pool.query(insertQuery, values)
    .then((response) => {
      console.log("Data saved:", response.rows[0]);
      res.json({ message: "Funds added successfully", data: response.rows[0] });
    })
    .catch((err) => {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Error saving scheme", details: err.message  });
    });
});

app.get('/api/funds', (req, res) => {
  const selectQuery = 'SELECT * FROM funds'; // Adjust based on your actual table structure

  pool.query(selectQuery)
    .then((result) => {
      res.json(result.rows); // Send the rows (funds data) to the client
    })
    .catch((error) => {
      console.error('Error fetching funds:', error);
      res.status(500).send('Error fetching funds');
    });
});

app.get('/api/schemes', (req, res) => {
  const selectQuery = 'SELECT * FROM schemes'; // Adjust based on your actual table structure

  pool.query(selectQuery)
    .then((result) => {
      res.json(result.rows); // Send the rows (schemes data) to the client
    })
    .catch((error) => {
      console.error('Error fetching schemes:', error);
      res.status(500).send('Error fetching schemes');
    });
});




// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
