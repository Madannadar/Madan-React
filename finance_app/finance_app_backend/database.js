const { response } = require("express");
const {Pool} = require("pg")

const pool = new Pool({
    user:"postgres",
    password: "123",
    host: "localhost",
    port : 5432,
    database: "a123", // idar tera database ka name table banane ke liye 
});

// all this commented code is to send query from this code to database 


// const createTblQry =  `CREATE TABLE funds (
//   FundID SERIAL PRIMARY KEY,
//   FundName VARCHAR(255) NOT NULL,
//   TotalAmount DECIMAL(10, 2) NOT NULL,
//   FundManager VARCHAR(255),
//   StartDate DATE NOT NULL,
//   EndDate DATE NOT NULL,
//   PaymentFrequency VARCHAR(50),
//   IsRefundable BOOLEAN DEFAULT FALSE,
//   RefundAmount DECIMAL(10, 2) DEFAULT 0
// // );`

// const createTblQry = `CREATE TABLE CustomerDetails (
//     customer_id SERIAL PRIMARY KEY,
//     customer_name VARCHAR(100) NOT NULL,
//     address TEXT NOT NULL,
//     bank_name VARCHAR(100) NOT NULL,
//     account_number VARCHAR(20) NOT NULL,
//     ifsc_code VARCHAR(11) NOT NULL,
//     branch VARCHAR(100) NOT NULL,
//     aadhar_number VARCHAR(12) NOT NULL,
//     mobile_number VARCHAR(10) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );`

// const createMembersTableQry = `CREATE TABLE Members (
//     member_id SERIAL PRIMARY KEY,
//     scheme_id INT REFERENCES schemes(scheme_id),
//     customer_id INT REFERENCES CustomerDetails(customer_id),
//     start_date DATE NOT NULL,
//     end_date DATE NOT NULL,
//     total_investment DECIMAL(10, 2) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );`;


// pool.query(createMembersTableQry).then((Response) => {
//     console.log("Table Created");
//     console.log(response);
// })
// .catch((err) => {
//     console.log(err);
// })

module.exports = pool;