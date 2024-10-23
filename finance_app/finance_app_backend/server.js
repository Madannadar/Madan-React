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


app.get('/api/schemes', (req, res) => {
  const selectQuery = 'SELECT * FROM schemes';

  pool.query(selectQuery)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching schemes:', error);
      res.status(500).send('Error fetching schemes');
    });
});




// POST route for adding funds
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

  pool.query(insertQuery, values)
    .then((response) => {
      console.log("Data saved:", response.rows[0]);
      res.json({ message: "Funds added successfully", data: response.rows[0] });
    })
    .catch((err) => {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Error saving funds", details: err.message  });
    });
});


// GET routes
app.get('/api/funds', (req, res) => {
  const selectQuery = 'SELECT * FROM funds';

  pool.query(selectQuery)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching funds:', error);
      res.status(500).send('Error fetching funds');
    });
});




// POST route for adding customer details
app.post("/api/customers", (req, res) => {
  const { 
    customer_name, 
    address, 
    bank_name, 
    account_number, 
    ifsc_code, 
    branch, 
    aadhar_number, 
    mobile_number, 
    start_date,     // New field
    total_amount    // New field
  } = req.body;

  const insertQuery = `
    INSERT INTO customers (
      customer_name, 
      address, 
      bank_name, 
      account_number, 
      ifsc_code, 
      branch, 
      aadhar_number, 
      mobile_number,
      start_date,     -- New field in the query
      total_amount    -- New field in the query
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;
  `;

  const values = [
    customer_name, 
    address, 
    bank_name, 
    account_number, 
    ifsc_code, 
    branch, 
    aadhar_number, 
    mobile_number,
    start_date,     // New field value
    total_amount    // New field value
  ];

  pool.query(insertQuery, values)
    .then((response) => {
      console.log("Customer data saved:", response.rows[0]);
      res.json({ message: "Customer added successfully", data: response.rows[0] });
    })
    .catch((err) => {
      console.error("Error inserting customer data:", err);
      res.status(500).json({ error: "Error saving customer", details: err.message });
    });
});

app.get('/api/customers', (req, res) => {
  const selectQuery = 'SELECT * FROM customers';

  pool.query(selectQuery)
    .then((result) => {
      res.json(result.rows); // Ensure this is returning JSON
    })
    .catch((error) => {
      console.error('Error fetching customers:', error);
      res.status(500).send('Error fetching customers'); // You can return a JSON response here too
    });
});


// Start the server
  app.listen(5000, () => console.log("Server running on port 5000"));

// app.post("/api/schemes", (req, res) => {
//   const { 
//     SchemeName, 
//     StartDate, 
//     EndDate, 
//     TotalAmount, 
//     PaymentFrequency, 
//     IsRefundable, 
//     RefundAmount 
//   } = req.body;

//   const tableName = SchemeName.replace(/\s+/g, '_').toLowerCase(); // Sanitize table name

//   const insertSchemeQuery = `
//     INSERT INTO schemes (
//       SchemeName, 
//       StartDate, 
//       EndDate, 
//       TotalAmount, 
//       PaymentFrequency,
//       IsRefundable, 
//       RefundAmount
//     ) 
//     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
//   `;

//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS ${tableName} (
//       customer_id SERIAL PRIMARY KEY,
//       customer_name VARCHAR(100) NOT NULL,
//       address TEXT NOT NULL,
//       bank_name VARCHAR(100) NOT NULL,
//       account_number VARCHAR(20) NOT NULL,
//       ifsc_code VARCHAR(11) NOT NULL,
//       branch VARCHAR(100) NOT NULL,
//       aadhar_number VARCHAR(12) NOT NULL,
//       mobile_number VARCHAR(10) NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `;

//   pool.query(insertSchemeQuery, [SchemeName, StartDate, EndDate, TotalAmount, PaymentFrequency, IsRefundable, RefundAmount])
//     .then((response) => {
//       console.log("Scheme added:", response.rows[0]);

//       // Create the table for the scheme
//       return pool.query(createTableQuery);
//     })
//     .then(() => {
//       res.json({ message: `Table created for scheme: ${SchemeName}` });
//     })
//     .catch((err) => {
//       console.error("Error:", err);
//       res.status(500).json({ error: "Error creating scheme and table", details: err.message });
//     });
// });

  


// GET route for fetching customer details






