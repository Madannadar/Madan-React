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


const createTblQry =  `CREATE TABLE funds (
  FundID SERIAL PRIMARY KEY,
  FundName VARCHAR(255) NOT NULL,
  TotalAmount DECIMAL(10, 2) NOT NULL,
  FundManager VARCHAR(255),
  StartDate DATE NOT NULL,
  EndDate DATE NOT NULL,
  PaymentFrequency VARCHAR(50),
  IsRefundable BOOLEAN DEFAULT FALSE,
  RefundAmount DECIMAL(10, 2) DEFAULT 0
);`

pool.query(createTblQry).then((Response) => {
    console.log("Table Created");
    console.log(response);
})
.catch((err) => {
    console.log(err);
})

module.exports = pool;