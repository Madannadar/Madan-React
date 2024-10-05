const express = require("express")
const cors = require("cors")
const pool = require("./database")

const app = express(); // app is the server with all functionality of express

app.use(express.json()); // to handel json requeist 
app.use(cors());

app.post("/adduser", (req, res) => { // pahel it was get then post 
    const SchemeName = req.body["SchemeName"]
    const StartDate =req.body["StartDate"]
    const EndDate =req.body["EndDate"]
    const TotalAmount =req.body["TotalAmount"]
    const IsRefundable =req.body["IsRefundable"]
    const RefundAmount =req.body["RefundAmount"]

    // console.log("username:" + username);
    // console.log("password:", + password);

    const insert = `INSERT INTO schemes   ( SchemeName,  , EndDate, TotalAmount, IsRefundable, RefundAmount) VALUES ( '${SchemeName}', '${StartDate}', '${EndDate}', '${TotalAmount}', '${IsRefundable}', '${RefundAmount}');`
    
    pool.query(insert).then((response) => {
        console.log("Data saved");
        console.log(response);
        
    })
    .catch((err) =>{
        console.log(err);
    })

    console.log(req.body);
    res.send("Response Received1: "+ req.body);
});

app.listen(3000, () => console.log("server on localhost 3000"))



// // SchemeName: "",
// StartDate: "",
// EndDate: "",
// TotalAmount: "",
// PaymentFrequency: "",
// IsRefundable: false,
// RefundAmount: "",