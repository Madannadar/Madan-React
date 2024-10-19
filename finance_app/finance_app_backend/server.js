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
    mobile_number 
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
      mobile_number
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
  `;

  const values = [
    customer_name, 
    address, 
    bank_name, 
    account_number, 
    ifsc_code, 
    branch, 
    aadhar_number, 
    mobile_number
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

// GET route for fetching customer details
app.get('/api/customers', (req, res) => {
  const selectQuery = 'SELECT * FROM customers';

  pool.query(selectQuery)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching customers:', error);
      res.status(500).send('Error fetching customers');
    });
});


// In your Express server (server.js or app.js)
app.post("/api/schemes/add-member", (req, res) => {
  const { schemeId, customerId, startDate, endDate, totalAmount } = req.body;

  const insertQuery = `
    INSERT INTO scheme_members (
      scheme_id, 
      customer_id, 
      start_date, 
      end_date, 
      total_amount
    ) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
  `;

  const values = [schemeId, customerId, startDate, endDate, totalAmount];

  pool.query(insertQuery, values)
    .then((response) => {
      res.json({ message: "Member added successfully", data: response.rows[0] });
    })
    .catch((err) => {
      console.error("Error inserting member:", err);
      res.status(500).json({ error: "Error adding member", details: err.message });
    });
});


// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
